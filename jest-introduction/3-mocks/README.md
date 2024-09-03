# Mocks no Jest

Boas vindas à seção "Mocks" do nosso repositório! Nesta parte, exploraremos o conceito de _mocks_ em testes unitários usando o Jest.

**Mocking** é uma técnica poderosa que permite isolar o pedaço de código que você deseja testar, substituindo suas dependências por objetos simulados que imitam comportamentos reais. Isso é importante para garantir que você esteja testando apenas a lógica interna do código, sem a interferÊncia de dependÊncias e configurações externas.

## O que são Mocks?

Mocks são objetos simulados que replicam o comportamento de objetos reais. Nos testes unitários, eles  que você isole a funcionalidade de um módulo específico que deseja testar, sem resultar em efeitos colaterais reais.

## Por que Usar Mocks?

- **Ambiente Controlado**: Mocks criam um ambiente de teste controlado ao imitar funcionalidades específicas e retornar respostas previsíveis, como mensagens de sucesso, erros ou exceções.
- **Isolamento**: Ao usar mocks, você pode isolar o pedaço de código que está testando. Isso ajuda a garantir que seus testes não sejam afetados por fatores externos, como bancos de dados, APIs ou outros serviços.
- **Desempenho**: Mocks ajudam a evitar chamadas a serviços externos ou bancos de dados, os quais podem ser lentos, instáveis e impactar significativamente a execução dos testes.
- **Flexibilidade**: Você pode testar vários cenários manipulando as respostas dos mocks sem a necessidade de alterar as dependências externas reais.

## Como Mocks funcionam?

Mocks são configurados para simular comportamentos de funções, com foco exclusivo no código testado. Ou seja, sem depender de APIs externas, bancos de dados ou bibliotecas externas.

## Como Usar Mocks no Jest

O Jest oferece várias maneiras de criar e gerenciar mocks, incluindo mocks automáticos e manuais. Você pode criar mocks para módulos, funções ou até mesmo chamadas de API.

## Tipos de Mocks no Jest

### Mocks Automáticos

O Jest pode mockar automaticamente qualquer módulo importado, permitindo maior rapidez ao gerar mocks.
Mocks automáticos seguem o modelo a seguir:

```typescript
jest.mock('nome-do-modulo');
```

Aqui, o mock automático será gerado para todas as funções exportadas pelo módulo.

### Mocks Manuais

Ideais quando precisamos de mais controle sobre funções/métodos, garantindo comportamentos específicos. Dessa forma, definimos explicitamente o comportamento esperado.

```typescript
const thisMock = jest.fn().mockReturnValue('value');
```

Nesse exemplo é criado um mock manual, especificando que a função deve sempre retornar o valor `value`.

### Mocks de Módulos Completos

Mockamos módulos inteiros. Ideal principalmente quando precisamos de módulos inteiros ou então de bibliotecas externas.

```typescript
jest.mock('./path/to/modulo', () => ({
  thisFunction: jest.fn().mockReturnValue('value'),
}));
```

Nesse exemplo, todas as funções exportadas pelo módulo retornam um valor específico.

### Mocks de Funções Específicas

Da mesma forma que mockamos módulos completos, podemos mockar apenas funções específicas, permitindo que outras funções do mesmo módulo mantenham seu comportamento real, como mostrado no seguinte exemplo:

```typescript
const modulo = require('./modulo');
jest.spyOn(modulo, 'thisFunction').mockReturnValue('value');
```

## Exemplo: Mockando e Espionando uma Dependência Simples

Nesse exemplo nós vamos supor que temos um módulo que busca dados de usuário de uma API, processa esses dados e faz um log da operação atual. Podemos mockar essa chamada de API para garantir que nossos testes sejam executados de forma confiável e rápida, sem necessidade de dependências externas.

### 1. Módulo de Serviço de Usuário

```typescript
// userService.ts
import { fetchUserData } from './api';

export const getUserFullName = async (userId: string) => {
    const userData = await fetchUserData(userId);
    console.log(`Buscando dados para o ID do usuário: ${userId}`);  // Registrando a operação
    return `${userData.firstName} ${userData.lastName}`;
};
```

Aqui, a função `getUserFullName` obtém os dados do usuário a partir de uma chamada para `fetchUserData`, combinando o primeiro e o último nome.

### 2. Módulo API

```typescript
// api.ts
export const fetchUserData = async (userId: string) => {
    // Normalmente, essa função buscaria dados de uma API externa
    throw new Error('fetchUserData deve ser mockado nos testes');
};
```

Em um ambiente real, a função `fetchUserData` necessitaria dos dados de uma API externa. A seguir, iremos mocká-la, garantindo que não seja chamada, para não precisarmos lidar com dependências externas.

### 3. Teste com Mock

```typescript
import { getUserFullName } from './userService';
import * as api from './api';

jest.mock('./api', () => ({
    fetchUserData: jest.fn(() => Promise.resolve({ firstName: 'John', lastName: 'Doe' }))
}));

describe('getUserFullName', () => {
    it('retorna o nome completo do usuário e registra a operação', async () => {
        // Espionar console.log
        const consoleSpy = jest.spyOn(console, 'log');
        const fullName = await getUserFullName('123');

        expect(fullName).toBe('John Doe');
        expect(consoleSpy).toHaveBeenCalledWith('Buscando dados para o ID do usuário: 123');

        // Limpar o spy para evitar vazamentos de memória ou afetar outros testes
        consoleSpy.mockRestore();
    });
});
```

## Explicação:

- **`jest.mock`**: Esta função é usada para mockar automaticamente o módulo `api`. Definimos uma implementação personalizada para `fetchUserData` que retorna uma promessa resolvida com um objeto de usuário mock. Com isso, garantimos que o teste sejá rápido e controlado.

- **Teste da lógica interna:** A função `getUserFullName` utiliza esse mock em vez do `api.fetchUserData` real, permitindo-nos testar essa função sem fazer chamadas reais de API. Com isso, podemos focar em testar se `getUserFullName` está construindo o nome completo corretamente.

- **`jest.spyOn`**: Esta função é usada para criar um spy que rastreia chamadas para `console.log`. Isso nos permite verificar que se `console.log` é chamado com os arumentos esperados.

- **Verificação com `expect`**: Usamos `expect(consoleSpy).toHaveBeenCalledWith(...)` para assegurar que `console.log` foi chamado com a mensagem correta. Assim, podemos confirmar que a operação de registro funciona conforme planejado.

- **`mockRestore`**: Por fim, chamamos `consoleSpy.mockRestore()` para restaurar `console.log` ao seu estado original. Isso é importante em um ambiente de teste para garantir que as alterações feitas pelos espiões não afetem outros testes.
