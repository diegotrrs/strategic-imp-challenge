import { getMappingsFromCache } from "./cache";

//import mappings from "./mappings";
export interface Characteristic {
  name: string;
  value: string;
}

type CharacteristicsMapper = (
  characteristics: Characteristic[],
  supplier: string
) => Promise<Characteristic[]>;

enum MappingType {
  SUPPLIER_TO_GATEWAY = 'supplierToGateaway',
  GATEWAY_TO_SUPPLIER = 'gateawayToSupplier',
}

/**
 * Performs the mapping for the specified array of characteristics and supplier.
 * @param characteristics The array of characteristics to map
 * @param supplierId The supplier's id
 * @param mappingType Either
 * @returns an array of the mapped characteristics
 */
const performMappings = async (
  characteristics: Characteristic[],
  supplierId: string,
  mappingType: string
) => {
  // The mappings are read from the in-memory cache. The cache is updated when there are changes in the mappings stored in the DB.
  const mappings = getMappingsFromCache()
  const supplierMappings = mappings.find(m => m._id === supplierId)?.mappings

  if (!supplierMappings) {
    return characteristics;
  }

  const mappingsForType = supplierMappings[mappingType] || [];
  const characteristicsAlreadyMapped = new Set<string>();

  return characteristics.reduce<Characteristic[]>(
    (accum: Characteristic[], currentCharacteristic: Characteristic) => {
      // mapping for the current characteristic
      const mappingEntries = mappingsForType.filter(m => m.source.name === currentCharacteristic.name);

      if (mappingEntries.length > 0) {
        for (const entry of mappingEntries) {
          const newCharacteristic = {
            name: entry.target.name,
            value: entry.target.value || currentCharacteristic.value,
          };

          // Only map characteristics once (e.g.: there can be two gateway chracteristics mapped to the same chracteristic for a supplier)
          if (!characteristicsAlreadyMapped.has(entry.target.name)) {
            accum.push(newCharacteristic);
            characteristicsAlreadyMapped.add(entry.target.name);
          }
        }
      } else {
        accum.push(currentCharacteristic);
      }

      return accum;
    },
    []
  );
};

export const mapGatewayCharacteristics: CharacteristicsMapper = async (
  characteristics,
  supplier
) => performMappings(characteristics, supplier, MappingType.SUPPLIER_TO_GATEWAY)
  
export const mapSupplierCharacteristics: CharacteristicsMapper = async (
  characteristics,
  supplier
) => performMappings(characteristics, supplier, MappingType.GATEWAY_TO_SUPPLIER);
