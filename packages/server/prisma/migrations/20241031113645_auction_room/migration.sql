/*
  Warnings:

  - You are about to drop the column `end_time` on the `auctions` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `auctions` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `bids` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_from_start` to the `bids` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuctionStatus" AS ENUM ('CREATED', 'STARTED', 'FINISHED');

-- DropForeignKey
ALTER TABLE "auctions" DROP CONSTRAINT "auctions_item_id_fkey";

-- DropIndex
DROP INDEX "auctions_item_id_key";

-- AlterTable
ALTER TABLE "auctions" DROP COLUMN "end_time",
DROP COLUMN "item_id",
ADD COLUMN     "status" "AuctionStatus" NOT NULL DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE "bids" ADD COLUMN     "item_id" TEXT NOT NULL,
ADD COLUMN     "time_from_start" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "auctionId" TEXT;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "auctions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
