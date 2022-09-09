import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { decryptPwd, findUserByName } from "../services/usersServices";
import {
  signAcessToken,
  signRefreshToken,
  tokenInfo,
  verifyToken,
} from "../services/authServices";

export const login = asyncHandler(async (req: Request, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await findUserByName(username);

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await decryptPwd(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const acessToken = signAcessToken(foundUser);

  const refreshToken = signRefreshToken(foundUser);

  res.cookie("jwt", refreshToken, tokenInfo);
  res.json({ acessToken });
});

export const refresh = (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt as string;

  verifyToken(
    refreshToken,
    process.env.ACCESS_TOKEN_SECRET,

    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      console.log(decoded);
      const foundUser = await findUserByName(decoded?.username);

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = signAcessToken(foundUser);

      res.json({ accessToken });
    }
  );
};

export const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Cookie cleared" });
};
