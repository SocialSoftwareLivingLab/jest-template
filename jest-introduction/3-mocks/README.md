# Mocks in Jest

Welcome to the "Mocks" section of our Learning Jest repository! In this folder, we delve into the concept of mocking in unit tests using Jest. Mocking is a powerful technique that allows you to isolate the piece of code you want to test by replacing its dependencies with mock objects that simulate the behavior of the real ones.

## What are Mocks?

Mocks are simulated objects that mimic the behavior of real objects in controlled ways. A mock can be set up to return certain values in response to function calls, which can be very useful in a test environment where you want to isolate the functionality of a specific module without invoking actual side effects or dependencies.

## Why Use Mocks?

- **Controlled Environment**: Mocks create a controlled test environment by mimicking specific functionalities and returning predictable responses.
- **Isolation**: By using mocks, you can isolate the piece of code you are testing. This helps ensure that your tests are not affected by external factors such as databases, APIs, or other services.
- **Performance**: Mocks help in avoiding calls to external services or databases, which can significantly speed up the execution of tests.
- **Flexibility**: You can test various scenarios by manipulating the responses of mocks without the need to alter the actual external dependencies.

## How to Use Mocks in Jest

Jest provides several ways to create and manage mocks, including automatic and manual mocks. You can create mocks for modules, functions, or even API calls.
## Example: Mocking And Spying on a Simple Dependency

Let's say we have a module that fetches user data from an API, processes it and log the current operation. We can mock this API call to ensure our tests run reliably and quickly.

### 1. User Service Module

```typescript
// userService.ts
import { fetchUserData } from './api';

export const getUserFullName = async (userId: string) => {
    const userData = await fetchUserData(userId);
    console.log(`Fetching data for user ID: ${userId}`);  // Logging the operation
    return `${userData.firstName} ${userData.lastName}`;
};
```

### 2. API Module

```typescript
// api.ts
export const fetchUserData = async (userId: string) => {
    // This function would normally fetch data from an external API
    throw new Error('fetchUserData must be mocked in tests');
};
```

### 3. Test with Mock

```typescript
import { getUserFullName } from './userService';
import * as api from './api';

jest.mock('./api', () => ({
    fetchUserData: jest.fn(() => Promise.resolve({ firstName: 'John', lastName: 'Doe' }))
}));

describe('getUserFullName', () => {
    it('returns the full name of the user and logs the operation', async () => {
        // Spy on console.log
        const consoleSpy = jest.spyOn(console, 'log');
        const fullName = await getUserFullName('123');

        expect(fullName).toBe('John Doe');
        expect(consoleSpy).toHaveBeenCalledWith('Fetching data for user ID: 123');

        // Clean up the spy to prevent memory leaks or affecting other tests
        consoleSpy.mockRestore();
    });
});
```

## Explanation:

- **`jest.mock`**: This function is used to automatically mock the `api` module. We define a custom implementation for `fetchUserData` that returns a promise resolved with a mock user object.
- The `getUserFullName` function uses this mock instead of the actual `api.fetchUserData`, allowing us to test it without making real API calls.
- The test checks if `getUserFullName` correctly constructs the full name based on the mocked data.
- **`jest.spyOn`**: This function is used to create a spy that tracks calls to `console.log`. It allows us to verify that logging occurs as expected without interfering with the functionality of `console.log`.
- **Assertion with Spy**: We use `expect(consoleSpy).toHaveBeenCalledWith(...)` to check if `console.log` was called with the correct arguments. This verifies that our function logs the expected message during its execution.
- **`mockRestore`**: After our assertions, we call `consoleSpy.mockRestore()` to restore `console.log` to its original state. This is important in a testing environment to ensure that changes made by spies do not affect other tests.

---

# Understanding Mocks, Stubs, and Spies

When writing tests for software, it's crucial to understand the tools at your disposal to isolate and inspect your code. Mocks, stubs, and spies are three such tools, each with specific purposes and use cases in the testing landscape. This guide will help you understand these concepts and how to apply them effectively.

## Mocks

**Definition**: Mocks are simulated objects that replace real objects in your testing environment. They are fully controllable by the tester and can be set up to return specific values, throw exceptions, or perform certain actions when methods are called.

**When to Use**:
- When you need to simulate complex object behaviors and have full control over their responses.
- When you want to verify interactions between different objects, such as ensuring specific methods are called.

**Example**:
```javascript
jest.mock('../api/userApi');
import { getUser } from '../api/userApi';

test('should call getUser', () => {
  getUser('userId');
  expect(getUser).toHaveBeenCalledWith('userId');
});
```

## Stubs

**Definition**: Stubs are a type of test double that replace functions with a simpler implementation that returns a fixed value. Stubs do not track calls or record behavior but serve purely to stand in for the real implementation.

**When to Use**:
- When you need to replace a function or object with a simplified version that provides a consistent return value.
- When testing code that depends on external systems or complex logic that is irrelevant to the test's purpose.

**Example**:
```javascript
function fetchData() {
  return true; // Stub replaces actual data fetching logic.
}

test('test fetchData function', () => {
  const result = fetchData();
  expect(result).toBe(true);
});
```

## Spies

**Definition**: Spies are used to track interactions with functions or methods. They wrap around existing functions, allowing them to operate normally while also recording information about their calls, arguments, and return values.

**When to Use**:
- When you want to observe the behavior of a function without affecting its execution.
- When you need to verify how functions are called during tests without disrupting their natural behavior.

**Example**:
```javascript
const consoleSpy = jest.spyOn(console, 'log');

test('logs correct message', () => {
  console.log('Test message');
  expect(consoleSpy).toHaveBeenCalledWith('Test message');
});
```

## Comparison

- **Mocks** are about creating a fake version of an object or function with behavior controlled by the tester. They are most useful for behavioral testing where how your code executes is as important as what it executes.
- **Stubs** provide predetermined responses and are useful for bypassing unnecessary complexity. They are mainly used in state verification testing.
- **Spies** provide insights into function usage without affecting their execution, ideal for integration tests where you need to verify that functions are called correctly while still performing their intended operations.

## Choosing the Right Tool

Selecting between mocks, stubs, and spies depends on your specific testing needs:
- Use **mocks** when you need to assert on the interaction between components.
- Use **stubs** when you need to isolate your test from external dependencies by providing a simplified output.
- Use **spies** when you want to perform checks on function calls while keeping their original functionality.

Understanding these tools and their appropriate applications can enhance your testing strategy, leading to more robust and maintainable code.

---

This guide provides a concise yet comprehensive look at mocks, stubs, and spies, helping you decide when and how to use each effectively in your testing practices.