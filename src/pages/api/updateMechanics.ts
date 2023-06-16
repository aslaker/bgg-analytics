import { type NextApiHandler } from "next";
import * as cheerio from "cheerio";
import axios from "axios";
import { prisma } from "../../server/db";

const handler: NextApiHandler = async (req, res) => {
  const mechanics: { name: string; bggId: string }[] = [];

  try {
    const mechanicsPage = await axios.get<string>(
      "https://boardgamegeek.com/browse/boardgamemechanic"
    );
    const html = mechanicsPage.data;

    const $ = cheerio.load(html);

    $("table.forum_table tr td").each((index, element) => {
      const mechanicName = $(element).find("a").text();
      const mechanicId = $(element).find("a").attr("href")?.split("/")[2] ?? "";

      if (mechanicName.trim().length > 0 && mechanicId.trim().length > 0) {
        mechanics.push({
          name: mechanicName,
          bggId: mechanicId,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err, message: "Error scraping mechanics" });
  }

  const mechanicPromises = mechanics.map(async (mechanic) => {
    await prisma.mechanic.upsert({
      where: { bggId: mechanic.bggId },
      create: {
        bggId: mechanic.bggId,
        name: mechanic.name,
      },
      update: {
        name: mechanic.name,
        bggId: mechanic.bggId,
      },
    });
  });
  try {
    await Promise.all(mechanicPromises);
    res.status(200).json({ message: "Mechanics saved to DB!" });
  } catch (error) {
    res.status(500).json({ error, message: "Error saving mechanics to DB" });
  }
};

export default handler;
