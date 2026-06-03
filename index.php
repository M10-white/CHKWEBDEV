<?php

session_start();

$page    = $_GET['page'] ?? 'home';
$allowed = ['home', 'projects', 'games'];
if (!in_array($page, $allowed)) {
    require __DIR__ . '/404.php';
    exit;
}

$host     = $_SERVER['HTTP_HOST'] ?? 'localhost';
$isLocal  = (bool) preg_match('/localhost|127\.0\.0\.1|\.local(:\d+)?$/', $host);
if ($isLocal) {
    $scriptDir = str_replace('\\', '/', dirname($_SERVER['PHP_SELF']));
    $basePath  = rtrim($scriptDir, '/') . '/';
} else {
    $basePath = '/';
}

$titles = [
    'home'     => 'CHKWEBDEV — Brahim Chaouki',
    'projects' => 'Projets — CHKWEBDEV',
    'games'    => 'CHKWEBDEV.GAME',
];
$pageTitle = $titles[$page];

/* ── CSRF pour le formulaire de contact (page home) ── */
if ($page === 'home') {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    $_SESSION['csrf_page_load'] = time(); // Rafraîchi à chaque chargement
}

require __DIR__ . '/partials/header.php';
require __DIR__ . '/pages/' . $page . '.php';
require __DIR__ . '/partials/footer.php';
