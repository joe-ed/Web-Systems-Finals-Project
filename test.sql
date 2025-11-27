SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
  `id_number` int(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `year` int(1) NOT NULL,
  `section` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


INSERT INTO `users` (`id_number`, `full_name`, `email`, `role`, `course`, `year`, `section`) VALUES
(250004, 'dsaddsad', 'kindredspirits835@gmail.com', 'teacher', 'BSIT', 2, 'A'),
(250005, 'wadsdasd', 'dsad@gmail.com', 'admin', 'BSIT', 2, 'A');


ALTER TABLE `users`
  ADD PRIMARY KEY (`id_number`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `users`
  MODIFY `id_number` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250006;
COMMIT;