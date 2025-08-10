# 🧪 E2E & API Testing Framework -> Playwright & TypeScript

[![E2E Tests status](https://img.shields.io/github/actions/workflow/status/alemany89/TechnicalTestPlaywrightTypescript/playwright-report.yml?branch=main&label=E2E%20Tests%20status)](https://github.com/alemany89/TechnicalTestPlaywrightTypescript/actions/workflows/playwright-report.yml)

This framework is made with the purpose of covering a technical task.

I made this framework for supporting automated testing for UI and API using **Playwright** and **TypeScript**, using design patterns like **Page Object Model (POM)**,and it is integrated with **GitHub Actions** for CI/CD using a self hosted **dockerized runner**.

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg" height="40"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="40"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="40"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original-wordmark.svg" height="40"/>

---

## 🧱 Architecture Decisions

To understand the technical structure and decisions behind this project, refer to:

- [E2E UI Technical report](E2EUITechnicalReport.md)
- [E2E API Technical report](E2EAPITechnicalReport.md)

---

### ▶️ How to run tests from GitHub Actions CI/CD ?

This project includes an automated GHA workflow using a self-hosted dockerized runner prepared by me
for the purpose of the techical task.

This workflow is configured to be launched by clicking the following button:

[![Run Tests](https://img.shields.io/badge/RUN%20TESTS-▶-blue?style=for-the-badge&logo=githubactions&logoColor=white)](https://gh-dispatch-api.onrender.com/webhook/089c101bf6d16f86b687bb71d1bcde82364110486ef4f060a1548ceaeef0ba83)

> **Note:** If you don’t have Write permissions on the repo, pipeline status won’t update live for you. If you don’t see changes after a few seconds, just refresh the page manually.


Once finished the report will be published on git pages(link also attached to the repository's description):

🔗 [View Playwright Report of the latest run](https://alemany89.github.io/TechnicalTestPlaywrightTypescript/)

The report includes:

- Pass/fail status of each test
- Automatic screenshots on failure
- Execution times
- Detailed step logs via `test.step()`

### 🛠️ What does this workflow do?

1. Clones the GitHub repository.
2. Installs all dependencies (`npm ci`).
3. Checks that the typescript code compiles properly
4. Runs Playwright tests(UI/API) in:

   - headless mode
   - runner uses 12 workers for running the suite
   - fully parallel mode (the workers are not limited to only be consumed by the spec files, but for each test method within each spec file also)

5. Generates an HTML report.
6. Publishes the report automatically to GitHub Pages.

the workflow is located at:

```
.github/workflows/playwright-report.yml
```

---

## 🦆 How to run the tests Locally?

### 1. Clone and install dependencies

```bash
git clone https://github.com/alemany89/TechnicalTestPlaywrightTypescript.git

cd TechnicalTestPlaywrightTypescript

npm ci
```

### 2. Download dependencies

```bash
npm install
```

### 3. Run tests

- Headless mode:

```bash
npm test
```

- Headed mode:

```bash
npm run test-headed
```

### 4. View the report locally

```bash
npx playwright show-report
```

---

## 👤 Author

Developed by **Luis Joaquín Alemany**  
📧 alemany89@hotmail.com  
🔗 https://github.com/alemany89
