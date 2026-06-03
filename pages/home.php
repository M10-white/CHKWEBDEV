<main id="scene">

    <!-- Cible skip link -->
    <span id="main-content" tabindex="-1" class="sr-only"></span>

    <!-- Curseur custom (décoratif) -->
    <div id="cursor" aria-hidden="true"></div>
    <div id="cursor-ring" aria-hidden="true"></div>

    <!-- Canvas : fond étoilé + mascotte -->
    <canvas id="chr" aria-hidden="true"></canvas>

    <!-- Overlay de transition -->
    <div id="overlay" aria-hidden="true"></div>

    <!-- Texte dialogue centre haut -->
    <div id="dialogue" aria-live="polite" aria-atomic="true">
        <h1 class="sr-only">Brahim Chaouki — Développeur Fullstack &amp; Créateur de jeux</h1>
        <span id="text"></span>
        <span id="subtext"></span>
    </div>

    <!-- Paroles du personnage — sous lui -->
    <div id="speech" aria-live="polite" aria-atomic="true">
        <span id="speech-text"></span>
    </div>

    <!-- Univers gauche : CHKWEBDEV -->
    <div class="universe" id="u-dev" data-href="projects" role="link" tabindex="-1" aria-label="Portfolio et Projets — 13 projets">
        <span class="uni-label">Portfolio &amp; Projets</span>
        <span class="uni-count">13 projets</span>
    </div>

    <!-- Univers droit : CHKWEBDEV.GAME -->
    <div class="universe" id="u-game" data-href="games" role="link" tabindex="-1" aria-label="Jeux Interactifs — En cours">
        <span class="uni-label">Jeux Interactifs</span>
        <span class="uni-count">En cours →</span>
    </div>

    <!-- Indice initial -->
    <div id="hint"><span>cliquer pour commencer</span></div>

    <!-- Réseaux sociaux -->
    <div id="socials">
        <a href="https://github.com/M10-white" target="_blank" rel="noopener" class="soc-link" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
        </a>
        <a href="https://www.linkedin.com/company/101682192/" target="_blank" rel="noopener" class="soc-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        </a>
        <a href="https://itch.io/profile/chkwebdev" target="_blank" rel="noopener" class="soc-link" aria-label="itch.io">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M0 1.794C0 .803.82 0 1.829 0h20.342C23.18 0 24 .803 24 1.794v20.412C24 23.197 23.18 24 22.171 24H1.83C.82 24 0 23.197 0 22.206V1.794zm4.708 3.476C4.148 5.65 3.67 6.234 3.67 6.819v.904c0 1.147 1.071 2.101 2.033 2.101.963 0 1.75-.864 1.75-1.927v-.082c0 1.063.894 1.927 1.857 1.927h.978c.963 0 1.857-.864 1.857-1.927v.082c0 1.063.787 1.927 1.75 1.927.963 0 2.033-.954 2.033-2.1v-.905c0-.585-.478-1.17-1.038-1.549-1.024-.68-2.726-.932-4.7-.932-1.972 0-3.498.252-4.522.932zm9.038 8.505c-.278-.276-.63-.464-1.107-.528a1.52 1.52 0 00-.16-.008H11.52c-.055 0-.108.003-.16.008-.477.064-.829.252-1.107.528-.465.46-.636 1.087-.636 1.66v.22h4.764v-.22c0-.573-.17-1.2-.635-1.66zm-9.27-1.007h12.048v1.11H4.476v-1.11zm0 2.768h12.048v1.11H4.476v-1.11z"/>
            </svg>
        </a>
        <button type="button" id="soc-mail" class="soc-link" aria-label="Formulaire de contact">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
        </button>
    </div>

    <!-- Formulaire de contact -->
    <div id="contact-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="cf-title">
        <div id="contact-box">
            <button type="button" id="contact-close" aria-label="Fermer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <p class="cf-overline">Restons en contact</p>
            <h2 class="cf-title" id="cf-title">Me contacter</h2>
            <div aria-live="assertive" aria-atomic="true" class="sr-only" id="cf-announce"></div>
            <form id="contact-form" novalidate>
                <!-- CSRF token -->
                <input type="hidden" id="cf-token" name="_token" value="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '') ?>">
                <!-- Honeypot : rempli uniquement par les bots -->
                <div class="cf-hp" aria-hidden="true">
                    <label for="cf-website">Ne pas remplir</label>
                    <input type="text" id="cf-website" name="website" tabindex="-1" autocomplete="off">
                </div>
                <div class="cf-field">
                    <label for="cf-name">Nom</label>
                    <input id="cf-name" type="text" name="name" placeholder="Votre nom" autocomplete="name" required aria-required="true">
                </div>
                <div class="cf-field">
                    <label for="cf-email">Email</label>
                    <input id="cf-email" type="email" name="email" placeholder="votre@email.com" autocomplete="email" required aria-required="true">
                </div>
                <div class="cf-field">
                    <label for="cf-msg">Message</label>
                    <textarea id="cf-msg" name="message" rows="4" placeholder="Votre message..." required aria-required="true"></textarea>
                </div>
                <button type="submit" class="cf-submit">Envoyer →</button>
            </form>
        </div>
    </div>

</main>
