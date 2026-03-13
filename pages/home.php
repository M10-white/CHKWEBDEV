<?php
$projects = require __DIR__ . "/../data/projects.php";
?>

<section class="hero">
<h1>CHKWEBDEV</h1>
<p>Developer Portfolio</p>
</section>

<section class="projects-grid">

<?php foreach($projects as $project): ?>

<div class="project-card">

<img src="<?= $project['cover'] ?>" alt="<?= $project['title'] ?>">

<div class="project-content">

<h3><?= $project['title'] ?></h3>

<p><?= $project['description'] ?></p>

<div class="tech">

<?php foreach($project['tech'] as $tech): ?>
<span><?= $tech ?></span>
<?php endforeach; ?>

</div>

<div class="links">

<?php if(isset($project['href'])): ?>
<a href="<?= $project['href'] ?>" target="_blank">Demo</a>
<?php endif; ?>

<?php if(isset($project['repo'])): ?>
<a href="<?= $project['repo'] ?>" target="_blank">Code</a>
<?php endif; ?>

</div>

</div>

</div>

<?php endforeach; ?>

</section>