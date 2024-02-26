import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// npm install --save-dev @types/bcryptjs
// @types/bcryptjs: Specifies the TypeScript type definitions for the bcryptjs library.
// --save-dev: Saves the package as a development dependency. This means it's a dependency required during development (for building, testing, etc.), but not for the runtime of the application.