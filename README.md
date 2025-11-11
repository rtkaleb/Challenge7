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

## 📸 Evidence – Screenshots

| No. | Screenshot | Description |
|-----|-------------|-------------|
| 1 | ![JUnit Config](Images/img1.png) | JUnit and JaCoCo setup in IntelliJ |
| 2 | ![Passing Tests](Images/img2.png) | Successful test suite execution |
| 3 | ![Coverage Report](Images/img3.png) | JaCoCo report reaching 91% coverage |
| 4 | ![Jest Graph Test](Images/img4.png) | Jest coverage of nearby cities visualization |
| 5 | ![GitHub CI](Images/img5.png) | Automated test execution in GitHub Actions |

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


