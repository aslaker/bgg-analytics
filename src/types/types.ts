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
        name: string;
        type: string;
        value: string;
      }
    }[];
  };
  stddev: StandardValue[];
  trading: StandardValue[];
  usersrated: StandardValue[];
  wanting: StandardValue[];
  wishing: StandardValue[];
}

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
  yearpublished: StandardValue[];
  link?: ParsedLink[];
  // statistics: { ratings: }[]
};

export type ProcessedGame = {
  id: string;
  name: string;
  playerCountMin: string | null;
  playerCountMax: string | null;
  totalPlayTime: string | null;
  description: string | null;
  excerpt: string | null;
  image: string | null;
  yearPublished: string | null;
  mechanics: ProcessedLink[] | null;
  categories: ProcessedLink[] | null;
  designers: ProcessedLink[] | null;
  artists: ProcessedLink[] | null;
  publishers: ProcessedLink[] | null;
  expansions: ProcessedLink[] | null;
  integrations: ProcessedLink[] | null;
  accessories: ProcessedLink[] | null;
  families: ProcessedLink[] | null;
};
