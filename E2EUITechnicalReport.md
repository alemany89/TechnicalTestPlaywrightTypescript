
# E2E UI Technical report
[⬅️ Back to readme](README.md)
## 📌 Project Structure

The E2E framework that i've  designed is following  the **Page Object Model (POM)** pattern using  **Playwright** as testing framework. The UI project is organized into three main folders:

**🔹`tests/`**  
  Contains the `.spec.ts` files that define the test cases, organized by system feature.  

**🔹 `pages/`**  
  Includes all the classes representing pages that the test are using.  
  Each class encapsulates its own selectors and methods following the POM pattern.

**🔹 `support/`**  
  Contains utilities such as the fixture class, where all Page Objects are initialized and injected into the tests.  
  This centralizes the logic for creating page instances and leverages **Playwright's fixture system** each test instance has his own PO instances, which is really optime for having parallel tests.

## 🧱 Architecture choices

**🔹 Page Object Model**  
  The POM pattern is implemented to abstract interaction logic with the UI. This follows all the good practices for having a nice E2E Ui framework.

**🔹 TypeScript**  
  TypeScript is used for  typing  the classes and in general a better autocompletion, improving the development experience.

**🔹 ES Modules**  
  The project is configured to use ESNext modules to benefit from modern JavaScript features and keep compatibility with the latest library versions.

**🔹 Playwright HTML Reporter**  
  The built-in `html` reporter from Playwright is used to generate reports that facilitate result overview and doesnt require the use of external libraries, having everything centralized for the purpose of this technical task is always good.

## 🎯 Reasoning Behind Using Fixtures

Using **custom Playwright fixtures** to inject Page Objects into the tests provides:

- Guaranteed **test-level isolation** (each test has its own instances).
- Cleaner test code, avoiding manual instantiation of Page Objects in each test(and duplicating code).
- Full advantage of Playwright’s native features for **safe parallel execution**, as each test runs in its own isolated context.
- Dependency Injection of POs to every test that consumes them.

## 🧪 Selected Features and Testing Strategies

The framework focuses on covering two features provided by saucedemo website:

### ✅ `Login` feature scenarios 

- Focused on validating the login flow with a few negative scenarios

### ✅ `Product` feature scenarios

- Focused on covering differents scenarios from the product page perpective (buying a product, filtering products by criteria and redirection to about page)

---
[⬅️ Back to readme](README.md)
