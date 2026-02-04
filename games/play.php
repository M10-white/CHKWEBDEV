<?php $slug = $_GET['slug'] ?? 'demo'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>Jeu — <?= htmlspecialchars($slug) ?></title>
<link rel="stylesheet" href="/assets/css/main.css" />
</head>
<body>
<main class="container">
<h1>Jeu : <?= htmlspecialchars($slug) ?></h1>
<p>Zone de jeu ici.</p>
</main>
</body>
</html>