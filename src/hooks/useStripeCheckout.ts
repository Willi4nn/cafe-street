import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { OrderFormData } from '../components/OrderForm';
import { CartContext } from '../context/CartProvider';
import { CartItem, CompletedOrder } from '../types/cart';

export function useStripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useContext(CartContext);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const processCheckout = useCallback(
    async (
      cartItems: CartItem[],
      orderData: OrderFormData,
      cartTotals: {
        totalItems: number;
        deliveryFee: number;
        totalPrice: number;
      },
      resetForm?: () => void
    ) => {
      if (!orderData.paymentMethod) {
        toast.error('Selecione um método de pagamento.');
        return;
      }

      if (!stripe || !elements) {
        toast.error('Serviço de pagamento indisponível no momento.');
        return;
      }

      setIsProcessingCheckout(true);

      try {
        const apiUrl =
          import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';
        const response = await fetch(`${apiUrl}/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cartItems }),
        });

        if (!response.ok) throw new Error('Erro ao criar sessão de pagamento');

        const data = await response.json();
        if (!data.url) throw new Error('URL de checkout inválida');

        const completedOrder: CompletedOrder = {
          ...orderData,
          products: cartItems.map((item) => ({
            id: item.id.toString(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          totalItems: cartTotals.totalItems,
          deliveryFee: cartTotals.deliveryFee,
          totalPrice: cartTotals.totalPrice,
        };

        localStorage.setItem('completed-order', JSON.stringify(completedOrder));

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
    [stripe, elements, clearCart]
  );

  return { processCheckout, isProcessingCheckout };
}
