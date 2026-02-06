-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2026 at 06:21 PM
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
-- Database: `hr_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(10) UNSIGNED NOT NULL,
  `employee_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `check_in_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `employee_id`, `date`, `check_in_time`, `created_at`, `updated_at`) VALUES
(2, 1, '2023-10-20', '09:00:00', '2026-02-05 13:38:59', '2026-02-05 17:05:22'),
(3, 1, '2023-10-21', '09:35:00', '2026-02-05 13:40:40', '2026-02-05 13:40:40'),
(4, 1, '2023-10-22', '09:35:00', '2026-02-05 13:40:43', '2026-02-05 13:40:43'),
(5, 1, '2023-10-23', '09:35:00', '2026-02-05 13:40:45', '2026-02-05 13:40:45'),
(7, 1, '2023-10-25', '09:35:00', '2026-02-05 13:40:50', '2026-02-05 13:40:50'),
(8, 2, '2026-02-05', '10:45:01', '2026-02-05 16:50:07', '2026-02-05 16:51:55'),
(9, 1, '2023-10-26', '09:30:00', '2026-02-05 17:03:12', '2026-02-05 17:03:12'),
(10, 1, '2023-10-27', '10:00:00', '2026-02-05 17:03:54', '2026-02-05 17:03:54');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `hiring_date` date NOT NULL,
  `date_of_birth` date NOT NULL,
  `salary` decimal(14,2) NOT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `age`, `designation`, `hiring_date`, `date_of_birth`, `salary`, `photo_path`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Karim Hasan', 32, 'Senior Manager', '2020-03-01', '1991-12-10', 999999999999.99, 'uploads\\photo-1770296466094-516262353.png', '2026-02-05 13:01:06', '2026-02-05 17:02:49', '2026-02-05 17:02:59'),
(2, 'Kazi', 32, 'Senior Manager', '2020-03-01', '1991-12-10', 90000.00, NULL, '2026-02-05 14:23:01', '2026-02-05 14:23:21', NULL),
(3, 'Aminul Islam', 32, 'Senior Manager', '2020-03-01', '1991-12-10', 25000.00, NULL, '2026-02-05 15:18:07', '2026-02-05 16:35:50', NULL),
(4, 'Rafi Vai', 32, 'Senior Manager', '2020-03-01', '1991-12-10', 25000.00, NULL, '2026-02-05 15:18:17', '2026-02-05 16:36:13', '2026-02-05 16:36:07'),
(5, 'Rafi', 32, 'Project Manager', '2020-03-01', '1991-12-10', 85000.00, NULL, '2026-02-05 15:18:25', '2026-02-05 15:18:25', NULL),
(6, 'Al Sheikh Aminul Islam', 32, 'Project Manager', '2020-03-01', '1991-12-10', 85000.00, 'uploads\\photo-1770305460226-734413323.jpg', '2026-02-05 15:31:00', '2026-02-05 15:31:00', NULL),
(7, 'Aminul Islam', 32, 'Project Manager', '2020-03-01', '1991-12-10', 85000.00, NULL, '2026-02-05 15:31:26', '2026-02-05 15:31:26', NULL),
(8, 'Aminul Islam 2', 32, 'Project Manager', '2020-03-01', '1991-12-10', 85000.00, 'uploads\\photo-1770305597330-374359729.png', '2026-02-05 15:33:17', '2026-02-05 15:33:17', NULL),
(9, 'Aminul Islam', 32, 'Project Manager', '2020-03-01', '1991-12-10', 85000.00, 'uploads\\photo-1770308016683-794883668.png', '2026-02-05 16:13:36', '2026-02-05 16:13:36', NULL),
(10, 'Rafi Kazi', 22, 'Senior Manager', '2020-03-01', '1991-12-10', 90000.00, 'uploads\\photo-1770309304634-725533985.jpg', '2026-02-05 16:35:05', '2026-02-05 16:36:27', NULL),
(11, 'Karim Hasan', 32, 'Project Manager', '2020-03-01', '1991-12-10', 85000.50, NULL, '2026-02-05 17:01:16', '2026-02-05 17:01:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hr_users`
--

CREATE TABLE `hr_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_users`
--

INSERT INTO `hr_users` (`id`, `email`, `password_hash`, `name`, `created_at`, `updated_at`) VALUES
(1, 'hr@example.com', '$2b$10$H01XG8nYHTGFc2PM5tXlZeLIsEGDm6XV6LNr.tnoAPYEgrmSLrxS2', 'HR Admin', '2026-02-05 12:43:05', '2026-02-05 12:43:05');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20260205114310_init_schema.ts', 1, '2026-02-05 12:41:01');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_attendance_unique` (`employee_id`,`date`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hr_users`
--
ALTER TABLE `hr_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hr_users_email_unique` (`email`);

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `hr_users`
--
ALTER TABLE `hr_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
