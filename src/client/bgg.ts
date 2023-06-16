import axios from "axios";

export const bggClient = axios.create({
  baseURL: "https://www.boardgamegeek.com/xmlapi2",
});
