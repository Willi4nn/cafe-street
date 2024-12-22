import { Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Orderform, { OrderFormData } from "../../components/OrderForm";
import QuantitySelector from "../../components/QuantitySelector";
import { deliveryFee, useCart } from "../../hooks/useCart";

export default function ShoppingCart() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
    clearCart()
    toast.success(`Produtos removidos com sucesso!`);
    setIsProcessing(false);
  }

  const handleConfirmOrder = () => {

    if (Object.entries(cart).length === 0) {
      toast.error("Carrinho está vazio!");
      return;
    }

    const formElement = document.getElementById('order-form') as HTMLFormElement;
    if (formElement) {
      formElement.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  const handleValidOrderSubmission = (data: OrderFormData) => {
    const completeOrder = {
      ...data,
      products: Object.entries(cart).map(([productId, product]) => ({
        id: productId,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image
      })),
      totalItems: totalPrice,
      deliveryFee: deliveryFee,
      totalPrice: totalPrice + deliveryFee
    };

    console.log("Pedido confirmado!", completeOrder);
    localStorage.setItem("lastOrder", JSON.stringify(completeOrder));

    clearCart();
    localStorage.removeItem("orderFormData");

    toast.success("Pedido confirmado com sucesso!");
  };


  return (
    <div className="flex justify-between gap-4 flex-wrap  px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-10">
      <section className="flex-1 flex flex-col">
        <h2 className="font-semibold text-xl">Complete seu pedido</h2>
        <Orderform onValidSubmit={handleValidOrderSubmission}
        />
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
                  className={`flex justify-between flex-wrap pb-6 pt-6 border-b border-light transition-opacity duration-300 ${removingItemId === productId ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                  <div className="flex gap-5 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16"
                    />

                    <div className="flex flex-col gap-2">
                      <div>
                        <p>{product.name}</p>
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
                          disabled={isProcessing}
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
                  <p>Total de itens</p>
                  <p>R$ {totalItems.toFixed(2)}</p>
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
                <button className="flex items-center w-full bg-red-500 text-white rounded-md py-3 font-bold text-center active:bg-red-500/50 transition duration-200 justify-center" onClick={() => handleClearCart()}>
                  <Trash size={20} className="text-white mr-1" weight="fill" />
                  LIMPAR CARRINHO
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full bg-primary text-white rounded-md py-3 font-bold text-center active:bg-primary/50 transition duration-200">
                  CONFIRMAR PEDIDO
                </button>
              </div>
            </>
          )}
        </section>
      </section>
    </div>
  );
}
