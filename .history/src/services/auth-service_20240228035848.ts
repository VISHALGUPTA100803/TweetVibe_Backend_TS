import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../db/models/user";

import {Re LoginParams, UserAndCredentials, UserCreationParams } from "./models/auth-models";

import { BadRequestError, UnauthorizedError } from "../errors";

import Blacklist from "../db/models/blacklist";


import AuthenticatedUser from "../middleware/models/authenticated-user"

export default class AuthService {
  public async register(
    params: UserCreationParams
  ): Promise<UserAndCredentials> {
    const user = await User.create(params); // Every mongoose DB model object has this create() 
    //function which creates an instance of the model object as long as the input values match the parameters inside the model object.
    const uuid = uuidv4();
    const token = user.createJWT(uuid);
    const refresh = user.createRefresh(uuid);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
      refresh,
    };
  }
  public async login(params: LoginParams): Promise<UserAndCredentials> {
    const user = await User.findOne({ email: params.email });
    if (!user) {
      throw new UnauthorizedError();
    }
    const isCorrectPassword = await user.comparePassword(params.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedError();
    }
    const uuid = uuidv4(); // we create a new UUID and pass it to our createJWT and createRefresh functions
    const token = user.createJWT(uuid);
    const refresh = user.createRefresh(uuid);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
      refresh,
    };
  }
  
  public async logout(jti: string): Promise<void> {
    await Blacklist.create({ object: jti, kind: "jti" });
  }

  
  public async refresh(
    params: RefreshParams,
    user: AuthenticatedUser
  ): Promise<UserAndCredentials> {
    const decodedRefreshToken = jwt.verify(
      params.refreshToken,
      process.env.REFRESH_SECRET
    ) as {
      userId: string;
      email: string;
      iss: string;
      jti: string;
    };

    if (
      decodedRefreshToken.email === user.email &&
      decodedRefreshToken.iss === process.env.JWT_ISSUER &&
      decodedRefreshToken.userId == user.id &&
      decodedRefreshToken.email === user.email &&
      decodedRefreshToken.iss === user.iss &&
      decodedRefreshToken.jti === user.jti
    ) {
      // make sure the token is not blacklisted
      const blacklisted = await Blacklist.findOne({
        object: decodedRefreshToken.jti,
        kind: "jti",
      });
      if (blacklisted) {
        throw new UnauthorizedError();
      }

      // blacklist the given refresh token
      await Blacklist.create({ object: decodedRefreshToken.jti });

      const user = await User.findById(decodedRefreshToken.userId);

      if (!user) {
        throw new BadRequestError();
      }

      const uuid = uuidv4();
      const newToken = user.createJWT(uuid);
      const newRefresh = user.createRefresh(uuid);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
        token: newToken,
        refresh: newRefresh,
      };
    } else {
      throw new UnauthorizedError();
    }
  }
}