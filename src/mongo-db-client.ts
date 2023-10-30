import { SupplierMappings } from "./types";

require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const DB_HOST = process.env.DB_HOST || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

export const MONGO_DB_NAME = "strategic";
export const MONGO_MAPPINGS_COLLECTION_NAME = "mappings";

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const connectToMongoServer = async (onConnectedCallback: () => void) => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("🚀 ~ Pinged your deployment. You successfully connected to MongoDB!");
    onConnectedCallback()
    
  } catch (e) {
    console.error(`An error ocurred while connecting to `);
  }
}

export const listenForChangesInMappings = async (onNewMappingsCallback: (data: SupplierMappings) => void) => {
  try {
    const db = client.db(MONGO_DB_NAME);
    const collection = db.collection(MONGO_MAPPINGS_COLLECTION_NAME);
    const changeStream = collection.watch();

    changeStream.on('change', (change) => {
      // For now just handle inserts (not edits or deletes)
      if(change.operationType === 'insert'){
        onNewMappingsCallback(change.fullDocument as SupplierMappings)
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

export const retrieveAllMappingsFromDb = async () => {
  const database = client.db(MONGO_DB_NAME);
  const collection = database.collection(MONGO_MAPPINGS_COLLECTION_NAME);
  const mappings = await collection.find().toArray() as SupplierMappings[];
  return mappings;
};

export const insertSupplierMappingstoDb = async (
  supplierId: string,
  mappings: SupplierMappings['mappings']
) => {
  const database = client.db(MONGO_DB_NAME);
  const collection = database.collection(MONGO_MAPPINGS_COLLECTION_NAME);

  const document = {
    _id: supplierId,
    mappings,
  };

  return await collection.insertOne(document);  
};