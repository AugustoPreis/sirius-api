## 🚀 Como iniciar o projeto

### Pré-requisitos

- Node.js (versão 18+ recomendada)
- npm (gerenciador de pacotes do Node.js)
- Docker e Docker Compose

### 🐘 Inicializar o banco de dados

Antes de iniciar o backend, é necessário subir o banco de dados via Docker.

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```

2. Execute o comando:
   ```bash
   docker compose up --build
   ```

### 🔧 Configurar variáveis de ambiente

Na pasta `/backend`, crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3000
JWT_SECRET=<chave aleatória>
DB_NAME=sirius
DB_HOST=localhost
DB_USER=postgres
DB_PASS=postgres
DB_PORT=5432
```
Recomendamos utilizar um UUID no `JWT_SECRET`

### ▶️ Rodar o Backend

1. Acesse a pasta:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

### 🌐 Rodar o Frontend

1. Acesse a pasta:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```