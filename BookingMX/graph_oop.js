// js-graph/src/graph_oop.js
// ES Module — OOP-style graph with validation and utilities

/**
 * Edge payload
 * @typedef {{ from:string, to:string, km:number }} Edge
 */

/**
 * A simple weighted undirected graph for city distances.
 */
export default class Graph {
  constructor() {
    /** @type {Map<string, Map<string, number>>} */
    this.adj = new Map();
  }

  /**
   * Build a Graph from a list of edges. Validates by default.
   * @param {Edge[]} edges
   * @param {{validate?: boolean}} [opts]
   * @returns {Graph}
   */
  static fromEdges(edges, opts = { validate: true }) {
    if (!Array.isArray(edges)) {
      throw new TypeError("edges must be an array");
    }
    const g = new Graph();
    for (const e of edges) {
      g.addEdge(e.from, e.to, e.km);
    }
    if (opts.validate) g.validate();
    return g;
  }

  /**
   * Adds an undirected edge (u<->v) with distance km.
   */
  addEdge(u, v, km) {
    if (typeof u !== "string" || typeof v !== "string") {
      throw new TypeError("from/to must be strings");
    }
    if (u === "" || v === "") throw new TypeError("from/to cannot be empty");
    if (!Number.isFinite(km) || km < 0) {
      throw new RangeError("km must be a non-negative finite number");
    }
    if (u === v) {
      // Ignore self-loops to simplify visualization
      return;
    }
    this._link(u, v, km);
    this._link(v, u, km);
  }

  _link(a, b, km) {
    if (!this.adj.has(a)) this.adj.set(a, new Map());
    const prev = this.adj.get(a).get(b);
    if (typeof prev === "number") {
      this.adj.get(a).set(b, Math.min(prev, km)); // keep the smallest distance
    } else {
      this.adj.get(a).set(b, km);
    }
  }

  /**
   * Basic validation: checks degrees and weights.
   * Throws on invalid states.
   */
  validate() {
    for (const [u, nbrs] of this.adj.entries()) {
      if (!(nbrs instanceof Map)) throw new TypeError("Adjacency must be Map");
      for (const [v, km] of nbrs.entries()) {
        if (u === v) throw new Error("self-loops should not exist after addEdge");
        if (!Number.isFinite(km) || km < 0) {
          throw new RangeError("km must be non-negative finite number");
        }
      }
    }
    return true;
  }

  /**
   * Returns neighbors of a node.
   * @param {string} u
   * @returns {{ city:string, km:number }[]}
   */
  neighbors(u) {
    const nbrs = this.adj.get(u);
    if (!nbrs) return [];
    return [...nbrs.entries()].map(([city, km]) => ({ city, km }));
  }

  /** Number of nodes */
  get size() {
    return this.adj.size;
  }

  /** Count of undirected unique edges */
  get edgeCount() {
    let sum = 0;
    for (const [, nbrs] of this.adj) sum += nbrs.size;
    return Math.floor(sum / 2);
  }
}