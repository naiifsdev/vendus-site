# Configuração do Checkout Transparente Mercado Pago

## Variáveis de Ambiente Necessárias

### No projeto do site (`.env.local` ou Vercel):

```env
# Supabase
VITE_SUPABASE_URL=https://mmikagnawofxauwcwrtm.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui

# Mercado Pago
VITE_MP_PUBLIC_KEY=TEST-c914510c-00ea-4483-9346-9e38eba8fd5a
VITE_MP_ACCESS_TOKEN=TEST-1434676247049264-110516-d2cf915763e653643d9ab45de62f6edd-1237986151

# Supabase Functions URL (obtenha no dashboard do Supabase)
VITE_SUPABASE_FUNCTIONS_URL=https://mmikagnawofxauwcwrtm.supabase.co/functions/v1
```

### No Supabase Dashboard (Edge Functions → Secrets):

1. Acesse **Supabase Dashboard → Edge Functions → Secrets**
2. Adicione as seguintes variáveis:
   - `MERCADOPAGO_ACCESS_TOKEN` = seu token de acesso do Mercado Pago
   - `SUPABASE_URL` = URL do seu projeto Supabase (já configurado por padrão)
   - `SUPABASE_SERVICE_ROLE_KEY` = Service Role Key do Supabase (já configurado por padrão)

## Deploy das Edge Functions

### 1. Instalar Supabase CLI (se ainda não tiver):

```bash
npm install -g supabase
```

### 2. Fazer login no Supabase:

```bash
supabase login
```

### 3. Linkar o projeto:

```bash
supabase link --project-ref mmikagnawofxauwcwrtm
```

### 4. Deploy das funções:

```bash
# Deploy da função create-preference
supabase functions deploy create-preference

# Deploy da função webhook
supabase functions deploy webhook
```

## Configurar Webhook no Mercado Pago

1. Acesse o **Mercado Pago Dashboard → Webhooks**
2. Configure a URL do webhook:
   ```
   https://mmikagnawofxauwcwrtm.supabase.co/functions/v1/webhook
   ```
3. Selecione os eventos: `payment` e `payment.updated`

## Estrutura de Arquivos

```
project/
├── supabase/
│   └── functions/
│       ├── create-preference/
│       │   └── index.ts
│       └── webhook/
│           └── index.ts
└── src/
    └── components/
        └── ModalAssinar.tsx
```

## Testando

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Clique em "Assinar R$45/mês" no site

3. Preencha o e-mail e os dados do cartão no modal

4. Verifique no Supabase:
   - **Table Editor → site_subscriptions**: deve aparecer registro com `status: 'pending'`
   - Após pagamento aprovado, o webhook atualiza para `status: 'active'`

## Troubleshooting

- **Erro "VITE_SUPABASE_FUNCTIONS_URL não configurada"**: Adicione a variável no `.env.local` ou na Vercel
- **Erro "MERCADOPAGO_ACCESS_TOKEN não configurado"**: Configure o secret no Supabase Dashboard
- **CardPayment não aparece**: Verifique se `VITE_MP_PUBLIC_KEY` está configurada corretamente

