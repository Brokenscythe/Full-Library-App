-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_id` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    INDEX `idx_session_id`(`session_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
