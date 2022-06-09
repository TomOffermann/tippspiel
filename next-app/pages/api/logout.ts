import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const cookies = new Cookies(req, res);
    cookies.set("token", "", {
      httpOnly: true,
      maxAge: Date.now(),
    });
    res.status(200).end();
    return;
  }
  res.status(405).end();
}
