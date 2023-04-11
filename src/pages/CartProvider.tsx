import { type Product } from "@prisma/client";
import { createContext, useContext, useState } from "react";

export interface CartItem {
  id: string;
  Product: Product;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (
    product: Product,
    color: string,
    size: string,
    quantity: number
  ) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  clearCart: () => undefined,
  updateQuantity: () => undefined,
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    color: string,
    size: string,
    quantity: number
  ) => {
    const item = cart.find((item) => item.id === product.id);
    if (item) {
      updateQuantity(item.id, item.quantity + quantity);
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          Product: product,
          color,
          size,
          quantity,
          price: product.price,
        },
      ]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
