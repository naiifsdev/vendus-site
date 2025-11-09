# 🔧 Correção de CORS - Instruções

## ✅ Correções Aplicadas:

1. **Headers CORS adicionados na Edge Function** (`create-preference/index.ts`)
2. **Headers de autorização adicionados no frontend** (`ModalAssinar.tsx`)

## 🚀 Próximo Passo: Deploy da Função Atualizada

Execute no terminal:

```bash
npx supabase functions deploy create-preference
```

Isso vai atualizar a função no Supabase com os headers CORS corretos.

## 🔍 O que foi corrigido:

### Edge Function (`create-preference/index.ts`):
- ✅ Headers CORS adicionados em todas as respostas
- ✅ Tratamento de requisições OPTIONS (preflight)
- ✅ Headers: `Access-Control-Allow-Origin: *` e `Access-Control-Allow-Headers`

### Frontend (`ModalAssinar.tsx`):
- ✅ Headers `apikey` e `Authorization` adicionados na requisição
- ✅ Usa `VITE_SUPABASE_ANON_KEY` para autenticação

## ⚠️ Importante:

Após fazer o deploy, **recarregue a página** no navegador (Ctrl+R ou Cmd+R) para testar novamente.

O erro de CORS deve desaparecer após o deploy da função atualizada.

