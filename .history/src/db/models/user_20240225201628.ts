import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// npm install --save-dev @types/bcryptjs
// @types/bcryptjs: Specifies the TypeScript type definitions for the bcryptjs library.
// --save-dev: Saves the package as a development dependency. This means it's a dependency required during development (for building, testing, etc.), but not for the runtime of the application.

const UserSchema = new Schema({
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxlength: [30, "Your name cannot exceed 30 characters"],
      minlength: [3, "Your name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be at least 6 characters long"],
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      trim: true,
      unique: true,
      maxlength: [30, "Your username cannot exceed 30 characters"],
      minlength: [3, "Your username must be at least 3 characters long"],
    },
  });

  