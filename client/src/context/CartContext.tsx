import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (
    id: number,
    quantity: number
  ) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

const CART_STORAGE_KEY = "kalvani_cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Load cart from localStorage when the app starts
  const [cartItems, setCartItems] =
    useState<CartItem[]>(() => {
      try {
        const savedCart =
          localStorage.getItem(CART_STORAGE_KEY);

        if (!savedCart) {
          return [];
        }

        const parsedCart = JSON.parse(savedCart);

        return Array.isArray(parsedCart)
          ? parsedCart
          : [];
      } catch (error) {
        console.error(
          "Failed to load cart:",
          error
        );

        return [];
      }
    });

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );

      console.log(
        "Cart saved:",
        cartItems
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cartItems]);

  // Add product to cart
  const addToCart = (
    item: Omit<CartItem, "quantity">
  ) => {
    setCartItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (cartItem) =>
            cartItem.id === item.id
        );

      if (existingItem) {
        return currentItems.map(
          (cartItem) =>
            cartItem.id === item.id
              ? {
                  ...cartItem,
                  quantity:
                    cartItem.quantity + 1,
                }
              : cartItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  // Remove product completely
  const removeFromCart = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };

  // Change product quantity
  const updateQuantity = (
    id: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Empty entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(
    CartContext
  );

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}