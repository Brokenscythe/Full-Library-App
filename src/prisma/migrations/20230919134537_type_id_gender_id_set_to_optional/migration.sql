-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_genderId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_typeId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `typeId` INTEGER NULL,
    MODIFY `genderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `UserType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `UserGender`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
