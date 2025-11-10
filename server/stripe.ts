import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import Stripe from "stripe";
import { CartItem } from "../src/types/cart";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY não está definida nas variáveis de ambiente"
  );
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2025-02-24.acacia",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.post("/create-checkout-session", async (req: Request, res: Response) => {
  try {
    const { items }: { items: CartItem[] } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ error: "Nenhum item no carrinho" });
      return;
    }

    const paymentItems = items.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          images: [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: paymentItems,
      mode: "payment",
      success_url: "http://localhost:5173/order-completed",
      cancel_url: "http://localhost:5173/shopping-cart",
    });

    console.log("Sessão criada com sucesso:", session.id);
    console.log("URL:", session.url);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    res.status(500).json({
      error: "Erro ao criar sessão de checkout",
      details: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(
    `🔑 STRIPE_SECRET_KEY presente: ${!!process.env.STRIPE_SECRET_KEY}`
  );
});

export default stripe;
