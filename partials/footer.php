<?php if ($page === 'home'): ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="assets/js/character.js"></script>
    <script src="assets/js/main.js"></script>
<?php elseif ($page === 'projects'): ?>
    <script src="assets/js/projects.js"></script>
<?php elseif ($page === 'games'): ?>
    <script type="module" src="assets/js/games.js"></script>
<?php endif; ?>
</body>
</html>
