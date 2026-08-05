"use client";

import { createContext, useState, useEffect } from "react";

export const CartContexts = createContext(); 

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);

      if (!found) {
        return [...prev, { ...product, quantity: 1 }]; // { ...product, quantity: 1 } این یعنی همه ویژگی های محصول را نگه دارد و یک ویژگی به ان اضافه کن
      } else {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(item => item.id !== productId));
  }

  function updateQuantity(productId, newQuantity) {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // array.reduce((accumulator, currentItem) => { ... }, initialValue)
    // accumulator (اینجا: sum) → عدد تجمعی تا این لحظه
    // currentItem (اینجا: item) → عنصر فعلی آرایه
    // initialValue (اینجا: 0) → مقدار اولیه‌ی sum
  }

  function clearCart(){
    setCart([])
  }

  return (
    <CartContexts.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal,clearCart}}
    >
      {children}
    </CartContexts.Provider>
  );
}
