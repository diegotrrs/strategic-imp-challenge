import { Characteristic } from "./characteristics-mapper";

type MappingCharacteristic = {
  name: Characteristic["name"];
  value?: Characteristic["value"];
};

export type SupplierMappings = {
  _id: string,
  mappings: {
    supplierToGateaway?: {
      source: MappingCharacteristic;
      target: MappingCharacteristic;
    }[];
    gateawayToSupplier?: {
      source: MappingCharacteristic;
      target: MappingCharacteristic;
    }[];
  }
};