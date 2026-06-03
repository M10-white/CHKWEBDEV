<!DOCTYPE html>
<html lang="fr" class="page-<?= $page ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?></title>

    <?php
    $protocol  = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host      = htmlspecialchars($_SERVER['HTTP_HOST'] ?? 'chkwebdev.fr');
    $siteUrl   = $protocol . '://' . $host;
    $pagePaths = ['home' => '', 'projects' => 'projects', 'games' => 'games'];
    $canonicalUrl = $siteUrl . '/' . ($pagePaths[$page] ?? '');

    $descriptions = [
        'home'     => 'Développeur fullstack &amp; créateur de jeux interactifs. Découvrez les projets web et jeux de Brahim Chaouki.',
        'projects' => 'Portfolio de projets fullstack, IA et open source de Brahim Chaouki — développeur web.',
        'games'    => 'Jeux interactifs créés par Brahim Chaouki. Explorez la collection CHKWEBDEV.GAME.',
    ];
    $description = $descriptions[$page];

    $ogTitles = [
        'home'     => 'CHKWEBDEV — Brahim Chaouki',
        'projects' => 'Projets — CHKWEBDEV',
        'games'    => 'Jeux Interactifs — CHKWEBDEV.GAME',
    ];
    $ogTitle = $ogTitles[$page];
    $ogImage = $siteUrl . '/assets/img/og-preview.png';
    ?>

    <meta name="description" content="<?= $description ?>">
    <meta name="author" content="Brahim Chaouki">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#070708">
    <link rel="canonical" href="<?= $canonicalUrl ?>">

    <!-- Open Graph -->
    <meta property="og:type"        content="<?= $page === 'home' ? 'profile' : 'website' ?>">
    <meta property="og:url"         content="<?= $canonicalUrl ?>">
    <meta property="og:title"       content="<?= htmlspecialchars($ogTitle) ?>">
    <meta property="og:description" content="<?= $description ?>">
    <meta property="og:image"       content="<?= $ogImage ?>">
    <meta property="og:locale"      content="fr_FR">
    <meta property="og:site_name"   content="CHKWEBDEV">

    <!-- Twitter Card -->
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:title"       content="<?= htmlspecialchars($ogTitle) ?>">
    <meta name="twitter:description" content="<?= $description ?>">
    <meta name="twitter:image"       content="<?= $ogImage ?>">

    <?php if ($page === 'home'): ?>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Brahim Chaouki",
        "url": "<?= $siteUrl ?>",
        "jobTitle": "Développeur Fullstack",
        "sameAs": [
            "https://github.com/M10-white",
            "https://www.linkedin.com/company/101682192/"
        ]
    }
    </script>
    <?php elseif ($page === 'games'): ?>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Jeux Interactifs — CHKWEBDEV.GAME",
        "url": "<?= $canonicalUrl ?>",
        "author": { "@type": "Person", "name": "Brahim Chaouki" }
    }
    </script>
    <?php endif; ?>

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
<a href="#main-content" class="skip-link">Aller au contenu principal</a>
