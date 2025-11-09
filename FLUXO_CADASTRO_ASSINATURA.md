# 📋 Fluxo de Cadastro e Assinatura - Atualizado

## ✅ O que foi implementado:

### 1. Tabela `site_users` criada
- Arquivo SQL criado em `supabase/migrations/create_site_users.sql`
- Execute este SQL no Supabase Dashboard → SQL Editor

### 2. ModalAssinar atualizado
- **Etapa 1**: Formulário de cadastro (nome, e-mail, CPF, telefone, senha)
- **Etapa 2**: Pagamento via CardPayment do Mercado Pago
- Fluxo em 2 etapas conforme especificado

### 3. Edge Function `create-preference` atualizada
- Agora aceita `name`, `cpf`, `phone` além do `email`
- Cria preferência de checkout com dados completos do pagador
- Remove caracteres não numéricos de CPF e telefone automaticamente

### 4. Webhook atualizado
- Atualiza `site_users.status` para `'active'` quando pagamento aprovado
- Mantém atualização de `site_subscriptions` (compatibilidade)

---

## 🔄 Fluxo Completo:

1. **Usuário clica em "Assinar R$45/mês"**
   - Modal abre na Etapa 1 (Cadastro)

2. **Usuário preenche dados e clica "Continuar para pagamento"**
   - Dados são salvos em `site_users` com `status: 'pending_payment'`
   - Modal avança para Etapa 2 (Pagamento)

3. **Usuário preenche dados do cartão e submete**
   - Edge Function cria preferência no Mercado Pago
   - Redireciona para checkout do Mercado Pago

4. **Mercado Pago processa pagamento**
   - Webhook recebe notificação
   - Atualiza `site_users.status` para `'active'`

5. **Usuário é redirecionado para app.upvendus.com**
   - Acesso liberado automaticamente

---

## 📝 Próximos Passos:

### 1. Criar tabela no Supabase:
Execute o SQL em `supabase/migrations/create_site_users.sql` no SQL Editor do Supabase.

### 2. Fazer deploy das funções atualizadas:
```bash
npx supabase functions deploy create-preference
npx supabase functions deploy webhook
```

### 3. Testar o fluxo completo:
- Abra o site e clique em "Assinar R$45/mês"
- Preencha o cadastro
- Complete o pagamento
- Verifique no Supabase se `site_users.status` foi atualizado para `'active'`

---

## 🔍 Verificações:

- ✅ Modal com 2 etapas implementado
- ✅ Validação de campos no cadastro
- ✅ Integração com `site_users` table
- ✅ Edge Function aceita nome, CPF e telefone
- ✅ Webhook atualiza `site_users.status`
- ✅ Redirecionamento automático após pagamento

