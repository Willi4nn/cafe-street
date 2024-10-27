import { Product } from "../../pages/Home";
import { PriceFormatter } from "../../utils/PriceFormatter";
import CartIcon from "../CartIcon";
import QuantitySelector from "../QuantitySelector";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
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
      <div className="space-y-2">
        <div className="flex justify-between gap-2 flex-wrap">
          <span className="font-semibold text-xl">
            {product.name}
          </span>
          <PriceFormatter value={product.price} />
        </div>

        <div className="flex justify-between items-center gap-2 ">
          <div className="flex gap-2 flex-wrap">
            {product.available_temperature.map((temperature, index) => (
              <div
                key={index}
                className="border-2 border-primary rounded-xl px-2 py-1 text-xs md:text-sm lg:text-base "
              >
                {temperature}
              </div>
            ))}
          </div>
          <div className="flex gap-2 ">
            <QuantitySelector />
            <CartIcon />
          </div>
        </div>
      </div>
    </article>
  )
}