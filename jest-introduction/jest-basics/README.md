# Jest Basics

Welcome to the "Jest Basics" section of our Learning Jest repository! This folder is designed to introduce you to Jest and the concept of unit testing. We'll cover what Jest is, why it's used, and provide a simple example to get you started with writing tests using Jest in TypeScript.

## What is Jest?

Jest is a powerful JavaScript testing framework, designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an API that is approachable and familiar. Jest is used by teams of all sizes to test web applications, node.js services, and mobile apps.

## Why Unit Testing?

Unit testing is a software testing method where individual units or components of a software are tested independently. The purpose is to validate that each unit of the software performs as designed. This is crucial for:

- Identifying problems early in the development cycle.
- Guaranteeing that changes to your code do not break existing functionality.
- Simplifying integration.
- Documenting your codebase.

Unit tests are typically automated and can be run quickly and frequently, which is a key part of continuous integration practices.

## Example: Testing a Simple Function

Let's consider a simple function that adds two numbers, written in TypeScript. We'll write a test to ensure that this function is performing correctly.

1. **Create a file for our function (`sum.ts`):**

```typescript
function sum(a: number, b: number): number {
    return a + b;
}

export default sum;
```

This is just a sum function to show our example.


2. **Create a test file (`sum.test.ts`):**

```typescript
import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

describe('sum', () => {
    it('should add two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

```
Here is a breakdown of the test file:

#### Basic Test Example

```javascript
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
```

#### Explanation:
- **`test` Function**: This is a global function provided by Jest to define a test. The first argument is a string describing what the test does. In this case, it says "adds 1 + 2 to equal 3".
  
- **Callback Function**: The second argument is a callback function that Jest calls to run the test. This function contains the actual testing code.

- **`expect` Function**: Inside the test, the `expect` function is called. This function is used to make an assertion about a particular aspect of your code. In other words, it's used to check if something is true. In this case, it's checking the output of the `sum` function.

- **`toBe` Matcher**: This is what we call a "matcher" and it determines how the value given to `expect` is tested. Here, `toBe(3)` checks if the result of `sum(1, 2)` is exactly `3`.

#### Using `describe` and `it`

```javascript
describe('sum', () => {
    it('should add two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
```

#### Explanation:
- **`describe` Function**: This function is used to group together similar tests. It's very useful for organizing your tests and making the test output easier to read and manage. The first argument to `describe` is a string that describes the group of tests.

- **`it` Function**: This is an alias for the `test` function. It's used the same way as `test`, but it's often used inside `describe` blocks to make tests read more like a sentence: "it should add two numbers."

- **Nested Function Structure**: Inside the `describe` block, you use `it` to define individual tests. This hierarchical structure helps in organizing tests, especially when you have a large number of them, or when they cover multiple functions of a component or module.

<BR />

3. **Run the test:**

Open your terminal, navigate to the directory containing your project, and run:

```bash
npm test
```

This command will execute the test defined in `sum.test.ts`, and you should see an output indicating whether the test passed or failed.

## Next Steps

Explore more about Jest's features such as snapshots, mocks, and advanced configurations by reading the Jest documentation or continuing through our other guides in this repository.
