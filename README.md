# 🦷 Dental Santo Antônio - E-commerce de Orçamentos Odontológicos

Sistema moderno, resiliente e inclusivo de seleção e cotação de suprimentos odontológicos para **Cirurgiões-Dentistas**, **Clínicas Odontológicas (PJ)** e **Estudantes de Odontologia**. Construído com React 18, TypeScript (modo estrito), Vite 6 e Tailwind CSS v4.

---

## 🌟 Funcionalidades e Regras de Negócio

### 1. 🛡️ Compliance Regulatória da Anvisa (Produtos Controlados)
- **Sinalização Visual no Catálogo:** Produtos controlados (como anestésicos e injetáveis) exibem selos de *Produto Restrito* e mensagens descritivas de obrigatoriedade documental.
- **Termo no Resumo e WhatsApp:** Se o orçamento contiver qualquer item controlado, um termo sanitário é automaticamente injetado no resumo e no texto enviado via WhatsApp, advertindo sobre a necessidade de CRO ativo, CNPJ ou declaração institucional.

### 2. 🎓 Perfil Inclusivo de Comprador
No fechamento do orçamento, o modal de identificação se adapta dinamicamente:
- **Cirurgião-Dentista:** Exige Nome, Telefone com WhatsApp, Número de Inscrição no CRO e UF emissora.
- **Clínica Odontológica / PJ:** Exige Razão Social, Nome do Responsável e CNPJ para emissão de nota fiscal corporativa.
- **Estudante de Odontologia:** Permite a montagem de listas de materiais acadêmicos sem exigir CRO, solicitando Nome da Faculdade/Universidade e Matrícula/Semestre.
- **Pessoa Física / Outro:** Requer Nome e CPF.

### 3. 💾 Persistência Resiliente em LocalStorage
- Sincronização automática do carrinho via hook `useLocalStorage` com versionamento de chave (`dental_santo_antonio_budget_v1`).
- Suporte a navegação multi-abas (evento `storage`), proteção contra exceções em modo de navegação anônima e reidratação instantânea ao recarregar a página (F5).

### 4. 🔍 Motor de Busca & Filtros no Catálogo
- Busca textual instantânea com debounce (`useDebounce`) por nome, descrição e categoria.
- Chips de seleção rápida por categorias.
- Filtro exclusivo para produtos regulamentados pela Anvisa.
- Ordenação por menor preço, maior preço e ordem alfabética (A-Z).

### 5. 📱 Checkout Integrado para WhatsApp com Contingência
- Geração de protocolo temporal de cotação: `#COT-[DATA]-[HASH]` (ex: `#COT-20261001-4A8F`).
- Abertura direta da API do WhatsApp com mensagem discriminada item a item, subtotais e dados cadastrais.
- Botão de contingência **"Copiar Mensagem do Orçamento"** com toast de confirmação para prevenir bloqueios de pop-up no navegador.

---

## 🏗️ Arquitetura de Pastas (`src/`)

```
src/
├── assets/                  # Identidade visual (logo.png) e recursos estáticos
├── config/                  # Constantes institucionais (WhatsApp oficial, telefones, endereço)
│   └── company.ts
├── context/                 # Estado global da cotação com Sonner Toasts
│   └── BudgetContext.tsx
├── data/                    # Catálogo mock enriquecido com metadados regulatórios
│   └── products.ts
├── hooks/                   # Custom hooks desacoplados
│   ├── useDebounce.ts       # Debounce de entrada de texto
│   └── useLocalStorage.ts   # Persistência resiliente com tratamento de erros
├── components/
│   ├── budget/              # Componentes de cotação e formulário inclusivo
│   │   └── BuyerProfileForm.tsx
│   ├── layout/              # Cabeçalho e rodapé institucionais
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── product/             # Cards e barra de pesquisa/filtros
│   │   ├── CategoryCard.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductFilter.tsx
│   └── ui/                  # Componentes visuais atômicos
│       ├── Badge.tsx
│       └── ImageWithFallback.tsx
├── pages/                   # Rotas da aplicação
│   ├── Home.tsx             # Página inicial com cards de perfil e categorias
│   ├── Products.tsx         # Catálogo completo com busca e filtros
│   ├── Category.tsx         # Visão de produtos por categoria
│   ├── Budget.tsx           # Gestão do orçamento e checkout
│   ├── Contact.tsx          # Canais de atendimento e horários
│   ├── PrivacyPolicy.tsx    # Política de privacidade alinhada à LGPD
│   └── NotFound.tsx         # Página 404 personalizada
├── styles/                  # Tailwind tokens e estilização global
│   ├── fonts.css
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
├── types/                   # Tipagens e interfaces de domínio em TypeScript
│   ├── budget.ts
│   ├── company.ts
│   └── product.ts
├── App.tsx                  # Componente raiz e rotas
├── main.tsx                 # Ponto de entrada do React DOM
└── vite-env.d.ts            # Declarações de ambiente do Vite
```

---

## 🎨 Paleta de Cores e Tokens (Tailwind CSS v4)

Definidas centralizadamente em `src/styles/tailwind.css`:
- **Primary Wine:** `var(--color-brand-primary)` (`#542B4B`)
- **Secondary Berry/Magenta:** `var(--color-brand-secondary)` (`#9B4587`)
- **Accent Lilac:** `var(--color-brand-accent)` (`#CC6EAB`)
- **Soft Light Rose:** `var(--color-brand-soft)` (`#FCD5F4`)
- **White Surface:** `var(--color-brand-surface)` (`#FFFFFF`)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js**: Versão 18 ou superior (testado com Node v22).
- **npm** ou gerenciador de pacotes equivalente.

### Instalação das Dependências
```bash
npm install
```

### Executar em Modo de Desenvolvimento
```bash
npm run dev
```
Acesse no navegador: `http://localhost:5173`

### Validação de Tipos e Build de Produção
```bash
npm run build
```
Executa a checagem estrita de tipos do TypeScript (`tsc`) e compila os assets otimizados para a pasta `dist/`.

### Pré-visualização do Build
```bash
npm run preview
```