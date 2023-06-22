import { type NextApiHandler } from "next";
import { transformGameResponse } from "../../helpers/transformers";
import { getTop100Games } from "../../api/services/getTop100Games";
import { upsertGames } from "../../api/services/upsertGames";
import { upsertStatistics } from "../../api/services/upsertStatistics";

const handler: NextApiHandler = async (req, res) => {
  res.status(200).json({ message: "Updating Games" });

  const top100Response = await getTop100Games();

  const processedResponse = top100Response.items.item.map((item) => {
    return transformGameResponse(item);
  });

  await upsertGames(processedResponse);
  await upsertStatistics(processedResponse);
};

export default handler;
