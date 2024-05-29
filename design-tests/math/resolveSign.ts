export function resolveSign(valueA: number, valueB: number, sign: string){
    switch (sign) {
        case '+':
            return valueA + valueB;
        case '-':
            return valueA - valueB;
        case '*':
        case 'x':
            return valueA * valueB;
        case '/':
            return valueA / valueB;
        case '%':
            return valueA % valueB;
        default:
            throw new Error("Expressão com sinal inválido");
    }
}