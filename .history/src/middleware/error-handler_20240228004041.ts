import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const errorHandlerMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    let customError = {
      message: err.message,
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    };
  
    // user exists
    if (err.name === "MongoServerError" && err.code === 11000) { //  This error is thrown by MongoDB if we try to call the 
        /register endpoint with credentials that have already been registered with.
      customError.message = "User already exists!";
      customError.statusCode = StatusCodes.BAD_REQUEST;
    }
  
    return res
      .status(customError.statusCode)
      .json({ code: customError.statusCode, message: customError.message });
  };
  
interface Error {
    message: string;
    name: string;
    statusCode?: number;
    code?: number;
  }