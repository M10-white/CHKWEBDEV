<!DOCTYPE html>
<html lang="fr" class="page-<?= $page ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?></title>
    <meta name="description" content="Développeur fullstack & créateur de jeux interactifs">
    <base href="<?= $basePath ?>">
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/main.css">
    <?php if ($page !== 'home'): ?>
    <link rel="stylesheet" href="assets/css/<?= $page ?>.css">
    <?php endif; ?>
    <?php if ($page === 'games'): ?>
    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
    }
    </script>
    <?php endif; ?>
</head>
<body class="page-<?= $page ?>">
