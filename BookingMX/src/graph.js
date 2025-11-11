/**
 * Graph builder for nearby cities relative to a destination.
 * Input: destination {id, name, lat, lng}, cities [{id, name, lat, lng}], options {maxDistanceKm, topK}
 * Output: { nodes: [...], edges: [...] }
 */
const { distanceKm } = require('./haversine');

function assertCity(c) {
  if (!c || typeof c !== 'object') throw new TypeError('City must be an object');
  const req = ['id','name','lat','lng'];
  for (const k of req) {
    if (!(k in c)) throw new TypeError(`City missing required field: ${k}`);
  }
  if (typeof c.id !== 'string' || !c.id.trim()) throw new TypeError('City.id must be a non-empty string');
  if (typeof c.name !== 'string' || !c.name.trim()) throw new TypeError('City.name must be a non-empty string');
  if (typeof c.lat !== 'number' || typeof c.lng !== 'number') throw new TypeError('City lat/lng must be numbers');
}

function dedupeById(arr) {
  const seen = new Set();
  return arr.filter(c => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });
}

function normalizeInput(destination, cities) {
  assertCity(destination);
  const arr = Array.isArray(cities) ? cities.slice() : [];
  const filtered = arr.filter(Boolean).map(c => ({
    id: String(c.id),
    name: String(c.name),
    lat: Number(c.lat),
    lng: Number(c.lng)
  }));
  filtered.forEach(assertCity);
  const unique = dedupeById(filtered).filter(c => c.id !== destination.id);
  return { destination, cities: unique };
}

function computeNearby(destination, cities, options = {}) {
  const { maxDistanceKm = 300, topK = 5 } = options;
  if (typeof maxDistanceKm !== 'number' || maxDistanceKm <= 0) throw new RangeError('maxDistanceKm must be > 0');
  if (typeof topK !== 'number' || topK <= 0) throw new RangeError('topK must be > 0');

  const augmented = cities.map(c => ({
    ...c,
    distanceKm: distanceKm(destination, c)
  })).filter(c => c.distanceKm <= maxDistanceKm);
  augmented.sort((a,b) => a.distanceKm - b.distanceKm);
  return augmented.slice(0, topK);
}

function buildGraph(destination, cities, options = {}) {
  const { destination: dest, cities: list } = normalizeInput(destination, cities);
  const nearby = computeNearby(dest, list, options);
  const nodes = [
    { id: dest.id, label: dest.name, type: 'destination' },
    ...nearby.map(c => ({ id: c.id, label: `${c.name} (${c.distanceKm} km)`, type: 'city' }))
  ];
  const edges = nearby.map(c => ({
    from: dest.id, to: c.id, weight: c.distanceKm
  }));
  return { nodes, edges, meta: { count: nearby.length } };
}

module.exports = {
  buildGraph,
  normalizeInput,
  computeNearby,
  assertCity
};
