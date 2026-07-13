import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex(item => item.productId === product._id);
    let newCart = [...cart];

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += Number(quantity);
    } else {
      newCart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images && product.images[0] ? product.images[0] : '',
        quantity: Number(quantity)
      });
    }

    saveCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.productId !== productId);
    saveCart(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    const newCart = cart.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
