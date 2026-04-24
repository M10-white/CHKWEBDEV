<?php

$page    = $_GET['page'] ?? 'home';
$allowed = ['home', 'projects', 'games'];
if (!in_array($page, $allowed)) $page = 'home';

$scriptDir = str_replace('\\', '/', dirname($_SERVER['PHP_SELF']));
$basePath  = rtrim($scriptDir, '/') . '/';

$titles = [
    'home'     => 'CHKWEBDEV — Brahim Chaouki',
    'projects' => 'Projets — CHKWEBDEV',
    'games'    => 'CHKWEBDEV.GAME',
];
$pageTitle = $titles[$page];

require __DIR__ . '/partials/header.php';
require __DIR__ . '/pages/' . $page . '.php';
require __DIR__ . '/partials/footer.php';
