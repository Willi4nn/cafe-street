export interface Product {
  id: number;
  name: string;
  rating: number;
  price: number;
  image: string;
  available_temperature: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  [itemId: string]: CartItem;
}

export interface CartContextType {
  cart: Cart;
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}
