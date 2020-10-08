-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 03, 2020 at 04:23 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET foreign_key_checks = 0;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `concordant2`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creator_user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity_comment`
--

DROP TABLE IF EXISTS `activity_comment`;
CREATE TABLE IF NOT EXISTS `activity_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `activity_id` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity_comment_like`
--

DROP TABLE IF EXISTS `activity_comment_like`;
CREATE TABLE IF NOT EXISTS `activity_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_user_id` int(11) NOT NULL,
  `activity_comment_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`creator_user_id`,`activity_comment_id`) USING BTREE,
  KEY `creator_user_id` (`creator_user_id`),
  KEY `activity_comment_id` (`activity_comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity_emotion`
--

DROP TABLE IF EXISTS `activity_emotion`;
CREATE TABLE IF NOT EXISTS `activity_emotion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(22) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `activity_id` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity_like`
--

DROP TABLE IF EXISTS `activity_like`;
CREATE TABLE IF NOT EXISTS `activity_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `activity_id` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `grievance`
--

DROP TABLE IF EXISTS `grievance`;
CREATE TABLE IF NOT EXISTS `grievance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `grievance_comment_like`
--

DROP TABLE IF EXISTS `grievance_comment_like`;
CREATE TABLE IF NOT EXISTS `grievance_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `grievance_comment_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`grievance_comment_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `grievance_comment_id` (`grievance_comment_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

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
  `liked` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `grievance_id` (`grievance_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `id` varchar(120) NOT NULL,
  `realm` varchar(12) DEFAULT NULL,
  `username` varchar(12) DEFAULT NULL,
  `email` varchar(12) NOT NULL,
  `emailVerified` tinyint(4) DEFAULT NULL,
  `verificationToken` varchar(25) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
CREATE TABLE IF NOT EXISTS `offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offer_comment`
--

DROP TABLE IF EXISTS `offer_comment`;
CREATE TABLE IF NOT EXISTS `offer_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `offer_id` (`offer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offer_comment_like`
--

DROP TABLE IF EXISTS `offer_comment_like`;
CREATE TABLE IF NOT EXISTS `offer_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `offer_comment_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`offer_comment_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `offer_comment_id` (`offer_comment_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offer_like`
--

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

-- --------------------------------------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `organization_comment`
--

DROP TABLE IF EXISTS `organization_comment`;
CREATE TABLE IF NOT EXISTS `organization_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `organization_comment_like`
--

DROP TABLE IF EXISTS `organization_comment_like`;
CREATE TABLE IF NOT EXISTS `organization_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `organization_comment_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`organization_comment_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_comment_id` (`organization_comment_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `provision_comment_like`
--

DROP TABLE IF EXISTS `provision_comment_like`;
CREATE TABLE IF NOT EXISTS `provision_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `provision_comment_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`provision_comment_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `provision_comment_id` (`provision_comment_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

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
-- Dumping data for table `provision_status`
--

INSERT INTO `provision_status` (`id`, `name`) VALUES
(1, 'proposal'),
(2, 'pending'),
(3, 'approved');

-- --------------------------------------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `treaty_comment`
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `treaty_comment_like`
--

DROP TABLE IF EXISTS `treaty_comment_like`;
CREATE TABLE IF NOT EXISTS `treaty_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) DEFAULT NULL,
  `creator_user_id` int(11) NOT NULL,
  `treaty_comment_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`treaty_comment_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `treaty_comment_id` (`treaty_comment_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `treaty_rating`
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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

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

INSERT INTO `treaty_status` (`id`, `name`) VALUES
(1, 'proposal'),
(2, 'pending'),
(3, 'accepted'),
(4, 'conflicted');

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
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `location` varchar(255) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `facebook_uuid` varchar(17) NOT NULL,
  `profile_background_url` varchar(255) NOT NULL,
  `type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `biography`, `password`, `create_date`, `location`, `avatar_url`, `facebook_uuid`, `profile_background_url`, `type_id`) VALUES
(56, 'neee@way.net', 'Neee', 'The Flexbox Layout (Flexible Box) module (currently a W3C Last Call Working Draft) aims at providing a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word “flex”).', '', '2020-09-15 05:50:30', 'Austin', 'https://images.unsplash.com/photo-1599939176529-ab6722abc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', '10158432748220049', 'https://images.unsplash.com/photo-1584285394314-9ba41fbe1dd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1261&q=80', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usercredentials`
--

DROP TABLE IF EXISTS `usercredentials`;
CREATE TABLE IF NOT EXISTS `usercredentials` (
  `id` varchar(32) NOT NULL,
  `password` varchar(60) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_comment_like`
--

DROP TABLE IF EXISTS `user_comment_like`;
CREATE TABLE IF NOT EXISTS `user_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_user_id` int(11) NOT NULL,
  `user_comment_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `user_comment_id` (`user_comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_comment`
--
ALTER TABLE `activity_comment`
  ADD CONSTRAINT `activity_comment_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

--
-- Constraints for table `activity_comment_like`
--
ALTER TABLE `activity_comment_like`
  ADD CONSTRAINT `activity_comment_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `activity_comment_like_ibfk_2` FOREIGN KEY (`activity_comment_id`) REFERENCES `activity_comment` (`id`) ON DELETE NO ACTION;

--
-- Constraints for table `activity_emotion`
--
ALTER TABLE `activity_emotion`
  ADD CONSTRAINT `activity_emotion_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `activity_emotion_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

--
-- Constraints for table `activity_like`
--
ALTER TABLE `activity_like`
  ADD CONSTRAINT `activity_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `activity_like_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

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
-- Constraints for table `grievance_comment_like`
--
ALTER TABLE `grievance_comment_like`
  ADD CONSTRAINT `grievance_comment_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `grievance_comment_like_ibfk_2` FOREIGN KEY (`grievance_comment_id`) REFERENCES `grievance_comment` (`id`),
  ADD CONSTRAINT `grievance_comment_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `grievance_like`
--
ALTER TABLE `grievance_like`
  ADD CONSTRAINT `grievance_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `grievance_like_ibfk_2` FOREIGN KEY (`grievance_id`) REFERENCES `grievance` (`id`),
  ADD CONSTRAINT `grievance_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

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
-- Constraints for table `offer_comment_like`
--
ALTER TABLE `offer_comment_like`
  ADD CONSTRAINT `offer_comment_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `offer_comment_like_ibfk_2` FOREIGN KEY (`offer_comment_id`) REFERENCES `offer_comment` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `offer_comment_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION;

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
-- Constraints for table `organization_comment`
--
ALTER TABLE `organization_comment`
  ADD CONSTRAINT `organization_comment_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `organization_comment_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `organization_comment_like`
--
ALTER TABLE `organization_comment_like`
  ADD CONSTRAINT `organization_comment_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `organization_comment_like_ibfk_2` FOREIGN KEY (`organization_comment_id`) REFERENCES `organization_comment` (`id`),
  ADD CONSTRAINT `organization_comment_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `provision_comment`
--
ALTER TABLE `provision_comment`
  ADD CONSTRAINT `provision_comment_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `provision_comment_ibfk_2` FOREIGN KEY (`provision_id`) REFERENCES `treaty_provision` (`id`);

--
-- Constraints for table `provision_comment_like`
--
ALTER TABLE `provision_comment_like`
  ADD CONSTRAINT `provision_comment_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `provision_comment_like_ibfk_2` FOREIGN KEY (`provision_comment_id`) REFERENCES `provision_comment` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `provision_comment_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION;

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
-- Constraints for table `treaty_comment_like`
--
ALTER TABLE `treaty_comment_like`
  ADD CONSTRAINT `treaty_comment_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `treaty_comment_like_ibfk_2` FOREIGN KEY (`treaty_comment_id`) REFERENCES `treaty_comment` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `treaty_comment_like_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION;

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
-- Constraints for table `user_comment_like`
--
ALTER TABLE `user_comment_like`
  ADD CONSTRAINT `user_comment_like_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `user_comment_like_ibfk_2` FOREIGN KEY (`user_comment_id`) REFERENCES `user_comment` (`id`) ON DELETE NO ACTION;

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
SET foreign_key_checks = 1;