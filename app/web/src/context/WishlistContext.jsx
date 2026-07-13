import React, { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // โหลดรายการโปรดจาก localStorage ตอนแอพเปิดครั้งแรก
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // บันทึกรายการโปรดลง localStorage ทุกครั้งที่มีการเปลี่ยนแปลง
  const saveWishlist = (newList) => {
    setWishlist(newList);
    localStorage.setItem('wishlist', JSON.stringify(newList));
  };

  // สลับสถานะ Wishlist (ถ้ามีอยู่แล้ว = ลบออก, ถ้ายังไม่มี = เพิ่มเข้า)
  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item._id === product._id);
    let newList;
    if (exists) {
      newList = wishlist.filter(item => item._id !== product._id); // ลบออก
    } else {
      newList = [...wishlist, product]; // เพิ่มเข้า
    }
    saveWishlist(newList);
    return !exists; // คืนค่า true ถ้าเพิ่ม, false ถ้าลบ
  };

  // ตรวจว่าสินค้านี้อยู่ใน wishlist หรือไม่
  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  // นับจำนวนสินค้าใน wishlist
  const getWishlistCount = () => {
    return wishlist.length;
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      toggleWishlist,
      isInWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
