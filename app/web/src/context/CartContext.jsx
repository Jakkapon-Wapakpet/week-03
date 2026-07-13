import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // โหลดตะกร้าจาก localStorage ตอนแอพเปิดครั้งแรก (persistent cart)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // บันทึกตะกร้าลง localStorage ทุกครั้งที่มีการเปลี่ยนแปลง
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // เพิ่มสินค้าลงตะกร้า (ถ้ามีอยู่แล้วให้เพิ่มจำนวน)
  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex(item => item.productId === product._id);
    let newCart = [...cart];

    if (existingIndex > -1) {
      // สินค้ามีในตะกร้าแล้ว — เพิ่มจำนวน
      newCart[existingIndex].quantity += Number(quantity);
    } else {
      // สินค้าใหม่ — เพิ่มเข้าตะกร้า
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

  // ลบสินค้าออกจากตะกร้าตาม productId
  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.productId !== productId);
    saveCart(newCart);
  };

  // อัพเดตจำนวนสินค้า (ถ้าเป็น 0 หรือน้อยกว่า จะลบออกอัตโนมัติ)
  const updateQuantity = (productId, quantity) => {
    const newCart = cart.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    }).filter(item => item.quantity > 0); // กรองสินค้าที่จำนวน 0 ออก
    
    saveCart(newCart);
  };

  // ล้างตะกร้าทั้งหมด (ใช้หลัง checkout สำเร็จ)
  const clearCart = () => {
    saveCart([]);
  };

  // คำนวณราคารวมทุกชิ้นในตะกร้า
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // นับจำนวนชิ้นรวมทั้งหมดในตะกร้า
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
