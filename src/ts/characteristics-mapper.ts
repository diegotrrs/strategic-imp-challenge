export interface Characteristic {
  name: string;
  value: string;
}

type CharacteristicsMapper = (
  characteristics: Characteristic[],
  supplier: string
) => Promise<Characteristic[]>;

import mappings, { MappingCharacteristics, MappingsSourceTargets } from "./mappings";

/*
TODO Think about the approaching of keeping the SET with only strings.
*/

/**
 * 
 Finds the specific entry in the following array or gateawayToSuppliers
  supplierToGateaways: [
        {
          sources: [
            {
              name: "LINE_ID",
            },
          ],
          targets: [
            {
              name: "IDENTIFIER",
            },
          ],
        },
        {
          sources: [
            {
              name: "LINE_PROFILE",
              value: "1",
            },
          ],
          targets: [
            {
              name: "PROFILE",
              value: "1AB",
            },
          ],
        },
      ],


 */
const findMappingSourceTargetByCharacteristicName = (mappingCharacteristics: MappingsSourceTargets[], characteristic: Characteristic) => {
  return mappingCharacteristics.find((mappingEntry) => {
    return mappingEntry.sources.findIndex((source) => {
      // If the mapping rule has a value specified then use it as the criteria to find the mapping
      if(source.value){
        return source.name === characteristic.name && source.value === characteristic.value
      } else {
        return source.name === characteristic.name
      }
      
    }) !== -1
  })
}


const performMappings = async (
  characteristics: Characteristic[],
  supplier: string,
  mappingType: string
) => {
  const supplierMappings = mappings.find((s) => s.id === supplier)?.mappings;
  
  if (!supplierMappings) {
    return characteristics;
  }

  const mappingsForType: MappingsSourceTargets[] = supplierMappings[mappingType] || [];
  const mappedCharacteristics = new Set()

  const results = characteristics.reduce<Characteristic[]>(
    (accum: Characteristic[], currentCharacteristic: Characteristic) => {      
      // If the current characteristic has already been mapped then ignore. This happens in cases when there
      // is a M-1 relationshtio
      if(mappedCharacteristics.has(currentCharacteristic.name)){
        return accum
      }
      const mappingSourceTarget: MappingsSourceTargets | undefined = findMappingSourceTargetByCharacteristicName(mappingsForType, currentCharacteristic)

      if(!mappingSourceTarget){
        accum.push(currentCharacteristic);
        return accum;
      }
      const { sources, targets } = mappingSourceTarget

      // Mark add sources as already mapped
      for(let source of sources){
        mappedCharacteristics.add(source.name)
      }

      const newCharacteristics = targets.map(t => {
        return {
          name: t.name,
          value: t.value || currentCharacteristic.value
        }
      })

      accum.push(...newCharacteristics)

      return accum;
    },
    []
  );

  // const supplierMappings = mappings.find((s) => s.id === supplier)?.mappings;
  // if (!supplierMappings) {
  //   return characteristics;
  // }

  // const mappings: MappingsSourceTargets[] = supplierMappings[mappingsId] || [];

  // const results = characteristics.reduce<Characteristic[]>(
  //   (accum: Characteristic[], currentCharacteristic: Characteristic) => {
      
  //     const entries = mappings.filter((e: SupplierMappingEntry) => {
  //       return e.sourceName === currentCharacteristic.name;
  //     });

  //     if (entries.length === 0) {
  //       accum.push(currentCharacteristic);
  //       return accum;
  //     } else {
  //     }

  //     const entriesMapped = entries.map((e) => {
  //       const name = e?.targetName;

  //       return {
  //         name,
  //         value:
  //           e.sourceValue && e.targetValue
  //             ? e.targetValue
  //             : currentCharacteristic.value,
  //       };
  //     });

  //     accum.push(...entriesMapped);
  //     return accum;
  //   },
  //   []
  // );

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
