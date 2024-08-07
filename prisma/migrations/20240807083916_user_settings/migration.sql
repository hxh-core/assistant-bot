-- DropForeignKey
ALTER TABLE "BotUser" DROP CONSTRAINT "BotUser_settingsId_fkey";

-- AlterTable
ALTER TABLE "BotUser" ALTER COLUMN "settingsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BotUser" ADD CONSTRAINT "BotUser_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "BotUserSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
