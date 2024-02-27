import { v4 as uuidv4 } from "uuid";
import User from "../db/models/user";

import { UserAndCredentials, UserCreationParams } from "./models/auth-models";

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
}