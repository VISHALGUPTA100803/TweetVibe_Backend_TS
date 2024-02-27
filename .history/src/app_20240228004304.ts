import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
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


app.use(urlencoded({ extended: true }));
app.use(json());

// swagger UI
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "./tsoa/tsoa.json";

// serve Swagger UI

app.use(
  ["/openapi", "/docs", "/swagger"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerJson)
);

// serve swagger JSON

app.get("/swagger.json", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.sendFile(__dirname + "/tsoa/tsoa.json");
});

// tsoa routes

import { RegisterRoutes } from "./routes/routes";
RegisterRoutes(app);

// error handler
import { errorHandlerMiddleware } from "./middleware/error-handler";
app.use(errorHandlerMiddleware);

// port and start functions go here

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
