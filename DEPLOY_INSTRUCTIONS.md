# 🚀 Guia de Deploy das Edge Functions - Supabase

## ✅ Passo 1: Variável de Ambiente Adicionada

A variável `VITE_SUPABASE_FUNCTIONS_URL` já foi adicionada ao `.env.local`:
```
VITE_SUPABASE_FUNCTIONS_URL=https://mmikagnawofxauwcwrtm.supabase.co/functions/v1
```

**⚠️ IMPORTANTE**: Reinicie o servidor de desenvolvimento (`npm run dev`) para carregar a nova variável.

---

## 🔐 Passo 2: Login no Supabase CLI

Execute no terminal:

```bash
npx supabase login
```

Isso abrirá o navegador para autenticação. Após fazer login, volte ao terminal.

---

## 🔗 Passo 3: Linkar o Projeto

Execute:

```bash
npx supabase link --project-ref mmikagnawofxauwcwrtm
```

Quando solicitado, escolha:
- **Database password**: (deixe em branco se não tiver configurado, ou use a senha do seu projeto)

---

## 📦 Passo 4: Deploy das Funções

### Deploy da função create-preference:

```bash
npx supabase functions deploy create-preference
```

### Deploy da função webhook:

```bash
npx supabase functions deploy webhook
```

---

## 🔑 Passo 5: Configurar Secrets no Supabase Dashboard

1. Acesse: https://supabase.com/dashboard/project/mmikagnawofxauwcwrtm/functions
2. Vá em **Edge Functions → Secrets**
3. Clique em **Add new secret**
4. Adicione:
   - **Name**: `MERCADOPAGO_ACCESS_TOKEN`
   - **Value**: `TEST-1434676247049264-110516-d2cf915763e653643d9ab45de62f6edd-1237986151`
   - (Use o token de produção quando estiver pronto para produção)

**Nota**: As variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` já estão disponíveis automaticamente nas Edge Functions.

---

## 🔔 Passo 6: Configurar Webhook no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Vá em **Webhooks** ou **Notificações**
3. Adicione uma nova URL de webhook:
   - **URL**: `https://mmikagnawofxauwcwrtm.supabase.co/functions/v1/webhook`
   - **Eventos**: Selecione:
     - `payment`
     - `payment.updated`
   - **Método**: `POST`

---

## ✅ Verificação Final

Após completar todos os passos:

1. **Reinicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

2. **Teste o fluxo**:
   - Abra o site em `http://localhost:5173`
   - Clique em "Assinar R$45/mês"
   - Preencha o e-mail e os dados do cartão
   - Verifique se o pagamento é processado

3. **Verifique no Supabase**:
   - Table Editor → `site_subscriptions`
   - Deve aparecer um registro com `status: 'pending'` após iniciar o pagamento
   - Após aprovação, o webhook atualiza para `status: 'active'`

---

## 🐛 Troubleshooting

### Erro "Project not found"
- Verifique se o `project-ref` está correto: `mmikagnawofxauwcwrtm`
- Confirme que você tem acesso ao projeto no Supabase Dashboard

### Erro "Function not found"
- Certifique-se de que os arquivos estão em:
  - `supabase/functions/create-preference/index.ts`
  - `supabase/functions/webhook/index.ts`

### Erro "MERCADOPAGO_ACCESS_TOKEN não configurado"
- Verifique se o secret foi adicionado no Supabase Dashboard → Edge Functions → Secrets

### CardPayment não aparece no modal
- Verifique se `VITE_MP_PUBLIC_KEY` está no `.env.local`
- Reinicie o servidor após adicionar variáveis

---

## 📝 Comandos Rápidos (Copie e Cole)

```bash
# 1. Login
npx supabase login

# 2. Linkar projeto
npx supabase link --project-ref mmikagnawofxauwcwrtm

# 3. Deploy das funções
npx supabase functions deploy create-preference
npx supabase functions deploy webhook

# 4. Reiniciar servidor (em outro terminal)
npm run dev
```

