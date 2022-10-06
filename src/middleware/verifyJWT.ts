import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
  const authHeader = (req.headers.authorization ||
    req.headers.Authorization) as string;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "nao veio bearer" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: VerifyErrors | null, decoded: any) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded.username;
      // console.log(decoded);
      // req.user = decoded.userInfo.username;
      // req.roles = decoded.userInfo.roles;
      next();
    }
  );
};
