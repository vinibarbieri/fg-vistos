# Integração com InfinitePay

Este projeto está integrado com o InfinitePay para processamento de pagamentos. A integração permite gerar links de checkout automaticamente e acompanhar o status dos pagamentos em tempo real.

## 🚀 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
# InfinitePay Configuration
VITE_INFINITEPAY_HANDLE=seu_handle_aqui

# Outras configurações
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

**Importante:** 
- Substitua `seu_handle_aqui` pelo seu handle real do InfinitePay (sem o símbolo $)
- O handle pode ser encontrado no canto superior esquerdo do app InfinitePay

### 2. Configuração no InfinitePay

1. Acesse sua conta na web do InfinitePay
2. Vá em **Configurações**
3. Clique em **Link integrado**
4. Configure as URLs de redirecionamento e webhook conforme necessário

## 🔧 Como Funciona

### Fluxo de Pagamento

1. **Criação do Pedido**: Usuário seleciona um plano e é redirecionado para o checkout
2. **Geração do Link**: Sistema cria um link de checkout no InfinitePay
3. **Redirecionamento**: Usuário é direcionado para o checkout do InfinitePay
4. **Processamento**: Pagamento é processado (cartão de crédito ou PIX)
5. **Retorno**: Usuário retorna para o site com status do pagamento
6. **Confirmação**: Sistema verifica e atualiza o status do pedido

### Endpoints da API

- **POST** `/invoices/public/checkout/links` - Cria link de checkout
- **POST** `/invoices/public/checkout/payment_check` - Verifica status do pagamento

## 📁 Arquivos da Integração

### Serviços
- `src/services/infinitePay.ts` - Serviço principal para comunicação com a API

### Hooks
- `src/hooks/useInfinitePayCheckout.ts` - Hook para gerenciar o checkout

### Componentes
- `src/components/Checkout.tsx` - Componente de checkout atualizado
- `src/pages/PaymentSuccess.tsx` - Página de sucesso/erro do pagamento

## 💳 Tipos de Pagamento Suportados

- **Cartão de Crédito**: Todas as bandeiras principais
- **PIX**: Pagamento instantâneo

## 🔄 Status dos Pedidos

- `pending` - Aguardando pagamento
- `checkout_created` - Checkout criado no InfinitePay
- `paid` - Pagamento aprovado
- `failed` - Pagamento não aprovado

## 🚨 Tratamento de Erros

### Erros Comuns

1. **Handle inválido**: Verifique se o `VITE_INFINITEPAY_HANDLE` está correto
2. **Erro de rede**: Verifique a conectividade com a API do InfinitePay
3. **Dados inválidos**: Verifique se todos os campos obrigatórios estão preenchidos

### Logs

Todos os erros são logados no console do navegador para facilitar o debug.

## 🧪 Testes

### Ambiente de Desenvolvimento

1. Use o handle de teste fornecido pelo InfinitePay
2. Teste com valores pequenos
3. Verifique os logs no console

### Ambiente de Produção

1. Configure o handle real
2. Teste com valores reais
3. Monitore os webhooks

## 📱 Webhooks

### Configuração

Configure a URL do webhook no InfinitePay:
```
https://seusite.com/api/webhooks/infinitepay
```

### Resposta Esperada

```json
{
  "success": true,
  "message": null
}
```

## 🔒 Segurança

- Todas as comunicações são feitas via HTTPS
- Dados sensíveis não são armazenados localmente
- Validação de dados em todas as requisições
- Verificação de status de pagamento antes de confirmar

## 📞 Suporte

Para dúvidas sobre a integração:

1. **InfinitePay**: Chat no app InfinitePay
2. **Desenvolvimento**: Verifique os logs e documentação
3. **Configuração**: Consulte a documentação oficial do InfinitePay

## 📋 Checklist de Implementação

- [ ] Configurar variáveis de ambiente
- [ ] Configurar handle no InfinitePay
- [ ] Testar criação de checkout
- [ ] Testar retorno de pagamento
- [ ] Configurar webhooks (opcional)
- [ ] Testar em produção
- [ ] Monitorar logs e erros

## 🎯 Próximos Passos

1. **Implementar webhooks** para atualizações automáticas
2. **Adicionar notificações** por email/SMS
3. **Implementar relatórios** de vendas
4. **Adicionar analytics** de conversão
