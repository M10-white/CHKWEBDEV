<?php
/**
 * POST /api/contact.php
 * Envoi du formulaire de contact
 *
 * Sécurité :
 *  1. CSRF token (session)
 *  2. Honeypot (champ caché que seuls les bots remplissent)
 *  3. Timing check (rejet si soumis < 3 s après chargement de la page)
 *  4. Rate limiting (max 3 envois / heure / IP — fichier tmp)
 *  5. Validation & sanitisation de toutes les entrées
 *  6. Envoi via SMTP TLS (lib/Mailer.php)
 */

session_start();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

/* ── Helper réponse ──────────────────────────────────── */
function respond(bool $ok, string $msg = '', int $code = 200): never
{
    http_response_code($code);
    exit(json_encode(['ok' => $ok, 'error' => $ok ? '' : $msg]));
}

/* ── Méthode ─────────────────────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Méthode non autorisée', 405);
}

/* ── CSRF ────────────────────────────────────────────── */
$sessionToken = $_SESSION['csrf_token'] ?? '';
$postToken    = $_POST['_token']        ?? '';

if (
    empty($postToken) ||
    empty($sessionToken) ||
    !hash_equals($sessionToken, $postToken)
) {
    respond(false, 'Session expirée. Rechargez la page.', 403);
}

/* ── Timing check (< 3 s = bot) ─────────────────────── */
$pageLoad = $_SESSION['csrf_page_load'] ?? 0;
if ((time() - $pageLoad) < 3) {
    respond(false, 'Envoi trop rapide.', 429);
}

/* ── Honeypot ────────────────────────────────────────── */
if (!empty($_POST['website'])) {
    // Fake success pour ne pas alerter le bot
    respond(true);
}

/* ── Rate limiting (3 / heure / IP hachée) ──────────── */
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'chk_salt_v1');
$rlFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'chk_rl_' . $ipHash . '.json';

$rl = ['n' => 0, 'reset' => 0];
if (file_exists($rlFile)) {
    $decoded = json_decode(file_get_contents($rlFile), true);
    if (is_array($decoded)) $rl = $decoded;
}
if (time() > $rl['reset']) {
    $rl = ['n' => 0, 'reset' => time() + 3600];
}
if ($rl['n'] >= 3) {
    respond(false, 'Trop de messages envoyés. Réessayez dans une heure.', 429);
}
$rl['n']++;
file_put_contents($rlFile, json_encode($rl), LOCK_EX);

/* ── Validation des entrées ──────────────────────────── */
$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(filter_var($_POST['email']   ?? '', FILTER_SANITIZE_EMAIL));
$message = trim(strip_tags($_POST['message'] ?? ''));

if (empty($name) || empty($email) || empty($message)) {
    respond(false, 'Tous les champs sont requis.', 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Adresse email invalide.', 400);
}
if (mb_strlen($name) > 100 || mb_strlen($message) > 3000) {
    respond(false, 'Contenu trop long (max 3000 caractères).', 400);
}

/* ── Vérification config mail ────────────────────────── */
$cfgFile = __DIR__ . '/../config/mail.php';
if (!file_exists($cfgFile)) {
    error_log('[Contact] config/mail.php introuvable');
    respond(false, 'Configuration serveur manquante.', 500);
}
$cfg = require $cfgFile;

if (
    str_contains($cfg['smtp_user'], 'VOTRE_EMAIL') ||
    str_contains($cfg['smtp_pass'], 'VOTRE_MOT_DE_PASSE')
) {
    error_log('[Contact] config/mail.php non configuré');
    respond(false, 'Le formulaire de contact n\'est pas encore configuré.', 503);
}

/* ── Envoi ───────────────────────────────────────────── */
require_once __DIR__ . '/../lib/Mailer.php';

$mail             = new Mailer();
$mail->host       = $cfg['smtp_host'];
$mail->port       = $cfg['smtp_port'];
$mail->username   = $cfg['smtp_user'];
$mail->password   = $cfg['smtp_pass'];
$mail->fromEmail  = $cfg['from_email'];
$mail->fromName   = $cfg['from_name'];

$subject = "Portfolio Contact — {$name}";
$body    =
    "Nouveau message depuis CHKWEBDEV.fr\n" .
    "═══════════════════════════════════\n\n" .
    "Nom    : {$name}\n" .
    "Email  : {$email}\n\n" .
    "Message :\n{$message}\n\n" .
    "═══════════════════════════════════\n" .
    "Reçu le " . date('d/m/Y à H:i:s') . "\n";

$ok = $mail->send($cfg['to_email'], 'CHKWEBDEV', $email, $subject, $body);

if (!$ok) {
    error_log('[Contact] Mailer error: ' . $mail->errorInfo);
    respond(false, 'Erreur lors de l\'envoi. Réessayez plus tard.', 500);
}

/* ── Succès — invalider le token pour éviter le double-envoi ── */
unset($_SESSION['csrf_token'], $_SESSION['csrf_page_load']);

respond(true);
