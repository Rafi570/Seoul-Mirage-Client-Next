"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { IProduct } from "@/types/product";

interface CartItem extends IProduct {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: IProduct, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    alert("Product added to cart!");
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};