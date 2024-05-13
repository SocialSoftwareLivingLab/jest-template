# Primeiro Caso de Teste

Esse pasta apresenta um caso de teste bem simples, apenas para introduzir a algumas ferramentas do framework jest. Além de discutir algums pontos importantes no momento de criar testes unitários. 

> Tenha em mente que a tarefa mais dificil não é escrever os testes, mas entender o que precisa ser testado.

## Desafio:
Criar um api que atue como uma calculadora de expressões matemáticas.


## Passo 1: Levantando os comportamentos do sistema

Não é possível criar testes para uma aplicação ou a aplicação em si, se não houver clareza de quais são as entradas e saídas esperadas, em outras palavras, o comporamento do sistema. 

Uma técnica para clarear o problema é pensar em 3 pontos: Entrada, Saida e Processamento. Isso deve te guiar a fazer mais perguntas sobre o sistema.

Um caso bem simples é uma expressão como 2 + 7, o resultado esperado é trivial e faz sentido que o sistema processe isso como uma soma e retorne 9. 
Mas e quanto a expressão 2 x 4? uma multiplicação, certo? e a expressão 2 * 4? ela é também deve ser tratada como multiplicação ou deve levantar um erro de formatação? Ainda sobre isso, expressões mal formatadas como 3 ++ 4, devem retornar erro ou o sistema deve assumir a expressão correta mais proxima? 

Perceba como o problema inicial está mal especificado, seria um erro muito comum já começar a desenvolver o problema e isso com certeza implicaria em retrabalhos. Essa é a primeira vantagem de escrever testes, eles te forçam a buscar mais casos para o problema e especificar melhor seu sistema.

Vamos, antes de mais nada, levantar entradas e saidas para o nosso problema. Podemos criar uma tabela simples para isso:

| Entrada               | Saída Esperada      |
|-----------------------|---------------------|
| `2 + 5`               | `7`                 |
| `8 - 3`               | `5`                 |
| `4 * 6`               | `24`                |
| `2 x 7`               | `14`                |
| `9 / 3`               | `3`                 |
| `7 % 4`               | `3`                 |
| `18 / (2 + 1)`        | `6`                 |
| `5 * (2 + 3)`         | `25`                |
| `100 / 25`            | `4`                 |
| `13 % 10`             | `3`                 |
| `8 - * 5`             | `Expressão inválida`|
| `(9 + 3`              | `Expressão inválida`|
| `((2+3) * (3+4))`     | `35`                |
| `(4+5) * (2*(3+2))`   | `90`                |

Agora podemos adicionar uma coluna intermediária pensando em como processar a entrada para chegar na saida esperada. Um ponto importante é tentar pensar no processamento da forma mais algoritmica possível. Isso ajudara nas etapas posteriores.

| Entrada               | Saída Esperada      | Processamento   |
|-----------------------|---------------------|-----------------|
| `2 + 5`               | `7`                 |Resolver a operação soma
| `8 - 3`               | `5`                 |Resolver a operação subtração
| `4 * 6`               | `24`                |Resolver a operação multiplicação
| `2 x 7`               | `14`                |Resolver a operação multiplicação
| `9 / 3`               | `3`                 |Resolver a operação divisão
| `7 % 4`               | `3`                 |Resolver a operação módulo
| `18 / (2 + 1)`        | `6`                 |Resolver primeiro a soma e depois a divisão
| `5 * (2 + 3)`         | `25`                |Resolver primeiro a soma e depois a multiplicação
| `8 - * 5`             | `Expressão inválida`|Expressão invalida pois não possui um numero entre os sinais
| `(9 + 3`              | `Expressão inválida`|Expressão invalida pela contagem de parenteses
| `((2+3) * (3+4))`     | `35`                |Resolver as somas internas e depois a multiplicação
| `(4+5) * (2*(3+2))`   | `90`                |Resolver a soma mais interna, depois a multiplicação interna, depois a soma e por fim a multiplicação

Veja como os processamentos já começam a dar ideia de um algoritmo. Podemos pensar no problema em duas partes: Resolver expressões simples baseado nos sinais (+, -, *, x, /, %) e entender com base nos parenteses a ordem das expressões. Isso é o design da nossa solução, os testes vão nos guiar em sua implementação.

## Passo 2: Design da solução
Vamos criar um duas funções para o sistema, uma que resolve as expressões simples com base no sinal fornecido e uma que chame a primeira após entender a ordem com base nos parenteses. Note que a primeira fará chamadas para a segunda. Por fim, vamo utilizar o express para criar uma api que receba uma expressão e retorne o resultado. 

Poderiamos usar qualquer outro framework, isso não é a parte importante, você verá inclusive que a substituição do express se daria de forma bem simples caso necessário.

## Passo 3: Implementação da função de resolução dos sinais.
A implementação da função de sinais esta no arquivo math/resolveSign.js. Os testes estão no arquivo test/resolveSign.test.js. Note que quando o sinal da operação não for mapeado a expressão levanta um erro. Essa são as duas responsabilidades da função. Resolver sinais e falhar se o sinal não for valido para a nossa especificação.

O ultimo caso de teste é um exemplo de como validar excessões no jest.

## Passo 4: Implementação da função de resolução de expressões
A implementação da função de resolução utiliza regex para encontrar os parenteses e resolver as expressões internas, evitei utilizar filas para não complicar ainda mais o algoritmo, visto que ele não é o foco. Mas veja pelos testes, como o algoritmo atende todos os casos que levantamos na etapa inicial, esse nivel de segurança da entrega final, só é possivel atráves dos testes implementados.



