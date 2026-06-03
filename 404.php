<?php
http_response_code(404);
if (!isset($basePath)) {
    $scriptDir = str_replace('\\', '/', dirname($_SERVER['PHP_SELF']));
    $basePath  = rtrim($scriptDir, '/') . '/';
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 — Page introuvable · CHKWEBDEV</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" href="<?= $basePath ?>assets/img/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        html, body {
            width: 100%; height: 100%;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: radial-gradient(ellipse at 50% 38%, #0d0f0e 0%, #070708 65%);
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
        }

        .wrap {
            text-align: center;
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
        }

        .code {
            font-size: clamp(120px, 22vw, 220px);
            font-weight: 700;
            letter-spacing: -0.06em;
            line-height: 0.9;
            background: linear-gradient(135deg, #fff 10%, #57e8c3 55%, #16e694 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: glitch 4s ease-in-out infinite;
            user-select: none;
        }

        @keyframes glitch {
            0%, 88%, 100% { transform: translate(0); filter: none; }
            90%  { transform: translate(-2px, 1px); filter: hue-rotate(20deg); }
            92%  { transform: translate(2px, -1px); filter: hue-rotate(-20deg); }
            94%  { transform: translate(0); filter: none; }
            96%  { transform: translate(1px, 2px); filter: hue-rotate(15deg); }
            98%  { transform: translate(0); filter: none; }
        }

        .label {
            font-size: clamp(11px, 1.4vw, 14px);
            font-weight: 500;
            color: rgba(248, 250, 252, 0.38);
            letter-spacing: 0.22em;
            text-transform: uppercase;
            margin-top: 16px;
            margin-bottom: 48px;
        }

        .back {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 28px;
            background: #16e694;
            color: #020d08;
            font-family: inherit;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-decoration: none;
            border-radius: 7px;
            transition: background 0.2s, transform 0.15s;
        }

        .back:hover  { background: #57e8c3; transform: translateY(-2px); }
        .back:active { transform: scale(0.97); }
        .back:focus-visible {
            outline: 2px solid #16e694;
            outline-offset: 3px;
        }

        .divider {
            width: 1px;
            height: 48px;
            background: linear-gradient(to bottom, transparent, rgba(22,230,148,0.3), transparent);
            margin-bottom: 32px;
        }
    </style>
</head>
<body>
    <main class="wrap">
        <p class="code" aria-label="Erreur 404">404</p>
        <p class="label">Page introuvable</p>
        <div class="divider" aria-hidden="true"></div>
        <a href="<?= $basePath ?>" class="back">← Retour à l'accueil</a>
    </main>
</body>
</html>
