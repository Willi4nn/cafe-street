import { ShoppingCart } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartIconProps {
  onConfirm?: () => Promise<void>;
  toShoppingCart?: boolean;
}

export default function CartIcon({ toShoppingCart = false, onConfirm }: CartIconProps) {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!toShoppingCart) {
      try {
        setIsClicked(true);
        if (onConfirm) {
          await onConfirm();
        }
      } catch (error) {
        console.error('Erro ao executar ação:', error);
      } finally {
        setTimeout(() => {
          setIsClicked(false);
        }, 200);
      }
    } else {
      navigate("/shopping-cart");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-row p-2 rounded-md cursor-pointer 
        ${onConfirm ? "bg-primary" : "bg-transparent"} 
        ${isClicked ? "opacity-50" : "opacity-100"} 
        transition-opacity duration-500 ease-in-out`}
    >
      <ShoppingCart
        size={24}
        weight="fill"
        className={`${onConfirm ? "text-white" : "text-primary"}`}
      />
    </button>


  );
}
