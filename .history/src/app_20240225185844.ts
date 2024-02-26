import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToDatabase } from "./db/connect";

// import jwt
import jwt, { SignOptions } from "jsonwebtoken";

// ...

// Check if process.env.JWT_SECRET is defined
if (process.env.JWT_SECRET) {
  const token = jwt.sign(
    { userId: "SOME USER ID", email: "SOME USER EMAIL" },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
      issuer: process.env.JWT_ISSUER,
      jwtid: "SOME IDENTIFIER",
    } as SignOptions // Explicitly cast to SignOptions to handle undefined expiresIn, issuer, etc.
  );
  console.log
  // Use the token as needed...
} else {
  console.error("JWT_SECRET is not defined in the environment variables.");
}






const app = express();

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