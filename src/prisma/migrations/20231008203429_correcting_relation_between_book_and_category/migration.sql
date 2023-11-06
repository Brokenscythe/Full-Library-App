/*
  Warnings:

  - You are about to drop the `_booktocategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_booktocategory` DROP FOREIGN KEY `_BookToCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_booktocategory` DROP FOREIGN KEY `_BookToCategory_B_fkey`;

-- DropTable
DROP TABLE `_booktocategory`;

-- DropTable
DROP TABLE `settings`;

-- CreateTable
CREATE TABLE `BookCategory` (
    `bookId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`bookId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookCategory` ADD CONSTRAINT `BookCategory_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookCategory` ADD CONSTRAINT `BookCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
