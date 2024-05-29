# Setup and Teardown in Jest

In this section of the Learning Jest repository, we explore the concepts of setup and teardown in Jest. These are critical for preparing the environment for tests and cleaning up afterward, ensuring tests run in a controlled and repeatable environment.

## Understanding Setup and Teardown

Testing often involves setting up certain conditions before tests run and cleaning up after them. For example, you might need to make sure that some internal state always start the same when you run your tests. Jest provides several methods to handle setup and teardown, which can be used at different levels of your test suite:

- **Global Setup/Teardown**: Run once before and after all tests in your project.
- **File-level Setup/Teardown**: Run once before and after all tests in a particular test file.
- **Block-level Setup/Teardown**: Run before and after tests within a `describe` block.

## Jest's Setup and Teardown Functions

Jest offers specific functions to facilitate setup and teardown:

- `beforeAll`: Runs a function before any of the tests in a file run.
- `afterAll`: Runs a function after all the tests in a file have finished.
- `beforeEach`: Runs a function before each test in a file.
- `afterEach`: Runs a function after each test in a file.

Absolutely, let's design a more focused example that's relevant to unit testing without involving external dependencies like databases. A common use case for setup and teardown in unit tests is initializing and resetting mock data or configurations that may be used across multiple tests. Here's an example that demonstrates this concept using a simple configuration object that could influence the behavior of functions under test:


## Example: Initializing and Resetting Configuration Settings

In this example, we will demonstrate how to use Jest's setup and teardown functions to manage a configuration object that influences the behavior of the functions we are testing. This is common in scenarios where functions behave differently based on configuration settings.

### 1. Configuration Handler

Let's assume we have a configuration handler that can enable or disable certain features in our application:

```typescript
// configHandler.ts
let config = {
    featureEnabled: false,
};

const enableFeature = () => {
    config.featureEnabled = true;
};

const disableFeature = () => {
    config.featureEnabled = false;
};

const isFeatureEnabled = () => {
    return config.featureEnabled;
};

export { enableFeature, disableFeature, isFeatureEnabled };
```

### 2. Jest Test File with Setup and Teardown

In our test file, we want to ensure that `featureEnabled` is enabled before each test and disabled after each, to test the behavior under different conditions:

```typescript
import { enableFeature, disableFeature, isFeatureEnabled } from './configHandler';

// This will run before each test
beforeEach(() => {
    enableFeature();
});

// This will run after each test
afterEach(() => {
    disableFeature();
});

describe('Feature Tests', () => {
    test('should behave correctly when feature is enabled', () => {
        // The feature should be enabled
        expect(isFeatureEnabled()).toBe(true);
    });

    test('should behave differently when feature is disabled', () => {
        // Manually disable for this test
        disableFeature();
        expect(isFeatureEnabled()).toBe(false);
    });
});
```
Every test should be self contained, which means the order of tests and which test are executed may not influence the result of all the tests running. If you comment out the beforeEach and afterEach, you have no way of assuring the initial state of the featureEnabled variable, so the first test can break depending of the order they run.

In this example beforeEach and AfterEach are used in file level scope, the could also be used in describe level scope, which would make the beforeEach and afterEach run only for the tests inside the describe block. Another option is to set them globally, which would make them run for all tests in the project, which can be particularly useful for cleaning up global variables or things like that.

## Explanation:

- **`beforeEach`** is used here to ensure that the feature is enabled before each test runs. This is helpful when the default state of `featureEnabled` might be `false`, or if other tests change the state inadvertently.

- **`afterEach`** resets the feature to its disabled state after each test. This ensures that no residual state from one test can interfere with another, maintaining test isolation and reliability.

- The tests themselves check the behavior of the system when the feature is enabled and disabled, respectively. This setup allows us to verify that our application behaves correctly in both scenarios without needing to manually reset conditions for every test.

This example provides a clear demonstration of using Jest's setup and teardown functions to manage application state across tests, ensuring consistent and isolated testing environments for each test case.

