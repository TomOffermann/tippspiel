import { NextApiRequest, NextApiResponse } from "next";
import { ApplicationData } from "../../lib/context";
import { getUser } from "../../lib/getUser";
import prisma from "../../lib/prisma";

require("dotenv").config();

export default async function data(req: NextApiRequest, res: NextApiResponse) {
  const user = getUser(req, res);
  if (req.method === "POST") {
    if (user !== null) {
      const body = JSON.parse(req.body);
      if (body) {
        if (body["teamId"]) {
          const newUser = await prisma.user.update({
            where: {
              name: typeof user === "string" ? user : user["username"] ?? "---",
            },
            data: {
              teamId: body["teamId"] ?? 1,
            },
          });
          if (user === null) {
            res.status(505).end();
            return;
          }
          res.status(200).end();
        }
      }
    } else {
      res.status(401).end();
    }
  } else {
    res.status(405).end();
    return;
  }
}
