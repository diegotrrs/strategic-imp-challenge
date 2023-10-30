import { retrieveAllMappingsFromDb } from "./mongo-db-client";
import { SupplierMappings } from "./types";

/**
 * The very simple in-memory cache of the supplier mappings. 
 * This doesn't include any of the common feature a robust in-memory cache includes.
 * For a productive app something like Node Cache or Redis could be used.
 */
let cache: SupplierMappings[] = [];

export const loadMappingsIntoCache = async () => {
  cache = await retrieveAllMappingsFromDb();
  console.log("🚀 ~ loadMappingsIntoCache ~ cache:", cache)  
}

export const insertNewMappingToCache = (data: SupplierMappings) => {
  console.log("🚀 ~ insertNewMappingToCache ~ ", data)  
  cache = [ ...cache, data ]
}

export const getMappingsFromCache = () => {
  return [...cache]
}