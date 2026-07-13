import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LogIn, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '';

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirect ? `/${redirect}` : '/');
    }
  }, [isLoggedIn, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const res = await login(email, password);
      showToast('เข้าสู่ระบบสำเร็จแล้ว!', 'success');
      
      setTimeout(() => {
        if (res.user && res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(redirect ? `/${redirect}` : '/');
        }
      }, 1000);
    } catch (error) {
      showToast(error.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>เข้าสู่ระบบ</h2>
        <p>ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">อีเมล</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
              placeholder="example@email.com" 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
              placeholder="ป้อนรหัสผ่านของคุณ" 
            />
          </div>

          <button type="submit" disabled={submitting} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
            {submitting ? (
              <>
                <Loader2 size={16} className="fa-spin" /> กำลังตรวจสอบ...
              </>
            ) : (
              <>
                เข้าสู่ระบบ <LogIn size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          ยังไม่มีบัญชีสมาชิก? <Link to="/register">สมัครสมาชิกที่นี่</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
