import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/swaad';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

export async function connectMongo() {
  if (!db) {
    await client.connect();
    // Parse DB name from URI or use default
    const dbName = uri.split('/').pop().split('?')[0] || 'swaad';
    db = client.db(dbName);
    console.log("Successfully connected to MongoDB.");
  }
  return db;
}

export function getMongoDb() {
  if (!db) throw new Error("Mongo DB not initialized");
  return db;
}
