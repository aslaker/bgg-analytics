/*
  Warnings:

  - You are about to drop the column `mechanics` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "mechanics";

-- CreateTable
CREATE TABLE "_GameToMechanic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToMechanic_AB_unique" ON "_GameToMechanic"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToMechanic_B_index" ON "_GameToMechanic"("B");

-- AddForeignKey
ALTER TABLE "_GameToMechanic" ADD CONSTRAINT "_GameToMechanic_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToMechanic" ADD CONSTRAINT "_GameToMechanic_B_fkey" FOREIGN KEY ("B") REFERENCES "Mechanic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
