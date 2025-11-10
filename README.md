# Café Street

E-commerce de cafés com React + Stripe Checkout.

## Stack
React + Vite + TypeScript + Tailwind | Express + Stripe API

## Setup
```bash
# Instalar
npm install

# Criar .env na raiz. Chaves do Stripe (precisa das duas para rodar local)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# URL da API local
VITE_API_BASE_URL=http://localhost:3333

# Terminal 1 - Backend
cd server && npx ts-node-dev --respawn --transpile-only stripe.ts

# Terminal 2 - Frontend
npm run dev
```

## Teste de Pagamento
Cartão: `4242 4242 4242 4242` | Validade: `12/34` | CVC: `123`