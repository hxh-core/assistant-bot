/*
  Warnings:

  - A unique constraint covering the columns `[settingsId]` on the table `BotUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BotUser" ADD COLUMN     "settingsId" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "BotUserSettings" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "sendNewClaimMessages" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BotUserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BotUser_settingsId_key" ON "BotUser"("settingsId");

-- AddForeignKey
ALTER TABLE "BotUser" ADD CONSTRAINT "BotUser_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "BotUserSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
