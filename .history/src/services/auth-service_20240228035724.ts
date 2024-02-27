import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../db/models/user";

import {LoginParams, UserAndCredentials, UserCreationParams } from "./models/auth-models";

import { BadRequestError, UnauthorizedError } from "../errors";

import Blacklist from "../db/models/blacklist";

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
}