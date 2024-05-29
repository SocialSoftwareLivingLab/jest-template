import { resolveExpression } from "../math/resolveExpression";
import * as resolveSignModule from "../math/resolveSign";

describe('# Resolução das Expressões', () => {
    let _mock: jest.SpyInstance;

    beforeEach(() => {
        _mock = jest.spyOn(resolveSignModule, "resolveSign")
        .mockReturnValueOnce(3 + 2)
        .mockReturnValueOnce(4 + 5)
        .mockReturnValueOnce(3 * 9)
        .mockReturnValueOnce(5 * 27);
    });

    it('Deve resolver uma expressão simples', () => {
        expect(resolveExpression('(2+3)')).toBe('5');
        expect(_mock).toHaveBeenCalledTimes(1);
        expect(_mock).toHaveBeenCalledWith(2, 3, '+');
    });

    it('Deve resolver uma expressão com mais de um par de parênteses', () => {
        const result = resolveExpression('(3+2) * (3*(4+5))')
        
        expect(_mock).toHaveBeenNthCalledWith(1, 3, 2, '+');
        expect(_mock).toHaveBeenNthCalledWith(2, 4, 5, '+');
        expect(_mock).toHaveBeenNthCalledWith(3, 3, 9, '*');
        expect(_mock).toHaveBeenNthCalledWith(4, 5, 27, '*');
        expect(_mock).toHaveBeenCalledTimes(4);
        expect(result).toBe('135');
    });
});