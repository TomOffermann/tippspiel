require("dotenv").config();
import Cookies from "cookies";
import { IncomingMessage, ServerResponse } from "http";
import jsonwebtoken from "jsonwebtoken";

export function useJwt(jwt: string): string | jsonwebtoken.JwtPayload | null {
  if (jwt.length === 0) return null;
  return jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
}

export function getUser(req: IncomingMessage, res: ServerResponse): string | jsonwebtoken.JwtPayload | null {
  const cookies = new Cookies(req, res);
  let jwtResult = useJwt(cookies.get("token") ?? "");
  if (useJwt(cookies.get("token") ?? "") !== null) {
    cookies.set("token", cookies.get("token"), {
      httpOnly: true,
      maxAge: parseInt(process.env.COOKIE_MAX_AGE ?? "18000000"),
    });
    return typeof jwtResult === "string" ? jwtResult : {...jwtResult, expiresIn: parseInt(process.env.COOKIE_MAX_AGE ?? "18000000")};
  }
  return null;
}
