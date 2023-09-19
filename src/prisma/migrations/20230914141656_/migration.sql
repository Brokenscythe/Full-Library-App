-- AlterTable
ALTER TABLE `user` MODIFY `remember_token` VARCHAR(191) NULL,
    MODIFY `email_verified_at` DATETIME(3) NULL,
    MODIFY `last_login_at` DATETIME(3) NULL,
    MODIFY `created_at` DATETIME(3) NULL,
    MODIFY `updated_at` DATETIME(3) NULL,
    MODIFY `login_count` INTEGER NULL,
    MODIFY `active` INTEGER NULL;
