import { ShoppingCart } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartIcon({ toShoppingCart = false }) {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!toShoppingCart) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 200);
    } else {
      navigate("/shopping-cart");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-row p-2 rounded-md cursor-pointer"
    >
      <ShoppingCart
        size={24}
        weight="fill"
        className={`${isClicked ? "fill-primary" : "fill-secundary"
          } transition-colors duration-200 ease-in-out`}
      />
    </button>
  );
}
