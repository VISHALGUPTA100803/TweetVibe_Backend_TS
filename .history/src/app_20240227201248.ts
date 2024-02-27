import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToDatabase } from "./db/connect";

// import jwt
// import jwt from "jsonwebtoken";
// const token = jwt.sign(
//   { userId: "SOME USER ID", email: "SOME USER EMAIL" },
//   process.env.JWT_SECRET,
//   {
//     expiresIn: process.env.JWT_EXPIRES,
//     issuer: process.env.JWT_ISSUER,
//     jwtid: "SOME IDENTIFIER",
//   }
// );

// console.log(token);

const app = express();


// swagger UI
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "./tsoa/tsoa.json";

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env file");
    }
    console.log("Connecting to database...");
    await connectToDatabase(mongoUri);
    console.log("Connected to database");
    console.log("Starting server...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
