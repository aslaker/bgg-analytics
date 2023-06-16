/*
  Warnings:

  - A unique constraint covering the columns `[bggId]` on the table `Mechanic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_bggId_key" ON "Mechanic"("bggId");
