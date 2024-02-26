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

//   Type: The field email is of type String.
// Required: The required property is set to true, meaning that a value for the email field must be provided when creating a new user. If it's not provided, a validation error with the message "Please enter your email" will be triggered.
// Trim: The trim option is set to true, which means leading and trailing whitespaces in the provided email value will be removed.
// Unique: The unique option is set to true, enforcing that each email in the collection must be unique.
// Match: The match option is used to enforce a specific regular expression pattern for the email field. The regular expression provided checks whether the email follows a standard pattern for email addresses. If the provided email does not match this pattern, a validation error with the message "Please provide a valid email" will be triggered.

UserSchema.pre("save", async function name(params:type) {
    
})