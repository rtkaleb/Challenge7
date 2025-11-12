// js-graph/__tests__/graph.performance.test.js

import Graph from '../../graph_oop.js';

function denseCluster(n, km = 5) {
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push({ from: `C${i}`, to: `C${j}`, km });
    }
  }
  return edges;
}

describe('Graph — performance under load', () => {
  jest.setTimeout(15000);

  test('constructs a 200-node dense cluster within soft threshold', () => {
    const N = 200; // ~19,900 edges
    const edges = denseCluster(N);
    const t0 = performance.now();
    const g = Graph.fromEdges(edges);
    const t1 = performance.now();
    const duration = t1 - t0;

    expect(g.size).toBe(N);
    expect(g.edgeCount).toBe((N * (N - 1)) / 2);
    expect(duration).toBeLessThan(8000); // soft, adjust if CI is slower
  });
});