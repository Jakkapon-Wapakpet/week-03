import React, { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const saveWishlist = (newList) => {
    setWishlist(newList);
    localStorage.setItem('wishlist', JSON.stringify(newList));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item._id === product._id);
    let newList;
    if (exists) {
      newList = wishlist.filter(item => item._id !== product._id);
    } else {
      newList = [...wishlist, product];
    }
    saveWishlist(newList);
    return !exists; // returns true if added, false if removed
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

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
