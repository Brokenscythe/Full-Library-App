/*
  Warnings:

  - You are about to alter the column `rentUserId` on the `rent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `borrowUserId` on the `rent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `reservationMadeForUserId` on the `reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `reservationMadeByUserId` on the `reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `closeUserId` on the `reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `userlogins` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_borrowUserId_fkey`;

-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_rentUserId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_closeUserId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_reservationMadeByUserId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_reservationMadeForUserId_fkey`;

-- DropForeignKey
ALTER TABLE `userlogins` DROP FOREIGN KEY `UserLogins_userId_fkey`;

-- AlterTable
ALTER TABLE `rent` MODIFY `rentUserId` INTEGER NOT NULL,
    MODIFY `borrowUserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reservation` MODIFY `reservationMadeForUserId` INTEGER NOT NULL,
    MODIFY `reservationMadeByUserId` INTEGER NOT NULL,
    MODIFY `closeUserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `userlogins` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserLogins` ADD CONSTRAINT `UserLogins_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_rentUserId_fkey` FOREIGN KEY (`rentUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_borrowUserId_fkey` FOREIGN KEY (`borrowUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_reservationMadeForUserId_fkey` FOREIGN KEY (`reservationMadeForUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_reservationMadeByUserId_fkey` FOREIGN KEY (`reservationMadeByUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_closeUserId_fkey` FOREIGN KEY (`closeUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
