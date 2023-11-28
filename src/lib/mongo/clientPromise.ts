import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const options = {};

if (!URI) throw new Error("Add MONGO_URI to .env.local");

let client = new MongoClient(URI, options);
let tempClientPromise;

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV !== "production") {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  
} else {
  tempClientPromise = client.connect();
}

export const clientPromise: any = tempClientPromise;