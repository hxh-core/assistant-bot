/*
  Warnings:

  - You are about to drop the column `settingsId` on the `BotUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `BotUserSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "BotUser" DROP CONSTRAINT "BotUser_settingsId_fkey";

-- DropIndex
DROP INDEX "BotUser_settingsId_key";

-- AlterTable
ALTER TABLE "BotUser" DROP COLUMN "settingsId";

-- CreateIndex
CREATE UNIQUE INDEX "BotUserSettings_userId_key" ON "BotUserSettings"("userId");

-- AddForeignKey
ALTER TABLE "BotUserSettings" ADD CONSTRAINT "BotUserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BotUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
