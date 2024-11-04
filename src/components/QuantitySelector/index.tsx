import { useEffect, useState } from "react";

interface QuantitySelectorProps {
  quantityInCart: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantityInCart,
  onChange,
  min = 1,
  max = 100,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState<number>(quantityInCart);

  useEffect(() => {
    setQuantity(quantityInCart);
  }, [quantityInCart]);

  const increment = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (newQuantity !== quantity) {
        onChange(newQuantity);
      }
    }
  };

  const decrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (newQuantity !== quantity) {
        onChange(newQuantity);
      }
    }
  };

  return (
    <div className='flex items-center px-2 w-24 rounded-[6px] justify-between bg-light'>
      <button className='flex text-[24px] cursor-pointer text-primary' onClick={decrement} disabled={quantity <= min}>
        -
      </button>
      <p>{quantity}</p>
      <button className='flex text-[24px] cursor-pointer text-primary' onClick={increment} disabled={quantity >= max}>
        +
      </button>
    </div>
  );
}