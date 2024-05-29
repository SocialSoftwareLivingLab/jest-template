# Setup e TearDown no Jest

Nesta seção do repositório Aprendendo Jest, exploramos os conceitos de setup e teardown no Jest. Estes são tópicos para preparar o ambiente para os testes e limpar depois, garantindo que os testes sejam executados em um ambiente controlado e repetível.

## Entendendo Setup e Teardown

Testar frequentemente envolve configurar certas condições antes dos testes serem executados e limpar após eles. Por exemplo, você pode precisar garantir que algum estado interno sempre comece igual quando você executa seus testes. Jest oferece vários métodos para lidar com esses cenários, que podem ser usados em diferentes níveis de sua suíte de testes:

- **Setup/Teardown Global**: Executado uma vez antes e depois de todos os testes em seu projeto.
- **Setup/Teardown no Nível de Arquivo**: Executado uma vez antes e depois de todos os testes em um arquivo de teste específico.
- **Setup/Teardown no Nível de Bloco**: Executado antes e depois dos testes dentro de um bloco `describe`.

## Funções de Setup e Teardown do Jest

Jest oferece funções específicas para facilitar a Setup e Teardown:

- `beforeAll`: Executa uma função antes de qualquer um dos testes em um arquivo serem executados.
- `afterAll`: Executa uma função depois que todos os testes em um arquivo terminaram.
- `beforeEach`: Executa uma função antes de cada teste em um arquivo.
- `afterEach`: Executa uma função após cada teste em um arquivo.

## Exemplo: Inicializando e Redefinindo Configurações

Neste exemplo, demonstraremos como usar as funções de Setup e Teardown do Jest para gerenciar um objeto de Setup que influencia o comportamento das funções que estamos testando. Isso é comum em cenários onde funções se comportam de maneira diferente com base em configurações.

### 1. Objeto de Configuração

Vamos assumir que temos um Objeto de Configuração que pode habilitar ou desabilitar certas funcionalidades em nosso aplicativo:

```typescript
// configHandler.ts
let config = {
    featureEnabled: false,
};

const enableFeature = () => {
    config.featureEnabled = true;
};

const disableFeature = () => {
    config.featureEnabled = false;
};

const isFeatureEnabled = () => {
    return config.featureEnabled;
};

export { enableFeature, disableFeature, isFeatureEnabled };
```

### 2. Arquivo de Teste do Jest com Setup e Teardown

No nosso arquivo de teste, queremos garantir que `featureEnabled` esteja habilitado antes de cada teste e desabilitado após cada um, para testar o comportamento sob diferentes condições:

```typescript
import { enableFeature, disableFeature, isFeatureEnabled } from './configHandler';

// Isso será executado antes de cada teste
beforeEach(() => {
    enableFeature();
});

// Isso será executado após cada teste
afterEach(() => {
    disableFeature();
});

describe('Testes de Funcionalidade', () => {
    test('deve se comportar corretamente quando a funcionalidade está habilitada', () => {
        // A funcionalidade deve estar habilitada
        expect(isFeatureEnabled()).toBe(true);
    });

    test('deve se comportar de forma diferente quando a funcionalidade está desabilitada', () => {
        // Desabilitar manualmente para este teste
        disableFeature();
        expect(isFeatureEnabled()).toBe(false);
    });
});
```
Todo teste deve ser autocontido, o que significa que a ordem dos testes e quais testes são executados não podem influenciar o resultado de todos os testes em execução. Se você comentar o beforeEach e afterEach, não terá como garantir o estado inicial da variável featureEnabled, então o primeiro teste pode quebrar dependendo da ordem em que são executados.

Neste exemplo, `beforeEach` e `afterEach` são usados no escopo do nível de arquivo, eles também poderiam ser usados no escopo do nível de bloco `describe`, o que faria com que o beforeEach e afterEach fossem executados apenas para os testes dentro do bloco `describe`. Outra opção é configurá-los globalmente, o que os faria rodar para todos os testes no projeto, o que pode ser particularmente útil para limpar variáveis globais ou coisas assim.

## Explicação:

- **`beforeEach`** é usado aqui para garantir que a funcionalidade esteja habilitada antes de cada teste ser executado. Isso é útil quando o estado padrão de `featureEnabled` pode ser `false`, ou se outros testes alteram o estado.

- **`afterEach`** redefine a funcionalidade para seu estado desabilitado após cada teste. Isso garante que nenhum estado de um teste possa interferir com outro, mantendo a isolamento e a confiabilidade dos testes.

- Os próprios testes verificam o comportamento do sistema quando a funcionalidade está habilitada e desabilitada, respectivamente. Isso nos permite verificar que nossa aplicação se comporta corretamente em ambos os cenários sem a necessidade de redefinir manualmente as condições para cada teste.
