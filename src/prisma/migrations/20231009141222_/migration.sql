/*
  Warnings:

  - You are about to drop the column `icon` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `icon`,
    ADD COLUMN `iconPath` VARCHAR(191) NULL;
