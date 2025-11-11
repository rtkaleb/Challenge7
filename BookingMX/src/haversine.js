/**
 * Great-circle distance between two coordinates (lat, lng) in KM.
 * Throws TypeError for invalid inputs.
 */
function toRad(x) {
  return (x * Math.PI) / 180;
}

function validateCoord(c) {
  if (!c || typeof c.lat !== 'number' || typeof c.lng !== 'number' || Number.isNaN(c.lat) || Number.isNaN(c.lng)) {
    throw new TypeError('Invalid coordinate: expected {lat:number, lng:number}');
  }
  if (c.lat < -90 || c.lat > 90 || c.lng < -180 || c.lng > 180) {
    throw new RangeError('Coordinate out of range');
  }
}

function distanceKm(a, b) {
  validateCoord(a);
  validateCoord(b);
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const s = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  return +(R * c).toFixed(3);
}

module.exports = { distanceKm };
