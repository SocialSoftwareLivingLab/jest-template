import { resolveExpression } from "../math/resolveExpression";

describe('# Resolução das Expressões', () => {
    it('Deve resolver uma expressão simples', () => {
        expect(resolveExpression('(2+3)')).toBe('5');
        expect(resolveExpression('2 + 3')).toBe('5');
        expect(resolveExpression('8 - 3')).toBe('5');
    });

    it('Deve resolver uma expressão com mais de um par de parênteses', () => {
        expect(resolveExpression('(2+3)+(4*1)')).toBe('9');
        expect(resolveExpression('((2+3)*(4-1))')).toBe('15');
        expect(resolveExpression('(4+5) * (3*(3+2))')).toBe('135');
    });

    it('Deve retornar erro para expressões não balanceadas', () => {
        expect(resolveExpression('(2+3')).toBe('Expressão não está balanceada');
        expect(resolveExpression('(2+3))')).toBe('Expressão não está balanceada');
    });

    it('Deve retornar erro para expressões inválidas', () => {
        expect(resolveExpression('(2+3) +')).toBe('Expressão inválida');
        expect(resolveExpression('(2 a 5)')).toBe('Expressão inválida');
    }); 
});