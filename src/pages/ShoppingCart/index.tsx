import { Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Orderform from "../../components/OrderForm";
import QuantitySelector from "../../components/QuantitySelector";
import { deliveryFee, useCart } from "../../hooks/useCart";

export default function ShoppingCart() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    } else {
      removeFromCart(productId);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setRemovingItemId(productId);
    setTimeout(() => {
      removeFromCart(productId);
      toast.success(`Produto removido com sucesso!`);
      setRemovingItemId(null);
    }, 300);
  };

  return (
    <div className="flex justify-between gap-8 flex-wrap max-w-7xl mx-auto">
      <section className="flex-1 flex flex-col">
        <h2 className="font-semibold text-xl">Complete seu pedido</h2>
        <Orderform />
      </section>

      <section className="flex-1 flex flex-col">
        <h2 className="font-semibold text-xl">Cafés selecionados</h2>

        <section className="flex flex-col bg-card p-10 mt-4 rounded-tl-lg rounded-tr-[43px] rounded-bl-[43px] rounded-br-lg max-w-[550px]">
          {Object.entries(cart).length <= 0 ? (
            <div>Carrinho vazio</div>
          ) : (
            <>
              {Object.entries(cart).map(([productId, product]) => (
                <article
                  key={productId}
                  className={`flex justify-between flex-wrap gap-2 pb-6 pt-6 border-b border-light transition-opacity duration-300 ${removingItemId === productId ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                  <div className="flex gap-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16"
                    />

                    <div className="flex flex-col gap-2">
                      <div>
                        <small>{product.name}</small>
                      </div>
                      <div className="flex gap-2 items-center flex-wrap">
                        <div>
                          <QuantitySelector
                            onChange={(quantity) => handleUpdateQuantity(productId, quantity)}
                            quantityInCart={product.quantity}
                            min={0}
                            max={100}
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(productId)}
                          className="flex items-center bg-light rounded-md text-xs p-2 h-[38px] active:bg-light/50 transition-colors duration-200"
                        >
                          <Trash size={16} className="text-primary mr-1" />
                          REMOVER
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-base text-[--base-text] font-bold">
                    R$ {product.price.toFixed(2)}
                  </p>
                </article>
              ))}

              <article className="flex flex-col py-6 gap-3">
                <div className="flex justify-between">
                  <small>Total de itens</small>
                  <small>R$ {totalItems.toFixed(2)}</small>
                </div>
                <div className="flex justify-between">
                  <small>Entrega</small>
                  <small>R$ {deliveryFee.toFixed(2)}</small>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">R$ {totalPrice.toFixed(2)}</p>
                </div>
              </article>

              <button className="w-full bg-primary text-white rounded-md py-3 font-bold text-center active:bg-primary/50 transition duration-200">
                CONFIRMAR PEDIDO
              </button>
            </>
          )}
        </section>
      </section>
    </div>
  );
}
