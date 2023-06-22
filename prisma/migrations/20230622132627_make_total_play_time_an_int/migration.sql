/*
  Warnings:

  - The `totalPlayTime` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "totalPlayTime",
ADD COLUMN     "totalPlayTime" INTEGER;
