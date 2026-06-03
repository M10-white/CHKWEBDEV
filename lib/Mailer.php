<?php
/**
 * Minimal SMTP mailer — aucune dépendance externe
 * Supporte SMTP + STARTTLS + AUTH LOGIN (Gmail, Outlook, OVH…)
 */
class Mailer {

    public string $host;
    public int    $port      = 587;
    public string $username;
    public string $password;
    public string $fromEmail;
    public string $fromName  = '';
    public string $errorInfo = '';

    private mixed $sock;

    public function send(
        string $toEmail,
        string $toName,
        string $replyTo,
        string $subject,
        string $body
    ): bool {
        $this->errorInfo = '';
        try {
            return $this->_send($toEmail, $toName, $replyTo, $subject, $body);
        } catch (\Exception $e) {
            $this->errorInfo = $e->getMessage();
            if (!empty($this->sock) && is_resource($this->sock)) {
                @fclose($this->sock);
            }
            return false;
        }
    }

    private function _send(string $to, string $toName, string $replyTo, string $subject, string $body): bool
    {
        $this->sock = @fsockopen('tcp://' . $this->host, $this->port, $errno, $errstr, 12);
        if (!$this->sock) throw new \Exception("Connexion SMTP impossible : $errstr ($errno)");

        stream_set_timeout($this->sock, 12);

        $this->expect(220);                          // banner serveur

        $this->cmd('EHLO portfolio.local');          // EHLO

        $this->cmd('STARTTLS', 220);                 // TLS upgrade
        if (!stream_socket_enable_crypto(
                $this->sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT
        )) {
            throw new \Exception('Handshake TLS échoué');
        }

        $this->cmd('EHLO portfolio.local');          // re-EHLO après TLS

        $this->cmd('AUTH LOGIN',                334); // AUTH
        $this->cmd(base64_encode($this->username), 334);
        $this->cmd(base64_encode($this->password), 235);

        $this->cmd("MAIL FROM:<{$this->fromEmail}>", 250);
        $this->cmd("RCPT TO:<{$to}>",               250);
        $this->cmd('DATA',                          354);

        $msg  = "From: =?UTF-8?B?" . base64_encode($this->fromName) . "?= <{$this->fromEmail}>\r\n";
        $msg .= "To: =?UTF-8?B?"   . base64_encode($toName)         . "?= <{$to}>\r\n";
        $msg .= "Reply-To: <{$replyTo}>\r\n";
        $msg .= "Subject: =?UTF-8?B?" . base64_encode($subject)     . "?=\r\n";
        $msg .= "MIME-Version: 1.0\r\n";
        $msg .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $msg .= "Content-Transfer-Encoding: base64\r\n";
        $msg .= "Date: " . date('r') . "\r\n";
        $msg .= "Message-ID: <" . uniqid('', true) . "@portfolio.local>\r\n";
        $msg .= "\r\n";
        $msg .= chunk_split(base64_encode($body));
        $msg .= "\r\n.\r\n";

        fwrite($this->sock, $msg);
        $this->expect(250);

        $this->cmd('QUIT', 221);
        fclose($this->sock);
        return true;
    }

    private function cmd(string $cmd, int $expect = 250): string
    {
        fwrite($this->sock, $cmd . "\r\n");
        return $this->expect($expect);
    }

    private function expect(int $code): string
    {
        $resp = '';
        while (true) {
            $line = fgets($this->sock, 512);
            if ($line === false) throw new \Exception('Connexion coupée par le serveur');
            $resp .= $line;
            if (strlen($line) >= 4 && $line[3] === ' ') break;
        }
        $actual = (int) substr($resp, 0, 3);
        if ($actual !== $code) {
            throw new \Exception("Réponse inattendue — attendu $code, reçu $actual : " . trim($resp));
        }
        return $resp;
    }
}
