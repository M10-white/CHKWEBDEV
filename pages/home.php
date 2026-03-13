<?php
$projects = require __DIR__ . "/../data/projects.php";
?>

<section id="scene"></section>

<script>
const projectsData = <?= json_encode($projects) ?>;
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="assets/js/main.js"></script>