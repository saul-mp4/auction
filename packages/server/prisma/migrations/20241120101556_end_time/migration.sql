/*
  Warnings:

  - Added the required column `end_time` to the `auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL;
