// js-graph/__tests__/graph.malformed.test.js

import Graph from '../../graph_oop.js';

describe('Graph — malformed data', () => {
  test('rejects non-array edges', () => {
    expect(() => Graph.fromEdges(null)).toThrow(/array/i);
    expect(() => Graph.fromEdges({})).toThrow(/array/i);
  });

  test('rejects non-string city names', () => {
    expect(() => Graph.fromEdges([{ from: 1, to: 'B', km: 10 }])).toThrow(/strings/i);
    expect(() => Graph.fromEdges([{ from: 'A', to: {}, km: 10 }])).toThrow(/strings/i);
  });

  test('rejects empty city names', () => {
    expect(() => Graph.fromEdges([{ from: '', to: 'B', km: 10 }])).toThrow(/empty/i);
    expect(() => Graph.fromEdges([{ from: 'A', to: '', km: 10 }])).toThrow(/empty/i);
  });

  test('rejects negative/NaN/Infinity km', () => {
    expect(() => Graph.fromEdges([{ from: 'A', to: 'B', km: -1 }])).toThrow(/non-negative/i);
    expect(() => Graph.fromEdges([{ from: 'A', to: 'B', km: NaN }])).toThrow(/finite/i);
    expect(() => Graph.fromEdges([{ from: 'A', to: 'B', km: Infinity }])).toThrow(/finite/i);
  });

  test('ignores self-loops safely', () => {
    const g = Graph.fromEdges([{ from: 'A', to: 'A', km: 0 }]);
    expect(g.size).toBe(0);
    expect(g.edgeCount).toBe(0);
  });
});