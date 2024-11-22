/*
  Warnings:

  - You are about to drop the column `time_from_start` on the `bids` table. All the data in the column will be lost.
  - Added the required column `time_stamp` to the `bids` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bids" DROP COLUMN "time_from_start",
ADD COLUMN     "time_stamp" TIMESTAMP(3) NOT NULL;
