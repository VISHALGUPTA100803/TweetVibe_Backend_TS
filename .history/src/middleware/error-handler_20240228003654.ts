import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


interface Error {
    message: string;
    name: string;
    statusCode?: number;
    code?: number;
  }