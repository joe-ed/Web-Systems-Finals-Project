-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2025 at 04:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dorencio_university`
--

-- --------------------------------------------------------

--
-- Table structure for table `registration_requests`
--

CREATE TABLE `registration_requests` (
  `id` int(11) NOT NULL,
  `id_number` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('student','teacher','admin') NOT NULL,
  `course` varchar(50) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `approved_at` timestamp NULL DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration_requests`
--

INSERT INTO `registration_requests` (`id`, `id_number`, `first_name`, `middle_name`, `last_name`, `email`, `role`, `course`, `year`, `section`, `password`, `status`, `requested_at`, `approved_at`, `approved_by`) VALUES
(1, '2400794', 'Mao', '', 'Zedong', 'maozedong@gmail.com', 'student', 'BSIT', '2', 'A', '$2y$10$9XpCqwcerTwp0961Kpsw9euZWWooI6ol5pCA6osSL/xbxO7WqDudy', 'pending', '2025-11-25 00:28:44', NULL, NULL),
(2, '123456', 'elon', '', 'musk', 'elonmusk@gmail.com', 'student', 'BSCS', '2', 'C', '$2y$10$6TjQwxULNdh1URiW969z4.CBEahz4rp4zR10JhV5pd5YboZNUv8Ci', 'pending', '2025-11-25 00:42:34', NULL, NULL),
(3, '696969', 'donald', '', 'trump', 'donaldtrump@gmail.com', 'student', 'BSIT', '1', 'B', '$2y$10$XVjIU.iSZ7aOJGPwYVFVVO4PvXFxdovsChFs2PWSw4PWBQShk0iuy', 'pending', '2025-11-25 01:19:35', NULL, NULL),
(4, '909090', 'abc', '', 'def', 'kjh@gmail.com', 'student', 'BSCS', '1', 'A', '$2y$10$9ZalB5HmlvFd9AyT1t9jyegn10Qc10romOYaYfLdG.4C/IQn9XDcq', 'pending', '2025-11-25 05:40:19', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_activities`
--

CREATE TABLE `student_activities` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `grade` varchar(20) DEFAULT NULL,
  `status` enum('pending','completed','graded') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_activities`
--

INSERT INTO `student_activities` (`id`, `student_id`, `title`, `description`, `due_date`, `grade`, `status`, `created_at`) VALUES
(1, 2, 'Programming Assignment 1', 'Basic Algorithms Implementation', '2023-10-15', '9/10', 'graded', '2025-11-24 12:50:58'),
(2, 2, 'Database Design Project', 'ER Diagram and Normalization', '2023-10-22', '8/10', 'graded', '2025-11-24 12:50:58'),
(3, 2, 'Midterm Examination', 'Chapters 1-5', '2023-10-10', '42/50', 'graded', '2025-11-24 12:50:58'),
(4, 2, 'Web Development Lab', 'Responsive Design Implementation', '2023-10-30', NULL, 'pending', '2025-11-24 12:50:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_number` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('student','teacher','admin') NOT NULL,
  `course` varchar(50) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `id_number`, `first_name`, `middle_name`, `last_name`, `email`, `role`, `course`, `year`, `section`, `password`, `status`, `created_at`, `updated_at`) VALUES
(2, '2023008', 'Jo', NULL, 'Doe', 'john@gmail.com', 'student', 'BS Computer Science', '3', 'A', '$2y$10$7DeJeNs6yEIKU92MplKZteOosM1zEvtoCNKhuwfYRB8SsmTVS9Psa', 'active', '2025-11-24 12:50:58', '2025-11-25 12:23:22'),
(4, '111111', 'osama', NULL, 'bin laden', 'isis@gmail.com', 'student', 'BS Computer Science', '3', 'A', '$2y$10$ZD/3opkUkt2qj1as52PWPuby6UqeDzagcGtElFNvkoXTreXmidE2m', 'active', '2025-11-25 06:09:27', '2025-11-25 12:23:22'),
(7, 'admin001', 'Admin', NULL, 'User', 'admin@dorencio.edu', 'admin', NULL, NULL, NULL, '$2y$10$R7T7RvDfPeoaCdxExyBpKOvq4hXcq8fuVUEnnwaPg4x69H/NufsUa', 'active', '2025-11-25 12:12:15', '2025-11-25 12:12:15'),
(8, '2024001', 'John', NULL, 'Doe', 'john.doe@dorencio.edu', 'student', 'BSIT', '1', 'A', '$2y$10$ZiijUlqtw/wrXET8e4OI7.21kUmAOf7Ao8cVctaOPdv9qbBSdwjSO', 'active', '2025-11-25 12:12:15', '2025-11-25 12:12:15'),
(9, '2025-7686', 'adolfus Hitlerius', '', 'User', 'auschwitz@gmail.com', 'student', 'BSIT', '3', 'A', '$2y$10$8PD4ZF2Fydl4NSMWijdxS.1AUocmue.Wf0New/FkDvFDxU8Wfj.6y', 'active', '2025-11-26 00:18:35', '2025-11-26 00:18:35'),
(10, '2025-7585', 'Abdul Jabhar', '', 'User', 'joshualagey@gmail.com', 'student', 'BSIT', '2', 'A', '$2y$10$GQpYJtSPgsuWBlV9T5VaxOOZeLZItvu5fOU4diOBl7csIQKXqfAZ6', 'active', '2025-11-26 01:19:10', '2025-11-26 01:50:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registration_requests`
--
ALTER TABLE `registration_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_number` (`id_number`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `student_activities`
--
ALTER TABLE `student_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_number` (`id_number`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registration_requests`
--
ALTER TABLE `registration_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_activities`
--
ALTER TABLE `student_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `registration_requests`
--
ALTER TABLE `registration_requests`
  ADD CONSTRAINT `registration_requests_ibfk_1` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `student_activities`
--
ALTER TABLE `student_activities`
  ADD CONSTRAINT `student_activities_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
