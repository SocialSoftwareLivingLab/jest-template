# Mocks no Jest

Bem-vindo à seção "Mocks" do nosso repositório! Nesta pasta, exploramos o conceito de mocks em testes unitários usando o Jest. Mocking é uma técnica poderosa que permite isolar o pedaço de código que você deseja testar, substituindo suas dependências por objetos mock que simulam o comportamento dos reais.

## O que são Mocks?

Mocks são objetos simulados que imitam o comportamento de objetos reais. Um mock pode ser configurado para retornar certos valores em resposta a chamadas de função, o que pode ser muito útil em um ambiente de teste onde você deseja isolar a funcionalidade de um módulo específico sem invocar efeitos colaterais ou dependências reais.

## Por que Usar Mocks?

- **Ambiente Controlado**: Mocks criam um ambiente de teste controlado ao imitar funcionalidades específicas e retornar respostas previsíveis.
- **Isolamento**: Ao usar mocks, você pode isolar o pedaço de código que está testando. Isso ajuda a garantir que seus testes não sejam afetados por fatores externos, como bancos de dados, APIs ou outros serviços.
- **Desempenho**: Mocks ajudam a evitar chamadas a serviços externos ou bancos de dados, o que pode acelerar significativamente a execução dos testes.
- **Flexibilidade**: Você pode testar vários cenários manipulando as respostas dos mocks sem a necessidade de alterar as dependências externas reais.

## Como Usar Mocks no Jest

O Jest oferece várias maneiras de criar e gerenciar mocks, incluindo mocks automáticos e manuais. Você pode criar mocks para módulos, funções ou até mesmo chamadas de API.

## Exemplo: Mockando e Espionando uma Dependência Simples

Vamos supor que temos um módulo que busca dados de usuário de uma API, processa esses dados e faz um log da operação atual. Podemos mockar essa chamada de API para garantir que nossos testes sejam executados de forma confiável e rápida.

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

### 2. Módulo API

```typescript
// api.ts
export const fetchUserData = async (userId: string) => {
    // Normalmente, essa função buscaria dados de uma API externa
    throw new Error('fetchUserData deve ser mockado nos testes');
};
```

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

- **`jest.mock`**: Esta função é usada para mockar automaticamente o módulo `api`. Definimos uma implementação personalizada para `fetchUserData` que retorna uma promessa resolvida com um objeto de usuário mock.
- A função `getUserFullName` utiliza esse mock em vez do `api.fetchUserData` real, permitindo-nos testá-la sem fazer chamadas reais de API.
- O teste verifica se `getUserFullName` constrói corretamente o nome completo com base nos dados mockados.
- **`jest.spyOn`**: Esta função é usada para criar um spy que rastreia chamadas para `console.log`. Isso nos permite verificar que o registro ocorre conforme esperado sem interferir na funcionalidade de `console.log`.
- **Expect com Spy**: Usamos `expect(consoleSpy).toHaveBeenCalledWith(...)` para verificar se `console.log` foi chamado com os argumentos corretos. Isso verifica que nossa função registra a mensagem esperada durante sua execução.
- **`mockRestore`**: Após nossas asserções, chamamos `consoleSpy.mockRestore()` para restaurar `console.log` ao seu estado original. Isso é importante em um ambiente de teste para garantir que as alterações feitas pelos espiões não afetem outros testes.
