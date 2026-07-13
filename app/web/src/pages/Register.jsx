import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserPlus, Loader2 } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('customer');
  const [submitting, setSubmitting] = useState(false);

  const { register, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await register(username, email, password, firstName, lastName, phoneNumber, role);
      showToast('สมัครสมาชิกสำเร็จแล้ว และกำลังล็อกอินเข้าสู่ระบบ...', 'success');
      
      setTimeout(() => {
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 1200);
    } catch (error) {
      showToast(error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '500px', margin: '3rem 0' }}>
        <h2>สมัครสมาชิก</h2>
        <p>ร่วมเป็นส่วนหนึ่งของระบบช็อปปิ้งอัจฉริยะกับเรา!</p>
        
        <form onSubmit={handleSubmit}>
          {/* Username & Email */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">ชื่อผู้ใช้งาน</label>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                required 
                placeholder="เช่น gamer_pro" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">อีเมล</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required 
                placeholder="gamer@example.com" 
              />
            </div>
          </div>
          
          {/* Password & Role selection */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required 
                placeholder="อย่างน้อย 6 ตัวอักษร" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">ประเภทผู้ใช้ (เพื่อการทดสอบ)</label>
              <select id="role" value={role} onChange={e => setRole(e.target.value)}>
                <option value="customer">ลูกค้าทั่วไป (Customer)</option>
                <option value="admin">ผู้ดูแลระบบ (Admin)</option>
              </select>
            </div>
          </div>

          {/* Personal Info */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">ชื่อจริง</label>
              <input 
                type="text" 
                id="firstName" 
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required 
                placeholder="เช่น สมเกียรติ" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">นามสกุล</label>
              <input 
                type="text" 
                id="lastName" 
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required 
                placeholder="เช่น รักดี" 
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber">เบอร์โทรศัพท์</label>
            <input 
              type="tel" 
              id="phoneNumber" 
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              required 
              placeholder="เช่น 0812345678" 
            />
          </div>

          <button type="submit" disabled={submitting} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
            {submitting ? (
              <>
                <Loader2 size={16} className="fa-spin" /> กำลังประมวลผล...
              </>
            ) : (
              <>
                ลงทะเบียนสมาชิก <UserPlus size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          มีบัญชีสมาชิกอยู่แล้ว? <Link to="/login">เข้าสู่ระบบที่นี่</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
