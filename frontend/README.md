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
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── router.tsx         # Configuração de rotas
│   └── providers.tsx      # Providers globais
├── core/                   # Componentes e lógica compartilhada
│   ├── components/        # Componentes genéricos
│   ├── contexts/          # Contextos globais
│   ├── lib/              # Configurações de bibliotecas
│   ├── types/            # Types globais
│   └── utils/            # Funções utilitárias
├── domain/                # Domínios de negócio
├── pages/                 # Páginas da aplicação
│   └── layouts/          # Layouts compartilhados
└── assets/               # Assets estáticos
    └── styles/           # Estilos globais
```

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Features

- ✅ Estrutura base configurada
- ⏳ Cadastro de hábitos
- ⏳ Marcação de conclusão
- ⏳ Visualização de hábitos
- ⏳ Estatísticas de progresso
- ⏳ Lembretes
- ⏳ Categorização de hábitos
- ⏳ Configurações de conta