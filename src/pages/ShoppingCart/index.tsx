import { Trash } from '@phosphor-icons/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useContext, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import OrderForm, { OrderFormData } from '../../components/OrderForm';
import QuantitySelector from '../../components/QuantitySelector';
import StripeCheckout from '../../components/StripeCheckout';
import { CartContext } from '../../context/CartProvider';
import { deliveryFee } from '../../hooks/useCart';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function ShoppingCart() {
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const formRef = useRef<UseFormReturn<OrderFormData>>();
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);

  const cartItemsArray = Object.values(cart);
  const isCartEmpty = cartItemsArray.length === 0;

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity > 0) {
        updateQuantity(productId, quantity);
      } else {
        removeFromCart(productId);
      }
    },
    [updateQuantity, removeFromCart]
  );

  const handleConfirmOrderData = useCallback((data: OrderFormData) => {
    setOrderData(data);
  }, []);

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 pt-8">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_450px] gap-10 xl:gap-12 items-start">
        {/* Coluna Esquerda: Formulário */}
        <section className="flex flex-col gap-6">
          <h1 className="font-bold text-2xl text-secondary font-sans tracking-tight">
            Complete seu pedido
          </h1>
          <OrderForm
            onOrderSubmit={handleConfirmOrderData}
            formRef={formRef}
            disabled={isCartEmpty}
          />
        </section>

        {/* Coluna Direita: Carrinho */}
        <aside className="flex flex-col gap-6 sticky top-[120px]">
          <h2 className="font-bold text-2xl text-secondary font-sans tracking-tight">
            Cafés selecionados
          </h2>

          <div className="flex flex-col p-6 sm:p-8 bg-card rounded-[8px_36px_8px_36px] shadow-md border border-light/50 w-full gap-8">
            {isCartEmpty ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <p className="text-center text-secondary/60 font-medium">
                  Seu carrinho está vazio.
                </p>
              </div>
            ) : (
              <>
                <ul className="flex flex-col w-full gap-6" role="list">
                  {cartItemsArray.map((product) => (
                    <li
                      key={product.id}
                      className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-light last:border-b-0 last:pb-0"
                    >
                      <div className="flex gap-4 sm:gap-6 items-start w-full">
                        <img
                          src={product.image}
                          alt={`Foto do café ${product.name}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
                          loading="lazy"
                        />
                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex justify-between items-start w-full">
                            <span className="text-secondary font-medium text-base">
                              {product.name}
                            </span>
                            <span className="font-bold text-secondary">
                              R${' '}
                              {(product.price * product.quantity)
                                .toFixed(2)
                                .replace('.', ',')}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 items-center">
                            <QuantitySelector
                              quantityInCart={product.quantity}
                              onChange={(qty) =>
                                handleUpdateQuantity(product.id.toString(), qty)
                              }
                            />
                            <button
                              onClick={() =>
                                removeFromCart(product.id.toString())
                              }
                              aria-label={`Remover ${product.name} do carrinho`}
                              className="flex items-center gap-1.5 bg-light px-3 py-2 rounded-lg text-xs uppercase text-secondary/80 hover:bg-light/80 hover:text-red-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none font-semibold tracking-wider"
                            >
                              <Trash
                                size={16}
                                className="text-primary group-hover:text-red-500 transition-colors"
                                aria-hidden="true"
                              />{' '}
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <section
                  aria-label="Resumo dos valores"
                  className="flex flex-col gap-3 text-sm text-secondary/80 pt-6 border-t border-light"
                >
                  <div className="flex justify-between">
                    <span>Total de itens</span>
                    <span>
                      R${' '}
                      {(totalPrice - deliveryFee).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entrega</span>
                    <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-secondary pt-4">
                    <span>Total</span>
                    <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </section>

                <div className="flex flex-col gap-4 mt-2">
                  {orderData && stripePromise && (
                    <Elements stripe={stripePromise}>
                      <StripeCheckout
                        cartItems={cartItemsArray}
                        selectedPaymentMethod={orderData.paymentMethod}
                        formRef={formRef}
                      />
                    </Elements>
                  )}
                  <button
                    onClick={clearCart}
                    aria-label="Limpar todo o carrinho"
                    className="w-full py-3 rounded-lg border-2 border-transparent bg-light text-secondary font-semibold text-sm uppercase tracking-wide transition-all hover:bg-light/80 focus-visible:border-primary outline-none"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
