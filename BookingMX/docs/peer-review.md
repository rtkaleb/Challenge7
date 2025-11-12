# 🤝 Peer Review & Feedback Log — Challenge 7

This document centralizes collaborative validation for the project. Use it on each PR and Sprint milestone.

## 1) Reviewers
- Reviewer 1: _Name, Role, GitHub handle_
- Reviewer 2: _Name, Role, GitHub handle_
- Mentor/Coach: _Name_

## 2) Scope of Review
- [ ] Java — Reservations module (JUnit)
- [ ] JavaScript — Graph module (Jest)
- [ ] Documentation (README, Diagrams, Javadoc/JsDoc)
- [ ] Coverage (≥ 90%)
- [ ] CI status (if applicable)

## 3) Checklist (Yes/No/N.A. + Notes)
- [ ] **Clarity:** Code is readable and commented (Javadoc/JsDoc consistent).
- [ ] **Correctness:** Tests cover core logic and edge cases; all pass locally.
- [ ] **Robustness:** Handles malformed data, empty inputs, and extreme/large inputs.
- [ ] **Performance:** Acceptable runtime/memory for large graphs and typical reservations load.
- [ ] **Design:** JS graph adopts OOP modules/classes where it helps reuse and testability.
- [ ] **Security/Validation:** Inputs validated; no obvious injection/DoS risks.
- [ ] **Docs:** README and diagrams reflect the current architecture and usage.
- [ ] **Evidence:** Coverage screenshots/reports committed to `docs/`.
- [ ] **Repo Hygiene:** Branch naming, PR description, commit messages, labels.

## 4) Findings
- **Strengths:**  
  - _e.g., Clear separation of concerns in Service vs Repository_
- **Issues / Suggestions:**  
  1. _e.g., Validate `km` for non-number values in buildGraph()_  
  2. _e.g., De-duplicate symmetric edges (A→B vs B→A) in view layer_

## 5) Action Items
| # | Owner | Description | Priority | Due |
|---|------|-------------|----------|-----|
| 1 | @owner | Fix negative/NaN `km` handling | High | YYYY-MM-DD |
| 2 | @owner | Add large graph test (n=1000 nodes) | Medium | YYYY-MM-DD |
| 3 | @owner | Refactor to `Graph` class (JS) | Medium | YYYY-MM-DD |

## 6) Decision / Sign-off
- [ ] Approved
- [ ] Approved with comments
- [ ] Changes requested

**Signatures / Handles:**  
- _Reviewer(s):_  
- _Owner:_