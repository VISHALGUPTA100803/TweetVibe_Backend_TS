import { Request } from "express";
import jwt from "jsonwebtoken";
import Blacklist from "../db/models/blacklist";
import { UnauthorizedError } from "../errors";

import AuthenticatedUser from "./models/authenticated-user";



async function jwtAuth(
    token: string,
    ignoreExpiration: boolean = false
    ): Promise<AuthenticatedUser> {
  const decoded = jwt.verify(token, process.env.JWT_SECRET, {
    ignoreExpiration: ignoreExpiration,
  }) as {
    userId: string;
    email: string;
    iss: string;
    jti: string;
  };

  const jti = decoded.jti;

  // make sure this JTI is not in the blacklist
  const blacklisted = await Blacklist.findOne({
    object: jti,
    kind: "jti",
  });

  if (blacklisted) {
    throw new UnauthorizedError();
  }

  const user: AuthenticatedUser = {
    id: decoded.userId,
    email: decoded.email,
    jti: jti,
    iss: decoded.iss,
  };

  return user;
}