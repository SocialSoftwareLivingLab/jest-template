import {it, expect} from '@jest/globals';

function helloWorld(name: string){
    return `Hello, ${name}!`;
}

it('should return "Hello, World!"', () => {
    const result = helloWorld('World');
    expect(result).toBe('Hello, World!');
});