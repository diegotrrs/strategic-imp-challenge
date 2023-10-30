
// Mock Mappings used in the tests.

const testMappings = [
  {
    _id: "SupplierA",
    mappings: {
      gateawayToSupplier: [
        {
          source: {
            name: "LINE_ID",
          },
          target: {
            name: "IDENTIFIER",
          },
        },
        {
          source: {
            name: "LINE_PROFILE",
            value: "1",
          },
          target: {
            name: "PROFILE",
            value: "1AB",
          },
        },
      ],
      supplierToGateaway: [
        {
          source: {
            name: "IDENTIFIER",
          },
          target: {
            name: "LINE_ID",
          },
        },
        {
          source: {
            name: "PROFILE",
            value: "1AB",
          },
          target: {
            name: "LINE_PROFILE",
            value: "1",
          },
        },
      ],
    },
  },
  {
    _id: "SupplierB",
    mappings: {
      gateawayToSupplier: [
        {
          source: {
            name: "LINE_PROFILE",
            value: "1",
          },
          target: {
            name: "LINE_PROFILE",
            value: "ABC/123",
          },
        },
      ],
      supplierToGateaway: [
        {
          source: {
            name: "LINE_PROFILE",
            value: "CDE/123",
          },
          target: {
            name: "LINE_PROFILE",
            value: "2",
          },
        },
      ],
    },
  },
  {
    _id: "SupplierC",
    mappings: {
      gateawayToSupplier: [
        {
          source: {
            name: "LINE_PROFILE",
            value: "1",
          },
          target: {
            name: "UPSTREAM",
            value: "12",
          },
        },
        {
          source: {
            name: "LINE_PROFILE",
            value: "1",
          },
          target: {
            name: "DOWNSTREAM",
            value: "1000",
          },
        },
      ],
      supplierToGateaway: [
        {
          source: {
            name: "UPSTREAM",
            value: "12",
          },
          target: {
            name: "LINE_PROFILE",
            value: "1",
          },
        },
        {
          source: {
            name: "DOWNSTREAM",
            value: "1000",
          },
          target: {
            name: "LINE_PROFILE",
            value: "1",
          },
        },
      ],
    },
  },
  {
    _id: "TalkTalk",
    mappings: {
      supplierToGateaway: [
        {
          source: {
            name: "TALK_TALK_ID",            
          },
          target: {
            name: "IDENTIFIER",            
          },
        },        
      ],  
    },
  },
];

export default testMappings;
