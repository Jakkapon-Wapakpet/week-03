import React, { createContext, useState, useEffect, useContext } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedList = localStorage.getItem('compare_list');
    if (savedList) {
      setCompareList(JSON.parse(savedList));
    }
  }, []);

  const saveCompareList = (newList) => {
    setCompareList(newList);
    localStorage.setItem('compare_list', JSON.stringify(newList));
  };

  const addToCompare = (product) => {
    // Check if already in list
    if (compareList.some(item => item._id === product._id)) {
      return { success: false, message: 'สินค้านี้อยู่ในรายการเปรียบเทียบแล้ว' };
    }

    // Limit to 3 items
    if (compareList.length >= 3) {
      return { success: false, message: 'คุณสามารถเปรียบเทียบสินค้าได้สูงสุด 3 ชิ้นเท่านั้น' };
    }

    const newList = [...compareList, product];
    saveCompareList(newList);
    return { success: true };
  };

  const removeFromCompare = (productId) => {
    const newList = compareList.filter(item => item._id !== productId);
    saveCompareList(newList);
  };

  const clearCompare = () => {
    saveCompareList([]);
  };

  const isCompared = (productId) => {
    return compareList.some(item => item._id === productId);
  };

  const getCompareCount = () => {
    return compareList.length;
  };

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isCompared,
      getCompareCount
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
