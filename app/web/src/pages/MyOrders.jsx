import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ShoppingBag, Loader2, AlertCircle, Clock, MapPin, Truck, ChevronDown, ChevronUp } from 'lucide-react';

const MyOrders = () => {
  const { token, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login?redirect=my-orders');
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          throw new Error(data.message || 'ดึงประวัติออเดอร์ล้มเหลว');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, isLoggedIn, navigate]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(prev => prev === orderId ? '' : orderId);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <Loader2 size={48} className="fa-spin" style={{ color: 'var(--accent-secondary)', margin: '0 auto' }} />
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>กำลังโหลดประวัติคำสั่งซื้อ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--danger)' }}>
        <AlertCircle size={48} style={{ margin: '0 auto' }} />
        <p style={{ marginTop: '1rem', fontWeight: 500 }}>เกิดข้อผิดพลาดในการดึงประวัติคำสั่งซื้อ</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--panel-bg)', borderRadius: '16px', border: '1px solid var(--panel-border)', margin: '2rem 0' }}>
        <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', margin: '0 auto' }} />
        <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>คุณยังไม่มีประวัติการสั่งซื้อสินค้า</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>ไปเลือกซื้ออุปกรณ์เกมมิ่งเกียร์ยอดนิยมหน้าร้านค้ากันเถอะ!</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', maxWidth: '200px' }}>
          ช็อปปิ้งเลย
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="hero" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
        <h1>ประวัติ <span>การสั่งซื้อของคุณ</span></h1>
        <p>ตรวจสอบและติดตามสถานะคำสั่งซื้อพัสดุของคุณได้ตลอดเวลา</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto 3rem' }}>
        {orders.map(order => {
          const isExpanded = expandedOrderId === order._id;
          const orderDate = new Date(order.createdAt).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div 
              key={order._id} 
              style={{ 
                background: 'var(--panel-bg)', 
                border: '1px solid var(--panel-border)', 
                borderRadius: '16px', 
                overflow: 'hidden',
                boxShadow: 'var(--card-shadow)',
                transition: 'all 0.3s'
              }}
            >
              {/* Card Header (Summary) */}
              <div 
                onClick={() => toggleExpand(order._id)}
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    ออเดอร์เลขที่: {order._id}
                  </div>
                  <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={14} style={{ color: 'var(--accent-secondary)' }} /> {orderDate}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ยอดสุทธิ</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                      {order.totalAmount.toLocaleString()} ฿
                    </div>
                  </div>

                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>

                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Card Body (Detailed view) */}
              {isExpanded && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(10, 14, 23, 0.3)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', flexWrap: 'wrap' }}>
                    
                    {/* Items List */}
                    <div>
                      <h4 style={{ color: 'var(--accent-secondary)', fontSize: '0.95rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ShoppingBag size={14} /> รายการสินค้าที่สั่งซื้อ
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#fff' }}>
                            <div>
                              <span>{item.name}</span>
                              <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>x{item.quantity}</span>
                            </div>
                            <div style={{ fontWeight: 600 }}>{(item.price * item.quantity).toLocaleString()} ฿</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address & Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {/* Address */}
                      <div>
                        <h4 style={{ color: 'var(--accent-secondary)', fontSize: '0.95rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={14} /> ที่อยู่สำหรับจัดส่ง
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                          <strong>{order.shippingAddress.receiverName}</strong> (โทร: {order.shippingAddress.phone}) <br />
                          {order.shippingAddress.addressLine} ต.{order.shippingAddress.subDistrict} อ.{order.shippingAddress.district} จ.{order.shippingAddress.province} {order.shippingAddress.postalCode}
                        </p>
                      </div>

                      {/* Tracking details */}
                      <div>
                        <h4 style={{ color: 'var(--accent-secondary)', fontSize: '0.95rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Truck size={14} /> ข้อมูลการขนส่งสินค้า
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                          <strong>ช่องทางการชำระเงิน:</strong> {order.paymentMethod} <br />
                          <strong>เลขติดตามพัสดุ:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 600, color: order.trackingNumber ? '#fff' : 'var(--text-muted)' }}>{order.trackingNumber || 'รอการจัดส่งพัสดุ'}</span>
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
