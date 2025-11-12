// js-graph/__tests__/graph.large.test.js

import Graph from '../../graph_oop.js';

function makeRing(n, km = 10) {
  const edges = [];
  for (let i = 0; i < n; i++) {
    const u = `C${i}`;
    const v = `C${(i + 1) % n}`;
    edges.push({ from: u, to: v, km });
  }
  return edges;
}

describe('Graph — large graphs', () => {
  test('builds a 1,000-node ring in reasonable time', () => {
    const N = 1000;
    const edges = makeRing(N);
    const t0 = performance.now();
    const g = Graph.fromEdges(edges);
    const t1 = performance.now();
    const duration = t1 - t0;

    expect(g.size).toBe(N);
    expect(g.edgeCount).toBe(N);
    expect(duration).toBeLessThan(1000); // soft limit
  });

  test('dedupes parallel edges by keeping minimum km', () => {
    const edges = [
      { from: 'A', to: 'B', km: 20 },
      { from: 'A', to: 'B', km: 15 },
      { from: 'B', to: 'A', km: 22 }
    ];
    const g = Graph.fromEdges(edges);
    const ab = g.neighbors('A').find(n => n.city === 'B');
    const ba = g.neighbors('B').find(n => n.city === 'A');
    expect(ab.km).toBe(15);
    expect(ba.km).toBe(15);
  });
});