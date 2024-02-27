import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const errorHandlerMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    // we will program this soon
  };
  
interface Error {
    message: string;
    name: string;
    statusCode?: number;
    code?: number;
  }