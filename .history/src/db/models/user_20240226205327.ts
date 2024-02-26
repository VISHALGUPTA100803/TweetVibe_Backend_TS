import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// npm install --save-dev @types/bcryptjs
// @types/bcryptjs: Specifies the TypeScript type definitions for the bcryptjs library.
// --save-dev: Saves the package as a development dependency. This means it's a dependency required during development (for building, testing, etc.), but not for the runtime of the application.


// The required property is a validation rule for the name field. 
//It is set to an array where the first element is a boolean (true) indicating that the field is required, and the second element is a custom error message that will be used if the validation fails.
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
// Match: The match option is used to enforce a specific regular expression pattern for the email field. 
//The regular expression provided checks whether the email follows a standard pattern for email addresses. 
//If the provided email does not match this pattern, a validation error with the message "Please provide a valid email" will be triggered.

UserSchema.pre("save", async function (next) {

    if(this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password!, salt);

    }
    next ();
});

// Mongoose middleware function that is executed before a user document is saved to the database.
// It specifically runs before the save operation is performed on a User instance. 
//In Mongoose, middleware functions allow you to execute logic before or after certain events, 
//such as saving, updating, or removing documents.




UserSchema.methods.createJWT = function (uuid: string): string {
    const token = jwt.sign(
      { userId: this._id, email: this.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
        issuer: process.env.JWT_ISSUER,
        jwtid: uuid,
      }
    );
    return token;
  };

// refresh token se naya jwt create ho rahan jab jwt token expire ho rahan

UserSchema.methods.createRefresh = function (uuid: string): string {
    const refreshToken = jwt.sign(
      { userId: this._id, email: this.email },
      process.env.REFRESH_SECRET,
      {
        expiresIn: process.env.REFRESH_EXPIRES,
        issuer: process.env.JWT_ISSUER,
        jwtid: uuid,
      }
    );
    return refreshToken;
  };

  UserSchema.methods.toJSON = function (): any {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      username: this.username,
    };
  };


  UserSchema.methods.comparePassword = function (
    enteredPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
  };
  


  interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    username: string;
    createJWT: (uuid: string) => string;
    createRefresh: (uuid: string) => string;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
    toJSON: () => any;
  }
  
  export default model<UserDocument>("User", UserSchema);

  // the rest of our TS application has no idea about the various fields and methods available
  // to this schema. The fields that we defined directly in UserSchema right now are only visible to MongoDB through mongoose 
  //but they are not at all exposed to the rest of our TS app.