-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 25, 2020 at 03:18 PM
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

INSERT INTO `conflict` (`id`, `name`, `description`, `avatar_url`, `create_date`, `organization_a_id`, `organization_b_id`, `creator_user_id`) VALUES
(2, 'Politics Schmolitics', 'get reeeeLY HIGH so high I used Brackets recently and it opens like 10x faster than Atom and as far as I know it’s based on the same technology. Why is atom so much slower?', 'https://images.unsplash.com/photo-1506886009355-7f3af05dd5d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', '2020-09-21 16:17:02', 2, 1, 56),
(3, 'Battle of Sexes', 'Girls and boys', 'https://images.unsplash.com/photo-1528827383711-2f6b2f082585?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', '2020-09-18 01:43:08', 5, 6, 56);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `debate`
--

INSERT INTO `debate` (`id`, `title`, `create_date`, `creator_user_id`, `creator_organization_id`, `conflict_id`, `avatar_url`, `description`) VALUES
(1, 'asdfefe', '2020-09-20 15:26:41', 56, 1, 2, 'https://images.unsplash.com/photo-1600353067991-86d7d0463cc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80', 'fdsfasdfsd dsfdsfdsfds'),
(2, 'fe4awfwef', '2020-09-20 15:31:46', 56, 1, 2, 'https://images.unsplash.com/photo-1588931127871-5fc283f8dff0?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', 'faewf'),
(3, 'Meat is murder.', '2020-09-24 13:43:12', 56, 1, 2, 'https://images.unsplash.com/photo-1600537779335-49c6cd6a4011?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'dude. Meat want to love it, but it’s not just about performance being of supreme importance… it’s about performance being at a reasonable level rather than being sluggish and creating an overall frustrating experience. When scrolling slowly on a page with under 200 lines of code the selection should not lag.\n\nAnd I don’t know about the “official” stance on the editor, but everyone is trying to sell it as a Sublime replacement. And the extension system does seem far superior to Sublime’s. But the editor just isn’t usable to me right now.\n\nI hope this has more to do with the Linux version or my system than Atom’s architecture in general.'),
(4, 'ff', '2020-09-21 09:18:06', 56, 1, 2, 'https://images.unsplash.com/photo-1600537779335-49c6cd6a4011?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'ff'),
(5, 'fs', '2020-09-21 15:52:50', 56, 1, 2, '', 'ssss'),
(6, 'fasd', '2020-09-22 10:52:50', 56, 1, 2, 'https://images.unsplash.com/photo-1575633430141-49ebb43ee784?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'asdfasdf'),
(7, '333333333333333', '2020-09-22 10:51:36', 56, 1, 2, 'https://images.unsplash.com/photo-1600631967671-dd7408417c13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'fsdf'),
(8, '555555555555', '2020-09-21 15:54:19', 56, 1, 2, '', '5y5'),
(9, 'ffefef', '2020-09-25 19:32:10', 56, 5, 3, 'https://images.unsplash.com/photo-1559582780-7d1e87314ce9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'dfdsf');

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `debate_comment`
--

INSERT INTO `debate_comment` (`id`, `text`, `create_date`, `creator_user_id`, `debate_id`, `parent_comment_id`) VALUES
(5, 'Yeah, I’m already kind of doing this but I’m no expert in node.js and javascript stuff, just wanted to know if anybody cares about this. I’m currently a little stuck at making atom-shell work with atom, simply dragging atom folder onto the shelll didn’t work for some reason ', '2020-09-21 17:20:35', 11, 3, NULL),
(6, 'We absolutely care. Some are bothered by the startup time more than others, of course. But we are all here because we want to see Atom succeed :grinning:\r\n\r\nI’m currently a little stuck at making atom-shell work with atom\r\n\r\nI’m confused by this part of your post though, Atom already includes atom-shell within it. There isn’t any need to try to put them together, to my knowledge. Or am I missing something?', '2020-09-21 17:20:35', 45, 3, NULL),
(7, 'Creation hooks are the very first hooks that run in your component. They allow you to perform actions before your component has even been added to the DOM. Unlike any of the other hooks, creation hooks are also run during server-side rendering.', '2020-09-21 18:06:39', 30, 3, 5),
(8, 'In my opinion, they didn’t intend to compete directly with either. The major benefits to Atom, in my eyes, are:\r\n\r\n    You can theme and style it using CSS/LESS\r\n        Experts already exist\r\n        Animations are possible without having to create a special API\r\n    You can extend it by writing packages using CoffeeScript/JavaScript\r\n        Experts already exist\r\n        Very low barrier to entry\r\n        Testing frameworks already exist to help people write high-quality extensions\r\n    Large bodies of libraries already exist in the form of npm packages\r\n        This gives both Atom and extension writers a big boost in productivity\r\n        Growing all the time … and probably faster than non-extension libraries of code for other editors\r\n    Integrated Debugging tools\r\n    And more I’m sure …\r\n', '2020-09-22 05:55:59', 56, 3, 0),
(12, 'Watch the part where I’m selecting slowly around the :04 mark. Can you see where my mouse is? The selection gets to be literally 15 lines behind my mouse. When you’re quickly trying to make a selection with any sort of precision, it matters. When eclipse is better at this than a text editor, it hurts.', '2020-09-22 05:54:42', 56, 3, 0),
(22, 'fee3er', '2020-09-22 15:41:26', 56, 7, 0),
(23, 'dsafasdfsd', '2020-09-24 04:53:58', 56, 6, 0),
(24, 'sfs', '2020-09-24 05:13:22', 56, 6, 23),
(28, 'fsss', '2020-09-24 18:42:21', 56, 3, 8),
(29, 'fsssfd', '2020-09-24 18:42:26', 56, 3, 8),
(30, 'vdvddas', '2020-09-25 19:32:23', 56, 9, 0),
(31, '33rr3', '2020-09-25 19:32:33', 56, 9, 0),
(32, 'fefaa', '2020-09-25 19:32:48', 56, 9, 30),
(33, 'fdddfd', '2020-09-25 19:41:05', 56, 9, 30),
(34, 'fe3awf', '2020-09-25 19:41:52', 56, 9, 30),
(35, 'mr grinch', '2020-09-25 19:42:05', 56, 9, 30);

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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `debate_comment_like`
--

INSERT INTO `debate_comment_like` (`id`, `organization_id`, `creator_user_id`, `debate_comment_id`, `create_date`, `liked`) VALUES
(50, 1, 56, 5, '2020-09-22 10:27:23', 0),
(51, 1, 56, 22, '2020-09-23 00:23:54', 1),
(52, 1, 56, 23, '2020-09-24 17:23:53', 1),
(53, 1, 56, 28, '2020-09-24 18:42:56', 1),
(54, 1, 56, 8, '2020-09-24 18:42:59', 1),
(55, 5, 56, 30, '2020-09-25 19:32:42', 1);

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

INSERT INTO `grievance` (`id`, `title`, `description`, `conflict_id`, `organization_id`, `creator_user_id`, `create_date`, `creator_organization_id`) VALUES
(29, 'f sdfsdfsdfvf sdfsdfsdff sdfsdfsdf', 'f sdfsdfsdff sdfsdfsdff sdfsdfsdff sdfsdfsdff sdfsdfsdff sdfsdfsdff sdfsdfsdff sdfsdfsdff sdfsdfsdff sdfsdfsdf', 2, 1, 56, '2020-09-14 00:00:00', 1),
(30, 'csc', 'scsc', 2, 1, 56, '2020-09-17 03:47:44', 1),
(31, 'afds', 'fadsf', 3, 5, 56, '2020-09-18 01:28:45', 5),
(32, 'fsdf', 'sdf', 2, 1, 56, '2020-09-21 09:31:12', 1),
(33, 'fsf', 'sf', 2, 2, 56, '2020-09-22 18:15:02', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grievance_comment`
--

INSERT INTO `grievance_comment` (`id`, `text`, `creator_user_id`, `grievance_id`, `create_date`) VALUES
(26, 'ffffd', 56, 32, '2020-09-24 18:26:36');

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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grievance_like`
--

INSERT INTO `grievance_like` (`id`, `organization_id`, `creator_user_id`, `grievance_id`, `create_date`, `liked`) VALUES
(31, 1, 56, 32, '2020-09-24 18:34:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

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

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`id`, `title`, `description`, `conflict_id`, `organization_id`, `creator_user_id`, `create_date`, `creator_organization_id`) VALUES
(13, 'fadsfr3r', 'fsr3r', 2, 2, 56, '2020-09-17 04:12:14', 1),
(14, 'ytut', 'utyutyu', 3, 6, 56, '2020-09-18 04:23:13', 5),
(15, 'fasdf', 'sdf', 2, 1, 56, '2020-09-20 10:54:28', 1),
(16, 'fsfs', 'fssf', 2, 1, 56, '2020-09-22 18:02:05', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

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

--
-- Dumping data for table `offer_like`
--

INSERT INTO `offer_like` (`id`, `organization_id`, `creator_user_id`, `offer_id`, `create_date`, `liked`) VALUES
(10, 2, 56, 13, '2020-09-17 09:14:17', 1),
(11, 2, 56, 13, '2020-09-17 09:14:17', 1),
(12, 1, 56, 15, '2020-09-21 15:13:30', 1),
(13, 1, 56, 15, '2020-09-21 15:13:32', 0),
(14, 1, 56, 16, '2020-09-22 23:20:23', 1),
(15, 1, 56, 16, '2020-09-23 00:08:38', 0),
(16, 2, 56, 16, '2020-09-23 00:08:40', 0),
(17, 2, 56, 16, '2020-09-23 00:09:32', 0),
(18, 2, 56, 16, '2020-09-23 00:10:51', 0),
(19, 1, 56, 16, '2020-09-23 00:12:08', 0),
(20, 1, 56, 16, '2020-09-23 00:12:08', 0),
(21, 1, 56, 16, '2020-09-23 00:12:09', 1),
(22, 2, 56, 16, '2020-09-23 00:12:40', 0),
(23, 1, 56, 16, '2020-09-23 00:13:02', 0),
(24, 1, 56, 16, '2020-09-23 00:13:03', 1),
(25, 1, 56, 16, '2020-09-23 00:18:01', 0),
(26, 2, 56, 16, '2020-09-23 00:18:03', 0),
(27, 1, 56, 16, '2020-09-23 00:18:23', 0),
(28, 1, 56, 16, '2020-09-23 00:18:40', 1),
(29, 1, 56, 15, '2020-09-23 00:22:45', 0),
(30, 1, 56, 13, '2020-09-23 00:22:54', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `provision_comment`
--

INSERT INTO `provision_comment` (`id`, `text`, `creator_user_id`, `provision_id`, `create_date`) VALUES
(25, 'ffffssss', 56, 31, '2020-09-24 06:12:56'),
(26, 'fffd', 56, 31, '2020-09-24 06:19:50');

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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `provision_like`
--

INSERT INTO `provision_like` (`id`, `organization_id`, `creator_user_id`, `provision_id`, `create_date`, `liked`) VALUES
(14, 5, 56, 29, '2020-09-24 04:18:43', 1),
(15, 5, 56, 29, '2020-09-24 04:18:47', 0),
(16, 5, 56, 29, '2020-09-24 04:21:07', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty`
--

INSERT INTO `treaty` (`id`, `name`, `description`, `creator_user_id`, `organization_id`, `conflict_id`, `avatar_url`, `status_id`, `create_date`) VALUES
(30, 'More sex please', 'Guys are horny and want to get laid.', 56, 5, 3, 'https://images.unsplash.com/photo-1473073957860-e6eb51b91b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80', 1, '2020-09-24 01:00:45'),
(31, 'dfgssd', 'fdfgdsfg', 56, 1, 2, 'https://images.unsplash.com/photo-1600766860074-111683014537?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 1, '2020-09-24 06:10:18'),
(32, 'adsf', 'sadfds', 56, 5, 3, 'https://images.unsplash.com/photo-1600872843246-d0ab6736bd4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 1, '2020-09-24 15:27:30'),
(33, 'dddgg', 'dg', 56, 1, 2, 'https://images.unsplash.com/photo-1600856268703-63e89b354c58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 1, '2020-09-24 15:33:20');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_comment`
--

INSERT INTO `treaty_comment` (`id`, `text`, `creator_user_id`, `treaty_id`, `create_date`) VALUES
(2, 'sdfsdf ', 56, 30, '2020-09-23 23:20:04'),
(3, 'fsadf', 56, 31, '2020-09-24 01:28:10'),
(4, 'fsdfs', 56, 33, '2020-09-24 10:52:35'),
(5, 'sss', 56, 33, '2020-09-24 12:02:23');

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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_comment_like`
--

INSERT INTO `treaty_comment_like` (`id`, `organization_id`, `creator_user_id`, `treaty_comment_id`, `create_date`, `liked`) VALUES
(52, NULL, 56, 4, '2020-09-24 17:01:44', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_provision`
--

INSERT INTO `treaty_provision` (`id`, `treaty_id`, `creator_user_id`, `create_date`, `status_id`, `title`, `description`, `position`) VALUES
(29, 30, 56, '2020-09-24 04:14:08', 1, 'dsaf sd', 'dsf ss', 0),
(30, 30, 56, '2020-09-24 04:15:08', 1, 'fsd', 'fsdss', 1),
(31, 31, 56, '2020-09-24 06:10:18', 1, 'saht srhs df', 'sadf', 0),
(32, 31, 56, '2020-09-24 06:10:18', 1, 'ht54 sdf', 'sdf', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `treaty_rating`
--

INSERT INTO `treaty_rating` (`id`, `create_date`, `creator_user_id`, `treaty_id`, `value`, `organization_id`) VALUES
(55, '2020-09-24 17:08:58', 56, 33, 5, 1),
(60, '2020-09-24 17:10:33', 56, 33, 1, 1),
(61, '2020-09-24 17:10:38', 56, 33, 1, 1),
(62, '2020-09-24 17:10:41', 56, 33, 1, 1),
(63, '2020-09-24 17:10:48', 56, 33, 1, 1),
(64, '2020-09-24 17:10:49', 56, 33, 1, 1),
(65, '2020-09-24 17:10:51', 56, 33, 1, 1),
(66, '2020-09-24 17:10:52', 56, 33, 1, 1),
(67, '2020-09-24 17:10:53', 56, 33, 1, 1);

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
(8, 'admin@concordant.io', 'adsf Baloney', 'Handsome man with hairy chest', '123456', 0, '2020-09-21 12:44:35', 'Houston', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80', '', 'https://images.unsplash.com/photo-1540464148-e306e5543db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80'),
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

--
-- Dumping data for table `user_comment`
--

INSERT INTO `user_comment` (`id`, `text`, `creator_user_id`, `user_id`, `create_date`) VALUES
(1, 'ssse', 56, 56, '2020-09-18 01:16:18'),
(2, 'sdfgrss', 56, 56, '2020-09-18 01:16:35'),
(3, 'https://www.youtube.com/watch?v=roY76m_oWps&ab_channel=BevelTGR', 56, 4, '2020-09-20 06:30:06'),
(4, 'fs', 56, 4, '2020-09-20 08:04:36'),
(5, 'https://www.youtube.com/watch?v=roY76m_oWps&ab_channel=BevelTGR', 56, 4, '2020-09-20 08:34:30'),
(6, 'https://www.youtube.com/watch?v=eR0KbN76viI&ab_channel=PokerStars', 56, 5, '2020-09-20 08:38:47'),
(7, 'fsfefe', 56, 5, '2020-09-20 08:39:05'),
(8, 'https://www.yofsutube.com/watch?v=roY76m_oWps&ab_channel=BevelTGR', 56, 5, '2020-09-20 08:45:52'),
(9, 'https://www.youtube.com/watch?v=roY76m_oWps&ab_channel=BevelTGR', 56, 5, '2020-09-20 08:45:58'),
(10, 'https://www.youtube.com/watch?v=roY76m_oWps&ab_channel=BevelTGR', 56, 56, '2020-09-20 08:47:48'),
(11, 'fdfd', 56, 1, '2020-09-24 01:17:03'),
(12, 'dfd', 56, 1, '2020-09-24 01:17:06'),
(13, 'ddd', 56, 1, '2020-09-24 01:17:09'),
(14, 'ffff', 56, 1, '2020-09-24 01:19:00'),
(15, 'adsf', 56, 1, '2020-09-24 01:19:10'),
(16, 'fas', 56, 1, '2020-09-24 01:19:13'),
(17, 'ssss', 56, 1, '2020-09-24 01:19:16'),
(18, 'ahhbad', 56, 1, '2020-09-24 01:19:24');

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

--
-- Dumping data for table `user_comment_like`
--

INSERT INTO `user_comment_like` (`id`, `creator_user_id`, `user_comment_id`, `create_date`, `liked`) VALUES
(53, 56, 18, '2020-09-24 07:55:02', 1);

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

--
-- Dumping data for table `user_message`
--

INSERT INTO `user_message` (`id`, `text`, `creator_user_id`, `user_id`, `create_date`, `status`) VALUES
(25, 'fsdfs', 56, 6, '2020-09-18 09:03:10', 1),
(26, 'sadfadsf asdf', 56, 56, '2020-09-20 09:03:44', 1),
(28, 'This object defines two properties: page-item and active. Notably, these are the names of the two CSS classes discussed in Step 1. In Step 2, these two class references have become property names in a JavaScript object. The values associated with these property names are JavaScript expressions. If the expression evaluates as truthy, the CSS class will be included. If the expression evaluates to false, the CSS class will not be included. With these rules in mind, let’s look at each property.\r\n\r\nThe first property, page-item, has a value of true. This hard-coded value is used because we always want to include the page-item class. The second property, active, uses a JavaScript expression. When this expression is true, the active class will be applied. This empowers us to conditionally apply the active class based on the value of currentPage. Another way to conditionally apply the active class is by binding to an Array.\r\nBinding using array syntax\r\n\r\nVue lets you apply a list of CSS classes by binding to an Array. If you wanted to use the Array syntax, the HTML shown in Step 1 would become this:', 56, 56, '2020-09-20 09:03:44', 1),
(29, '\'dsaf efaewf\'', 56, 56, '2020-09-21 14:19:59', 1),
(30, '\'fsd\'', 56, 56, '2020-09-20 09:03:44', 1),
(31, '\'this is a new message for rel\'', 56, 56, '2020-09-21 14:19:59', 1),
(32, '\'asdf\'', 56, 56, '2020-09-23 23:52:52', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_to_organization`
--

INSERT INTO `user_to_organization` (`id`, `creator_user_id`, `organization_id`, `create_date`) VALUES
(14, 4, 5, '2020-09-09 21:24:25'),
(22, 6, 2, '2020-07-14 00:00:00'),
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vote`
--

INSERT INTO `vote` (`id`, `creator_user_id`, `treaty_id`, `organization_id`, `vote_type`, `create_date`) VALUES
(25, 56, 30, 5, 1, '2020-09-24 01:02:45'),
(26, 56, 30, 5, 0, '2020-09-24 01:14:21'),
(27, 56, 30, 5, 1, '2020-09-24 01:31:19'),
(28, 56, 30, 5, 1, '2020-09-24 01:36:57'),
(29, 56, 30, 5, 0, '2020-09-24 01:38:26'),
(30, 56, 30, 5, 0, '2020-09-24 04:18:52'),
(31, 56, 30, 5, 0, '2020-09-24 04:41:33'),
(32, 56, 33, 1, 1, '2020-09-24 15:52:25'),
(33, 56, 33, 1, 1, '2020-09-24 17:02:29'),
(34, 56, 33, 1, 0, '2020-09-24 17:07:34'),
(35, 56, 33, 1, 0, '2020-09-24 17:10:58'),
(36, 56, 33, 1, 0, '2020-09-24 17:11:10'),
(37, 56, 33, 1, 0, '2020-09-24 17:12:47');

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
