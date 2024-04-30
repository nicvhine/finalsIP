SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Pending','Completed','In Progress') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `tasks` (`id`, `title`, `description`, `status`) VALUES
(22, 'Task 1', 'This is my task number 1', 'Pending'),
(24, 'Task 2', 'This is my task number 2', 'Pending');


ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

