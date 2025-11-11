const { distanceKm } = require('../src/haversine');

describe('distanceKm', () => {
  test('computes known distance approximately (CDMX-MTY ~ 705 km)', () => {
    const cdmx = { lat: 19.4326, lng: -99.1332 };
    const mty = { lat: 25.6866, lng: -100.3161 };
    const d = distanceKm(cdmx, mty);
    expect(d).toBeGreaterThan(650);
    expect(d).toBeLessThan(760);
  });

  test('validates coordinate formats and ranges', () => {
    expect(() => distanceKm({lat:'x', lng:0}, {lat:0, lng:0})).toThrow(/Invalid coordinate/);
    expect(() => distanceKm({lat:95, lng:0}, {lat:0, lng:0})).toThrow(/out of range/);
  });
});
