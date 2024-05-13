import {it, expect} from '@jest/globals';
import { resolveSign } from '../math/resolveSign';

describe('# Resolução dos Sinais', () => {
    it('Deve retornar a soma de 2 valores', () => {
        expect(resolveSign(2, 3, '+')).toBe(5);
    });

    it('Deve retornar a subtração de 2 valores', () => {
        expect(resolveSign(2, 3, '-')).toBe(-1);
    });

    it('Deve retornar a multiplicação de 2 valores', () => {
        expect(resolveSign(2, 3, '*')).toBe(6);
        expect(resolveSign(2, 3, 'x')).toBe(6);
    });

    it('Deve retornar a divisão de 2 valores', () => {
        expect(resolveSign(6, 3, '/')).toBe(2);
    });

    it('Deve retornar o resto da divisão de 2 valores', () => {
        expect(resolveSign(5, 2, '%')).toBe(1);
    });

    it('Deve retornar erro para um sinal inválido', () => {
        expect(() => resolveSign(2, 3, 'a')).toThrowError("Expressão com sinal inválido");
    });
    
})
