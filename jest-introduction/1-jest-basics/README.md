# Noções Básicas do Jest

Bem-vindo à seção "Noções Básicas do Jest" do nosso repositório! Esta pasta é projetada para introduzir você ao Jest e ao conceito de teste unitário. Vamos cobrir o que é, por que é usado e fornecer um exemplo simples para você começar a escrever testes usando TypeScript.

## O que é Jest?

Jest é um poderoso framework de teste, projetado para qualquer base de código JavaScript. Ele permite que você escreva testes com uma API que é acessível e familiar. Jest é usado por equipes de todos os tamanhos para testar aplicações web, serviços node.js e aplicativos móveis.

## Por que Testes Unitários?

O teste unitário é um método de teste de software onde unidades ou componentes individuais de um software são testados independentemente. O propósito é validar que cada unidade do software funcione conforme projetado. Isso é crucial para:

- Identificar problemas no início do ciclo de desenvolvimento.
- Garantir que as alterações no seu código não quebrem a funcionalidade existente.
- Simplificar a integração.
- Documentar sua base de código.

Os testes unitários são geralmente automatizados e podem ser executados de forma rápida e frequente, o que é uma parte chave das práticas de integração contínua.

## Exemplo: Testando uma Função Simples

Vamos considerar uma função simples que adiciona dois números, escrita em TypeScript. Vamos escrever um teste para garantir que esta função está funcionando corretamente.

1. **Crie um arquivo para nossa função (`sum.ts`):**

```typescript
function sum(a: number, b: number): number {
    return a + b;
}

export default sum;
```

Esta é apenas uma função de soma para mostrar nosso exemplo.

2. **Crie um arquivo de teste (`sum.test.ts`):**

```typescript
import sum from './sum';

test('adiciona 1 + 2 para igualar 3', () => {
    expect(sum(1, 2)).toBe(3);
});

describe('sum', () => {
    it('deve adicionar dois números', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
```
Entendendo o arquivo de testes:

#### Exemplo de Teste Básico

```javascript
test('adiciona 1 + 2 para igualar 3', () => {
    expect(sum(1, 2)).toBe(3);
});
```

#### Explicação:
- **Função `test`**: Esta é uma função global fornecida pelo Jest para definir um teste. O primeiro argumento é uma string descrevendo o que o teste faz. Neste caso, diz "adiciona 1 + 2 para igualar 3".

- **Função de Callback**: O segundo argumento é uma função de callback que o Jest chama para executar o teste. Esta função contém o código de teste real.

- **Função `expect`**: Dentro do teste, a função `expect` é chamada. Esta função é usada para fazer uma afirmação sobre um aspecto particular do seu código. Em outras palavras, é usada para verificar se algo é verdadeiro. Neste caso, está verificando o resultado da função `sum`.

- **Comparador `toBe`**: Isso é o que chamamos de "comparador" e determina como o valor dado ao `expect` é testado. Aqui, `toBe(3)` verifica se o resultado de `sum(1, 2)` é exatamente `3`.

#### Usando `describe` e `it`

```javascript
describe('sum', () => {
    it('deve adicionar dois números', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
```

#### Explicação:
- **Função `describe`**: Esta função é usada para agrupar testes similares. É muito útil para organizar seus testes e tornar a saída do teste mais fácil de ler e gerenciar. O primeiro argumento para `describe` é uma string que descreve o grupo de testes.

- **Função `it`**: É um alias para a função `test`. É usada da mesma maneira que `test`, mas muitas vezes é usada dentro de blocos `describe` para fazer os testes lerem mais como uma frase: "it deve adicionar dois números".

- **Estrutura de Função Aninhada**: Dentro do bloco `describe`, você usa `it` para definir testes individuais. Esta estrutura hierárquica ajuda a organizar os testes, especialmente quando você tem um grande número deles, ou quando eles cobrem várias funções de um componente ou módulo.

3. **Execute o teste:**

Abra seu terminal, navegue até o diretório contendo seu projeto e execute:

```bash
npm test
```

Este comando executará o teste definido em `sum.test.ts`, e você deve ver uma saída indicando se o teste passou ou falhou.

## Próximos Passos

Explore mais sobre as funcionalidades do Jest, como snapshots, mocks e configurações avançadas, lendo a documentação do Jest ou continuando através de nossos outros guias neste repositório.