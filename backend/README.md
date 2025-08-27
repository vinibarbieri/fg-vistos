# 🚀 FG Vistos Backend

Backend seguro e simples para o sistema FG Vistos, desenvolvido em TypeScript com Express.

## ✨ Características

- 🔒 **Seguro por padrão**: JWT, validação, rate limiting
- 🚀 **Simples**: Sem over-engineering, código limpo
- 📱 **API REST**: Endpoints organizados e documentados
- 🗄️ **Supabase**: Banco de dados PostgreSQL
- 💳 **InfinitePay**: Integração com gateway de pagamento

## 🛠️ Tecnologias

- **Node.js** + **Express**
- **TypeScript**
- **Supabase** (PostgreSQL)
- **JWT** para autenticação
- **Zod** para validação
- **Helmet** para segurança

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações
```

## 🔧 Configuração

Crie um arquivo `.env` com:

```env
# Servidor
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura

# Supabase
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima

# InfinitePay
INFINITEPAY_API_URL=https://api.infinitepay.com.br
INFINITEPAY_HANDLE=seu_handle

# Frontend
FRONTEND_URL=http://localhost:3000
```

## 🚀 Executar

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

## 📚 Endpoints

### 🔐 Pagamentos
- `POST /api/payments/create-checkout` - Criar checkout
- `POST /api/payments/check-status` - Verificar pagamento
- `POST /api/payments/webhook` - Webhook InfinitePay

### 📋 Vistos
- `GET /api/vistos` - Listar vistos
- `GET /api/vistos/:id` - Buscar visto
- `POST /api/vistos` - Criar visto
- `PUT /api/vistos/:id` - Atualizar visto
- `DELETE /api/vistos/:id` - Deletar visto

### 🏥 Health Check
- `GET /health` - Status do servidor

## 🔒 Segurança

- **JWT**: Autenticação em todas as rotas protegidas
- **Validação**: Dados validados com Zod
- **Rate Limiting**: Proteção contra spam
- **CORS**: Configurado para frontend específico
- **Helmet**: Headers de segurança automáticos

## 📁 Estrutura

```
src/
├── app.ts              # Aplicação principal
├── config/             # Configurações
├── middleware/         # Middlewares
├── routes/             # Rotas da API
└── services/           # Serviços externos
```

## 🧪 Testes

```bash
npm test
```

## 📝 Logs

O servidor loga todas as requisições e erros para facilitar o debug.

## 🚨 Tratamento de Erros

- Erros 400: Dados inválidos
- Erros 401: Não autenticado
- Erros 404: Endpoint não encontrado
- Erros 500: Erro interno do servidor

## 🔄 Desenvolvimento

1. Faça alterações no código
2. O nodemon reinicia automaticamente
3. Teste os endpoints
4. Faça commit das mudanças

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou entre em contato com a equipe de desenvolvimento.
