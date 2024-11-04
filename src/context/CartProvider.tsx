import { createContext, PropsWithChildren } from 'react';
import { useCart } from '../hooks/useCart';
import { CartContextType } from '../types/cart';

const initialCartValues: CartContextType = {
  cart: {},
  totalItems: 0,
  totalPrice: 0,
  addToCart: async () => { },
  removeFromCart: async () => { },
  updateQuantity: async () => { },
  clearCart: async () => { },
};

export const CartContext = createContext<CartContextType>(initialCartValues);

export function CartProvider({ children }: PropsWithChildren) {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )

}
