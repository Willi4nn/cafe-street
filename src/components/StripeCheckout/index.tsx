import { UseFormReturn } from 'react-hook-form';
import { useStripeCheckout } from '../../hooks/useStripeCheckout';
import { CartItem } from '../../types/cart';
import { OrderFormData } from '../OrderForm';

interface StripeCheckoutProps {
  cartItems: CartItem[];
  selectedPaymentMethod: string;
  formRef: React.MutableRefObject<UseFormReturn<OrderFormData> | undefined>;
}

export default function StripeCheckout({
  cartItems,
  selectedPaymentMethod,
  formRef,
}: StripeCheckoutProps) {
  const { processCheckout, isProcessingCheckout } = useStripeCheckout();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    processCheckout(cartItems, selectedPaymentMethod, formRef.current?.reset);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <button
        type="submit"
        aria-label="Confirmar e finalizar pedido"
        disabled={isProcessingCheckout || !selectedPaymentMethod}
        className="w-full py-3 px-4 rounded-lg bg-primary text-white font-bold tracking-wide uppercase transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessingCheckout ? 'Processando...' : 'Confirmar Pedido'}
      </button>
    </form>
  );
}
