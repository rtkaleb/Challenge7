# Technical Difficulties & Strategies – Sprint 2 (Jest + JS Graph)

> Complete this file after finishing your tests. Keep it concise and reflective.

## 1) Biggest blockers
- Example: Handling malformed input objects without crashing the graph builder.
- Example: Ensuring deterministic ordering when distances are equal.

## 2) What I tried vs. what worked
- Tried: Filtering invalid data late → too many throws inside render.
- Worked: Early validation (`assertCity`) + `normalizeInput` to clean data first.

## 3) Edge cases covered
- Empty city list, duplicated IDs, destination duplicated in list.
- Invalid coordinates (types and ranges).
- `maxDistanceKm` / `topK` invalid values.
- Tie-breaking for equal distances (implicit stable sort).

## 4) Evidence & Coverage
- Attach screenshots of `coverage/lcov-report/index.html` and terminal summary.
- Note final coverage % for branches, functions, lines, statements.

## 5) Next improvements
- Add caching for repeated distance calculations.
- Randomized fuzz tests to catch surprising shapes of data.
