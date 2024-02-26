import { Document, model, Schema } from "mongoose";

enum BlacklistKind {
    jti = "jti",
    refresh = "refresh",
    token = "token",
  }