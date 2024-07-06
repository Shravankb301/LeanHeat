/*
  Warnings:

  - You are about to drop the `TrackingEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `TrackingEvent`;

-- CreateTable
CREATE TABLE `Click` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
