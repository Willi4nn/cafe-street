import { createContext, PropsWithChildren } from 'react';
import { useCart } from '../hooks/useCart';
import { CartContextType } from '../types/cart';

export const CartContext = createContext<CartContextType>({
  cart: {},
  totalItems: 0,
  totalPrice: 0,
  addToCart: async () => { },
  removeFromCart: async () => { },
  updateQuantity: async () => { },
  clearCart: async () => { }
});

export function CartProvider({ children }: PropsWithChildren) {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}
