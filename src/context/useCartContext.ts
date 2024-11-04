import { useContext } from "react";
import { CartContextType } from "../types/cart";
import { CartContext } from "./CartProvider";

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext deve ser usado dentro de um CartProvider");
  }

  return context;
};
