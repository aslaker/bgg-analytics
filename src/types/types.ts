export type LinkType =
  | "boardgamecategory"
  | "boardgamemechanic"
  | "boardgamefamily"
  | "boardgameexpansion"
  | "boardgameaccessory"
  | "boardgameintegration"
  | "boardgamedesigner"
  | "boardgameartist"
  | "boardgamepublisher";

export type ParsedLink = {
  $: {
    type: LinkType;
    id: string;
    value: string;
  };
};

export type StandardValue = { $: { value: string } };

export type ProcessedLink = {
  id: string;
  value: string;
};

export type Rating = {
  average: StandardValue[];
  averageweight: StandardValue[];
  bayesaverage: StandardValue[];
  median: StandardValue[];
  numcomments: StandardValue[];
  owned: StandardValue[];
  ranks: {
    rank: {
      $: {
        bayesaverage: string;
        friendlyname: string;
        id: string;
        name: "boardgame" | string;
        type: "subtype" | "family";
        value: string;
      };
    }[];
  }[];
  stddev: StandardValue[];
  trading: StandardValue[];
  usersrated: StandardValue[];
  wanting: StandardValue[];
  wishing: StandardValue[];
};

export type HotnessResponse = {
  $: {
    id: string;
    rank: string;
  };
  thumbnail?: StandardValue[];
  name?: StandardValue[];
  yearpublished?: StandardValue[];
};

export type BggResponseBody = {
  items: {
    item: BggGameResponse[];
  };
};

export type Family = {
  id: number;
  rank: number;
  name: string;
};

export type Statistics = {
  average: number;
  averageweight: number;
  bayesaverage: number;
  median: number;
  numcomments: number;
  owned: number;
  stddev: number;
  trading: number;
  usersrated: number;
  wanting: number;
  wishing: number;
};

export type BggGameResponse = {
  $: {
    id: string;
  };
  name: { $: { type: string; value: string } }[];
  minplayers: StandardValue[];
  maxplayers: StandardValue[];
  playingtime: StandardValue[];
  description: string[];
  excerpt: string[];
  image: string[];
  thumbnail: string[];
  yearpublished: StandardValue[];
  link?: ParsedLink[];
  statistics: { ratings: Rating[] }[];
};

export type ProcessedGame = {
  id: number;
  name: string | null;
  overallRank: number | null;
  familyRanks: Family[] | null;
  playerCountMin: number | null;
  playerCountMax: number | null;
  totalPlayTime: number | null;
  description: string | null;
  image: string | null;
  thumbnail: string | null;
  yearPublished: string | null;
  mechanics: ProcessedLink[];
  categories: ProcessedLink[];
  designers: ProcessedLink[];
  artists: ProcessedLink[];
  publishers: ProcessedLink[];
  expansions: ProcessedLink[];
  statistics: Statistics;
};
