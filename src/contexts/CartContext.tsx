"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IProduct } from "@/types/product";
import { CartItem, ICartItem } from "@/types/cart";
import useAxios from "@/hooks/useAxios";
import { useAuth } from "@/hooks/useAuth";
import { addToCartApi, fetchCartApi } from "@/services/cartService";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: IProduct, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const axios = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      if (user?.email) {
        try {
          const res = await fetchCartApi(axios, user.email);
          if (res.success && res.data) {
             setCart(res.data as unknown as CartItem[]);
          }
        } catch (error) {
          console.error("Cart loading failed:", error);
        }
      }
    };
    loadCart();
  }, [user, axios]);

  const addToCart = async (product: IProduct, quantity: number) => {
    if (!user?.email) {
      alert("Please login to add items to cart");
      return;
    }

    const newItem: ICartItem = {
      productId: product._id,
      name: product.name,
      quantity: quantity,
      price: product.price,
      image: product.mainImage,
    };

    const cartData = {
      userEmail: user.email,
      items: [newItem],
      totalAmount: product.price * quantity,
      status: "Unpaid" 
    };

    try {
      const res = await addToCartApi(axios, cartData);
      
      if (res) {
        setCart((prev) => {
          const isExist = prev.find((item) => item._id === product._id);
          if (isExist) {
            return prev.map((item) =>
              item._id === product._id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            );
          }
          return [...prev, { ...product, quantity }];
        });
        alert("Added to Database successfully!");
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { data: { message?: string } } };
        console.error("Cart Sync Error:", axiosError.response.data);
      } else {
        console.error("Cart Sync Error:", error);
      }
      alert("Could not add to database. Please check console.");
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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