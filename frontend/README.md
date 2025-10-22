# Gerenciador de Hábitos

Sistema para registrar hábitos e marcar como concluídos.

## Tecnologias

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.1.9
- TailwindCSS 4.1.14
- React Router DOM 7.9.3
- TanStack Query 5.90.2
- Zustand 5.0.8
- React Hook Form 7.63.0
- Zod 4.1.11

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Provedores globais
│   └── router.tsx         # Configuração de rotas
├── core/                  # Componentes e lógica compartilhada
│   ├── components/        # Componentes UI genéricos
│   ├── lib/              # Configurações de bibliotecas
│   └── utils/            # Funções utilitárias
├── pages/                # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── domain/               # Domínios de negócio (a serem criados)
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente conforme necessário.

## Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`.

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Funcionalidades Planejadas

- [x] Estrutura base do projeto
- [ ] Cadastro de hábitos
- [ ] Marcação de conclusão
- [ ] Visualização de hábitos
- [ ] Estatísticas de progresso
- [ ] Lembretes
- [ ] Categorização de hábitos
- [ ] Configurações de conta

## Arquitetura

O projeto segue uma arquitetura modular baseada em domínios:

- **app/**: Configuração e inicialização da aplicação
- **core/**: Componentes e lógica reutilizáveis
- **pages/**: Componentes de página para roteamento
- **domain/**: Lógica de negócio organizada por domínio funcional

## Padrões de Código

- TypeScript estrito habilitado
- Componentes funcionais com hooks
- Styled com TailwindCSS
- Gerenciamento de estado com TanStack Query e Zustand
- Validação de formulários com React Hook Form e Zod

## Contribuição

Este é um projeto em desenvolvimento. Contribuições são bem-vindas!