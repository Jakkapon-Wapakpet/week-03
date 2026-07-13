import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ShieldCheck, QrCode, CreditCard, Wallet, X, Loader2 } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Address State
  const [receiverName, setReceiverName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PromptPay');

  // Modal State
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 3000 ? 0 : 100;
  const total = subtotal + shipping;

  // Security Lock
  useEffect(() => {
    if (!token) {
      navigate('/login?redirect=checkout');
    } else if (cart.length === 0) {
      navigate('/cart');
    }
  }, [token, cart, navigate]);

  // Autofill user details
  useEffect(() => {
    if (user && user.profile) {
      setReceiverName(`${user.profile.firstName} ${user.profile.lastName}`);
      setPhone(user.profile.phoneNumber);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    const items = cart.map(i => ({
      productId: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity
    }));

    const shippingAddress = { receiverName, phone, addressLine, subDistrict, district, province, postalCode };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items, shippingAddress, paymentMethod })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'บันทึกคำสั่งซื้อล้มเหลว');
      }

      setCreatedOrder(data.order);

      if (paymentMethod === 'PromptPay') {
        setIsQrOpen(true);
      } else {
        // Cards simulated as auto success
        showToast('ชำระเงินผ่านบัตรเครดิต/เดบิต สำเร็จ!', 'success');
        completeCheckout();
      }

    } catch (error) {
      showToast(error.message || 'เกิดข้อผิดพลาดในการประมวลผลคำสั่งซื้อ', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const closePaymentModal = () => {
    setIsQrOpen(false);
    completeCheckout('ออเดอร์ยังรอการชำระเงิน (Pending)');
  };

  // Simulate scanning QR Code
  const simulatePaymentSuccess = async () => {
    if (!createdOrder) return;

    try {
      const response = await fetch(`/api/orders/${createdOrder._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Paid' })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      showToast('สแกนจ่ายเงินพร้อมเพย์สำเร็จแล้ว!', 'success');
      setIsQrOpen(false);
      
      setTimeout(() => {
        completeCheckout();
      }, 500);

    } catch (error) {
      showToast('ยืนยันสถานะจ่ายเงินล้มเหลว: ' + error.message, 'error');
    }
  };

  const completeCheckout = (msg) => {
    clearCart();
    showToast(msg || 'สั่งซื้อสินค้าสำเร็จ! ทางเราจะรีบดำเนินการจัดส่งสินค้า', 'success');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div>
      <div className="hero" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
        <h1>ที่อยู่ <span>และการชำระเงิน</span></h1>
        <p>ระบุที่จัดส่งพัสดุและเลือกช่องทางชำระเงินเพื่อยืนยันรายการคำสั่งซื้อ</p>
      </div>

      <div className="cart-layout">
        
        {/* Address and Payment details Form */}
        <form onSubmit={handleSubmit} className="cart-items-wrapper" style={{ border: '1px solid var(--panel-border)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>ข้อมูลการจัดส่งสินค้า</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>ชื่อผู้รับ</label>
              <input type="text" value={receiverName} onChange={e => setReceiverName(e.target.value)} required placeholder="ชื่อ - นามสกุล" />
            </div>
            <div className="form-group">
              <label>เบอร์โทรศัพท์</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="08XXXXXXXX" />
            </div>
          </div>

          <div className="form-group">
            <label>ที่อยู่ (บ้านเลขที่, ถนน, ซอย)</label>
            <input type="text" value={addressLine} onChange={e => setAddressLine(e.target.value)} required placeholder="เช่น 99/99 หมู่บ้านก้าวหน้า ซอย 5 ถนนสุขุมวิท" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>แขวง / ตำบล</label>
              <input type="text" value={subDistrict} onChange={e => setSubDistrict(e.target.value)} required placeholder="เช่น คลองเตย" />
            </div>
            <div className="form-group">
              <label>เขต / อำเภอ</label>
              <input type="text" value={district} onChange={e => setDistrict(e.target.value)} required placeholder="เช่น คลองเตย" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>จังหวัด</label>
              <input type="text" value={province} onChange={e => setProvince(e.target.value)} required placeholder="เช่น กรุงเทพมหานคร" />
            </div>
            <div className="form-group">
              <label>รหัสไปรษณีย์</label>
              <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} required placeholder="10XXX" pattern="[0-9]{5}" />
            </div>
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>ช่องทางการชำระเงิน</h3>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(10,14,23,0.5)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', fontSize: '1rem', color: '#fff' }}>
              <input type="radio" name="payment" value="PromptPay" checked={paymentMethod === 'PromptPay'} onChange={() => setPaymentMethod('PromptPay')} style={{ width: 'auto', marginRight: '5px' }} />
              <QrCode size={18} style={{ color: 'var(--accent-secondary)' }} /> PromptPay (โอนสแกนจ่าย QR)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', fontSize: '1rem', color: '#fff' }}>
              <input type="radio" name="payment" value="CreditCard" checked={paymentMethod === 'CreditCard'} onChange={() => setPaymentMethod('CreditCard')} style={{ width: 'auto', marginRight: '5px' }} />
              <CreditCard size={18} style={{ color: '#d946ef' }} /> Credit Card (บัตรเครดิต)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', fontSize: '1rem', color: '#fff' }}>
              <input type="radio" name="payment" value="DebitCard" checked={paymentMethod === 'DebitCard'} onChange={() => setPaymentMethod('DebitCard')} style={{ width: 'auto', marginRight: '5px' }} />
              <Wallet size={18} style={{ color: 'var(--success)' }} /> Debit Card (บัตรเดบิต)
            </label>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            {submitting ? (
              <>
                <Loader2 size={18} className="fa-spin" /> กำลังบันทึกสั่งซื้อ...
              </>
            ) : (
              <>
                สั่งซื้อและชำระเงินทันที <ShieldCheck size={18} />
              </>
            )}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <div>
          <div className="summary-card">
            <h3>รายการสั่งซื้อของคุณ</h3>
            <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {cart.map(item => (
                <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ maxWidth: '180px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>จำนวน: {item.quantity} ชิ้น</div>
                  </div>
                  <div style={{ fontWeight: 600, color: '#fff' }}>
                    {(item.price * item.quantity).toLocaleString()} ฿
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-row">
              <span>ยอดรวมสินค้า</span>
              <span>{subtotal.toLocaleString()} ฿</span>
            </div>
            <div className="summary-row">
              <span>ค่าจัดส่งพัสดุ</span>
              <span>{shipping === 0 ? 'จัดส่งฟรี' : `${shipping} ฿`}</span>
            </div>
            <div className="summary-row total">
              <span>ยอดสุทธิที่ต้องชำระ</span>
              <span>{total.toLocaleString()} ฿</span>
            </div>
          </div>
        </div>

      </div>

      {/* PromptPay QR Code Modal */}
      <div className={`modal-overlay ${isQrOpen ? 'active' : ''}`}>
        <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
          <button className="modal-close" onClick={closePaymentModal}><X size={20} /></button>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>PromptPay QR Code</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>กรุณาสแกนรหัสคิวอาร์ด้านล่างเพื่อทำการจ่ายเงินด่วน</p>
          
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', width: '220px', height: '220px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justify: 'center', boxShadow: '0 0 20px rgba(0,229,255,0.2)' }}>
            <img src={`https://promptpay.io/0801853892/${total}.png`} alt="PromptPay QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
            ยอดชำระ: <span style={{ color: 'var(--accent-secondary)' }}>{total.toLocaleString()}</span> ฿
          </div>
          
          <p style={{ color: 'var(--success)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <Loader2 size={12} className="fa-spin" style={{ display: 'inline', marginRight: '5px' }} /> ระบบตรวจจับการชำระเงินอัตโนมัติ...
          </p>
          
          <button className="btn-primary" onClick={simulatePaymentSuccess}>
            ยืนยันการชำระเงินสำเร็จ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
