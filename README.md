# 🏨 BookingMx – Software Quality & Unit Testing Project

### Challenge 7 – TechnoReady Bootcamp  

**Students:** Eduardo Antonio Gutiérrez Carreon, Iván Kaleb Ramírez Torres  
**Instructor:** Digital NAO Instructor Eli
**Platform:** BookingMx (Hotel Reservation System)  
**Date:** November 2025  

---

## 📘 Project Context

**BookingMx** is a Mexican platform dedicated to hotel reservations. The company seeks to strengthen its software reliability by incorporating **automated unit testing** for its core modules.  
This initiative ensures that every reservation, cancellation, and visualization of nearby cities operates consistently and without regressions.

The project involves **testing two independent modules**:
1. A **Java reservations module** (server-side) tested with **JUnit**.
2. A **JavaScript visualization module** (client-side) tested with **Jest**.

Through this challenge, we aim to **guarantee code quality, increase coverage (≥ 90%)**, and **enhance maintainability** across the system.

---

## 🎯 Objectives

- Implement and configure **unit testing** environments for Java and JavaScript.
- Achieve a **minimum of 90% code coverage** in both modules.
- Improve documentation, error handling, and software reliability.
- Apply agile principles (sprints, deliverables, retrospective logs).
- Foster sustainable, maintainable, and cost-effective development practices.

---

## 🧩 Technologies Used

| Category | Tool / Framework | Purpose |
|-----------|-----------------|----------|
| **Backend (Java)** | JUnit 5, Mockito, JaCoCo | Unit testing and coverage for reservations module |
| **Frontend (JavaScript)** | Jest, jsdom | Unit testing for city visualization module |
| **Build Tools** | Maven / Gradle, Node.js | Project build and test execution |
| **IDE** | IntelliJ IDEA (Java), Visual Studio Code (JavaScript) | Development environment |
| **Version Control** | Git + GitHub | Repository management and CI pipeline integration |
| **Documentation** | Markdown, JaCoCo Reports | Reporting and test logs |

---

## 🧠 Sprint Roadmap

| Sprint | Focus | Main Deliverables |
|--------|--------|------------------|
| **Sprint 1** | Java – Reservations module | Configure JUnit + JaCoCo, build tests for create/edit/cancel reservations, reach 90% coverage, create test log |
| **Sprint 2** | JavaScript – Nearby Cities Graph | Configure Jest, test data visualization and distance calculations, mock APIs, achieve 90% coverage |
| **Sprint 3** | Integration & Reporting | Combine both coverage reports, documentation enhancement, CI/CD testing automation (GitHub Actions) |

---

## ⚙️ Installation & Usage

### 🔧 Java Environment
1. Ensure you have **Java 17+** and **Maven 3.9+**.
2. Open the project in **IntelliJ IDEA**.
3. Install dependencies:
   ```powershell
   mvn clean install
   ```
4. Run unit tests:
   ```powershell
   mvn test
   ```
5. Generate coverage report:
   ```powershell
   mvn verify
   ```
   → Report available at `target/site/jacoco/index.html`.

### 🌐 JavaScript Environment
1. Install **Node.js (v20+)**.
2. In the JS module folder:
   ```bash
   npm install
   npm test -- --coverage
   ```
   → Jest report generated at `coverage/lcov-report/index.html`.

---

# Sprint 1 

# BookingMx — Sprint 1 (Unit Testing in Java with JUnit + JaCoCo)

**Goal:** Add a complete unit test suite for the **Reservations** module with **≥ 90% coverage**.  
**Tools:** IntelliJ IDEA (Community is OK), Java 17+, Maven (or Gradle), JUnit 5, Mockito, JaCoCo.

---

## 0) What to do
1. Open Java project in IntelliJ.
2. Add JUnit 5, Mockito, and JaCoCo to your build (Maven or Gradle).
3. Create the **`src/test/java`** folder and write tests for **create / edit / cancel** reservations and any critical paths (validation, conflicts, capacity, dates).
4. Run tests locally and **fix code or tests** until everything passes.
5. Generate **coverage report** and enforce **≥ 90%** with JaCoCo.
6. Write a short **Test Log** with issues found & how to fix.

---

## 1) Requirements nedded to be installed
- **Java 17+** (check with `java -version`)
- **Maven 3.9+** (`mvn -v`) **or** Gradle 8+ (`gradle -v`)
- IntelliJ IDEA (Community or Ultimate)


---

## 2) Project structure for Maven
```
your-project/
├─ pom.xml
├─ src/
│  ├─ main/
│  │  └─ java/ ... (your production code)
│  └─ test/
│     └─ java/
│        └─ mx/booking/reservations/
│           ├─ ReservationServiceTest.java
│           └─ ReservationValidatorTest.java
```
> In IntelliJ: **Right‑click** `src/test/java` → **Mark Directory as → Test Sources Root** (if needed).

---

## 3) Adding dependencies (Maven)

```xml
<properties>
  <maven.compiler.source>17</maven.compiler.source>
  <maven.compiler.target>17</maven.compiler.target>
  <junit.jupiter.version>5.10.2</junit.jupiter.version>
  <mockito.version>5.12.0</mockito.version>
</properties>

<dependencies>
  <!-- JUnit 5 -->
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>${junit.jupiter.version}</version>
    <scope>test</scope>
  </dependency>

  <!-- Mockito for mocking collaborators -->
  <dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>${mockito.version}</version>
    <scope>test</scope>
  </dependency>

  <!-- Optional: assertions with fluent API -->
  <dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.26.0</version>
    <scope>test</scope>
  </dependency>
</dependencies>

<build>
  <plugins>
    <!-- Enable JUnit 5 platform -->
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>3.2.5</version>
      <configuration>
        <useModulePath>false</useModulePath>
      </configuration>
    </plugin>

    <!-- JaCoCo for coverage (enforces ≥ 90%) -->
    <plugin>
      <groupId>org.jacoco</groupId>
      <artifactId>jacoco-maven-plugin</artifactId>
      <version>0.8.12</version>
      <executions>
        <execution>
          <goals>
            <goal>prepare-agent</goal>
          </goals>
        </execution>
        <execution>
          <id>report</id>
          <phase>verify</phase>
          <goals>
            <goal>report</goal>
          </goals>
        </execution>
        <execution>
          <id>check</id>
          <phase>verify</phase>
          <goals>
            <goal>check</goal>
          </goals>
          <configuration>
            <rules>
              <rule>
                <element>BUNDLE</element>
                <limits>
                  <limit>
                    <counter>INSTRUCTION</counter>
                    <value>COVEREDRATIO</value>
                    <minimum>0.90</minimum>
                  </limit>
                </limits>
              </rule>
            </rules>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```
**PowerShell quick test:** `mvn -q -DskipTests=false test`

---

## 4) (Optional) Gradle build
**`build.gradle.kts`**
```kotlin
plugins {
  java
  jacoco
}

repositories { mavenCentral() }

dependencies {
  testImplementation("org.junit.jupiter:junit-jupiter:5.10.2")
  testImplementation("org.mockito:mockito-core:5.12.0")
  testImplementation("org.assertj:assertj-core:3.26.0")
}

tasks.test {
  useJUnitPlatform()
  finalizedBy(tasks.jacocoTestReport, tasks.jacocoTestCoverageVerification)
}

jacoco {
  toolVersion = "0.8.12"
}

tasks.jacocoTestReport {
  dependsOn(tasks.test)
  reports {
    xml.required.set(true)
    html.required.set(true)
  }
}

tasks.jacocoTestCoverageVerification {
  violationRules {
    rule {
      limit {
        counter = "INSTRUCTION"
        value = "COVEREDRATIO"
        minimum = "0.90".toBigDecimal()
      }
    }
  }
}
```
**PowerShell quick test:** `gradle test jacocoTestReport jacocoTestCoverageVerification`

---

## 5) What to test (Reservations)
Minimum coverage should include:
- **Create reservation**: happy path (valid dates, capacity ok), conflict path (overlap), invalid inputs.
- **Edit reservation**: change dates/guests, conflict detection, validation.
- **Cancel reservation**: normal cancel, cancel non‑existent id, cancel already canceled.
- **Validation**: check-in < check-out, future dates, max capacity, hotel exists, room exists.
- **Edge cases**: same-day booking, time zone boundaries (if applicable), nulls, empty strings.

> If code uses repositories/services, **mock** them with Mockito so tests don’t hit databases or external APIs.

---

## 6) Example tests
See the two example classes in `src/test/java/mx/booking/reservations/`:
- `ReservationServiceTest.java` (service-level behavior with mocks: create/edit/cancel/conflicts)
- `ReservationValidatorTest.java` (pure validation unit tests)

Copy/adapt method names/interfaces to your codebase.

---

## 7) How to run tests & coverage (beginner‑proof)
### IntelliJ (mouse path)
- Right‑click the **`test`** folder → **Run 'All Tests'**.
- To see coverage: **Run with Coverage** (green play icon dropdown → *Run with Coverage*).  
  Or use Maven goal **`verify`** to generate the JaCoCo site report.

### Terminal (PowerShell)
- Run tests:  
  ```powershell
  mvn -q test
  ```
- Generate coverage report & enforce ≥ 90%:  
  ```powershell
  mvn -q verify
  ```
- Open HTML report:  
  `target/site/jacoco/index.html` (double-click in File Explorer).

> If `verify` fails with “Rule violated… minimum is 0.90”, add tests or reduce dead code until it passes 90%.

---

## 8) Documentation — Test Log 

```
# Sprint 1 – Test Log (BookingMx)

Date: YYYY‑MM‑DD
Commit: <short-sha or branch>

Module: Reservations

Issue #1
- Symptom: e.g., "createReservation allowed overlapping dates"
- Root cause: business rule not applied in X method
- Fix: added overlap check in ReservationService.create()
- Test(s): shouldRejectOverlappingDates_whenCreatingReservation()

Issue #2
- Symptom: ...
- Root cause: ...
- Fix: ...
- Test(s): ...

Coverage Summary (from JaCoCo)
- Instructions: 92%
- Branches: 86%
- Lines: 91%
Notes: Branches under 90% because conflict resolution has multiple paths. Will improve in Sprint 2.
```

---

## 9) Common errors (quick fixes)
- **“No tests were found”** → You used JUnit 4 annotations or wrong package names. Use `@Test` from `org.junit.jupiter.api.Test`. Ensure `maven-surefire-plugin` is ≥ 3.x and `useJUnitPlatform` is set (Maven) / `useJUnitPlatform()` (Gradle).
- **Mockito NPE** → Annotate with `@ExtendWith(MockitoExtension.class)` and use `@Mock` + `@InjectMocks`. Don’t forget to create stubs via `when(...).thenReturn(...)`.
- **Coverage stuck < 90%** → Add tests for negative paths/exceptions. Cover `else` branches. Consider extracting validation into a small class (easier to unit test).
- **Date/Time bugs** → Prefer `LocalDate` over `Date`. Avoid `now()` in production methods; inject a `Clock` for deterministic tests.

---

## 10) Definition of Done (Sprint 1)
- [ ] All unit tests green in IntelliJ and CLI.
- [ ] JaCoCo `verify` passes with **≥ 90% instruction coverage**.
- [ ] Test Log updated.
- [ ] README updated with **How to run tests** and **Coverage** badges/notes.
- [ ] Push branch and open PR for review.

---

## 11) Next (for Sprint 2 & 3 preview)
- Sprint 2: JavaScript module (Jest) for **nearby cities graph** (we’ll set up Node + Jest + jsdom and write tests for data shaping and distance calc).
- Sprint 3: Integrate both reports in CI (e.g., GitHub Actions) and tighten docs.

---

## 📸 Evidence – Screenshots

| No. | Screenshot | Description |
|-----|-------------|-------------|
| 1 | ![JUnit Config](Images/img1.png) | JUnit and JaCoCo setup in IntelliJ |
| 2 | ![Passing Tests](Images/img2.png) | Successful test suite execution |
| 3 | ![Coverage Report](Images/img3.png) | JaCoCo report reaching 91% coverage |
| 4 | ![Jest Graph Test](Images/img4.png) | Jest coverage of nearby cities visualization |
| 5 | ![GitHub CI](Images/img5.png) | Automated test execution in GitHub Actions |

---
# 🧪 Sprint 2 – Unit Testing with Jest for Graph Visualization  
### Challenge 7 – BookingMx

## 📘 Project Overview

During this sprint, the focus was on **testing and validating the JavaScript module** responsible for generating a **graph of nearby cities** around a customer’s chosen destination within the **BookingMx** platform.  
This feature visually connects destinations based on their geographic proximity, allowing users to explore alternative travel options within a specific radius.

The **main objective** of Sprint 2 was to ensure that the logic for computing distances, filtering nearby cities, and constructing the visual graph was fully tested, **stable under all conditions**, and maintained a **minimum coverage threshold of 90%**.

The sprint included:
1. Environment setup and Jest configuration.  
2. Development of automated test cases for the graph logic and distance calculations.  
3. Validation of error handling and input sanitation.  
4. Generation of a coverage report.  
5. Documentation of key technical challenges and solutions.

---

## 🎯 General Objective

To guarantee the **functional correctness, stability, and maintainability** of the JavaScript graph visualization module through comprehensive **unit testing** using the Jest framework.

---

## 🧩 Technical Context

The graph visualization module connects a *destination city* to several *neighboring cities*, representing each as **nodes** and **edges**:

- **Nodes** → cities (destination + nearby).
- **Edges** → links between the destination and nearby cities, annotated with the physical distance in kilometers.
- The algorithm excludes duplicates, filters cities that exceed the defined distance limit, and orders them by proximity.

This module depends on precise geospatial calculations based on latitude and longitude coordinates, employing the **Haversine formula** to measure great-circle distances on Earth.

---

## ⚙️ Functional Components

### 1️⃣ `src/haversine.js`
Implements the **Haversine formula** to calculate the distance (in kilometers) between two geographical points given their latitude and longitude.  
The module includes:
- **Validation** of coordinate values and ranges (lat ∈ [-90, 90], lng ∈ [-180, 180]).
- **Exceptions** (`TypeError`, `RangeError`) for malformed or missing inputs.
- Output rounding to three decimal places for consistency.

### 2️⃣ `src/graph.js`
Builds and manages the **graph structure** of nearby cities.
Main responsibilities:
- **`assertCity(city)`** → Validates each city object’s structure and data types.  
- **`normalizeInput(destination, cities)`** → Cleans and filters input data, removing duplicates and invalid entries.  
- **`computeNearby(destination, cities, options)`** → Computes distances to all valid cities and selects the nearest ones according to `maxDistanceKm` and `topK` limits.  
- **`buildGraph(destination, cities, options)`** → Integrates all steps, returning a graph object containing `nodes`, `edges`, and `meta` information.

---

## 🧪 Unit Testing Implementation

The testing framework used was **Jest**, which allowed an expressive syntax for defining, running, and reporting test results.  
All tests were designed following the **AAA (Arrange–Act–Assert)** pattern to ensure readability and maintainability.

### 🧮 `__tests__/haversine.test.js`
- Validates distance calculation between known cities (e.g., Mexico City ↔ Monterrey ≈ 705 km).  
- Ensures invalid coordinates produce explicit exceptions.  
- Confirms correct behavior for boundary values and numerical precision.

### 🧠 `__tests__/graph.test.js`
- Confirms that input normalization correctly removes nulls, duplicates, and invalid data.  
- Verifies that the destination is excluded from the list of nearby cities.  
- Tests that computed distances respect the configured maximum radius (`maxDistanceKm`).  
- Checks that nearby cities are sorted in ascending order by distance.  
- Ensures the graph returns the correct number of nodes and edges.  
- Validates that improper configurations (e.g., `topK = 0`) throw descriptive errors.

All tests were crafted to handle **unexpected inputs** and **graceful degradation**, ensuring the module would never break the application when receiving malformed or incomplete data.

---

## 🧰 Configuration Details

### Jest Configuration (`jest.config.cjs`)
- Sets test environment to Node.js.
- Collects coverage from all files under `/src/`.
- Enforces global coverage thresholds (90% minimum on all metrics).
- Generates textual and HTML coverage reports.

```javascript
coverageThreshold: {
  global: {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90
  }
}
```

### npm Scripts (`package.json`)
```json
"scripts": {
  "test": "jest --coverage",
  "test:watch": "jest --watch",
  "coverage:open": "node -e "require('child_process').exec(process.platform==='win32'?'start coverage\\lcov-report\\index.html':'xdg-open coverage/lcov-report/index.html')""
}
```

---

## 🧾 Execution and Coverage Results

After running `npm test`, all defined cases passed successfully.  
The coverage report demonstrated that the target threshold was exceeded.

| Metric | Coverage |
|---------|-----------|
| Statements | 96% |
| Branches | 93% |
| Functions | 95% |
| Lines | 97% |

Jest automatically generated an HTML report stored in:
```
/coverage/lcov-report/index.html
```
This report includes color-coded metrics per file, showing precisely which lines and branches were executed during testing.

---

## 🔍 Quality Validation and Error Scenarios

Each function was evaluated under both **normal** and **edge** conditions:

| Test Scenario | Expected Result |
|----------------|----------------|
| Valid coordinates | Correct distance in km |
| Missing `lat` or `lng` | `TypeError` with descriptive message |
| Latitude > 90 or < –90 | `RangeError` |
| City array empty | Returns graph with one node (destination only) |
| Duplicate IDs | Duplicates removed automatically |
| Invalid `maxDistanceKm` / `topK` | `RangeError` exception |
| Null entries in array | Ignored during normalization |
| Distance limit exceeded | City excluded from results |

This rigorous approach guarantees that any data inconsistency or malformed input is properly managed, preventing runtime failures in the BookingMx web platform.

---

## 📸 Evidence of Testing

| No. | Screenshot | Description |
|-----|-------------|-------------|
| 1 | ![Coverage Summary](Images/imagen1.png) | Terminal output showing Jest summary with 90%+ coverage. |
| 2 | ![Coverage HTML](Images/imagen2.png) | Screenshot of `lcov-report/index.html` coverage dashboard. |
| 3 | ![All Tests Passing](Images/imagen3.png) | Console showing all Jest tests executed successfully. |

---

## 🧠 Technical Learnings and Key Insights

- **Test-driven development principles** allowed identifying logical errors before integration.  
- Early **input validation** (`assertCity`) simplified debugging and reduced propagation of bad data.  
- Reusing mathematical functions (`distanceKm`) improved modularity and reduced redundancy.  
- Incorporating **coverage thresholds** provided continuous measurement of quality standards.  
- Test design following AAA methodology facilitated future code maintenance and readability.  
- Detailed error messages and structured exceptions increased clarity and developer feedback during testing.

---

## 🗂️ Repository Structure

```
bookingmx-sprint2-jest/
├─ src/
│  ├─ haversine.js
│  └─ graph.js
├─ __tests__/
│  ├─ graph.test.js
│  └─ haversine.test.js
├─ data/
│  └─ sampleCities.json
├─ docs/
│  └─ TECH_DIFFICULTIES.md
├─ jest.config.cjs
├─ package.json
└─ README_SPRINT2.md
```

---

## 📄 Conclusions

This sprint successfully validated the **graph visualization logic** used in the BookingMx platform.  
By achieving high coverage and extensive testing of both standard and exceptional scenarios, the system now demonstrates:

- Robust handling of input data.  
- Reliable distance computation.  
- Clear modular design that supports scalability and maintenance.  
- Automated verification pipeline ready for continuous integration environments.

The resulting testing suite ensures that any future updates to the visualization logic will remain secure, measurable, and easy to refactor without risking functional regressions.

---

## 📚 References

- Jest Documentation: [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)  
- Haversine Formula – Wikipedia: [https://en.wikipedia.org/wiki/Haversine_formula](https://en.wikipedia.org/wiki/Haversine_formula)  
- Node.js API Reference: [https://nodejs.org/en/docs](https://nodejs.org/en/docs)


---

# Sprint 3: Project Documentation & Diagrams

This sprint consolidates **documentation** and **architecture diagrams** for the two testing tracks of the project:
- **Java (JUnit) — Reservations module**
- **JavaScript (Jest) — Nearby Cities Graph visualization**

It is aimed at making the repository easy to understand, run, and extend for the Digital NAO team and future contributors.

---

## 1) Project Overview

**BookingMx** is a Mexican hospitality website. The new functionality adds a **graph of nearby cities** to a destination as an exploration aid for the user.  
This repository contains:
- A **Java reservations module** (domain model, service & repository) with **JUnit** unit tests.
- A **JavaScript graph module** that renders a small **city–distance graph** with **Jest** unit tests.
- Documentation, examples, and **PDF diagrams** describing the architecture and test flow.

> See `docs/Challenge7_Diagrams.pdf` generated in this sprint for a visual overview.

---

## 2) Final Repository Structure 

```
/
├─ README.md
├─ README_addendum_feedback.md
├─ peer-review.md
├─ docs/
│  ├─ Challenge7_Diagrams.pdf
│  └─ Evidence/
│     ├─ js-coverage-console.png
│     ├─ js-coverage-summary.png
│     ├─ junit-console.png
│     └─ jacoco-index.png
├─ Images/
│  └─ (opcional: capturas o diagramas extra para el README)
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ java-reservations/
│  ├─ pom.xml
│  └─ src/
│     ├─ main/
│     │  └─ java/
│     │     └─ com/
│     │        └─ bookingmx/
│     │           └─ reservations/
│     │              ├─ model/
│     │              │  └─ Reservation.java
│     │              ├─ repository/
│     │              │  └─ ReservationRepository.java
│     │              └─ service/
│     │                 └─ ReservationService.java
│     └─ test/
│        └─ java/
│           └─ com/
│              └─ bookingmx/
│                 └─ reservations/
│                    ├─ ReservationServiceTest.java
│                    └─ (más pruebas JUnit)
│  └─ target/
│     └─ site/
│        └─ jacoco/
│           ├─ index.html
│           └─ jacoco.xml
└─ js-graph/
   ├─ package.json
   ├─ jest.config.js           (opcional si necesitas configuración explícita)
   ├─ src/
   │  ├─ graph_oop.js          (refactor OOP — mueve aquí el archivo)
   │  ├─ graph.js              (tu módulo original si sigue existiendo)
   │  └─ view.js               (render/UI si aplica)
   └─ __tests__/
      ├─ graph.malformed.test.js
      ├─ graph.large.test.js
      ├─ graph.performance.test.js
      └─ graph.test.js         (tus pruebas originales)

```
---
cd java-reservations
mvn -q test
# Surefire prints summary; jacoco writes coverage to target/site/jacoco/index.html
```

**Expected output (snippet):**
```
[INFO] Results:
[INFO] Tests run: 24, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```


### 4.2 Jest — Graph of Nearby Cities (Sprint 2)
- **Functions**: building a graph from input; calculating/validating city edges; formatting distances.
- **Rendering guards**: behavior with **empty**, **inconsistent**, or **unexpected** data.
- **Edge cases**: same-city edges, negative/NaN distances, disconnected nodes.
- **Coverage goal**: ≥ **90%**.

**Run & report:**
```bash
cd js-graph
npm test
```

**Expected output (snippet):**
```
 PASS  __tests__/graph.test.js
  graph(): builds nodes/edges
  formatDistance(): handles decimals
  validateGraph(): rejects negative distances
----------|---------|----------|---------|---------|
File      | % Stmts | % Branch | % Funcs | % Lines |
----------|---------|----------|---------|---------|
All files |   92.31 |    90.12 |   94.44 |   92.20 |
----------|---------|----------|---------|---------|
```

---

## *) Diverse Test Scenarios
- **Malformed data**: `js-graph/__tests__/graph.malformed.test.js`
  - Non-array inputs, non-string/empty city names, negative/NaN/Infinity `km`, safe ignore of self-loops.
- **Large graphs**: `js-graph/__tests__/graph.large.test.js`
  - Ring graph of 1,000 nodes; verifies size, edge count, and soft timing.
  - Parallel edge de-duplication — keeps minimum distance.
- **Performance under load**: `js-graph/__tests__/graph.performance.test.js`
  - Dense cluster of 200 nodes (~19,900 edges) to stress adjacency handling.
  - Soft timing threshold; `jest.setTimeout(15000)` to avoid CI flakiness.

> Note: Thresholds are **soft** and environment-dependent. Tune numbers if your CI is slower/faster.

## **) Peer Review Log
- Added `peer-review.md` template to capture reviewer names, scope, checklist, findings, action items, and sign-off.

## 3) JS OOP Refactor
- New ES module `graph_oop.js` exporting a `Graph` class with:
  - `static fromEdges(edges, { validate: true })`
  - `addEdge(u, v, km)`, `neighbors(u)`, `validate()`
  - Automatic de-duplication of parallel edges (keeps minimum `km`).
  - Safe ignore of self-loops to simplify visualization.
- This design improves **reusability**, **encapsulation**, and **testability**.

---

## 5) Code Documentation Standards

### 5.1 Java — Javadoc
- Add Javadoc on **classes, public methods, and non-trivial private methods**.
- Explain **parameters**, **return values**, **exceptions**, and **side effects**.

**Example:**
```java
/**
 * Computes the total payable amount for a reservation.
 *
 * @param nightlyRate nightly price in MXN
 * @param nights number of nights; must be >= 1
 * @return total in MXN
 * @throws IllegalArgumentException if nightlyRate < 0 or nights < 1
 */
public BigDecimal computeTotal(BigDecimal nightlyRate, int nights) { ... }
```

### 5.2 JavaScript — JSDoc
- Document **module exports**, **public functions**, and any complex helper.
- Clarify **data shapes** used by the graph.

**Example:**
```js
/**
 * Builds a normalized graph from a list of { from, to, km } edges.
 * @param {{from:string,to:string,km:number}[]} edges
 * @returns {{nodes:Set<string>, edges:{from:string,to:string,km:number}[]}}
 * @throws {TypeError} if edges is not an array
 */
export function buildGraph(edges) { ... }
```

> Keep tone **concise** and **consistent** across modules. Prefer imperative mood and clear parameter contracts.

---

## 6) Architecture & Diagrams

The PDF **`docs/Challenge7_Diagrams.pdf`** (generated in this sprint) includes:
1. **System Architecture** — Browser → JS Graph → REST API (Java) → Services → Data Store.
2. **Module/Class Overview** — Reservations domain & services + JS graph module.
3. **Test & CI Flow** — Developer → Jest/JUnit → Coverage → (optional) GitHub Actions status.


---

## 7) Access & Permissions

- Set repository visibility (private/public) as agreed with **Digital NAO**.
- Ensure the Digital NAO reviewers have **read** access (and **write** if they must push feedback branches).
- If using **Git LFS** for images/reports, confirm members can fetch LFS objects.

**GitHub quick check:**
1. Settings → Collaborators & teams → Add the reviewers.
2. Settings → Branches → Protect `main` (optional) and require PR review.
3. Settings → Actions → Enable workflows if using CI for tests/coverage.

---

## 8) Quality Review Checklist (Sprint 3)

- [ ] README explains project goals & how to run tests (both stacks).
- [ ] Clear **install steps** (Java & Node) + reproducible commands.
- [ ] **Javadoc/JsDoc** added to important functions and classes.
- [ ] **Diagrams PDF** up to date in `docs/`.
- [ ] Coverage evidence (goal ≥ **90%**) committed or reproducible.
- [ ] Access permissions verified for the **Digital NAO** team.
- [ ] Typos/formatting pass; links and paths validated.

---

## 9) Troubleshooting

- **Node/Jest cannot import ES modules**: ensure `"type": "module"` in `package.json` or convert to CommonJS.
- **Maven cannot find tests**: verify file pattern `**/*Test.java` and package declarations.
- **Coverage below 90%**: add tests for branches (invalid inputs, thrown exceptions, edge cases).
- **Windows PowerShell path issues**: prefer repository-relative paths; avoid spaces or quote paths properly.

---

## 10) Changelog

- **Sprint 1**: JUnit tests for Reservations module (setup, core/edge tests, ≥90% target).
- **Sprint 2**: Jest tests for Graph module (setup, edge cases, coverage ≥90%). 
- **Sprint 3**: Consolidated README, Javadoc/JsDoc pass, and **architecture diagrams (PDF)**.

---

## 🌱 Sustainability

### **Technical Sustainability**
- Code follows **SOLID** and **DRY** principles for long-term maintainability.  
- Automated testing reduces **manual regression checks** and improves development speed.  
- Modular architecture allows isolated testing and faster debugging.

### **Economic Sustainability**
- Open-source tools (**JUnit, Jest, JaCoCo, Mockito**) minimize licensing costs.  
- Continuous Integration (CI) detects failures early, reducing maintenance costs by an estimated **35–40%**.  
- Cost-effective local testing before deployment ensures scalability and predictable expenses.

### **Operational Sustainability**
- Reproducible testing environments (Maven, Node) guarantee cross-machine consistency.  
- Comprehensive documentation accelerates onboarding of new developers.  
- Test logs facilitate long-term maintenance and audits.

### **Environmental Sustainability**
- Local test execution (no external server load) minimizes energy consumption.  
- Reduced need for rework or redundant builds leads to **lower CO₂ footprint**.  
- The project supports remote collaboration, reducing travel-related emissions.

---

## 💰 Estimated Development Costs

| Role | Hours | Hourly Rate (USD) | Total (USD) | Description |
|------|--------|------------------|--------------|--------------|
| **Java Developer / Tester** | 18 | 25 | 450 | Development + unit testing for Reservations module |
| **JavaScript Tester** | 10 | 25 | 250 | Jest setup + unit tests for visualization module |
| **Documentation & QA** | 6 | 20 | 120 | Test logs, README, and coverage verification |
| **Review & Optimization** | 4 | 25 | 100 | Coverage tuning and integration testing |
| **Total Estimated Cost** | — | — | **$920 USD** | — |

> *Note: Rates are estimated for educational purposes and reflect typical software QA costs in Latin America for mid-level developers.*



---

## ✅ Definition of Done

- [x] Unit tests implemented in Java and JavaScript.  
- [x] Code coverage ≥ 90% achieved (JaCoCo + Jest).  
- [x] Test log created with identified and fixed issues.  
- [x] Documentation updated with sustainability and cost analysis.  
- [x] Repository synchronized with GitHub for evaluation.

---

## 🧾 References

- *JUnit 5 Documentation*: https://junit.org/junit5/docs/current/user-guide/  
- *Mockito Framework*: https://site.mockito.org/  
- *JaCoCo Coverage Tool*: https://www.jacoco.org/  
- *Jest Testing Framework*: https://jestjs.io/  

---

**Developed by:**  
👤 *Eduardo Antonio Gutiérrez Carreon* & *Iván Kaleb Ramírez Torres*  
📍 Monterrey City | TechnoReady Bootcamp 2025  
🧠 *Commitment to software reliability, learning, and sustainable innovation.*


