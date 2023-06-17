/*
  Warnings:

  - Added the required column `overallRank` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "description" TEXT,
ADD COLUMN     "overallRank" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT;

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "bggId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "bggId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designer" (
    "id" SERIAL NOT NULL,
    "bggId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Designer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "bggId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "bggId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expansion" (
    "id" SERIAL NOT NULL,
    "bggId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Expansion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" SERIAL NOT NULL,
    "average" INTEGER NOT NULL,
    "averageweight" INTEGER NOT NULL,
    "bayesaverage" INTEGER NOT NULL,
    "median" INTEGER NOT NULL,
    "numcomments" INTEGER NOT NULL,
    "owned" INTEGER NOT NULL,
    "stddev" INTEGER NOT NULL,
    "trading" INTEGER NOT NULL,
    "usersrated" INTEGER NOT NULL,
    "wanting" INTEGER NOT NULL,
    "wishing" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToPublisher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FamilyToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DesignerToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtistToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExpansionToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Family_bggId_key" ON "Family"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_bggId_key" ON "Category"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "Designer_bggId_key" ON "Designer"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_bggId_key" ON "Artist"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_bggId_key" ON "Publisher"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "Expansion_bggId_key" ON "Expansion"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_gameId_key" ON "Statistics"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPublisher_AB_unique" ON "_GameToPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToPublisher_B_index" ON "_GameToPublisher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FamilyToGame_AB_unique" ON "_FamilyToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_FamilyToGame_B_index" ON "_FamilyToGame"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToGame_AB_unique" ON "_CategoryToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToGame_B_index" ON "_CategoryToGame"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DesignerToGame_AB_unique" ON "_DesignerToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_DesignerToGame_B_index" ON "_DesignerToGame"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToGame_AB_unique" ON "_ArtistToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToGame_B_index" ON "_ArtistToGame"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpansionToGame_AB_unique" ON "_ExpansionToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpansionToGame_B_index" ON "_ExpansionToGame"("B");

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPublisher" ADD CONSTRAINT "_GameToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPublisher" ADD CONSTRAINT "_GameToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FamilyToGame" ADD CONSTRAINT "_FamilyToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FamilyToGame" ADD CONSTRAINT "_FamilyToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGame" ADD CONSTRAINT "_CategoryToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGame" ADD CONSTRAINT "_CategoryToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesignerToGame" ADD CONSTRAINT "_DesignerToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesignerToGame" ADD CONSTRAINT "_DesignerToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToGame" ADD CONSTRAINT "_ArtistToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToGame" ADD CONSTRAINT "_ArtistToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpansionToGame" ADD CONSTRAINT "_ExpansionToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Expansion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpansionToGame" ADD CONSTRAINT "_ExpansionToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
