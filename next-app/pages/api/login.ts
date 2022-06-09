import { NextApiRequest, NextApiResponse } from "next";
import { comparePasswords } from "../../lib/comparePasswords";
import prisma from "../../lib/prisma";
import jsonwebtoken from "jsonwebtoken";
import Cookies from "cookies";
import { getUser } from "../../lib/getUser";
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  let user = getUser(req, res);
  if (user !== null) {
    res.status(200).end();
    return;
  }
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const user = await prisma.user.findFirst({
      where: { name: body?.username ?? "" },
    });
    if (user !== null) {
      const isValid = await comparePasswords(
        user.password,
        body?.password ?? ""
      );
      if (isValid) {
        const token = jsonwebtoken.sign({ username: user.name }, jwtSecret);
        cookies.set("token", token, {
          httpOnly: true,
          maxAge: parseInt(process.env.COOKIE_MAX_AGE ?? "18000000"),
        });
        res.status(200).end();
      } else {
        res.status(401).end();
      }
    } else {
      res.status(401).end();
      return;
    }
  } else {
    res.status(405).end();
    return;
  }
}
