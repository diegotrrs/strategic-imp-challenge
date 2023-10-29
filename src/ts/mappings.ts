import { Characteristic } from "./characteristics-mapper";

export type MappingCharacteristics = {
  name: Characteristic["name"];
  value?: Characteristic["value"];
};

export type MappingsSourceTargets = {
  sources: MappingCharacteristics[];
  targets: MappingCharacteristics[];
};

type MappingsEntry = {
  id: string;
  mappings: {
    supplierToGateaways?: MappingsSourceTargets[];
    gateawayToSuppliers?: MappingsSourceTargets[];
  };
};

const mappings: MappingsEntry[] = [
  {
    id: "SupplierA",
    mappings: {
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
      gateawayToSuppliers: [
        {
          sources: [
            {
              name: "IDENTIFIER",             
            },
          ],
          targets: [
            {
              name: "LINE_ID",
            },
          ],
        },
        {
          sources: [
            {
              name: "PROFILE",
              value: "1AB",
            },
          ],
          targets: [
            {
              name: "LINE_PROFILE",
              value: "1",
            },
          ],
        },
      ],
    },
  },
  {
    id: "SupplierB",
    mappings: {
      supplierToGateaways: [
        {
          sources: [
            {
              name: "LINE_PROFILE",
              value: "1",
            },
          ],
          targets: [
            {
              name: "LINE_PROFILE",
              value: "ABC/123",
            },
          ],
        },
      ],
      gateawayToSuppliers: [
        {
          sources: [
            {
              name: "LINE_PROFILE",
              value: "CDE/123",
            },
          ],
          targets: [
            {
              name: "LINE_PROFILE",
              value: "2",
            },
          ],
        },
      ],
    },
  },
  {
    id: "SupplierC",
    mappings: {
      supplierToGateaways: [
        {
          sources: [
            {
              name: "LINE_PROFILE",
              value: "1",
            },
          ],
          targets: [
            {
              name: "UPSTREAM",
              value: "12",
            },
            {
              name: "DOWNSTREAM",
              value: "1000",
            },
          ],
        },
      ],
      gateawayToSuppliers: [
        {
          sources: [
            {
              name: "UPSTREAM",
              value: "12",
            },
            {
              name: "DOWNSTREAM",
              value: "1000",
            },
          ],
          targets: [
            {
              name: "LINE_PROFILE",
              value: "1",
            },
          ],
        },
      ],
    },
  },
];

export default mappings;
