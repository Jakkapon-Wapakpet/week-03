import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // ตรวจสอบ token ที่เก็บใน localStorage ตอนแอพโหลดครั้งแรก
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // ดึงข้อมูล user ปัจจุบันจาก API ด้วย token ที่มี
          const res = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (data.success) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            // Token หมดอายุหรือไม่ถูกต้อง — ล็อกเอาท์อัตโนมัติ
            logout();
          }
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์:', error);
          logout();
        }
      }
      setLoading(false); // โหลดเสร็จแล้ว ไม่ว่าจะมี token หรือไม่
    };

    initAuth();
  }, [token]);

  // ฟังก์ชันเข้าสู่ระบบ — ส่ง email + password ไปยัง API
  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    // บันทึก token และ user ลง localStorage เพื่อให้ยังล็อกอินอยู่หลัง refresh
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  // ฟังก์ชันสมัครสมาชิก — ส่งข้อมูลทั้งหมดไปยัง API
  const register = async (username, email, password, firstName, lastName, phoneNumber, role = 'customer') => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, firstName, lastName, phoneNumber, role })
    });
    
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    // สมัครสำเร็จ — ล็อกอินอัตโนมัติ
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  // ฟังก์ชันออกจากระบบ — ล้างข้อมูลทั้งหมด
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // isLoggedIn = true ก็ต่อเมื่อมีทั้ง token และ user (ผ่านการ verify แล้ว)
  const isLoggedIn = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
