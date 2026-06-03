<?php if ($page === 'home'): ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="assets/js/character.js"></script>
    <script src="assets/js/main.js"></script>
<?php elseif ($page === 'projects'): ?>
    <script src="assets/js/projects.js"></script>
<?php elseif ($page === 'games'): ?>
    <script type="module" src="assets/js/games.js"></script>
<?php endif; ?>
<noscript>
    <p style="position:fixed;bottom:0;left:0;right:0;padding:12px;background:#1a1a1a;color:#f8fafc;text-align:center;font-family:sans-serif;font-size:14px;z-index:9999;">
        Ce site nécessite JavaScript pour fonctionner. Veuillez l'activer dans votre navigateur.
    </p>
</noscript>
</body>
</html>
