import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/authorization";
export const PORT = process.env.PORT || 4000;

export const TOKEN_KEY= process.env.TOKEN_KEY  || CreateUser
export const JWT_EXPIRES_IN= process.env.JWT_EXPIRES_IN  || 365
