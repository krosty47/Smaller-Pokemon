/*
  Warnings:

  - You are about to drop the `Vore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Vore`;

-- CreateTable
CREATE TABLE `Vote` (
    `id` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `votedFor` INTEGER NOT NULL,
    `votedAgainst` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
