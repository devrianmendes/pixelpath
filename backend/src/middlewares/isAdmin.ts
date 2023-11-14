import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  role: string;
}

export default function isAdmin (req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { role } = verify(token, process.env.JWT_SECRET) as PayLoad;

    role === "admin" ? next() : res.status(401).end()
    
  } catch (err) {
    return res.status(401).end();
  }
}