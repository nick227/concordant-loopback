-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 15, 2020 at 08:27 AM
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
-- Table structure for table `grievance`
--

DROP TABLE IF EXISTS `grievance`;
CREATE TABLE IF NOT EXISTS `grievance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `treaty_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `creator_organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_id` (`organization_id`),
  KEY `treaty_id` (`treaty_id`),
  KEY `user_organization_id` (`creator_organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

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
  `liked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`organization_id`,`creator_user_id`,`grievance_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `grievance_id` (`grievance_id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
CREATE TABLE IF NOT EXISTS `offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `treaty_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `creator_organization_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_id` (`organization_id`),
  KEY `treaty_id` (`treaty_id`),
  KEY `creator_organization_id` (`creator_organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

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
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `offer_id` (`offer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`name`, `description`, `avatar_url`, `id`, `creator_user_id`, `create_date`) VALUES
('liberals', 'lefties bros and gals', 'https://images.unsplash.com/photo-1599046275743-0bad6f894738?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 1, 1, '2020-09-09 21:23:49'),
('conservatives', 'right wingers', 'https://images.unsplash.com/photo-1566315364780-c1789668ca6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=996&q=80', 2, 1, '2020-09-09 21:23:49'),
('Men', 'dude yo', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 5, 1, '2020-09-09 21:23:49'),
('Women', 'ladies night', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 6, 1, '2020-09-09 21:23:49'),
('POTHEADS', 'ja mon', 'https://images.unsplash.com/photo-1589141986943-5578615fdef2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 8, 4, '2020-09-09 21:26:22'),
('Sock People', 'go on our feet', 'https://images.unsplash.com/photo-1599653813516-a0507ec80916?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 9, 4, '2020-09-10 10:34:53'),
('Artists', 'Neato', 'https://images.unsplash.com/photo-1599427724440-3df71e59541e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80', 10, 4, '2020-09-10 10:36:56');

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
  `organization_a_id` int(11) NOT NULL,
  `organization_b_id` int(11) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `status` varchar(12) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `organization_a_id` (`organization_a_id`),
  KEY `organization_b_id` (`organization_b_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty`
--

INSERT INTO `treaty` (`id`, `name`, `description`, `creator_user_id`, `organization_a_id`, `organization_b_id`, `avatar_url`, `status`, `create_date`) VALUES
(1, 'American politics', 'chill libs and cons', 1, 1, 2, 'https://images.unsplash.com/photo-1460342892743-8889b6be3a99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1346&q=80', 'pending', '2020-09-09 22:27:52'),
(2, 'Men and Women', 'ladies and dudes okay Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 5, 6, 'https://images.unsplash.com/photo-1548716188-9b0867f0d1c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'pending', '2020-09-12 09:41:16'),
(3, 'haha', 'sss', 1, 1, 2, 'https://images.unsplash.com/photo-1599305364596-d6f633f8342a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80', 'eee', '2020-09-09 22:27:52'),
(5, 'test 3', 'teae', 4, 1, 8, 'https://images.unsplash.com/photo-1599664061973-23e9ba37bf8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'pending', '2020-09-10 06:54:23'),
(6, 'adsf', 'dsaf', 4, 9, 8, 'https://images.unsplash.com/photo-1599427724440-3df71e59541e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80', 'pending', '2020-09-10 10:39:43'),
(7, 'zebras', 'moo', 4, 9, 6, 'https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=835&q=80', 'pending', '2020-09-10 10:42:27'),
(8, 'Necklacesdsdf', 'neat', 4, 9, 8, 'https://images.unsplash.com/photo-1599525085632-c07e0a545b3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80', 'pending', '2020-09-12 08:28:12'),
(9, '23r3rr', 'sf', 4, 10, 5, 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80', 'pending', '2020-09-12 08:34:32');

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
  `media_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `treaty_id` (`treaty_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_rating`
--

INSERT INTO `treaty_rating` (`id`, `create_date`, `creator_user_id`, `treaty_id`, `value`, `organization_id`) VALUES
(2, '2020-09-14 12:02:38', 4, 2, 2, 5),
(3, '2020-09-14 12:03:10', 4, 2, 5, 5),
(4, '2020-09-14 12:20:39', 4, 2, 3, 5),
(5, '2020-09-14 13:18:48', 4, 2, 4, 5),
(6, '2020-09-14 13:19:14', 4, 2, 1, 5),
(7, '2020-09-14 13:19:50', 4, 2, 1, 5),
(8, '2020-09-15 05:13:21', 56, 1, 4, 1),
(9, '2020-09-15 10:31:15', 56, 1, 3, 1),
(10, '2020-09-15 10:31:47', 56, 1, 1, 1),
(11, '2020-09-15 10:32:11', 56, 1, 5, 1),
(12, '2020-09-15 10:32:57', 56, 1, 4, 1),
(13, '2020-09-15 10:34:39', 56, 1, 1, 1);

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

INSERT INTO `user` (`id`, `email`, `name`, `biography`, `password`, `type_id`, `create_date`, `location`, `avatar_url`, `facebook_uuid`, `profile_background_url`) VALUES
(1, '', 'Bob Baloney', '\nWe\'re taking a trip back in time to make you relive some exclusive moments of the PokerStars Big Game! This means: big names, big pots and big egos. Big Game is the next generation of high stakes cash poker and we\'ve got some exclusive throwbacks for you, featuring Daniel Negreanu, Phil Laak, Doyle Brunson, Barry Greenstein and many more pro poker players. With 5 top pros (who buy themselves in for $100,000) and one Loose Cannon, anything can happen…Check out some amazing bluffs and epic poker hands, see how a Loose Cannon takes on pro poker players and watch some CRAZY poker games. ', '', 0, '2020-09-12 10:21:56', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', 'https://images.unsplash.com/photo-1599813391721-ed8c5fe98166?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1409&q=80'),
(2, 'nick@ni.net', 'Nick', 'afe aff  aef', '123', 0, '2020-09-01 23:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(4, 'nick@nik.net', 'Nick Rios', 'I am neat', '', 0, '2020-09-13 21:14:01', 'Austin', 'https://images.unsplash.com/photo-1573048104623-271ad5635bff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', '', 'https://i.imgur.com/bapIo7v.jpg'),
(5, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(6, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(8, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(9, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(11, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(12, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(14, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(15, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(17, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(18, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(20, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(21, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(23, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(24, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(26, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(27, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(29, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(30, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(32, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(33, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(35, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(36, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(38, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(39, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(41, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(42, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(44, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(45, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(47, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(48, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(50, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(51, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(53, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-02 04:51:45', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', ''),
(54, 'nick@ni.net', 'fvadsv', 'afe aff  aef', '123', 0, '2020-09-02 04:51:45', 'Austin', 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', '', ''),
(56, 'neee@way.net', 'Neee', 'The Flexbox Layout (Flexible Box) module (currently a W3C Last Call Working Draft) aims at providing a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word “flex”).', '', NULL, '2020-09-15 05:50:30', 'Austin', 'https://images.unsplash.com/photo-1599939176529-ab6722abc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', '10158432748220049', 'https://images.unsplash.com/photo-1584285394314-9ba41fbe1dd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1261&q=80');

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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_to_organization`
--

INSERT INTO `user_to_organization` (`id`, `creator_user_id`, `organization_id`, `create_date`) VALUES
(14, 4, 5, '2020-09-09 21:24:25'),
(22, 6, 2, '2020-07-14 00:00:00'),
(42, 56, 10, '2020-09-14 09:36:48'),
(44, 56, 1, '2020-09-15 00:11:17'),
(45, 56, 5, '2020-09-15 07:05:50');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vote`
--

INSERT INTO `vote` (`id`, `creator_user_id`, `treaty_id`, `organization_id`, `vote_type`, `create_date`) VALUES
(7, 4, 2, 5, 1, '2020-09-14 06:33:24'),
(8, 4, 2, 5, 0, '2020-09-14 06:54:28'),
(9, 4, 2, 5, 0, '2020-09-14 08:02:38'),
(10, 4, 2, 5, 0, '2020-09-14 13:18:41');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grievance`
--
ALTER TABLE `grievance`
  ADD CONSTRAINT `grievance_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `grievance_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`),
  ADD CONSTRAINT `grievance_ibfk_3` FOREIGN KEY (`treaty_id`) REFERENCES `treaty` (`id`),
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
  ADD CONSTRAINT `offer_ibfk_3` FOREIGN KEY (`treaty_id`) REFERENCES `treaty` (`id`),
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
-- Constraints for table `treaty`
--
ALTER TABLE `treaty`
  ADD CONSTRAINT `treaty_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `treaty_ibfk_2` FOREIGN KEY (`organization_a_id`) REFERENCES `organization` (`id`),
  ADD CONSTRAINT `treaty_ibfk_3` FOREIGN KEY (`organization_b_id`) REFERENCES `organization` (`id`);

--
-- Constraints for table `treaty_comment`
--
ALTER TABLE `treaty_comment`
  ADD CONSTRAINT `treaty_comment_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `treaty_comment_ibfk_2` FOREIGN KEY (`treaty_id`) REFERENCES `treaty` (`id`);

--
-- Constraints for table `treaty_rating`
--
ALTER TABLE `treaty_rating`
  ADD CONSTRAINT `treaty_rating_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `treaty_rating_ibfk_2` FOREIGN KEY (`treaty_id`) REFERENCES `treaty` (`id`),
  ADD CONSTRAINT `treaty_rating_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

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
