import {
  type ParsedLink,
  type BggGameResponse,
  type ProcessedGame,
  type Family,
  type Statistics,
} from "../types/types";

export function transformGameResponse(
  gameResponse: BggGameResponse
): ProcessedGame {
  const metadata = gameResponse.link || null;
  return {
    id: Number(gameResponse.$.id) ?? null,
    name: getName(gameResponse),
    overallRank: getPrimaryRank(gameResponse),
    familyRanks: getFamilyRanks(gameResponse),
    playerCountMin: getPlayerCountMin(gameResponse),
    playerCountMax: getPlayerCountMax(gameResponse),
    totalPlayTime: getTotalPlayTime(gameResponse),
    description: gameResponse.description[0] ?? null,
    excerpt: getExcerpt(gameResponse.description[0] as string),
    image: gameResponse.image[0] || null,
    thumbnail: gameResponse.thumbnail[0] || null,
    yearPublished: getYearPublished(gameResponse),
    mechanics: getLink("boardgamemechanic", metadata),
    categories: getLink("boardgamecategory", metadata),
    designers: getLink("boardgamedesigner", metadata),
    artists: getLink("boardgameartist", metadata),
    publishers: getLink("boardgamepublisher", metadata),
    expansions: getLink("boardgameexpansion", metadata),
    integrations: getLink("boardgameintegration", metadata),
    accessories: getLink("boardgameaccessory", metadata),
    families: getLink("boardgamefamily", metadata),
    statistics: getStatistics(gameResponse),
  };
}

function getLink(type: string, links: ParsedLink[] | null) {
  if (links === null) return [];
  return links
    .filter((linkItem) => linkItem.$.type === type)
    .map((linkItem) => ({
      id: linkItem.$.id,
      value: linkItem.$.value ? linkItem.$.value : "",
    }));
}

function getPrimaryRank(gameResponse: BggGameResponse): number | null {
  return (
    Number(
      gameResponse.statistics[0]?.ratings[0]?.ranks[0]?.rank.find(
        (item) => item.$.type === "subtype"
      )?.$.value
    ) ?? null
  );
}

function getFamilyRanks(gameResponse: BggGameResponse): Family[] | null {
  const familyRanks =
    gameResponse.statistics[0]?.ratings[0]?.ranks[0]?.rank.filter(
      (item) => item.$.type !== "family"
    );
  return (
    familyRanks?.map((rank) => ({
      id: Number(rank.$.id),
      rank: Number(rank.$.value),
      name: rank.$.name,
    })) ?? null
  );
}

function getName(gameResponse: BggGameResponse): string | null {
  return (
    gameResponse.name?.find((name) => name.$.type === "primary")?.$.value ??
    null
  );
}

function getPlayerCountMin(gameResponse: BggGameResponse): number | null {
  return Number(gameResponse.minplayers[0]?.$.value) ?? null;
}

function getPlayerCountMax(gameResponse: BggGameResponse): number | null {
  return Number(gameResponse.maxplayers[0]?.$.value) ?? null;
}

function getTotalPlayTime(gameResponse: BggGameResponse): number | null {
  return Number(gameResponse.playingtime[0]?.$.value) ?? null;
}

function getExcerpt(description: string): string | null {
  return description ? `${description.slice(0, 140)}...` : null;
}

function getYearPublished(gameResponse: BggGameResponse): string | null {
  return gameResponse.yearpublished[0]?.$.value ?? null;
}

function getStatistics(gameResponse: BggGameResponse): Statistics {
  const statistics = gameResponse.statistics[0]?.ratings[0];
  return {
    average: Number(statistics?.average[0]?.$.value) ?? null,
    averageweight: Number(statistics?.averageweight[0]?.$.value) ?? null,
    bayesaverage: Number(statistics?.bayesaverage[0]?.$.value) ?? null,
    median: Number(statistics?.median[0]?.$.value) ?? null,
    numcomments: Number(statistics?.numcomments[0]?.$.value) ?? null,
    owned: Number(statistics?.owned[0]?.$.value) ?? null,
    stddev: Number(statistics?.stddev[0]?.$.value) ?? null,
    trading: Number(statistics?.trading[0]?.$.value) ?? null,
    usersrated: Number(statistics?.usersrated[0]?.$.value) ?? null,
    wanting: Number(statistics?.wanting[0]?.$.value) ?? null,
    wishing: Number(statistics?.wishing[0]?.$.value) ?? null,
  };
}
