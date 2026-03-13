<?php

$page = $_GET['page'] ?? 'home';

require 'partials/header.php';

if ($page === 'games') {
    require 'pages/games.php';
} else {
    require 'pages/home.php';
}