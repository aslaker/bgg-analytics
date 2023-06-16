-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "bggId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "playerCountMin" INTEGER,
    "playerCountMax" INTEGER,
    "yearPublished" TEXT,
    "totalPlayTime" TEXT,
    "mechanics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mechanic" (
    "id" SERIAL NOT NULL,
    "bggId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mechanic_pkey" PRIMARY KEY ("id")
);
