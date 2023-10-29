import { assert } from 'chai';
import { mapSupplierCharacteristics, mapGatewayCharacteristics } from './characteristics-mapper.ts';

describe('Mapping from Gateway to Supplier', () => {
  it('should map gateway characteristics to supplier characteristics where mappings exist', async () => {
    const gatewayCharacteristics = [
      { name: 'LINE_ID', value: '12345' }, // SupplierA has mapping for this characteristic name
      { name: 'LINE_PROFILE', value: '1' }, // SupplierA has mapping for this characteristic name and value
    ];

    const mappedSupplierCharacteristics = await mapGatewayCharacteristics(
      gatewayCharacteristics,
      'SupplierA'
    );

    assert.deepStrictEqual(mappedSupplierCharacteristics, [
      { name: 'IDENTIFIER', value: '12345' },
      { name: 'PROFILE', value: '1AB' },
    ]);
  });

  it('should map gateway characteristics to supplier characteristics where partial mapping exist', async () => {
    const gatewayCharacteristics = [
      { name: 'LINE_ID', value: '12345' }, // SupplierB has no mapping for this characteristic or value
      { name: 'LINE_PROFILE', value: '1' }, // SupplierB has mapping for this characteristic value
    ];

    const mappedSupplierCharacteristics = await mapGatewayCharacteristics(
      gatewayCharacteristics,
      'SupplierB'
    );

    assert.deepStrictEqual(mappedSupplierCharacteristics, [
      { name: 'LINE_ID', value: '12345' },
      { name: 'LINE_PROFILE', value: 'ABC/123' },
    ]);
  });

  it('should map 1 to many gateway characteristics to supplier characteristics', async () => {
    const gatewayCharacteristics = [
      { name: 'LINE_PROFILE', value: '1' }, // SupplierC has 1-many mapping for this characteristic
    ];

    const mappedSupplierCharacteristics = await mapGatewayCharacteristics(
      gatewayCharacteristics,
      'SupplierC'
    );

    assert.deepStrictEqual(mappedSupplierCharacteristics, [
      { name: 'UPSTREAM', value: '12' },
      { name: 'DOWNSTREAM', value: '1000' },
    ]);
  });

  it('should pass characteristics through if no mapping rules exist for the supplier', async () => {
    const gatewayCharacteristics = [
      { name: 'LINE_ID', value: '12345' }, // SupplierX has no mapping rules
      { name: 'LINE_PROFILE', value: '1' },
    ];

    const mappedSupplierCharacteristics = await mapGatewayCharacteristics(
        gatewayCharacteristics,
      'SupplierX'
    );

    assert.deepStrictEqual(mappedSupplierCharacteristics, gatewayCharacteristics);
  });
});

describe('Mapping from Supplier to Gateway', () => {
  it('should map supplier characteristics to gateway characteristics where mappings exist', async () => {
    const supplierCharacteristics = [
      { name: 'IDENTIFIER', value: '54321' }, // SupplierA has mapping for this characteristic name
      { name: 'PROFILE', value: '1AB' }, // SupplierA has mapping for this characteristic name and value
    ];

    const mappedGatewayCharacteristics = await mapSupplierCharacteristics(
      supplierCharacteristics,
      'SupplierA'
    );

    assert.deepStrictEqual(mappedGatewayCharacteristics, [
      { name: 'LINE_ID', value: '54321' },
      { name: 'LINE_PROFILE', value: '1' },
    ]);
  });

  it('should map supplier characteristics to gateway characteristics where partial mapping exist', async () => {
    const supplierCharacteristics = [
      { name: 'LINE_ID', value: '54321' }, // SupplierB has no mapping for this characteristic or value
      { name: 'LINE_PROFILE', value: 'CDE/123' }, // SupplierB has mapping for this characteristic value
    ];

    const mappedGatewayCharacteristics = await mapSupplierCharacteristics(
      supplierCharacteristics,
      'SupplierB'
    );

    assert.deepStrictEqual(mappedGatewayCharacteristics, [
      { name: 'LINE_ID', value: '54321' },
      { name: 'LINE_PROFILE', value: '2' },
    ]);
  });

  it('should map many to 1 supplier characteristics to gateway characteristics', async () => {
    const supplierCharacteristics = [
      { name: 'UPSTREAM', value: '12' }, // SupplierC has 1-many mapping for these characteristic
      { name: 'DOWNSTREAM', value: '1000' },
    ];

    const mappedGatewayCharacteristics = await mapSupplierCharacteristics(
      supplierCharacteristics,
      'SupplierC'
    );

    assert.deepStrictEqual(mappedGatewayCharacteristics, [
      { name: 'LINE_PROFILE', value: '1' },
    ]);
  });

  it('should pass characteristics through if no mapping rules exist for the supplier', async () => {
    const supplierCharacteristics = [
      { name: 'LINE_ID', value: '54321' }, // SupplierX has no mapping rules
      { name: 'LINE_PROFILE', value: '3' },
    ];

    const mappedGatewayCharacteristics = await mapSupplierCharacteristics(
        supplierCharacteristics,
      'SupplierX'
    );

    assert.deepStrictEqual(mappedGatewayCharacteristics, supplierCharacteristics);
  });
});
