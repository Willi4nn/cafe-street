import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartProvider';
import { CartItem } from '../types/cart';

export function useStripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const processCheckout = useCallback(
    async (
      cartItems: CartItem[],
      selectedPaymentMethod: string,
      resetForm?: () => void
    ) => {
      if (!selectedPaymentMethod) {
        toast.error('Selecione um método de pagamento.');
        return;
      }

      if (!stripe || !elements) {
        toast.error('Serviço de pagamento indisponível no momento.');
        return;
      }

      setIsProcessingCheckout(true);

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cartItems }),
        });

        if (!response.ok) throw new Error('Erro ao criar sessão de pagamento');

        const data = await response.json();
        if (!data.url) throw new Error('URL de checkout inválida');

        clearCart();
        localStorage.removeItem('coffee-cart');
        if (resetForm) resetForm();

        window.location.href = data.url;
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Erro ao processar pagamento.'
        );
      } finally {
        setIsProcessingCheckout(false);
      }
    },
    [stripe, elements, clearCart, navigate]
  );

  return { processCheckout, isProcessingCheckout };
}
