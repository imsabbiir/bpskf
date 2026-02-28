import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  throw new Error("Please check the .env.local file for mongodb url");
}

let db = global.mongoose;
if (!db) {
  db = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (db.conn) return db.conn;
  if (!db.promise) {
    db.promise = mongoose.connect(MONGODB_URL);
  }
  db.conn = await db.promise;
  return db.conn;
}
