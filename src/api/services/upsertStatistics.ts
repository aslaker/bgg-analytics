import { prisma } from "../../server/db";
import { type ProcessedGame } from "../../types/types";

export const upsertStatistics = async (processedResponse: ProcessedGame[]) => {
  const upsertStatisticsPromises = processedResponse.map(async (game) => {
    const {
      average,
      averageweight,
      bayesaverage,
      median,
      numcomments,
      owned,
      stddev,
      trading,
      usersrated,
      wanting,
      wishing,
    } = game.statistics;
    await prisma.statistics.upsert({
      where: { gameId: game.id },
      create: {
        game: {
          connect: {
            bggId: game.id,
          },
        },
        average,
        averageweight,
        bayesaverage,
        median,
        numcomments,
        owned,
        stddev,
        trading,
        usersrated,
        wanting,
        wishing,
      },
      update: {
        average,
        averageweight,
        bayesaverage,
        median,
        numcomments,
        owned,
        stddev,
        trading,
        usersrated,
        wanting,
        wishing,
      },
    });
  });

  try {
    await Promise.all(upsertStatisticsPromises);
  } catch (err) {
    throw err;
  }
};
