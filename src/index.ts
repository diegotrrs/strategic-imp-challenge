import express, { Request, Response } from "express";
import { connectToMongoServer, insertSupplierMappingstoDb, listenForChangesInMappings } from "./mongo-db-client";
import { getMappingsFromCache, insertNewMappingToCache, loadMappingsIntoCache } from "./cache";
import { SupplierMappings } from "./types";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

connectToMongoServer(async () => {
  // Initially load all mappings into the cache
  await loadMappingsIntoCache()

  // Then add new mappings into the cache
  await listenForChangesInMappings((data: SupplierMappings) => {
    insertNewMappingToCache(data)
  })
})

// Returns all mappings from the cache
app.get("/mappings", (_req: Request, res: Response) => { 
  res.json({ mappings: getMappingsFromCache() });
});

// Inserts new mappings in the database
app.post("/:supplierId/mappings", async (req: Request, res: Response) => {
  const supplierId = req.params.supplierId;
  const mappingsData = req.body.mappings; // Data needs to be validated using a schema validation library such as zod.

  try {
    await insertSupplierMappingstoDb(supplierId, mappingsData);
    res.json({ success: true, message: "Mappings succesfully inserted" });  
  } catch(error){
    res.status(500).json({ success: false, error: "An error occurred while inserting supplier mappings." });
  };
});


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
