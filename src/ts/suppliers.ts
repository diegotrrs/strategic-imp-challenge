export type SupplierMappingEntry = {
  sourceName: string;
  targetName: string;
  sourceValue?: string;
  targetValue?: string;
};

type SupplierEntry = {
  id: string;
  mappings: {
    supplierToGateaways?: SupplierMappingEntry[];
    gateawayToSuppliers?: SupplierMappingEntry[];
  };
};

const suppliers: SupplierEntry[] = [
  {
    id: "SupplierA",
    mappings: {
      supplierToGateaways: [
        {
          sourceName: "LINE_ID",
          targetName: "IDENTIFIER",
        },
        {
          sourceName: "LINE_PROFILE",
          targetName: "PROFILE",
          sourceValue: "1",
          targetValue: "1AB",
        },
      ],
      gateawayToSuppliers: [
        {
          sourceName: "IDENTIFIER",
          targetName: "LINE_ID",
        },
        {
          sourceName: "PROFILE",
          targetName: "LINE_PROFILE",
          sourceValue: "1AB",
          targetValue: "1",
        },
      ],
    },
  },
  {
    id: "SupplierB",
    mappings: {
      supplierToGateaways: [
        {
          sourceName: "LINE_PROFILE",
          targetName: "LINE_PROFILE",
          sourceValue: "1",
          targetValue: "ABC/123",
        },
      ],
      gateawayToSuppliers: [
        {
          sourceName: "LINE_PROFILE",
          targetName: "LINE_PROFILE",
          sourceValue: "CDE/123",
          targetValue: "2",
        },
      ],
    },
  },
  {
    id: "SupplierC",
    mappings: {
      supplierToGateaways: [
        {
          sourceName: "LINE_PROFILE",
          targetName: "UPSTREAM",
          sourceValue: "1",
          targetValue: "12",
        },
        {
          sourceName: "LINE_PROFILE",
          targetName: "DOWNSTREAM",
          sourceValue: "1",
          targetValue: "1000",
        },
      ],
      gateawayToSuppliers: [
        {
          sourceName: "UPSTREAM",
          targetName: "LINE_PROFILE",
          sourceValue: "12",
          targetValue: "1000",
        },
        {
          sourceName: "DOWNSTREAM",
          targetName: "LINE_PROFILE",
          sourceValue: "12",
          targetValue: "1000",
        },
      ],
    },
  },
];

export default suppliers;
