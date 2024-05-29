import sum from "../src/sum";

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

describe('sum', () => {
    it('should add two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});