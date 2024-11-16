/*
  Warnings:

  - You are about to drop the column `price` on the `items` table. All the data in the column will be lost.
  - Added the required column `author` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collection` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "price",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "collection" TEXT NOT NULL;
