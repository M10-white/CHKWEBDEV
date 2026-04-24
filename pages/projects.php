<?php $projects = require __DIR__ . '/../data/projects.php'; ?>

<!-- Curseur custom -->
<div id="cursor"></div>
<div id="cursor-ring"></div>

<!-- Navigation -->
<nav class="pnav" id="pnav">
    <a href="./" class="pnav-back" aria-label="Retour">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </a>
    <span class="pnav-brand">CHK<em>WEBDEV</em></span>
    <span class="pnav-count"><?= count($projects) ?> projets</span>
</nav>

<!-- Header section -->
<header class="phero">
    <h1 class="phero-title">Projets</h1>
    <p class="phero-sub">Fullstack · IA · Open source · Clients</p>
</header>

<!-- Grille des projets -->
<main class="pgrid">
<?php foreach ($projects as $p):
    $hasLink = isset($p['href']) || isset($p['repo']);
    $mainHref = $p['href'] ?? $p['repo'] ?? null;
?>
    <article class="pcard<?= $hasLink ? ' pcard--link' : '' ?>"
        <?php if ($mainHref): ?>data-href="<?= htmlspecialchars($mainHref) ?>"<?php endif; ?>
        <?php if (isset($p['repo'])): ?>data-repo="<?= htmlspecialchars($p['repo']) ?>"<?php endif; ?>
    >
        <!-- Image de fond -->
        <div class="pcard-img" style="background-image:url('<?= htmlspecialchars($p['cover']) ?>')"></div>

        <!-- Overlay reveal -->
        <div class="pcard-overlay">
            <div class="pcard-body">
                <h2 class="pcard-title"><?= htmlspecialchars($p['title']) ?></h2>
                <p class="pcard-desc"><?= htmlspecialchars($p['description']) ?></p>

                <div class="pcard-tags">
                    <?php foreach ($p['tech'] as $t): ?>
                    <span class="ptag"><?= htmlspecialchars($t) ?></span>
                    <?php endforeach; ?>
                </div>

                <?php if (isset($p['href']) || isset($p['repo'])): ?>
                <div class="pcard-actions">
                    <?php if (isset($p['href'])): ?>
                    <a href="<?= htmlspecialchars($p['href']) ?>" target="_blank" rel="noopener" class="pbtn pbtn--live" onclick="event.stopPropagation()">Live →</a>
                    <?php endif; ?>
                    <?php if (isset($p['repo'])): ?>
                    <a href="<?= htmlspecialchars($p['repo']) ?>" target="_blank" rel="noopener" class="pbtn pbtn--code" onclick="event.stopPropagation()">Code</a>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
            </div>
        </div>

        <?php if (isset($p['year'])): ?>
        <span class="pcard-year"><?= (int)$p['year'] ?></span>
        <?php endif; ?>
    </article>
<?php endforeach; ?>
</main>

<footer class="pfooter">
    <span>CHKWEBDEV · <?= date('Y') ?></span>
</footer>
