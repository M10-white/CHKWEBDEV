<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Eco Quest</title>

  <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="assets/test.css">
</head>
<body>
<!--<button onclick="transitionToRight()">Page Suivante</button>-->
<div class="score">
<p>Score bons: <span id="score-true">0</span></p>
<p>Score mauvais: <span id="score-false">0</span></p>
<p>1 = Un</p>

</div>
<div class="folder">
<img src="assets/img/folder.png" >
</div>
<div id="droppable-true" class="droppable ui-widget-header">
  <p>VRAIE</p>
</div>

<div id="droppable-false" class="droppable ui-widget-header">
  <p>FAUX</p>
</div>

<img class="titre2" src="assets/img/titre2.png" >

<a href="feuille.php" target="blank_"><button class="btn" >Documentation</button></a>

<div class="draggable-container">
<?php
session_start();
$pdo = new PDO('mysql:host=localhost;dbname=test12', 'root', '');
 
 
$sql = "SELECT * FROM `1`";
$stmt = $pdo->query($sql);
 
// Mettre le contenu du PDOStatement dans un tableau
$top = 0;
$i = 0;
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $tabl[$i][0] = $row['Texte'];
    $tabl[$i][1] = $row['résultat'];
//    echo '<div class="draggable ui-widget-content" style="top: '.$top.'px;" data-value="'.$row['résultat'].'">';
//    echo htmlspecialchars($row['Texte']);
//    echo '</div>';
//    $top += 10;
    $i++;
}
 
// Mélanger le tableau
shuffle($tabl);
 
// Afficher les n 1eres lignes du tableau
for ($i=1;$i<=17;$i++) {
  echo '<div class="draggable ui-widget-content" style="top: '.$top.'px;" data-value="'.$tabl[$i][1].'">';
  echo htmlspecialchars($tabl[$i][0]);
  echo '</div>';
  $top += 10;
}
 
?>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<script src="assets/test.js"></script>
</body>
</html>
