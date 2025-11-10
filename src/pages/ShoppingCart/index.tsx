import { Trash } from "@phosphor-icons/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import OrderForm, { OrderFormData } from "../../components/OrderForm";
import QuantitySelector from "../../components/QuantitySelector";
import StripeCheckout from "../../components/StripeCheckout";
import { CartContext } from "../../context/CartProvider";
import { deliveryFee } from "../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

export default function ShoppingCart() {
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const formRef = useRef<UseFormReturn<OrderFormData>>();
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    } else {
      removeFromCart(productId);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setRemovingItemId(productId);

    setTimeout(() => {
      removeFromCart(productId);
      toast.success(`Produto removido com sucesso!`);
      setRemovingItemId(null);
      setIsProcessing(false);
    }, 300);
  };

  const handleClearCart = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    clearCart();
    toast.success(`Produtos removidos com sucesso!`);
    setIsProcessing(false);
  };

  const handleConfirmOrder = async (data: OrderFormData) => {
    setOrderData(data);

    const completedOrder = {
      ...data,
      products: Object.values(cart).map(item => ({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalItems: Object.values(cart).reduce((sum, item) => sum + item.quantity, 0),
      deliveryFee,
      totalPrice,
    };

    localStorage.setItem("completed-order", JSON.stringify(completedOrder));
  };

  const isCartEmpty = Object.entries(cart).length <= 0;

  return (
    <div className="flex justify-between gap-4 flex-wrap px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-10">
      <section className="flex-1 flex flex-col">
        <h2 className="font-semibold text-xl">Complete seu pedido</h2>
        <OrderForm onOrderSubmit={handleConfirmOrder} formRef={formRef} />
      </section>

      <section className="flex-1 flex flex-col">
        <h2 className="font-semibold text-xl">Cafés selecionados</h2>

        <section className="flex flex-col bg-card p-10 mt-4 rounded-md min-w-[300px] max-w-[550px]">
          {isCartEmpty ? (
            <div>Carrinho vazio</div>
          ) : (
            <>
              {Object.entries(cart).map(([productId, product]) => (
                <article key={productId} className={`flex justify-between flex-wrap pb-6 pt-6 border-b transition-opacity ${removingItemId === productId ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="flex gap-5 items-center">
                    <img src={product.image} alt={product.name} className="h-16" />
                    <div className="flex flex-col gap-2">
                      <p>{product.name}</p>
                      <div className="flex gap-2 items-center">
                        <QuantitySelector onChange={(quantity) => handleUpdateQuantity(productId, quantity)} quantityInCart={product.quantity} />
                        <button onClick={() => handleRemoveFromCart(productId)} disabled={isProcessing} className="flex items-center bg-light rounded-md text-xs p-2">
                          <Trash size={16} className="text-primary mr-1" /> REMOVER
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-base font-bold">R$ {(product.price * product.quantity).toFixed(2)}</p>
                </article>
              ))}
              <article className="flex flex-col py-6 gap-3">
                <div className="flex justify-between">
                  <p>Itens</p>
                  <p>R$ {(totalPrice - deliveryFee).toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Entrega</p>
                  <p>R$ {deliveryFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">R$ {totalPrice.toFixed(2)}</p>
                </div>
              </article>
              <div className="flex flex-col gap-2">
                <button
                  className="flex items-center justify-center w-full bg-red-500 text-white rounded-md py-3 font-bold"
                  onClick={handleClearCart}
                  disabled={isProcessing}
                >
                  <Trash size={20} className="text-white mr-1" weight="fill" /> LIMPAR CARRINHO
                </button>

                {orderData && (
                  <Elements stripe={stripePromise}>
                    <StripeCheckout
                      cartItems={Object.values(cart)}
                      selectedPaymentMethod={orderData.paymentMethod}
                      formRef={formRef}
                    />
                  </Elements>
                )}
              </div>
            </>
          )}
        </section>
      </section>
    </div>
  );
}