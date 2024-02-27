import { StatusCodes } from "http-status-codes";

import { Body, Controller, OperationId, Post, Route, Security, Tags } from "tsoa";

import {
  UserAndCredentials,
  UserCreationParams,
  LoginParams,
} from "../services/models/auth-models";

import AuthService from "../services/auth-service";

@Route("/api/v1/auth") // We are enforcing our AuthController class to have the route path of “/api/v1/auth”
@Tags("Auth") // we can categorize various controller endpoints.
export class AuthController extends Controller {
  @Post("register")
  @OperationId("registerUser")
  public async register(
    @Body() requestBody: UserCreationParams
  ): Promise<UserAndCredentials> {
    this.setStatus(StatusCodes.CREATED);
    return new AuthService().register(requestBody);
  }


  
  @Post("login")
  @OperationId("loginUser")
  public async login(
    @Body() requestBody: LoginParams
  ): Promise<UserAndCredentials> {
    this.setStatus(StatusCodes.OK);
    return new AuthService().login(requestBody);
  }

  
  // TODO: remove this dummy endpoint later when
  // we have proper endpoints that use our
  // authentication mechanism
  @Post("dummy")
  @OperationId("dummy")
  @Security("jwt")
  public async dummy(): Promise<void> {
    this.setStatus(StatusCodes.OK);
    return Promise.resolve();
  }
}