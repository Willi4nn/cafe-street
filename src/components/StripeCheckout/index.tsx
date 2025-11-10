import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartProvider";
import { CartItem } from "../../types/cart";
import { OrderFormData } from "../OrderForm";

interface StripeCheckoutProps {
  cartItems: CartItem[];
  selectedPaymentMethod: string;
  formRef: React.MutableRefObject<UseFormReturn<OrderFormData> | undefined>;
}

export default function StripeCheckout({ cartItems, selectedPaymentMethod, formRef }: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPaymentMethod) {
      toast.error("Selecione um método de pagamento.");
      return;
    }

    if (selectedPaymentMethod === "Dinheiro") {
      toast.success("Pedido confirmado! Pagamento será feito na entrega.");
      navigate('/order-completed')
      clearCart();
      localStorage.removeItem("coffee-cart");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe não está carregado ainda. Tente novamente.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar sessão de pagamento");
      }

      const data = await response.json();
      if (!data.url) {
        throw new Error("URL de checkout não fornecida pelo servidor");
      }

      clearCart();
      localStorage.removeItem("coffee-cart");

      if (formRef.current) formRef.current.reset();
      window.location.href = data.url;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao processar pagamento.";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <button
        type="submit"
        className={`w-full py-3 rounded-md ${selectedPaymentMethod === "Dinheiro" ? "bg-blue-500" : "bg-green-500"
          } text-white mr-1 font-bold`}
        disabled={loading || !selectedPaymentMethod}
      >
        {loading ? "Processando..." : "CONFIRMAR PEDIDO"}
      </button>
    </form>
  );
}