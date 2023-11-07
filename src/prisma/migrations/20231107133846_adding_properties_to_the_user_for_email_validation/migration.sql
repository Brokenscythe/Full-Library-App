-- AlterTable
ALTER TABLE `user` ADD COLUMN `confirmation_token` VARCHAR(191) NULL,
    ADD COLUMN `confirmed` BOOLEAN NOT NULL DEFAULT false;
