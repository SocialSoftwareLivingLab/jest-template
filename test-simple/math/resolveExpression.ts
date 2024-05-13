import { resolveSign } from "./resolveSign";

export function resolveExpression(expression: string): string {
    // Remove os espaços para facilitar o processamento
    expression = expression.replace(/\s/g, '');

    // Verifica se a expressão está balanceada
    if ((expression.match(/\(/g) || []).length !== (expression.match(/\)/g) || []).length) {
        return "Expressão não está balanceada";
    }

    // Usa expressão regular para encontrar as subexpressões entre parênteses
    let regex = /\((\d+)([+x*\/%-])(\d+)\)/;
    let match;
    while ((match = regex.exec(expression)) !== null) {
        const [fullMatch, value1, sign, value2] = match;
        
        try {
            const result = resolveSign(parseFloat(value1), parseFloat(value2), sign);    
            // Usa o resultado da subexpressão para substituir a expressão original
            expression = expression.replace(fullMatch, result.toString());
        } catch (error: any) {
            return error.message;
        }
        
    }

    // Resolve os ultimos números da expressão
    regex = /(\d+)([+x*\/%-])(\d+)/;
    if((match = regex.exec(expression)) !== null){
        const [fullMatch, value1, sign, value2] = match;
        try {
            const result = resolveSign(parseFloat(value1), parseFloat(value2), sign);
            expression = expression.replace(fullMatch, result.toString());
        } catch (error: any) {
            return error.message;
        }
    }

    // Verifica que só restaram números
    if (!/^\d+$/.test(expression)) {
        return "Expressão inválida";
    }

    return expression;
}