/*
  Warnings:

  - You are about to drop the column `userId` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_userId_fkey";

-- DropIndex
DROP INDEX "items_userId_key";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "items_user_id_key" ON "items"("user_id");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
