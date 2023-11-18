/*
  Warnings:

  - You are about to drop the column `default` on the `genre` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `genre` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `genre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `genre` DROP COLUMN `default`,
    DROP COLUMN `description`,
    DROP COLUMN `icon`;
