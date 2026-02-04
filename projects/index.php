<?php require __DIR__ . '/../data/projects.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>Projets</title>
<link rel="stylesheet" href="/assets/css/main.css" />
</head>
<body>
<main class="container">
<h1>Projets</h1>
<ul>
<?php foreach ($projects as $slug => $p): ?>
<li><a href="/projects/<?= $slug ?>"><?= $p['title'] ?></a></li>
<?php endforeach; ?>
</ul>
</main>
</body>
</html>