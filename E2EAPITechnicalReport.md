# API Technical Report

[⬅️ Back to readme](README.md)

## 📌 Project Structure

The framework is structured to test API endpoints using **Playwright** pointing to 2 API Pet and User from the [petstore.swagge](<https://petstore.swagger.io/#/pet/addPet)>). The project includes the following key folders:

**🔹 `tests/`**
Contains `.spec.ts` files that define test cases for API endpoints, organized by resource (e.g., Pet, User).

**🔹 `support/`**
Includes the `fixtures.ts` file where API services are injected into tests using Playwright's fixture system.

**🔹 `builders/`**
Implements the **Builder Pattern** to generate request payloads (e.g., `PetBuilder`) with default values or easyly being able to create a PetDtoRequest object with custom values.

**🔹 `services/`**
Implements the **Service Pattern**, act as a layer which interacts with the API from a given resource (pet, user, etc), its like a translator between the test and the API.

**🔹 `dto/`**  
 Defines **Data Transfer Objects (DTOs)** using TypeScript interfaces that reflect the OpenAPI specification from [Swagger Petstore](https://petstore.swagger.io/).  
 DTOs are grouped by domain (`pet/`, `user/`) and used for both request bodies and response validation with typing purposes.

**🔹 `utils/`**
Includes the utility `polling.ts`, which provides a retry mechanism for unstable endpoints(Which was the case, i realized manually that after creating a pet, sometimes the GET doesnt brings the actual pet created)

## 🧱 Architecture Decisions

**🔹 Builder Pattern**
Used to easily generate request payloads while maintaining clarity and avoiding hard-coded inline JSON.

**🔹 Service Pattern**
All HTTP operations (POST, GET, PUT, DELETE) are encapsulated into dedicated service classes to separate concerns and offering reusability.

**🔹 Dependency Injection via Fixtures**
Services are injected using Playwright fixtures, ensuring each test has its own instance. This improves on isolation and enables parallel execution.

**🔹 Centralized API Testing with Playwright**
Instead of adopting a separate API testing framework, Playwright was used to unify UI and API testing. This keeps the changes being minimal and consistent.

**🔹 Retry Logic for Unstable GETs**
The `poll.ts` is a utility class that was introduced to repeatedly call flaky GET endpoints (such as those from the Pet API) until a success response or max retries.

## 🧪 Selected APIs and Testing Strategies

The framework focuses on covering two APIs provided by the Swagger Petstore:

### ✅ `User` API scenarios – **Negative testing**

- Focused on validating edge cases.
- Examples include attempting to get or create users with missing or invalid data.
- Ensures the API responds correctly to bad input.

### ✅ `Pet` API scenarios – **Full CRUD testing**

- Demonstrates end-to-end interaction with the resource.
- Covers create, read (by ID), update, and delete operations.
- Includes polling logic to handle eventual consistency in the API (e.g., `GET /pet/{id}` after a `POST`).

## Assumptions & Known Issues (Petstore)

1. During the analysis of how to cover the CRUD suite i found 2 issues that the test are fixing by themselves in order to accomplish the CRUD suite(my goal during the technical task is to show the flow, in a daily work bases these points shouldnt be handled by the test responsability, and these test **should fail** ):

	- The GET /pet or /DELETE endpoints are flakky(for the Pet API at least) and you need to call it multiple times in order to find/delete the pet that you previously added (thats why i implemented the pollin.ts class)

	- Even if the Pet model documentation at the swagger has the field **id** as optional, it not working as expected because the id autoincrement stay static when processing multiple post requests, the id is always the same number which bring wrong expected values, What the tests are doing under the hood trough the PetBuilder is to apply an id with Date.now() method and having an isolated value making the expected results reliable.

2. During the analysis of how to cover the Negative scenarios i found that in swagger there are no documentation regarding what are the bodies to be expected at the response level for negative scenarios, so my approach was to expect the same type of object that the actual api is using as response, which from my point of view should be documented or rised to clarify.

---

[⬅️ Back to readme](README.md)
