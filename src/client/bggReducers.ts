import {
  type BggGameResponse,
  type ProcessedGame,
  type HotnessResponse,
  type ParsedLink,
} from "../types/types";

const filterMapLinkItem = (type: string, links: ParsedLink[] | null) => {
  if (links === null) return [];
  return links
    .filter((linkItem) => linkItem.$.type === type)
    .map((linkItem) => ({
      id: linkItem.$.id,
      value: linkItem.$.value ? linkItem.$.value : "",
    }));
};

export const bggHotnessReducer = (hotnessResponse: HotnessResponse) => {
  return {
    id: hotnessResponse.$.id,
    rank: hotnessResponse.$.rank,
    thumbnail:
      hotnessResponse.thumbnail && hotnessResponse.thumbnail.length
        ? hotnessResponse.thumbnail[0]?.$.value
        : null,
    name:
      hotnessResponse.name && hotnessResponse.name.length
        ? hotnessResponse.name[0]?.$.value
        : null,
    yearPublished:
      hotnessResponse.yearpublished && hotnessResponse.yearpublished.length
        ? hotnessResponse.yearpublished[0]?.$.value
        : null,
  };
};

export const bggGameReducer = (
  gameResponse: BggGameResponse
): ProcessedGame => {
  const metadata = gameResponse.link || null;
  return {
    id: gameResponse.$.id,
    rank:
      gameResponse.statistics[0]?.ratings[0]?.ranks[0]?.rank.find(
        (item) => item.$.type === "subtype"
      )?.$.value ?? "",
    name:
      gameResponse.name?.find((name) => name.$.type === "primary")?.$.value ??
      "",
    playerCountMin: gameResponse.minplayers[0]?.$.value ?? null,
    playerCountMax: gameResponse.maxplayers[0]?.$.value ?? null,
    totalPlayTime: gameResponse.playingtime[0]?.$.value ?? null,
    description: gameResponse.description[0] ?? null,
    excerpt:
      gameResponse.description && gameResponse.description.length
        ? `${(gameResponse.description[0] as string).slice(0, 140)}...`
        : null,
    image: gameResponse.image[0] || null,
    yearPublished: gameResponse.yearpublished[0]?.$.value ?? "",
    mechanics: metadata
      ? filterMapLinkItem("boardgamemechanic", metadata)
      : null,
    categories: gameResponse.link
      ? filterMapLinkItem("boardgamecategory", metadata)
      : null,
    designers: gameResponse.link
      ? filterMapLinkItem("boardgamedesigner", metadata)
      : null,
    artists: gameResponse.link
      ? filterMapLinkItem("boardgameartist", metadata)
      : null,
    publishers: gameResponse.link
      ? filterMapLinkItem("boardgamepublisher", metadata)
      : null,
    expansions: gameResponse.link
      ? filterMapLinkItem("boardgameexpansion", metadata)
      : null,
    integrations: gameResponse.link
      ? filterMapLinkItem("boardgameintegration", metadata)
      : null,
    accessories: gameResponse.link
      ? filterMapLinkItem("boardgameaccessory", metadata)
      : null,
    families: gameResponse.link
      ? filterMapLinkItem("boardgamefamily", metadata)
      : null,
  };
};
