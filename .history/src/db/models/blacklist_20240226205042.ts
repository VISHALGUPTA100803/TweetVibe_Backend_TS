import { Document, model, Schema } from "mongoose";

enum BlacklistKind {
    jti = "jti", // TIs which are JWT identifiers
    refresh = "refresh",
    token = "token",
  }

  const BlacklistSchema = new Schema(
    {
      object: {
        type: String,
        required: [true, "Please provide an object"],
        unique: true,
      },
      kind: {
        type: String,
        enum: ["jti", "refresh", "token"],
        default: "jti",
        required: [true, "Please provide a kind"],
      },
    },
    { timestamps: true }
  );