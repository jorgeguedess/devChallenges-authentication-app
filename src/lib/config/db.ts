import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error("Please add your MONGO_URI to .env.local");
}

const MONGO_URI: string = process.env.MONGO_URI;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function ConnectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
