-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.1.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table full-library-app.author: ~7 rows (approximately)
REPLACE INTO `author` (`id`, `nameSurname`, `photo`, `biography`, `wikipedia`, `created_at`, `updated_at`) VALUES
	(1, 'Ivo Andrić', 'slika1.jpg', 'Ivo je pisac.\r\n                          \r\n                          ', 'wiki1', '2023-09-07 08:26:46.432', '2023-09-21 14:25:16.056'),
	(2, 'Petar II Petrović Njegos', 'slika4.jpg', 'Petar je psiac...', 'wiki4', '2023-09-07 08:26:46.432', '2023-09-07 08:26:46.432'),
	(3, 'Džordž Orvel', 'slika2.jpg', 'Džordž je pisac....', 'wiki2', '2023-09-07 08:26:46.432', '2023-09-07 08:26:46.432'),
	(4, 'Harper Li', 'slika3.jpg', 'Harper je psac', 'wiki3', '2023-09-07 08:26:46.432', '2023-09-07 08:26:46.432'),
	(5, 'Marko M. Markovic', '12', '12', '12', '2023-09-11 15:28:07.429', '2023-09-11 15:28:07.429'),
	(6, 'Petar Markovic', 'erge.jpg', 'rtgsrtgs', 'fgf', '2023-09-21 15:07:54.750', '2023-09-21 15:07:54.750'),
	(7, 'Milena M', 'fgbf', ' fgbfgb                           \r\n                                ', 'bfgbfbg', '2023-09-21 15:09:15.397', '2023-09-21 15:09:15.397');

-- Dumping data for table full-library-app.binding: ~1 rows (approximately)
REPLACE INTO `binding` (`id`, `name`) VALUES
	(1, 'Tvrdi povez');

-- Dumping data for table full-library-app.book: ~1 rows (approximately)
REPLACE INTO `book` (`id`, `title`, `page_count`, `letterId`, `languageId`, `bindingId`, `formatId`, `publisherId`, `isbn`, `quantity_count`, `rented_count`, `reserved_count`, `body`, `year`, `pdf`) VALUES
	(1, 'Ubiti pticu rugalicu', 145, 1, 2, 1, 1, 1, '1234567890123\r\n', 5, 0, 0, 'Ubiti pticu rugalicu je knjiga......', 2023, 'Ubiti_pticu_rugalicu.pdf');

-- Dumping data for table full-library-app.bookstatus: ~6 rows (approximately)
REPLACE INTO `bookstatus` (`id`, `status`) VALUES
	(2, 'Izdata'),
	(1, 'Na stanju'),
	(6, 'Nema na stanju'),
	(5, 'Otpisana'),
	(4, 'Prekoracenje'),
	(3, 'Vracena');

-- Dumping data for table full-library-app.cancellationreason: ~2 rows (approximately)
REPLACE INTO `cancellationreason` (`id`, `name`) VALUES
	(1, 'Odsutan'),
	(2, 'Razlog 2');

-- Dumping data for table full-library-app.category: ~3 rows (approximately)
REPLACE INTO `category` (`id`, `name`, `description`, `icon`) VALUES
	(5, 'Sci-Fi', 'wewedewd25\r\n                                \r\n                            \r\n                            ', '12.ico'),
	(6, 'Proba', 'qwqwqwqwq', '13.ico'),
	(8, 'Probaetyheyh', '212121212\r\n                                ', '14.ico');

-- Dumping data for table full-library-app.format: ~1 rows (approximately)
REPLACE INTO `format` (`id`, `name`) VALUES
	(1, 'A5');

-- Dumping data for table full-library-app.gallery: ~1 rows (approximately)
REPLACE INTO `gallery` (`id`, `bookId`, `photo`, `cover`) VALUES
	(1, 1, 'rugalica.jpg', 1);

-- Dumping data for table full-library-app.genre: ~2 rows (approximately)
REPLACE INTO `genre` (`id`, `name`) VALUES
	(1, 'Istorija'),
	(2, 'Naucna fantastika');

-- Dumping data for table full-library-app.language: ~2 rows (approximately)
REPLACE INTO `language` (`id`, `name`) VALUES
	(1, 'Crnogorski ejzik'),
	(2, 'Engleski jezik');

-- Dumping data for table full-library-app.letter: ~1 rows (approximately)
REPLACE INTO `letter` (`id`, `name`) VALUES
	(1, 'A');

-- Dumping data for table full-library-app.publisher: ~1 rows (approximately)
REPLACE INTO `publisher` (`id`, `name`) VALUES
	(1, 'Penguin Publish House Ltd,UK');

-- Dumping data for table full-library-app.rent: ~0 rows (approximately)

-- Dumping data for table full-library-app.rentstatus: ~0 rows (approximately)

-- Dumping data for table full-library-app.reservation: ~3 rows (approximately)
REPLACE INTO `reservation` (`id`, `bookId`, `reservationMadeForUserId`, `reservationMadeByUserId`, `closeUserId`, `closureReasonId`, `request_date`, `reservation_date`, `close_date`) VALUES
	(1, 1, 'bf2b0051-5b18-4eb9-ad6a-0d9a63435f56', 'bf2b0051-5b18-4eb9-ad6a-0d9a63435f56', 'bf2b0051-5b18-4eb9-ad6a-0d9a63435f56', 1, '2023-10-03 08:28:40.000', '2023-10-03 08:28:41.000', '2023-10-03 08:28:41.000'),
	(4, 1, '9b93f184-77b6-401e-a2b5-8841a23b669f', '9b93f184-77b6-401e-a2b5-8841a23b669f', '9b93f184-77b6-401e-a2b5-8841a23b669f', 1, '2023-10-11 00:00:00.000', '2023-10-10 00:00:00.000', '2023-10-17 00:00:00.000'),
	(8, 1, 'bf2b0051-5b18-4eb9-ad6a-0d9a63435f56', 'bf2b0051-5b18-4eb9-ad6a-0d9a63435f56', 'bf2b0051-5b18-4eb9-ad6a-0d9a63435f56', 1, '2023-11-11 00:00:00.000', '2023-11-11 00:00:00.000', '2023-11-11 00:00:00.000');

-- Dumping data for table full-library-app.reservationstatus: ~4 rows (approximately)
REPLACE INTO `reservationstatus` (`id`, `name`) VALUES
	(1, 'Rezervisano'),
	(2, 'Ogranicena rezervacija 3 dana'),
	(3, 'Ogranicena rezervacija 5 dana'),
	(4, 'Ogranicena rezervacija 7 dana');

-- Dumping data for table full-library-app.sessions: ~2 rows (approximately)

-- Dumping data for table full-library-app.settings: ~1 rows (approximately)
REPLACE INTO `settings` (`id`, `reservationExpiry`, `returnDeadline`, `conflictDeadline`) VALUES
	(1, 6, 30, 35);

-- Dumping data for table full-library-app.user: ~2 rows (approximately)
REPLACE INTO `user` (`id`, `typeId`, `genderId`, `name`, `JMBG`, `email`, `username`, `password`, `photo`, `remember_token`, `email_verified_at`, `last_login_at`, `created_at`, `updated_at`, `login_count`, `active`) VALUES
	('9b93f184-77b6-401e-a2b5-8841a23b669f', 1, 1, 'Marko M1', '1234567890123', 'aaaaa@rsgh.com', 'CrazyHorse', '123456', '', '', '2023-09-09 12:42:55.959', '2023-09-19 11:01:25.018', '2023-09-09 12:42:55.959', '2023-09-09 12:42:55.959', 11, 0),
	('bf2b0051-5b18-4eb9-ad6a-0d9a63435f56', 1, 1, 'Marko M', '1234567890122', 'rhdsgdr@rsgh.com', 'markisa', '123456', '', '', '2023-09-09 12:35:59.347', '2023-09-09 12:35:59.347', '2023-09-09 12:35:59.347', '2023-09-09 12:35:59.347', 0, 0);

-- Dumping data for table full-library-app.usergender: ~2 rows (approximately)
REPLACE INTO `usergender` (`id`, `name`) VALUES
	(1, 'Zensko'),
	(2, 'Musko');

-- Dumping data for table full-library-app.userlogins: ~0 rows (approximately)

-- Dumping data for table full-library-app.usertype: ~3 rows (approximately)
REPLACE INTO `usertype` (`id`, `name`) VALUES
	(1, 'Ucenik'),
	(2, 'Bibliotekar'),
	(3, 'Admin');

-- Dumping data for table full-library-app._authortobook: ~0 rows (approximately)

-- Dumping data for table full-library-app._booktocategory: ~0 rows (approximately)

-- Dumping data for table full-library-app._booktogenre: ~0 rows (approximately)

-- Dumping data for table full-library-app._prisma_migrations: ~4 rows (approximately)
REPLACE INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
	('0e93835e-b0ec-4a46-804f-a0b819162c25', 'bac1852126e30b1c44a7bf5f954a3897af3966c15527494e59ec50022a436093', '2023-09-21 07:40:06.287', '20230921074006_seetings', NULL, NULL, '2023-09-21 07:40:06.272', 1),
	('0ed6c2bc-79ed-489e-aa71-02ea6269d473', '5b315b1f46a700c3a8bbd3330d357fa0a6d7efe6a41a7cd3266d0678cc0c828a', '2023-09-21 07:38:40.959', '20230914161146_', NULL, NULL, '2023-09-21 07:38:40.948', 1),
	('4882dd53-ef17-449a-a4f1-d0ab3f038e06', '0058707b180a119d792be0c4b8b60c5ff7d4ae57e0d8c49f64c5a9a139294aaa', '2023-09-21 07:38:40.879', '20230910234832_adding_a_database', NULL, NULL, '2023-09-21 07:38:39.835', 1),
	('708d5404-a408-4396-a0e2-6341c37db976', '7eb31519c8e4c17df433c7b0e6ac262ba3204824b3c6e4f9415578446cfec8f1', '2023-09-21 07:38:40.935', '20230914141656_', NULL, NULL, '2023-09-21 07:38:40.882', 1),
	('e4a7882a-1ca0-44b3-9af5-476319378ff9', 'a063ea68963eb6361c601c28cb5027c41513b8b800abfa1ada51a435233745ef', '2023-09-21 07:38:40.947', '20230914160121_', NULL, NULL, '2023-09-21 07:38:40.937', 1);

-- Dumping data for table full-library-app._reservationtoreservationstatus: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
