import { CookieOptions } from "express";
import jwt from "jsonwebtoken";

export function signAcessToken(foundUser: any) {
  const acessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );
  return acessToken;
}

export function signRefreshToken(foundUser: any) {
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
}

export function verifyToken(
  refreshToken: string,
  tokenSecret: string | undefined,
  callback: jwt.VerifyCallback<jwt.JwtPayload>,
  options?: any
) {
  tokenSecret = process.env.ACCESS_TOKEN_SECRET!;
  jwt.verify(refreshToken, tokenSecret, options, callback);
}

export const tokenInfo: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
