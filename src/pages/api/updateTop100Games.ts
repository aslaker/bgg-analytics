import { type NextApiHandler } from "next";
import * as cheerio from "cheerio";
import { bggClient } from "../../client/bgg";
import axios from "axios";
import * as xml2js from "xml2js";
import { bggGameReducer } from "../../client/bggReducers";
import { type BggResponseBody } from "../../types/types";

async function parse(xmlData: string) {
  const promise = await new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();

    parser.parseString(xmlData, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
  return promise;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    const top100Response = await axios.get<string>(
      "https://boardgamegeek.com/browse/boardgame"
    );
    const html = top100Response.data;

    const $ = cheerio.load(html);

    const games: { rank: string; bggId: string }[] = [];

    $("tr").each((index, element) => {
      if (index === 0) {
        return;
      }
      const rank = $(element)
        .find("td.collection_rank")
        .text()
        .replaceAll(/(\t|\n)/g, "");

      const bggId =
        $(element)
          .find("td.collection_objectname a")
          .attr("href")
          ?.split("/")[2] ?? "";

      games.push({
        rank,
        bggId,
      });
    });

    const endpoint = `/thing?type=boardgame&stats=1&id=${games
      .slice(0, 6)
      .map((game) => game.bggId)
      .join(",")}`;

    const bggResponse = await bggClient.get<string>(endpoint);

    const parsedJson = (await parse(bggResponse.data)) as BggResponseBody;

    debugger;

    const processedResponse = parsedJson.items.item.map((item) => {
      return bggGameReducer(item);
    });

    res.status(200).json(processedResponse);
  } catch (err: unknown) {
    res.status(500).json({ statusCode: 500, err });
  }
};

export default handler;
