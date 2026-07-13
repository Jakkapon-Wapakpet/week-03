import React, { createContext, useState, useEffect, useContext } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  // โหลดรายการเปรียบเทียบจาก localStorage ตอนแอพเปิดครั้งแรก
  useEffect(() => {
    const savedList = localStorage.getItem('compare_list');
    if (savedList) {
      setCompareList(JSON.parse(savedList));
    }
  }, []);

  // บันทึกรายการเปรียบเทียบลง localStorage
  const saveCompareList = (newList) => {
    setCompareList(newList);
    localStorage.setItem('compare_list', JSON.stringify(newList));
  };

  // เพิ่มสินค้าเข้าสู่การเปรียบเทียบ (สูงสุด 3 ชิ้น)
  const addToCompare = (product) => {
    // ตรวจว่ามีในรายการแล้วหรือยัง
    if (compareList.some(item => item._id === product._id)) {
      return { success: false, message: 'สินค้านี้อยู่ในรายการเปรียบเทียบแล้ว' };
    }

    // จำกัดไม่เกิน 3 ชิ้น
    if (compareList.length >= 3) {
      return { success: false, message: 'คุณสามารถเปรียบเทียบสินค้าได้สูงสุด 3 ชิ้นเท่านั้น' };
    }

    const newList = [...compareList, product];
    saveCompareList(newList);
    return { success: true };
  };

  // ลบสินค้าออกจากการเปรียบเทียบ
  const removeFromCompare = (productId) => {
    const newList = compareList.filter(item => item._id !== productId);
    saveCompareList(newList);
  };

  // ล้างรายการเปรียบเทียบทั้งหมด
  const clearCompare = () => {
    saveCompareList([]);
  };

  // ตรวจว่าสินค้านี้อยู่ในรายการเปรียบเทียบหรือไม่
  const isCompared = (productId) => {
    return compareList.some(item => item._id === productId);
  };

  // นับจำนวนสินค้าที่เลือกเปรียบเทียบ
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
