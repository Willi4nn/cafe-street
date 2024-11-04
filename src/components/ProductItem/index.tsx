import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/cart";
import { PriceFormatter } from "../../utils/PriceFormatter";
import CartIcon from "../CartIcon";
import QuantitySelector from "../QuantitySelector";

interface ProductProps {
  product: Product
}

export function ProductItem({ product }: ProductProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (): Promise<void> => {
    try {
      if (quantity > 0) {
        await addToCart(product, quantity);
        toast.success(`Produto adicionado ao carrinho!`);
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    } finally {

      setQuantity(1);
    }
  }

  return (
    <article className="flex flex-col bg-white rounded-lg shadow-lg p-4 space-y-2 min-w-[225px]">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
          height={226}
        />
        <div className="flex absolute top-4 left-4 bg-white rounded-full items-center py-1 px-4">
          <span className="text-lg font-bold">{product.rating.toFixed(1)}</span>
          <span className="text-xl ml-1 text-yellow-400">★</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between gap-2 flex-wrap">
          <span className="font-semibold text-xl">
            {product.name}
          </span>
          <PriceFormatter value={product.price} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            {product.available_temperature.map((temp, index) => (
              <div
                key={index}
                className="border-2 border-primary rounded-xl px-2 py-1 text-xs md:text-sm lg:text-base "
              >
                {temp}
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-end">
            <QuantitySelector quantityInCart={quantity} onChange={setQuantity} min={0} max={100} />
            <CartIcon onConfirm={handleAddToCart} />
          </div>
        </div>
      </div>
    </article>
  )
}