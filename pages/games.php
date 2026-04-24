<?php require __DIR__ . '/../data/games.php'; ?>
<script>
window.GAMES_DATA = <?= json_encode(array_values($games), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>;
</script>

<div id="groom">

    <!-- Nav -->
    <nav class="gnav" id="gnav">
        <a href="./" class="gnav-back" aria-label="Retour">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </a>
        <span class="gnav-brand">CHKWEBDEV<em>.GAME</em></span>
        <span class="gnav-hint">Glisser pour explorer · Cliquer sur un jeu</span>
    </nav>

    <!-- Canvas Three.js plein écran -->
    <canvas id="gcanvas"></canvas>

    <!-- Overlay scanlines CRT -->
    <div id="crt" aria-hidden="true"></div>

    <!-- Panel info jeu (drawer droit) -->
    <div id="gpanel" role="dialog" aria-hidden="true">
        <div id="gpanel-inner">
            <button id="gpanel-close" aria-label="Fermer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <div class="gp-year" id="gp-year"></div>
            <h2 class="gp-title" id="gp-title"></h2>
            <p class="gp-desc" id="gp-desc"></p>
            <div class="gp-tags" id="gp-tags"></div>
            <div class="gp-actions" id="gp-actions"></div>
        </div>
    </div>

</div>
