# Testes Parametrizados no Jest

Bem-vindo à seção "Testes Parametrizados" do nosso repositório! Nesta pasta, exploraremos como usar testes parametrizados para aumentar a eficiência da sua estratégia de testes. Testes parametrizados permitem que você teste suas funções com múltiplas entradas usando uma única estrutura de teste.

## O que são Testes Parametrizados?

Testes parametrizados, também conhecidos como data-driven-tests, envolvem executar o mesmo teste várias vezes com diferentes valores de entrada. Este método é eficiente para funções que devem produzir resultados consistentes em uma variedade de entradas. Ele ajuda a garantir que seu código se comporte conforme esperado em vários cenários sem escrever vários testes separados.

## Por que Usar Testes Parametrizados?

- **Eficiência**: Reduza a quantidade de código necessária para vários testes, reutilizando o mesmo corpo de teste com diferentes entradas.
- **Cobertura**: Aumenta sua cobertura de testes adicionando facilmente novos casos de teste. Isso é especialmente útil para edge-cases.
- **Manutenção**: Simplifique a manutenção dos testes tendo uma lógica de teste centralizada. Adicionar mais casos de teste geralmente envolve apenas adicionar mais parâmetros em vez de novos blocos de teste.

## Como Usar Testes Parametrizados no Jest

O Jest oferece um método integrado para testes parametrizados usando `test.each`. Este método permite que você especifique um vetor de dados, onde cada item no vetor representa um conjunto de argumentos que serão passados para a função de teste.

## Exemplo: Testando uma Função de Soma com Múltiplas Entradas

Suponha que temos uma função simples que calcula a soma de dois números. Podemos usar testes parametrizados para verificar essa função contra vários pares de números.

### 1. Função de Soma

Vamos definir nossa função em `sum.js`:

```javascript
function sum(a, b) {
    return a + b;
}

module.exports = sum;
```

### 2. Teste Parametrizado para a Função de Soma

Agora, vamos escrever um teste parametrizado usando `test.each` no Jest:

```javascript
import sum from "../src/sum";

describe('função soma', () => {
    test.each([
        {a: 1, b: 2, expected:3},
        {a: 2, b: 3, expected:5},
        {a: 4, b: 5, expected:9},
        {a: 0, b: 0, expected:0},
        {a: -1, b: 1, expected:0}
    ])('soma %a e %b para igualar %expected', ({a, b, expected}) => {
        expect(sum(a, b)).toBe(expected);
    });
});
```

### Explicação:

- **`test.each`**: Este método recebe uma matriz onde cada elemento é um objeto de argumentos. Cada argumento é passado para a função de teste.
- **String de Template**: A string 'soma %a e %b para igualar %expected' é usada para gerar o nome do teste para cada conjunto de parâmetros. `%` é um placeholder nomeado que é substituído pelos valores reais passados ao teste.

Essa configuração garante que nossa função `sum` seja testada em uma variedade de entradas com mínima duplicação de código, tornando-a clara e de fácil manutenção.