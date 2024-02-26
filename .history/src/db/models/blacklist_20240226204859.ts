import { Document, model, Schema } from "mongoose";

enum BlacklistKind {
    jti = "jti", // TIs which are JWT identifiers
    refresh = "refresh",
    token = "token",
  }

