import { Characteristic } from "./characteristics-mapper";

type MappingCharacteristic = {
  name: Characteristic["name"];
  value?: Characteristic["value"];
}

export type Mappings = {
  supplierToGateaway?: {
    source: MappingCharacteristic,
    target: MappingCharacteristic,
  }[];
  gateawayToSupplier?: {
    source: MappingCharacteristic,
    target: MappingCharacteristic,
  }[];
}

type MappingsEntry = Record<string, Mappings>
 
const mappings: MappingsEntry = {
    "SupplierA": {
      supplierToGateaway: [
        {
          source: {
            name: "LINE_ID"
          },
          target: {
            name: "IDENTIFIER"
          }
        },
        {
          source: {
            name: "LINE_PROFILE",
            value: "1",
          },
          target: {
            name: "PROFILE",
            value: "1AB",
          }
        },
      ],
      gateawayToSupplier: [
        {
          source: {
            name: "IDENTIFIER",
          },
          target: {
            name: "LINE_ID",
          }
        },
        {
          source: {
            name: "PROFILE",
            value: "1AB",
          },
          target: {
            name: "LINE_PROFILE",
            value: "1"
          }
        },
      ],
    },
    "SupplierB": {
      supplierToGateaway: [
        {
          source: {
            name: "LINE_PROFILE",
            value: "1",
          },
          target: {
            name: "LINE_PROFILE",
            value: "ABC/123",
          }
        },        
      ],
      gateawayToSupplier: [
        {
          source: {
            name: "LINE_PROFILE",
            value: "CDE/123",
          },
          target: {
            name: "LINE_PROFILE",
            value: "2",
          }
        },        
      ],
    },      
    "SupplierC": {
      supplierToGateaway: [
        {
          source: {
            name: "LINE_PROFILE",
            value: "1",
          },
          target: {
            name: "UPSTREAM",
            value: "12",
          }
        },
        {
          source: {
            name: "LINE_PROFILE",
            value: "1",
          },
          target: {
            name: "DOWNSTREAM",
            value: "1000",
          }
        },  
      ],
      gateawayToSupplier: [
        {
          source: {
            name: "UPSTREAM",
            value: "12",
          },
          target: {
            name: "LINE_PROFILE",
            value: "1",
          }
        },
        {
          source: {
            name: "DOWNSTREAM",
            value: "1000",
          },
          target: {
            name: "LINE_PROFILE",
            value: "1",
          }
        }, 
      ],
    },  
  }
;

export default mappings;
