<?php require __DIR__ . '/../data/games.php'; ?>
<script>
window.GAMES_DATA = <?= json_encode(array_values($games), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>;
</script>

<main id="groom">

    <!-- Cible skip link -->
    <span id="main-content" tabindex="-1" class="sr-only"></span>

    <!-- Nav -->
    <nav class="gnav" id="gnav">
        <a href="./" class="gnav-back" aria-label="Retour à l'accueil">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </a>
        <span class="gnav-brand">CHKWEBDEV<em>.GAME</em></span>
        <span class="gnav-hint">Glisser pour explorer · Cliquer sur un jeu</span>
    </nav>

    <!-- Canvas Three.js plein écran -->
    <canvas id="gcanvas" aria-label="Scène 3D interactive — glissez pour explorer les jeux, cliquez pour en savoir plus"></canvas>

    <!-- Sélection de mode -->
    <div id="mode-select" role="dialog" aria-modal="true" aria-labelledby="ms-title">
        <p class="ms-brand">CHKWEBDEV<em>.GAME</em></p>
        <h2 class="ms-title" id="ms-title">Choisissez votre mode</h2>
        <div class="ms-options">
            <button class="ms-btn" data-mode="free">
                <div class="ms-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                        <path d="M2 12h20"/>
                    </svg>
                </div>
                <span class="ms-name">Caméra Libre</span>
                <small class="ms-desc">Vue orbitale · cliquer sur les jeux</small>
            </button>
            <div class="ms-sep" aria-hidden="true">ou</div>
            <button class="ms-btn ms-btn--fps" data-mode="fps">
                <div class="ms-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                        <line x1="12" y1="2" x2="12" y2="5"/>
                        <line x1="12" y1="19" x2="12" y2="22"/>
                        <line x1="2" y1="12" x2="5" y2="12"/>
                        <line x1="19" y1="12" x2="22" y2="12"/>
                    </svg>
                </div>
                <span class="ms-name">Première Personne</span>
                <small class="ms-desc">Marchez dans la chambre · ZQSD</small>
            </button>
        </div>
        <p class="ms-hint" aria-hidden="true">▼</p>
    </div>

    <!-- UI première personne (masqué par défaut) -->
    <div id="fps-ui" aria-hidden="true">
        <div id="fps-crosshair"><span></span><span></span></div>
        <div id="fps-interact">[ E ] Voir le jeu</div>
        <div id="fps-lock-hint">Cliquer pour prendre le contrôle</div>
    </div>

    <!-- Overlay scanlines CRT -->
    <div id="crt" aria-hidden="true"></div>

    <!-- Panel info jeu (drawer droit) -->
    <div id="gpanel" role="dialog" aria-hidden="true" aria-labelledby="gp-title" aria-modal="true">
        <div id="gpanel-inner">
            <button id="gpanel-close" aria-label="Fermer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
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

</main>
