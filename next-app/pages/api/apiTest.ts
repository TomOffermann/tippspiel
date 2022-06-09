import { NextApiRequest, NextApiResponse } from "next";

require("dotenv").config();

export default async function apiTest(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch("https://api.football-data.org/v4/competitions/WC/teams", {
    method: "GET",
    headers: {
      "X-Auth-Token": process.env.API_KEY ?? "",
    },
  });
  const matches = await response.json();
  if(matches) {
    res.status(200).json(matches);
    return;
  }
  res.status(500).end()
}
