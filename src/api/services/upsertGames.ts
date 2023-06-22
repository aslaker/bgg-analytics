import { prisma } from "../../server/db";
import { type ProcessedGame } from "../../types/types";

export const upsertGames = async (processedResponse: ProcessedGame[]) => {
  const upsertGamePromises = processedResponse.map(async (game) => {
    await prisma.game.upsert({
      where: { bggId: game.id },
      create: {
        bggId: game.id,
        overallRank: game.overallRank,
        name: game.name ?? "",
        thumbnail: game.thumbnail,
        image: game.image,
        description: game.description,
        yearPublished: game.yearPublished,
        playerCountMin: game.playerCountMin,
        playerCountMax: game.playerCountMax,
        totalPlayTime: game.totalPlayTime,
        categories: {
          connectOrCreate: game.categories.map((category) => ({
            where: { bggId: category.id },
            create: {
              bggId: category.id,
              name: category.value,
            },
          })),
        },
        mechanics: {
          connectOrCreate: game.mechanics.map((mechanic) => ({
            where: { bggId: mechanic.id },
            create: {
              bggId: mechanic.id,
              name: mechanic.value,
            },
          })),
        },
        publishers: {
          connectOrCreate: game.publishers.map((publisher) => ({
            where: { bggId: publisher.id },
            create: {
              bggId: publisher.id,
              name: publisher.value,
            },
          })),
        },
        designers: {
          connectOrCreate: game.designers.map((designer) => ({
            where: { bggId: designer.id },
            create: {
              bggId: designer.id,
              name: designer.value,
            },
          })),
        },
        artists: {
          connectOrCreate: game.artists.map((artist) => ({
            where: { bggId: artist.id },
            create: {
              bggId: artist.id,
              name: artist.value,
            },
          })),
        },
        expansions: {
          connectOrCreate: game.expansions.map((expansion) => ({
            where: { bggId: expansion.id },
            create: {
              bggId: expansion.id,
              name: expansion.value,
            },
          })),
        },
      },
      update: {
        overallRank: game.overallRank,
        name: game.name ?? "",
        thumbnail: game.thumbnail,
        image: game.image,
        description: game.description,
        yearPublished: game.yearPublished,
        playerCountMin: game.playerCountMin,
        playerCountMax: game.playerCountMax,
        totalPlayTime: game.totalPlayTime,
        categories: {
          connectOrCreate: game.categories.map((category) => ({
            where: { bggId: category.id },
            create: {
              bggId: category.id,
              name: category.value,
            },
          })),
        },
        mechanics: {
          connectOrCreate: game.mechanics.map((mechanic) => ({
            where: { bggId: mechanic.id },
            create: {
              bggId: mechanic.id,
              name: mechanic.value,
            },
          })),
        },
        publishers: {
          connectOrCreate: game.publishers.map((publisher) => ({
            where: { bggId: publisher.id },
            create: {
              bggId: publisher.id,
              name: publisher.value,
            },
          })),
        },
        designers: {
          connectOrCreate: game.designers.map((designer) => ({
            where: { bggId: designer.id },
            create: {
              bggId: designer.id,
              name: designer.value,
            },
          })),
        },
        artists: {
          connectOrCreate: game.artists.map((artist) => ({
            where: { bggId: artist.id },
            create: {
              bggId: artist.id,
              name: artist.value,
            },
          })),
        },
        expansions: {
          connectOrCreate: game.expansions.map((expansion) => ({
            where: { bggId: expansion.id },
            create: {
              bggId: expansion.id,
              name: expansion.value,
            },
          })),
        },
      },
    });
  });

  try {
    await Promise.all(upsertGamePromises);
  } catch (err) {
    throw err;
  }
};
