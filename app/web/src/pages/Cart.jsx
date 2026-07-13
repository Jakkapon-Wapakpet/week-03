import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, Info } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 3000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      showToast('กรุณาเข้าสู่ระบบสมาชิกก่อนดำเนินการชำระเงิน', 'error');
      setTimeout(() => {
        navigate('/login?redirect=checkout');
      }, 1000);
    } else {
      navigate('/checkout');
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    showToast('ลบสินค้าออกจากตะกร้าเรียบร้อยแล้ว');
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--panel-bg)', borderRadius: '16px', border: '1px solid var(--panel-border)', margin: '2rem 0' }}>
        <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', margin: '0 auto' }} />
        <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>ไม่มีสินค้าในตะกร้าของคุณ</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>มาเลือกช็อปอุปกรณ์เกมมิ่งเกียร์โดนใจกันเถอะ!</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', maxWidth: '200px' }}>
          กลับไปเลือกซื้อสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="hero" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
        <h1>ตะกร้า <span>สินค้าของคุณ</span></h1>
        <p>ตรวจสอบความถูกต้องของสินค้าและจำนวนก่อนเข้าสู่ขั้นตอนชำระเงิน</p>
      </div>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-wrapper">
          <h3 style={{ marginBottom: '1.5rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>
            รายการสินค้า ({cart.length})
          </h3>
          {cart.map(item => (
            <div key={item.productId} className="cart-item">
              <img 
                src={item.image || 'https://placehold.co/80x80?text=No+Image'} 
                alt={item.name} 
                onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=Gaming+Gear' }}
              />
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <span className="cart-item-price">{item.price.toLocaleString()} ฿</span>
              </div>
              
              <div className="cart-qty-ctrl">
                <button className="cart-qty-btn" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                  <Minus size={14} />
                </button>
                <span className="cart-qty-val">{item.quantity}</span>
                <button className="cart-qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>
              
              <div style={{ fontWeight: 700, width: '90px', textAlign: 'right', color: '#fff' }}>
                {(item.price * item.quantity).toLocaleString()} ฿
              </div>

              <button className="cart-item-remove" onClick={() => handleRemove(item.productId)} title="ลบรายการสินค้า">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary Panel */}
        <div className="summary-card">
          <h3>สรุปยอดสั่งซื้อ</h3>
          
          <div className="summary-row">
            <span>ยอดรวมสินค้า</span>
            <span>{subtotal.toLocaleString()} ฿</span>
          </div>
          
          <div className="summary-row">
            <span>ค่าจัดส่งพัสดุ</span>
            <span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>จัดส่งฟรี</span> : `${shipping} ฿`}</span>
          </div>

          {shipping > 0 && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
              <Info size={12} /> จัดส่งฟรีเมื่อซื้อครบ 3,000 ฿ (เหลืออีก {(3000 - subtotal).toLocaleString()} ฿)
            </div>
          )}
          
          <div className="summary-row total">
            <span>ยอดรวมสุทธิ</span>
            <span>{total.toLocaleString()} ฿</span>
          </div>
          
          <button onClick={handleCheckout} className="btn-primary btn-checkout" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            ดำเนินการต่อเพื่อสั่งซื้อ <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
