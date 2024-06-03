import sum from "../src/sum";

describe('sum function', () => {
    test.each([
        {a: 1, b: 2, expected:3},
        {a: 2, b: 3, expected:5},
        {a: 4, b: 5, expected:9},
        {a: 0, b: 0, expected:0},
        {a: -1, b: 1, expected:0}
    ])('adds %a and %b to equal %result', ({a, b, expected}) => {
        expect(sum(a, b)).toBe(expected);
    });
});