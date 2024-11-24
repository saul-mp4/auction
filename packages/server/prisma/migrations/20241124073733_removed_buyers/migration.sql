/*
  Warnings:

  - You are about to drop the `_ActiveAuctions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActiveAuctions" DROP CONSTRAINT "_ActiveAuctions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActiveAuctions" DROP CONSTRAINT "_ActiveAuctions_B_fkey";

-- DropTable
DROP TABLE "_ActiveAuctions";
