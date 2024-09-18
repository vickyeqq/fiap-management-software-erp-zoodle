## 1. Visão Geral

O ERP para a empresa "Zoodle na Caixa" é uma aplicação web dividida em três partes principais:

- Frontend: Aplicação React
- Backend: API RESTful em Java (OpenJDK 22) Spring Boot
- Banco de dados: Oracle usando JDBC

### 1.1 Estrutura do Projeto
fiap-management-software-erp-zoodle/
├── frontend/
│   └── zoodle-frontend/
├── backend/
│   └── zoodle-backend/
└── banco de dados/

## 2. Frontend (React)

### 2.1 Tecnologias Principais
- React
- React Router para navegação
- Contextos React para gerenciamento de estado
- SCSS para estilização

### 2.2 Estrutura de Arquivos Principais
src/
├── assets/
├── components/
├── contexts/
├── pages/
├── styles/
├── main.jsx
└── router.jsx

### 2.3 Componentes Principais
- `AppLayout.jsx`: Layout principal da aplicação
- `MenuLayout.jsx`: Layout para menus
- `Form.jsx`: Componente reutilizável para formulários
- `Modal.jsx`: Componente para diálogos modais

### 2.4 Contextos
- `OrderContext.jsx`: Gerencia o estado dos pedidos
- `ProductContext.jsx`: Gerencia o estado dos produtos
- `SupplierContext.jsx`: Gerencia o estado dos fornecedores
- `UserContext.jsx`: Gerencia o estado dos usuários
- `UserTypeContext.jsx`: Gerencia o estado dos tipos de usuário

## 3. Backend (Java Spring Boot)

### 3.1 Tecnologias Principais
- Java Spring Boot
- JPA / Hibernate para persistência de dados
- RESTful API

### 3.2 Estrutura de Pacotes
br.com.fiap.zoodle_backend/
├── config/
├── controlador/
├── model/
├── repositorio/
└── servico/

### 3.3 Componentes Principais
- Controladores: Gerenciam as requisições HTTP
- Modelos: Representam as entidades de dados
- Repositórios: Interfaces para acesso ao banco de dados
- Serviços: Contêm a lógica de negócios

### 3.4 Entidades Principais
- Fornecedor
- ItensPedido
- Pedido
- Produto
- TipoUsuario
- Usuario

## 4. API Endpoints

### 4.1 Fornecedores
- Listagem - GET `/api/v1/fornecedor`
- Criação - POST `/api/v1/fornecedor`
- Consulta por id - GET `/api/v1/fornecedor/{id}`
- Atualização por id - PUT `/api/v1/fornecedor/{id}`
- Remoção por id - DELETE `/api/v1/fornecedor/{id}`

### 4.2 Produtos
- GET `/api/v1/produto`
- POST `/api/v1/produto`
- GET `/api/v1/produto/{id}`
- PUT `/api/v1/produto/{id}`
- DELETE `/api/v1/produto/{id}`

### 4.3 Pedidos
- GET `/api/v1/pedido`
- POST `/api/v1/pedido`
- GET `/api/v1/pedido/{id}`
- PUT `/api/v1/pedido/{id}`
- DELETE `/api/v1/pedido/{id}`

(Endpoints similares para Usuários, Tipos de Usuário e Itens de Pedido)

**Nota**: Excluir PUT do postman e descrever POST como criação e atualização.

## 5. Banco de Dados

- O sistema utiliza um banco de dados relacional Oracle (desenvolvido com base na versão 23ia).
- A configuração de conexão entre o backend e a base de dados está armazenada no arquivo `application.properties`.
- As tabelas principais correspondem às entidades mencionadas na seção 3.4.

## 6. Fluxo de Dados Típico

1. O usuário interage com a interface React
2. As ações do usuário disparam chamadas à API através dos contextos React
3. Os controladores no backend recebem as requisições
4. Os serviços processam a lógica de negócios
5. Os repositórios interagem com o banco de dados
6. A resposta é enviada de volta ao frontend
7. O estado da aplicação é atualizado via contextos React
8. A interface do usuário é atualizada para refletir as mudanças

## 7. Considerações de Desenvolvimento

- Utilizar o Maven para gerenciar dependências do backend
- Usar npm para gerenciar dependências do frontend
- Na pasta banco de dados está disponível o script SQL para criação das tabelas.
- Na pasta postman estão disponíveis as collections para teste das APIs.
