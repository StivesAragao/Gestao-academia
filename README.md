# 🏋️‍♂️ FITCEUB - Sistema Integrado de Gestão Fitness

O **FITCEUB** é um sistema web responsivo e moderno desenvolvido para otimizar a administração e o controle financeiro de academias e centros fitness. O sistema oferece uma interface elegante (com tema escuro) que centraliza o cadastro de alunos, matrículas, e o controle completo de receitas e despesas.

---

## 📌 Sumário
1. [Funcionalidades](#-funcionalidades)
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [Instalação e Execução](#-instalação-e-execução)
5. [Próximos Passos (Roadmap)](#-próximos-passos-roadmap)

---

## 🚀 Funcionalidades

O sistema está dividido em módulos funcionais, facilitando a navegação e o gerenciamento das operações cotidianas da academia:

### 1. Painel Geral (Dashboard)
* **Indicadores em Tempo Real**: Visualização rápida de Alunos Ativos, Faturamento Total (Receitas), Despesas Totais e Saldo Financeiro Líquido.
* **Fluxo de Caixa Recente**: Tabela com as últimas transações (receitas e despesas) ordenadas por data.
* **Painel de Ações Rápidas**: Atalhos rápidos para as principais tarefas operacionais do sistema.

### 2. Módulo de Alunos
* **Cadastro Completo**: Nome, e-mail, telefone, CPF, data de nascimento e status (Ativo/Inativo).
* **Operações CRUD**: Possibilidade de cadastrar, editar, excluir e listar todos os alunos cadastrados.

### 3. Módulo de Matrículas
* **Vínculo Acadêmico**: Associação de alunos a planos de matrícula específicos.
* **Controle de Vigência**: Data de início, data de término, valor da mensalidade e status da matrícula.

### 4. Controle Financeiro
* **Gestão de Receitas**: Registro de entradas financeiras com descrição, valor, data de recebimento e status.
* **Gestão de Despesas**: Lançamento de saídas/custos com descrição, valor, data de vencimento e status de pagamento.
* **Cálculo de Saldo**: O dashboard calcula automaticamente a saúde financeira a partir destes registros.

---

## 🛠 Tecnologias Utilizadas

Este projeto foi construído utilizando as melhores práticas modernas do ecossistema de desenvolvimento frontend:

* **[React 19](https://react.dev/)**: Biblioteca principal para construção da interface baseada em componentes.
* **[Vite](https://vite.dev/)**: Ferramenta de build extremamente rápida para o desenvolvimento local.
* **[React Router Dom v7](https://reactrouter.com/)**: Gerenciamento de rotas e navegação interna da aplicação.
* **[Bootstrap 4](https://getbootstrap.com/docs/4.6/)**: Estruturação de componentes e grid responsivo.
* **CSS Customizado**: Estilização personalizada com paleta de cores moderna em tons escuros (*dark mode*) e efeitos de vidro (*glassmorphism*).
* **[FontAwesome](https://fontawesome.com/)**: Biblioteca de ícones vetoriais modernos.
* **LocalStorage API**: Utilizado para persistência de dados localmente no navegador, simulando um banco de dados.

---

## 📁 Estrutura do Projeto

Abaixo está uma visão resumida da arquitetura de pastas do projeto:

```text
appceubv2/
├── public/                 # Arquivos públicos e ícones estáticos
└── src/
    ├── assets/             # Imagens e logos
    ├── componets/          # Componentes globais (ex: Layout de navegação)
    │   └── Layout.jsx
    ├── pages/              # Páginas da aplicação (telas principais)
    │   ├── AlunosPage.jsx
    │   ├── DespesasPage.jsx
    │   ├── HomePage.jsx
    │   ├── LoginPage.jsx
    │   ├── MatriculasPage.jsx
    │   ├── ReceitasPage.jsx
    │   └── SobrePage.jsx
    ├── utils/              # Funções utilitárias e simulação de banco
    │   └── storage.js      # Métodos de CRUD no LocalStorage
    ├── App.css             # Estilos gerais
    ├── App.jsx             # Componente raiz da aplicação
    ├── index.css           # Estilos globais e design system
    ├── main.jsx            # Ponto de entrada do React
    └── routes.jsx          # Definição e mapeamento das rotas
```

---

## 💻 Instalação e Execução

Para rodar este projeto em sua máquina local, certifique-se de ter o [Node.js](https://nodejs.org/) instalado e siga o passo a passo:

### 1. Clonar o Repositório
```bash
git clone https://github.com/StivesAragao/Gestao-academia.git
```

### 2. Entrar na Pasta do Projeto
```bash
cd Gestao-academia
```

### 3. Instalar as Dependências
```bash
npm install
```

### 4. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
O console exibirá um link local parecido com `http://localhost:5173`. Basta abri-lo no seu navegador!

### 5. Compilar para Produção (Build)
Caso queira gerar a pasta de arquivos estáticos otimizada para publicação:
```bash
npm run build
```

---

## 🔮 Próximos Passos (Roadmap)

Futuras melhorias planejadas para o sistema:
- [ ] Integração com um banco de dados real via API (ex: Node.js/Express ou Firebase).
- [ ] Gráficos interativos no painel geral utilizando bibliotecas como Chart.js ou Recharts.
- [ ] Diferenciação de permissões de acesso (Administrador, Professor e Aluno).
- [ ] Módulo de cadastro e acompanhamento de treinos físicos individuais.
