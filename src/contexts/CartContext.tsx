
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("lensora-cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (items.length > 0) {
      localStorage.setItem("lensora-cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("lensora-cart");
    }

    // Calculate total items and price
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalAmount(amount);
  }, [items]);

  const addToCart = (product: CartItem) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increment quantity of existing item
        const updatedItems = prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        return updatedItems;
      } else {
        // Add new item with quantity 1
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return; // Don't allow quantities less than 1
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("lensora-cart");
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
