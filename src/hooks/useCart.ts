import { useEffect, useMemo, useState } from "react";
import { Cart, CartContextType, Product } from "../types/cart";

export const deliveryFee = 10.0;

export function useCart(): CartContextType {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    const savedCart = localStorage.getItem("coffee-cart");
    if (savedCart) {
      try {
        const parsedCart: Cart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Falha ao analisar o carrinho do localStorage:", error);
        localStorage.removeItem("coffee-cart");
      }
    }
  }, []);

  const totalItems = useMemo((): number => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo((): number => {
    const itemsTotal = Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return itemsTotal + deliveryFee;
  }, [cart]);

  const addToCart = async (
    product: Product,
    quantity: number
  ): Promise<void> => {
    try {
      if (quantity <= 0) return;

      setCart((prevCart) => {
        const productId = product.id.toString();
        const existingProduct = prevCart[productId];

        const newCart = {
          ...prevCart,
          [productId]: {
            ...product,
            quantity: existingProduct
              ? existingProduct.quantity + quantity
              : quantity,
          },
        };

        localStorage.setItem("coffee-cart", JSON.stringify(newCart));
        return newCart;
      });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string): Promise<void> => {
    try {
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[productId];

        localStorage.setItem("coffee-cart", JSON.stringify(newCart));
        return newCart;
      });
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
      throw error;
    }
  };

  const updateQuantity = async (
    productId: string,
    quantity: number
  ): Promise<void> => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      setCart((prevCart) => {
        const item = prevCart[productId];
        if (!item) return prevCart;

        const newCart = {
          ...prevCart,
          [productId]: {
            ...item,
            quantity,
          },
        };

        localStorage.setItem("coffee-cart", JSON.stringify(newCart));
        return newCart;
      });
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      throw error;
    }
  };

  const clearCart = async (): Promise<void> => {
    try {
      const emptyCart = {};
      setCart(emptyCart);
      localStorage.setItem("coffee-cart", JSON.stringify(emptyCart));
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      throw error;
    }
  };


  return {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}
