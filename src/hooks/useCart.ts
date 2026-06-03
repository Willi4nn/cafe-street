import { useEffect, useMemo, useState } from 'react';
import { Cart, CartContextType, Product } from '../types/cart';

export const deliveryFee = 10.0;

export function useCart(): CartContextType {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    const savedCart = localStorage.getItem('coffee-cart');
    if (savedCart) {
      try {
        const parsedCart: Cart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Falha ao analisar o carrinho do localStorage:', error);
        localStorage.removeItem('coffee-cart');
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
    setCart((prevCart) => {
      // 1. Criamos um clone exato do carrinho anterior (Nova referência de memória)
      const updatedCart = { ...prevCart };

      // 2. Aplicamos a lógica de negócio no clone
      if (updatedCart[product.id]) {
        updatedCart[product.id].quantity += quantity;
      } else {
        updatedCart[product.id] = { ...product, quantity };
      }

      // 3. Atualizamos o Local Storage usando o objeto clonado
      localStorage.setItem('coffee-cart', JSON.stringify(updatedCart));

      // 4. Retornamos a nova referência. Isso OBRIGA o React a re-renderizar a UI instantaneamente.
      return updatedCart;
    });
  };

  const removeFromCart = async (productId: string): Promise<void> => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      delete updatedCart[productId]; // Remove o item do clone

      localStorage.setItem('coffee-cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = async (
    productId: string,
    quantity: number
  ): Promise<void> => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      if (updatedCart[productId]) {
        updatedCart[productId].quantity = quantity;
      }

      localStorage.setItem('coffee-cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = async (): Promise<void> => {
    try {
      const emptyCart = {};
      setCart(emptyCart);
      localStorage.setItem('coffee-cart', JSON.stringify(emptyCart));
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
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
    clearCart,
  };
}
