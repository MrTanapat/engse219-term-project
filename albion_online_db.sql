-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2025 at 12:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `albion_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `characterequip`
--

CREATE TABLE `characterequip` (
  `char_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `slot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `characterequip`
--

INSERT INTO `characterequip` (`char_id`, `item_id`, `slot_id`) VALUES
(1, 1, 1),
(10, 1, 1),
(2, 2, 1),
(9, 3, 1),
(3, 4, 1),
(5, 5, 1),
(1, 9, 3),
(2, 16, 5),
(4, 19, 1),
(6, 20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `character_tb`
--

CREATE TABLE `character_tb` (
  `char_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `char_name` varchar(50) NOT NULL,
  `fame_points` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) DEFAULT 1
) ;

--
-- Dumping data for table `character_tb`
--

INSERT INTO `character_tb` (`char_id`, `player_id`, `char_name`, `fame_points`, `level`, `is_active`) VALUES
(1, 1, 'Alicia', 350, 3, 1),
(2, 1, 'Luna', 1000, 5, 1),
(3, 2, 'Boris', 120, 2, 1),
(4, 2, 'Tanky', 2500, 8, 1),
(5, 3, 'CharlieMage', 600, 4, 1),
(6, 3, 'Sneaky', 900, 5, 1),
(7, 4, 'DianaArcher', 500, 4, 1),
(8, 4, 'HealerD', 300, 3, 0),
(9, 5, 'EdKnight', 2700, 9, 1),
(10, 5, 'ShadowE', 50, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `tier` int(11) NOT NULL CHECK (`tier` between 1 and 8),
  `quality` enum('Normal','Good','Outstanding','Excellent','Masterpiece') NOT NULL,
  `req_level` int(11) DEFAULT 1 CHECK (`req_level` >= 1),
  `durability` int(11) DEFAULT 100 CHECK (`durability` between 0 and 100),
  `is_bound` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_name`, `tier`, `quality`, `req_level`, `durability`, `is_bound`) VALUES
(1, 'Bronze Sword', 2, 'Normal', 1, 100, 0),
(2, 'Iron Sword', 3, 'Good', 5, 100, 0),
(3, 'Steel Sword', 4, 'Outstanding', 10, 100, 0),
(4, 'Fire Staff', 3, 'Good', 5, 100, 0),
(5, 'Frost Staff', 3, 'Normal', 5, 100, 0),
(6, 'Cloth Hood', 2, 'Normal', 1, 90, 0),
(7, 'Leather Hood', 3, 'Good', 5, 100, 0),
(8, 'Iron Helmet', 4, 'Outstanding', 10, 100, 0),
(9, 'Cloth Armor', 2, 'Normal', 1, 85, 0),
(10, 'Leather Armor', 3, 'Good', 5, 100, 0),
(11, 'Iron Armor', 4, 'Outstanding', 10, 100, 0),
(12, 'Cloth Boots', 2, 'Normal', 1, 70, 0),
(13, 'Leather Boots', 3, 'Good', 5, 100, 0),
(14, 'Iron Boots', 4, 'Outstanding', 10, 100, 0),
(15, 'Silver Ring', 2, 'Normal', 1, 90, 0),
(16, 'Golden Ring', 3, 'Good', 5, 100, 0),
(17, 'Ruby Amulet', 4, 'Excellent', 8, 100, 0),
(18, 'Emerald Amulet', 5, 'Masterpiece', 12, 100, 0),
(19, 'Steel Axe', 4, 'Good', 10, 100, 0),
(20, 'Shadow Dagger', 3, 'Good', 6, 100, 0);

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `player_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`player_id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'alice', 'alice@example.com', 'pass123', '2025-01-01'),
(2, 'bob', 'bob@example.com', 'pass123', '2025-01-02'),
(3, 'charlie', 'charlie@example.com', 'pass123', '2025-01-03'),
(4, 'diana', 'diana@example.com', 'pass123', '2025-01-04'),
(5, 'edward', 'edward@example.com', 'pass123', '2025-01-05');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `skill_id` int(11) NOT NULL,
  `skill_name` varchar(50) NOT NULL,
  `required_fame` int(11) DEFAULT 0 CHECK (`required_fame` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`skill_id`, `skill_name`, `required_fame`) VALUES
(1, 'Sword Mastery', 100),
(2, 'Axe Mastery', 300),
(3, 'Staff Combat', 200),
(4, 'Healing Magic', 100),
(5, 'Fire Magic', 300),
(6, 'Frost Magic', 300),
(7, 'Leather Crafting', 50),
(8, 'Iron Smithing', 200),
(9, 'Alchemy', 400),
(10, 'Archery', 150);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `characterequip`
--
ALTER TABLE `characterequip`
  ADD PRIMARY KEY (`char_id`,`slot_id`),
  ADD UNIQUE KEY `uq_char_slot` (`char_id`,`slot_id`),
  ADD KEY `idx_equ_char` (`char_id`),
  ADD KEY `idx_equ_item` (`item_id`);

--
-- Indexes for table `character_tb`
--
ALTER TABLE `character_tb`
  ADD PRIMARY KEY (`char_id`),
  ADD UNIQUE KEY `uq_char_name` (`player_id`,`char_name`),
  ADD KEY `idx_character_player` (`player_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `idx_item_name` (`item_name`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`player_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_player_username` (`username`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`skill_id`),
  ADD UNIQUE KEY `skill_name` (`skill_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `character_tb`
--
ALTER TABLE `character_tb`
  MODIFY `char_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `characterequip`
--
ALTER TABLE `characterequip`
  ADD CONSTRAINT `fk_equ_char` FOREIGN KEY (`char_id`) REFERENCES `character_tb` (`char_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_equ_item` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);

--
-- Constraints for table `character_tb`
--
ALTER TABLE `character_tb`
  ADD CONSTRAINT `fk_character_player` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
