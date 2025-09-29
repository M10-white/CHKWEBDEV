-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 08 déc. 2023 à 06:01
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test12`
--

-- --------------------------------------------------------

--
-- Structure de la table `1`
--

CREATE TABLE `1` (
  `id` int(2) NOT NULL,
  `Texte` varchar(1000) NOT NULL,
  `résultat` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `1`
--

INSERT INTO `1` (`id`, `Texte`, `résultat`) VALUES
(1, 'Le Méthane : Selon le sixième rapport d\'évaluation du GIEC (2021), son pouvoir de réchauffement est 26 à 34 fois supérieur à celui du CO2 sur une période de 100 ans et entre 86 et 90 fois supérieur sur 20 ans. Le méthane est responsable de près d\'un quart du réchauffement actuel du climat.', 1),
(2, 'Le dioxyde de carbone (CO2) provient en grande majorité de la combustion des énergies fossiles (pétrole, charbon et gaz) dans les transports, la production d\'électricité, l\'industrie et l\'habitat. La déforestation (surtout en zones tropicales) et les brûlis des étendues herbeuses sont la deuxième source d\'émission de CO2.', 1),
(3, 'le CO2 représente 76% des émissions anthropiques (humaines) de gaz à effet de serre. le Méthane en représente 16%.', 1),
(4, 'En 2021, les émissions de gaz à effet de serre générées par les activités économiques de l\'UE s\'élevaient à 3,6 milliards de tonnes d\'équivalent CO2, soit 22 % de moins qu\'en 2008.', 1),
(5, 'Le méthane dure moins longtemps que le CO2 dans l\'atmosphère, mais il absorbe beaucoup plus d\'énergie solaire, est un polluant atmosphérique dangereux et ses fuites peuvent provoquer une explosion.', 1),
(6, 'L\'allemagne est le principal pays émetteur de gaz à effets de serre en europe, avec 810000 kilotonnes en 2019, soit presque le double du royaume-uni qui est deuxième, avec 453000kt.', 1),
(7, 'Top 5 des émetteurs dans le monde : Chine - US - Europe (combinée) - Inde - Russie', 1),
(8, 'Le transport représente 19,3% des émissions de gaz à effet de serre', 0),
(9, 'les émissions mondiales de gaz à effet de serre devront baisser à partir de 2025, sans quoi il sera impossible de limiter le réchauffement de la planète à 1,5°C', 1),
(10, 'En 2019, les émissions de l\'aviation et du transport maritime internationaux ont augmenté respectivement de 146 % et 34 % par rapport à 1990.', 1),
(11, 'La température moyenne terrestre a augmenté de 1,1°C entre 1850-1900 et 2010-2020', 1),
(12, '2021 est la sixième année la plus chaude de l\'histoire', 1),
(13, 'Si les émissions mondiales se maintiennent à leur niveau actuel, le réchauffement devrait avoir dépassé les 2°C en 2050. Et pire, si les émissions continuent d\'augmenter en suivant a tendance actuelle, la trajectoire mène à +4°C voire +5°C à l\'horizon 2100.', 1),
(14, 'Le niveau moyen de la mer : il s’est élevé de 20 cm entre 1901 et 2018. Ce rythme est plus rapide depuis 1900 qu’au cours de tous les autres siècles depuis 3000 ans.', 1),
(15, '1/10 : Une personne sur dix dans le monde habite dans une zone menacée par la montée des eaux.', 1),
(16, '1 : L’élévation d’UN seul mètre du niveau des mers pourrait recouvrir en France 355 km d’autoroutes, 198 km de nationales, 4338 km de départementales et 1967 km de voies ferrées.', 1),
(17, 'Depuis les années 1960, le manteau neigeux s\'est réduit en moyenne de 11,7 % par décennie dans l\'hémisphère nord.', 1),
(18, 'Le sixième rapport du GIEC (2021) montre que les vagues de froid ont été atténuées tandis que les vagues de chaleur et les fortes précipitations sont devenues plus fréquentes et plus intenses.', 1),
(19, 'L’Europe devra atteindre l’objectif de zéro émissions nette de gaz à effet de serre d’ici à 2035, pour être cohérente avec l’accord de Paris.', 0),
(20, 'La France est au 17ème rang de la fiscalité environnementale au sein de l’Union européenne', 0),
(21, '63 sites industriels qui représentent à eux seuls 10 % des émissions françaises', 0),
(22, '60 ans : c’est la durée de vie moyenne d’un équipement industriel\r\n', 0),
(23, '55% des Français attendent une action forte de la région pour le climat au cours du prochain mandat', 0),
(24, 'L’alimentation représente 15 % des émissions de gaz à effet de serre de l’empreinte des Français', 0),
(25, 'La facture énergétique des ménages pour le logement en 2015 était en moyenne de 1 265 euros.', 0),
(26, 'Pour respecter les objectifs signés lors de la COP21, il faut laisser 60% des ressources d’énergies fossiles (pétrole, charbon et gaz) dans le sol.', 0),
(27, 'En Europe, au moins 45 % de l’énergie pourrait être fournie par les énergies renouvelables d’ici à 2040.', 0),
(28, 'Il y a une taxe énergétique et une TVA sur le kérosène du transport aérien.', 0),
(29, '', 0),
(30, '', 0),
(31, '', 0),
(32, '', 0),
(33, '', 0),
(34, '', 0),
(35, '', 0),
(36, '', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `1`
--
ALTER TABLE `1`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `1`
--
ALTER TABLE `1`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
