
-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Gen 02, 2024 alle 21:28
-- Versione del server: 10.4.21-MariaDB
-- Versione PHP: 8.0.10

BEGIN;

DROP DATABASE IF EXISTS DB_Sacco;
CREATE DATABASE IF NOT EXISTS DB_Sacco;
COMMIT;

USE DB_Sacco;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DB_Sacco`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `game`
--

CREATE TABLE `game` (
  `username` varchar(24) NOT NULL,
  `score` int(255) NOT NULL,
  `modalita` varchar(8) NOT NULL,
  `time` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `game`
--

INSERT INTO `game` (`username`, `score`, `modalita`, `time`) VALUES
('ross', 8, 'medium', 25),
('ross', 9, 'hard', 12),
('ross', 3, 'hard', 6),
('ross', 32, 'easy', 73),
('Fala', 4, 'medium', 14),
('Fala', 0, 'medium', 1),
('daniel', 8, 'hard', 15),
('marti', 34, 'easy', 75);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `username` varchar(24) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`username`, `password`) VALUES
('Fala', '$2y$10$3K5C/rqhO5oTiZ3qHzmKvOsCyS74StdcoWchV4nC73JVUK8rqvzP.'),
('daniel', '$2y$10$VRZv4N/lu3Zk1zO8WkVmW.Prm5/PoRg1m1fMf6e3mhwQ.5fTaSH7O'),
('marti', '$2y$10$GOsjNupGNaHbTx.XlE0dXuvc2D9CPmSHvliO.bZrwDB8GO/4I3gjq'),
('ross', '$2y$10$V4jfTNMXvaspewzdSfMZTu3vn1IzrLj3mg2Mkm2ThF3HDpIECfDli');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
