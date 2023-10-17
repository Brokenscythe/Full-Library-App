-- CreateTable
CREATE TABLE `Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationExpiry` INTEGER NOT NULL DEFAULT 7,
    `returnDeadline` INTEGER NOT NULL DEFAULT 30,
    `conflictDeadline` INTEGER NOT NULL DEFAULT 35,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
