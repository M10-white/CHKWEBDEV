<?php
require __DIR__ . '/../data/projects.php';
$slug = $_GET['slug'] ?? null;
$project = $projects[$slug] ?? null;
if (!$project) {
http_response_code(404);
require __DIR__ . '/../404.php';
exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title><?= $project['title'] ?></title>
<link rel="stylesheet" href="/assets/css/main.css" />
</head>
<body>
<main class="container">
<h1><?= $project['title'] ?></h1>
<p><?= $project['description'] ?></p>
<a href="/projects">← Retour</a>
</main>
</body>
</html>