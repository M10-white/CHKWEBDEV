<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Eco Quest</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
  <style>
  .draggable {
    width: 410px; /* Réduire la taille */
    height: 543px; /* Réduire la taille */
    padding: 0.5em;
    border: 1px solid #000;
    position: absolute; /* Position absolue pour superposition */
    background-color: white;
    user-select: none;
  }

  /* Suppression des z-index initiaux */
  #draggable1 { top: 10px; left: 10px; }
  #draggable2 { top: 20px; left: 20px; }
  #draggable3 { top: 30px; left: 30px; }
  #draggable4 { top: 40px; left: 40px; }
  #draggable5 { top: 50px; left: 50px; }
  #draggable6 { top: 60px; left: 60px; }
  #draggable7 { top: 70px; left: 70px; }
  #draggable8 { top: 80px; left: 80px; }
  #draggable9 { top: 90px; left: 90px; }
  #draggable10 { top: 100px; left: 100px; }
  /* Continuez pour les autres éléments draggable */
  </style>
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  <script>
  $( function() {
    $( ".draggable" ).draggable({
      stack: ".draggable" // Utilisation de stack pour gérer le z-index
    });
  } );
  </script>
</head>
<body>

<div id="draggable1" class="ui-widget-content draggable">
  <p>L’alimentation représente 24 % des émissions de gaz à effet de serre de l’empreinte des Français</p>
  <p>L’objectif inscrit dans le texte de la stratégie nationale bas carbone est de diviser par 2 les émissions de gaz à effet de serre du secteur agricole d’ici à 2050.</p>
  <p>Un faible mangeur de viande (50 g par jour) émet 1,5 fois moins de gaz à effet de serre qu’un gros mangeur de viande (100 g par jour). Un végétarien émet près de 2 fois moins.</p>
  <p></p>
</div>

<div id="draggable2" class="ui-widget-content draggable">

  <p>En France, il existe 7,4 millions de « passoires énergétiques » parmi les résidences principales du parc privé (c’est-à-dire des logements ayant une étiquette énergie F ou G).</p>
  <p>La facture énergétique des ménages pour le logement en 2015 était en moyenne de 1 681 euros.</p>
</div>

<div id="draggable3" class="ui-widget-content draggable">
  <p>100 000 emplois qui ont été supprimés dans l’ensemble de la filière automobile depuis 10 ans.</p>
  <p>700 emplois supprimés pour le site de la raffinerie de Grandpuits</p>
  <p>880 000 emplois temps plein supplémentaires environ seraient créés à horizon 2050 si la France applique sa stratégie nationale bas carbone (SNBC), par rapport à une poursuite des tendances actuelles (source : ADEME, prospective ThreeMe)</p>
</div>

<div id="draggable4" class="ui-widget-content draggable">
  <p>Pour respecter les objectifs signés lors de la COP21, il faut laisser 80 % des ressources d’énergies fossiles (pétrole, charbon et gaz) dans le sol.</p>
</div>

<div id="draggable5" class="ui-widget-content draggable">
  <p>L’Europe devra atteindre l’objectif de zéro émissions nette de gaz à effet de serre d’ici à 2050, pour être cohérente avec l’accord de Paris.</p>
  <p>En Europe, au moins 45 % de l’énergie pourrait être fournie par les énergies renouvelables d’ici à 2030.</p>
</div>

<div id="draggable6" class="ui-widget-content draggable">
  <p>La France est au 27è rang de la fiscalité environnementale au sein de l’Union européenne</p>
  <p>Il n’y a pas de taxe énergétique ni de TVA sur le kérosène du transport aérien.</p>
</div>

<div id="draggable7" class="ui-widget-content draggable">
  <p>56,5 Millions de tonnes est la quantité de CO2eq émise par les seuls secteurs de la chimie, du ciment et de la métallurgie en 2019 (chiffres CITEPA)</p>
  <p>40 sites industriels qui représentent à eux seuls 10 % des émissions françaises</p>
  <p>40 ans : c’est la durée de vie moyenne d’un équipement industriel</p>
</div>

<div id="draggable8" class="ui-widget-content draggable">
  <p>En 2030, les pays devront dépenser chaque année 300 milliards de dollars / an pour s’adapter aux effets négatifs des changements climatiques, même si les objectifs de l’accord de Paris sont remplis.</p>
  <p>L’accord signé à la COP21 stipule que 195 pays visent désormais une limitation de la hausse de la température “bien en deçà de 2°C”, en faisant tous les efforts pour la maintenir “en deçà de 1,5°C”.</p>
  <p>Les énergies renouvelables ont atteint une capacité de production record en 2017 : ¼ de la production mondiale d’électricité</p>
  <p>Les pays riches se sont engagés à mobiliser 100 milliards de dollars / an d’ici à 2020 pour aider les pays les plus pauvres à faire face aux impacts des changements climatiques.</p>
</div>

<div id="draggable9" class="ui-widget-content draggable">
  <p>
Les villes françaises sont responsables de 67 % des émissions de gaz à effet de serre nationales et les 10 plus grandes métropoles françaises regroupent 20 % de la population nationale et représentent 16% des émissions nationales de gaz à effet de serre.</p>
  <p>62% de la population est exposée de manière forte ou très forte aux risques climatiques</p>
  <p>Au delà de 20 000 habitants, les intercommunalités devront mettre en oeuvre un Plan Climat Air Energie Territorial (PCAET) à partir de 2018.</p>
  <p>50 % des émissions de gaz à effet de serre sont directement issues des décisions prises par les collectivités territoriales, concernant leur patrimoine (bâtiment, éclairage public…), leurs compétences (transports, déchets, distribution d’énergie et de chaleur…) et via les effets indirects de leurs orientations en matière d’habitat, d’aménagement, d’urbanisme et d’organisation des transports.</p>
  <p>80% des Français attendent une action forte de la région pour le climat au cours du prochain mandat</p>
</div>

<div id="draggable10" class="ui-widget-content draggable">
  <p>En France, les deux-tiers des déplacements domicile-travail sont effectués en voiture.</p>
  <p>La moitié des déplacements effectués en voiture en ville fait moins de 3 km. Une distance aisément réalisable en vélo, à pied ou en transport en commun.</p>
</div>



</body>
</html>
