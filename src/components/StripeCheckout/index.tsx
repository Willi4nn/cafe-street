import { Spinner } from '@phosphor-icons/react';
import { UseFormReturn } from 'react-hook-form';
import { useStripeCheckout } from '../../hooks/useStripeCheckout';
import { CartItem } from '../../types/cart';
import { OrderFormData } from '../OrderForm';

interface StripeCheckoutProps {
  cartItems: CartItem[];
  orderData: OrderFormData;
  cartTotals: { totalItems: number; deliveryFee: number; totalPrice: number };
  formRef: React.MutableRefObject<UseFormReturn<OrderFormData> | undefined>;
}

export default function StripeCheckout({
  cartItems,
  orderData,
  cartTotals,
  formRef,
}: StripeCheckoutProps) {
  const { processCheckout, isProcessingCheckout } = useStripeCheckout();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    processCheckout(cartItems, orderData, cartTotals, formRef.current?.reset);
  };

  const isReadyToPay = !!orderData.paymentMethod;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <button
        type="submit"
        disabled={isProcessingCheckout || !isReadyToPay}
        className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold tracking-wide uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 active:scale-[0.98]
          ${isReadyToPay ? 'bg-[#EBC136] text-white hover:bg-[#D9A321] hover:shadow-lg' : 'bg-light text-secondary/40 cursor-not-allowed'}`}
      >
        {isProcessingCheckout ? (
          <>
            <Spinner className="animate-spin" size={20} /> Processando...
          </>
        ) : (
          'Confirmar Pagamento'
        )}
      </button>
    </form>
  );
}
