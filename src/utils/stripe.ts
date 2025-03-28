import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import { CartItem } from "../types/cart";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const secretKey = process.env.VITE_STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error(
    "VITE_STRIPE_SECRET_KEY não está definida nas variáveis de ambiente"
  );
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2025-02-24.acacia",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.post(
  "/create-checkout-session",
  async (req: express.Request, res: express.Response) => {
    try {
      const { items }: { items: CartItem[] } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: "Nenhum item no carrinho" });
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

      res.json({ url: session.url });
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      res.status(500).json({ error: "Erro ao criar sessão de checkout" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default stripe;
