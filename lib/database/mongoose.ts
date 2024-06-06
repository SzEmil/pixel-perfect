import mongoose, { Mongoose } from 'mongoose';

const MongoConnectionVariant = process.env.K8S_Variant;
const MONGODB_URL =
  MongoConnectionVariant === 'true'
    ? `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`
    : process.env.MONGODB_URL;
const MongoDbName = process.env.MONGO_DB_NAME ?? "pixelPerfect"

type MongooseConnection = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

let cashed: MongooseConnection = (global as any).mongoose;

if (!cashed) {
  cashed = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cashed.conn) return cashed.conn;

  if (!MONGODB_URL) throw new Error('Missing MongoDb URL');

  cashed.promise =
    cashed.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: MongoDbName,
      bufferCommands: false,
    });
  cashed.conn = await cashed.promise;

  return cashed.conn;
};
