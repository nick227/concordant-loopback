-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 22, 2020 at 07:24 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `concordant`
--

-- --------------------------------------------------------

--
-- Table structure for table `conflict`
--

DROP TABLE IF EXISTS `conflict`;
CREATE TABLE IF NOT EXISTS `conflict` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `organization_a_id` int(11) NOT NULL,
  `organization_b_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_a_id` (`organization_a_id`),
  KEY `organization_b_id` (`organization_b_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conflict`
--

-- --------------------------------------------------------

--
-- Table structure for table `debate`
--

DROP TABLE IF EXISTS `debate`;
CREATE TABLE IF NOT EXISTS `debate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creator_user_id` int(11) NOT NULL,
  `creator_organization_id` int(11) NOT NULL,
  `conflict_id` int(11) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `conflict_id` (`conflict_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `creator_organization_id` (`creator_organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `debate`
--

-- --------------------------------------------------------

--
-- Table structure for table `debate_comment`
--

DROP TABLE IF EXISTS `debate_comment`;
CREATE TABLE IF NOT EXISTS `debate_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creator_user_id` int(11) NOT NULL,
  `debate_id` int(11) NOT NULL,
  `parent_comment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `debate_id` (`debate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `debate_comment`
--

-- --------------------------------------------------------

--
-- Table structure for table `debate_comment_like`
--

DROP TABLE IF EXISTS `debate_comment_like`;
CREATE TABLE IF NOT EXISTS `debate_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `debate_comment_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`debate_comment_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `debate_comment_id` (`debate_comment_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `debate_comment_like`
--
-- --------------------------------------------------------

--
-- Table structure for table `grievance`
--

DROP TABLE IF EXISTS `grievance`;
CREATE TABLE IF NOT EXISTS `grievance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `conflict_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `creator_organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_id` (`organization_id`),
  KEY `user_organization_id` (`creator_organization_id`),
  KEY `grievance_ibfk_3` (`conflict_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grievance`
--
-- --------------------------------------------------------

--
-- Table structure for table `grievance_comment`
--

DROP TABLE IF EXISTS `grievance_comment`;
CREATE TABLE IF NOT EXISTS `grievance_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `grievance_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `grievance_id` (`grievance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grievance_comment`
--
-----------------------------------------------

--
-- Table structure for table `grievance_like`
--

DROP TABLE IF EXISTS `grievance_like`;
CREATE TABLE IF NOT EXISTS `grievance_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `grievance_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`grievance_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `grievance_id` (`grievance_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `offer`;
CREATE TABLE IF NOT EXISTS `offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `conflict_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `creator_organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_id` (`organization_id`),
  KEY `creator_organization_id` (`creator_organization_id`),
  KEY `offer_ibfk_3` (`conflict_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `offer_comment`;
CREATE TABLE IF NOT EXISTS `offer_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `offer_id` (`offer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `offer_like`;
CREATE TABLE IF NOT EXISTS `offer_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `offer_id` (`offer_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
CREATE TABLE IF NOT EXISTS `organization` (
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `avatar_url` varchar(200) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_user_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `creator_user_id` (`creator_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

-- --------------------------------------------------------

--
-- Table structure for table `provision_comment`
--

DROP TABLE IF EXISTS `provision_comment`;
CREATE TABLE IF NOT EXISTS `provision_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `provision_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `provision_id` (`provision_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `provision_comment`
--
-- --------------------------------------------------------

--
-- Table structure for table `provision_like`
--

DROP TABLE IF EXISTS `provision_like`;
CREATE TABLE IF NOT EXISTS `provision_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `provision_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`provision_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `provision_id` (`provision_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `provision_status`
--

DROP TABLE IF EXISTS `provision_status`;
CREATE TABLE IF NOT EXISTS `provision_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Table structure for table `treaty`
--

DROP TABLE IF EXISTS `treaty`;
CREATE TABLE IF NOT EXISTS `treaty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `conflict_id` int(11) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `status_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_id` (`organization_id`),
  KEY `status_id` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty`
--

DROP TABLE IF EXISTS `treaty_comment`;
CREATE TABLE IF NOT EXISTS `treaty_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `treaty_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `treaty_id` (`treaty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_comment`
--

--
-- Table structure for table `treaty_provision`
--

DROP TABLE IF EXISTS `treaty_provision`;
CREATE TABLE IF NOT EXISTS `treaty_provision` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `treaty_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `position` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `treaty_id` (`treaty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_provision`
--

DROP TABLE IF EXISTS `treaty_rating`;
CREATE TABLE IF NOT EXISTS `treaty_rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creator_user_id` int(11) NOT NULL,
  `treaty_id` int(11) NOT NULL,
  `value` tinyint(4) NOT NULL,
  `organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `treaty_id` (`treaty_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_rating`
--

-- --------------------------------------------------------

--
-- Table structure for table `treaty_status`
--

DROP TABLE IF EXISTS `treaty_status`;
CREATE TABLE IF NOT EXISTS `treaty_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_status`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `biography` text NOT NULL,
  `password` char(32) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `location` varchar(255) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `facebook_uuid` varchar(17) NOT NULL,
  `profile_background_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--
-- --------------------------------------------------------

--
-- Table structure for table `user_comment`
--

DROP TABLE IF EXISTS `user_comment`;
CREATE TABLE IF NOT EXISTS `user_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_comment`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_message`
--

DROP TABLE IF EXISTS `user_message`;
CREATE TABLE IF NOT EXISTS `user_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_message`
--
-- --------------------------------------------------------

--
-- Table structure for table `user_to_organization`
--

DROP TABLE IF EXISTS `user_to_organization`;
CREATE TABLE IF NOT EXISTS `user_to_organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_user_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_to_organization`
--
-- --------------------------------------------------------

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
CREATE TABLE IF NOT EXISTS `vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_user_id` int(11) NOT NULL,
  `treaty_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `vote_type` tinyint(3) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `treaty_id` (`treaty_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vote`
--
--
-- Constraints for dumped tables
--

--
-- Constraints for table `conflict`
--
ALTER TABLE `conflict`
  ADD CONSTRAINT `conflict_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `conflict_ibfk_2` FOREIGN KEY (`organization_a_id`) REFERENCES `organization` (`id`),
  ADD CONSTRAINT `conflict_ibfk_3` FOREIGN KEY (`organization_b_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `debate`
--
ALTER TABLE `debate`
  ADD CONSTRAINT `debate_ibfk_1` FOREIGN KEY (`conflict_id`) REFERENCES `conflict` (`id`),
  ADD CONSTRAINT `debate_ibfk_2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `debate_ibfk_3` FOREIGN KEY (`creator_organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `debate_comment`
--
ALTER TABLE `debate_comment`
  ADD CONSTRAINT `debate_comment_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `debate_comment_ibfk_2` FOREIGN KEY (`debate_id`) REFERENCES `debate` (`id`);

--
-- Constraints for table `debate_comment_like`
--
ALTER TABLE `debate_comment_like`
  ADD CONSTRAINT `debate_comment_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `debate_comment_like_ibfk_2` FOREIGN KEY (`debate_comment_id`) REFERENCES `debate_comment` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `debate_comment_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION;

--
-- Constraints for table `grievance`
--
ALTER TABLE `grievance`
  ADD CONSTRAINT `grievance_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `grievance_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`),
  ADD CONSTRAINT `grievance_ibfk_3` FOREIGN KEY (`conflict_id`) REFERENCES `conflict` (`id`),
  ADD CONSTRAINT `grievance_ibfk_4` FOREIGN KEY (`creator_organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `grievance_comment`
--
ALTER TABLE `grievance_comment`
  ADD CONSTRAINT `grievance_comment_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `grievance_comment_ibfk_2` FOREIGN KEY (`grievance_id`) REFERENCES `grievance` (`id`);

--
-- Constraints for table `grievance_like`
--
ALTER TABLE `grievance_like`
  ADD CONSTRAINT `grievance_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `grievance_like_ibfk_2` FOREIGN KEY (`grievance_id`) REFERENCES `grievance` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `grievance_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION;

--
-- Constraints for table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `offer_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `offer_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`),
  ADD CONSTRAINT `offer_ibfk_3` FOREIGN KEY (`conflict_id`) REFERENCES `conflict` (`id`),
  ADD CONSTRAINT `offer_ibfk_4` FOREIGN KEY (`creator_organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `offer_comment`
--
ALTER TABLE `offer_comment`
  ADD CONSTRAINT `offer_comment_ibfk_1` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`id`);

--
-- Constraints for table `offer_like`
--
ALTER TABLE `offer_like`
  ADD CONSTRAINT `offer_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `offer_like_ibfk_2` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`id`),
  ADD CONSTRAINT `offer_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `organization`
--
ALTER TABLE `organization`
  ADD CONSTRAINT `organization_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `provision_comment`
--
ALTER TABLE `provision_comment`
  ADD CONSTRAINT `provision_comment_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `provision_comment_ibfk_2` FOREIGN KEY (`provision_id`) REFERENCES `treaty_provision` (`id`);

--
-- Constraints for table `provision_like`
--
ALTER TABLE `provision_like`
  ADD CONSTRAINT `provision_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `provision_like_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`),
  ADD CONSTRAINT `provision_like_ibfk_3` FOREIGN KEY (`provision_id`) REFERENCES `treaty_provision` (`id`);

--
-- Constraints for table `treaty`
--
ALTER TABLE `treaty`
  ADD CONSTRAINT `treaty_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `treaty_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`),
  ADD CONSTRAINT `treaty_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `treaty_status` (`id`);

--
-- Constraints for table `treaty_comment`
--
ALTER TABLE `treaty_comment`
  ADD CONSTRAINT `treaty_comment_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `treaty_comment_ibfk_2` FOREIGN KEY (`treaty_id`) REFERENCES `treaty` (`id`);

--
-- Constraints for table `treaty_provision`
--
ALTER TABLE `treaty_provision`
  ADD CONSTRAINT `treaty_provision_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `treaty_provision_ibfk_2` FOREIGN KEY (`treaty_id`) REFERENCES `treaty` (`id`);

--
-- Constraints for table `treaty_rating`
--
ALTER TABLE `treaty_rating`
  ADD CONSTRAINT `treaty_rating_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `treaty_rating_ibfk_2` FOREIGN KEY (`treaty_id`) REFERENCES `treaty` (`id`),
  ADD CONSTRAINT `treaty_rating_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `user_comment`
--
ALTER TABLE `user_comment`
  ADD CONSTRAINT `user_comment_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_message`
--
ALTER TABLE `user_message`
  ADD CONSTRAINT `user_message_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_message_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_to_organization`
--
ALTER TABLE `user_to_organization`
  ADD CONSTRAINT `user_to_organization_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_to_organization_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `vote`
--
ALTER TABLE `vote`
  ADD CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `vote_ibfk_2` FOREIGN KEY (`treaty_id`) REFERENCES `treaty` (`id`),
  ADD CONSTRAINT `vote_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
