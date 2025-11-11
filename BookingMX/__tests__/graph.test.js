const { buildGraph, normalizeInput, computeNearby, assertCity } = require('../src/graph');

describe('normalizeInput', () => {
  const dest = { id: 'MTY', name: 'Monterrey', lat: 25.6866, lng: -100.3161 };

  test('removes nulls, coerces types, dedupes and excludes destination', () => {
    const cities = [
      { id: 'GDL', name: 'Guadalajara', lat: 20.6597, lng: -103.3496 },
      null,
      { id: 'GDL', name: 'Guadalajara', lat: 20.6597, lng: -103.3496 },
      { id: 'MTY', name: 'Monterrey', lat: 25.6866, lng: -100.3161 }, // same as destination, should be excluded
      { id:  'SLP', name: 'San Luis Potosí', lat: 22.1565, lng: -100.9855 }
    ];
    const out = normalizeInput(dest, cities);
    expect(out.cities.map(c => c.id)).toEqual(['GDL', 'SLP']);
  });

  test('throws if destination invalid', () => {
    expect(() => normalizeInput(null, [])).toThrow(/City must be an object/);
  });
});

describe('computeNearby', () => {
  const dest = { id: 'MTY', name: 'Monterrey', lat: 25.6866, lng: -100.3161 };
  const cities = [
    { id: 'SALT', name: 'Saltillo', lat: 25.438, lng: -100.979 },
    { id: 'REYN', name: 'Reynosa', lat: 26.0922, lng: -98.2777 },
    { id: 'GDL', name: 'Guadalajara', lat: 20.6597, lng: -103.3496 },
    { id: 'CDMX', name: 'Ciudad de México', lat: 19.4326, lng: -99.1332 },
  ];

  test('honors maxDistanceKm and topK', () => {
    const nearby = computeNearby(dest, cities, { maxDistanceKm: 250, topK: 2 });
    expect(nearby.length).toBeLessThanOrEqual(2);
    expect(nearby.every(c => c.distanceKm <= 250)).toBe(true);
    // Ensure sorted ascending by distance
    for (let i = 1; i < nearby.length; i++) {
      expect(nearby[i].distanceKm).toBeGreaterThanOrEqual(nearby[i-1].distanceKm);
    }
  });

  test('throws for invalid options', () => {
    expect(() => computeNearby(dest, cities, { maxDistanceKm: 0 })).toThrow(/must be > 0/);
    expect(() => computeNearby(dest, cities, { topK: 0 })).toThrow(/must be > 0/);
  });
});

describe('buildGraph', () => {
  const dest = { id: 'MTY', name: 'Monterrey', lat: 25.6866, lng: -100.3161 };
  const cities = [
    { id: 'SALT', name: 'Saltillo', lat: 25.438, lng: -100.979 },
    { id: 'REYN', name: 'Reynosa', lat: 26.0922, lng: -98.2777 },
    { id: 'GDL', name: 'Guadalajara', lat: 20.6597, lng: -103.3496 },
    { id: 'CDMX', name: 'Ciudad de México', lat: 19.4326, lng: -99.1332 },
  ];

  test('returns nodes and edges with labels and weights', () => {
    const { nodes, edges, meta } = buildGraph(dest, cities, { maxDistanceKm: 900, topK: 3 });
    expect(nodes[0]).toEqual(expect.objectContaining({ id: 'MTY', type: 'destination' }));
    expect(edges.length).toBe(meta.count);
    expect(edges.every(e => e.from === 'MTY')).toBe(true);
  });

  test('handles empty city array gracefully', () => {
    const { nodes, edges, meta } = buildGraph(dest, [], { maxDistanceKm: 100 });
    expect(nodes.length).toBe(1);
    expect(edges.length).toBe(0);
    expect(meta.count).toBe(0);
  });

  test('propagates validation errors for malformed cities', () => {
    expect(() => buildGraph(dest, [{ id: 'XX', name: '', lat: 1, lng: 2 }], {})).toThrow(/City.name/);
  });
});

describe('assertCity', () => {
  test('validates required fields and types', () => {
    expect(() => assertCity({})).toThrow(/missing required field/);
    expect(() => assertCity({ id:'A', name:'X', lat:'1', lng:2 })).toThrow(/lat\/lng must be numbers/);
    expect(() => assertCity({ id:'', name:'X', lat:1, lng:2 })).toThrow(/non-empty string/);
  });
});
