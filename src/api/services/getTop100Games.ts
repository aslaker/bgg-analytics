import axios from "axios";
import * as cheerio from "cheerio";
import { type BggResponseBody } from "../../types/types";
import * as xml2js from "xml2js";
import { bggClient } from "../../client/bgg";

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

export const getTop100Games = async () => {
  const top100Response = await axios.get<string>(
    "https://boardgamegeek.com/browse/boardgame"
  );
  const html = top100Response.data;

  const $ = cheerio.load(html);

  const games: { rank: string; id: string }[] = [];

  $("tr").each((index, element) => {
    if (index === 0) {
      return;
    }
    const rank = $(element)
      .find("td.collection_rank")
      .text()
      .replaceAll(/(\t|\n)/g, "");

    const id =
      $(element)
        .find("td.collection_objectname a")
        .attr("href")
        ?.split("/")[2] ?? "";

    games.push({
      rank,
      id,
    });
  });

  const endpoint = `/thing?type=boardgame&stats=1&id=${games
    .map((game) => game.id)
    .join(",")}`;
  const bggResponse = await bggClient.get<string>(endpoint);

  const parsedJson = (await parse(bggResponse.data)) as BggResponseBody;

  return parsedJson;
};
