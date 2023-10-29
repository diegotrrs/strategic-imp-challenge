interface Characteristic {
  name: string;
  value: string;
}

type CharacteristicsMapper = (
  characteristics: Characteristic[],
  supplier: string
) => Promise<Characteristic[]>;

import suppliers, { SupplierMappingEntry } from "./suppliers";

const performMappings = async (
  characteristics: Characteristic[],
  supplier: string,
  mappingsId: string
) => {
  const supplierMappings = suppliers.find((s) => s.id === supplier)?.mappings;
  if (!supplierMappings) {
    return characteristics;
  }

  const mappings: SupplierMappingEntry[] = supplierMappings[mappingsId] || [];

  const results = characteristics.reduce<Characteristic[]>(
    (accum: Characteristic[], currentCharacteristic: Characteristic) => {
      
      const entries = mappings.filter((e: SupplierMappingEntry) => {
        return e.sourceName === currentCharacteristic.name;
      });

      if (entries.length === 0) {
        accum.push(currentCharacteristic);
        return accum;
      } else {
      }

      const entriesMapped = entries.map((e) => {
        const name = e?.targetName;

        return {
          name,
          value:
            e.sourceValue && e.targetValue
              ? e.targetValue
              : currentCharacteristic.value,
        };
      });

      accum.push(...entriesMapped);
      return accum;
    },
    []
  );

  return results;
};

export const mapGatewayCharacteristics: CharacteristicsMapper = async (
  characteristics,
  supplier
) => {
  return performMappings(characteristics, supplier, "supplierToGateaways");
};

export const mapSupplierCharacteristics: CharacteristicsMapper = async (
  characteristics,
  supplier
) => {
  return performMappings(characteristics, supplier, "gateawayToSuppliers");
};
