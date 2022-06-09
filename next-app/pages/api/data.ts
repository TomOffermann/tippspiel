import { NextApiRequest, NextApiResponse } from "next";
import { ApplicationData } from "../../lib/context";
import { getUser } from "../../lib/getUser";
import prisma from "../../lib/prisma";

require("dotenv").config();

export default async function data(req: NextApiRequest, res: NextApiResponse) {
  const user = getUser(req, res);
  if (req.method === "GET") {
    if (user !== null) {
      const teams = await prisma.team.findMany();
      const bets = await prisma.bet.findMany();
      const games = await prisma.game.findMany();
      const scores = await prisma.score.findMany();
      const completeUser = await prisma.user.findFirst({
        where: {
          name: typeof user === "string" ? user : user["username"] ?? "---",
        },
      });
      const players = await prisma.user.findMany();
      if (
        players !== null &&
        completeUser !== null &&
        scores !== null &&
        games !== null &&
        bets !== null &&
        teams !== null
      ) {
        const completePlayers = players
          .filter((e) => e.id !== completeUser.id)
          .map((e) => {
            delete e.password;
            delete e.email;
            return e;
          });
        res.status(200).json({
          teams,
          bets,
          games,
          scores,
          user: completeUser,
          players: completePlayers,
          expiresAt:
            Date.now() + parseInt(process.env.COOKIE_MAX_AGE ?? "18000000"),
        } as ApplicationData);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(401).end();
    }
  } else {
    res.status(405).end();
    return;
  }
}
