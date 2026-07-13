import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { Gamepad2, ShoppingCart, Sliders, ShieldAlert, LogOut } from 'lucide-react';

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { getCartCount } = useCart();
  const { getCompareCount } = useCompare();
  const location = useLocation();

  const cartCount = getCartCount();
  const compareCount = getCompareCount();

  return (
    <header>
      <div className="nav-container">
        <Link to="/" className="logo">
          <Gamepad2 size={28} /> GearHub
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              หน้าหลัก
            </Link>
          </li>
          <li>
            <Link to="/compare" className={location.pathname === '/compare' ? 'active' : ''} style={{ display: 'inline-flex', alignItems: 'center' }}>
              เปรียบเทียบสเปก 
              {compareCount > 0 && (
                <span id="compare-nav-count" className="badge" style={{ position: 'relative', display: 'inline-flex', top: 0, right: 0, marginLeft: '5px' }}>
                  {compareCount}
                </span>
              )}
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          {/* Shopping Cart Button */}
          <Link to="/cart" className="btn-icon">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          {/* Admin Link */}
          {isLoggedIn && user?.role === 'admin' && (
            <Link to="/admin" className="btn-icon" title="แผงควบคุมแอดมิน">
              <ShieldAlert size={20} />
            </Link>
          )}

          {/* Auth State Button */}
          <div id="auth-container" style={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <span style={{ marginRight: '1rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  สวัสดี, <strong style={{ color: '#fff' }}>{user.profile?.firstName || user.username}</strong>
                </span>
                <button 
                  onClick={logout} 
                  className="btn-auth" 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <LogOut size={16} /> ออกจากระบบ
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-auth">เข้าสู่ระบบ</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
