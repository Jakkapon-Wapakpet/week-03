import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Boxes, Receipt, Plus, Edit, Trash2, ShieldAlert, Save, X, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState('');
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Mouse');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodStock, setProdStock] = useState(0);
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');

  // Specs Subform State
  const [specColor, setSpecColor] = useState('');
  const [specConnection, setSpecConnection] = useState('');
  const [specWeight, setSpecWeight] = useState('');
  const [specSensor, setSpecSensor] = useState('');
  const [specPolling, setSpecPolling] = useState('');
  const [specSwitch, setSpecSwitch] = useState('');
  const [specHotswap, setSpecHotswap] = useState('false');
  const [specBattery, setSpecBattery] = useState('');

  // Order Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editOrderId, setEditOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('Pending');
  const [orderTracking, setOrderTracking] = useState('');

  // Security Access Check
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, token, navigate]);

  // Load products or orders depending on active tab
  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else throw new Error(data.message);
    } catch (err) {
      showToast('ดึงข้อมูลสินค้าล้มเหลว: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else throw new Error(data.message);
    } catch (err) {
      showToast('ดึงข้อมูลคำสั่งซื้อล้มเหลว: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Add/Edit Product Modal Controls
  const openAddProductModal = () => {
    setEditProductId('');
    setProdName('');
    setProdCategory('Mouse');
    setProdPrice(0);
    setProdStock(0);
    setProdDesc('');
    setProdImage('');
    setSpecColor('');
    setSpecConnection('');
    setSpecWeight('');
    setSpecSensor('');
    setSpecPolling('');
    setSpecSwitch('');
    setSpecHotswap('false');
    setSpecBattery('');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (p) => {
    setEditProductId(p._id);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdStock(p.stock);
    setProdDesc(p.description || '');
    setProdImage(p.images?.[0] || '');
    
    const spec = p.specifications || {};
    setSpecColor(spec.color || '');
    setSpecConnection(spec.connection || '');
    setSpecWeight(spec.weight || '');
    setSpecSensor(spec.sensor || '');
    setSpecPolling(spec.pollingRate || '');
    setSpecSwitch(spec.switchType || '');
    setSpecHotswap(String(spec.hotSwappable || false));
    setSpecBattery(spec.batteryLife || '');

    setIsProductModalOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!editProductId;

    const body = {
      name: prodName,
      category: prodCategory,
      price: Number(prodPrice),
      stock: Number(prodStock),
      description: prodDesc,
      images: prodImage ? [prodImage] : [],
      specifications: {
        color: specColor,
        connection: specConnection,
        weight: specWeight,
        sensor: specSensor,
        pollingRate: specPolling,
        switchType: specSwitch,
        hotSwappable: specHotswap === 'true',
        batteryLife: specBattery
      },
      tags: [prodCategory.toLowerCase(), specColor.toLowerCase()].filter(Boolean)
    };

    try {
      const url = isEdit ? `/api/products/${editProductId}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      showToast(isEdit ? 'แก้ไขข้อมูลสินค้าสำเร็จแล้ว!' : 'เพิ่มสินค้าลงคลังสำเร็จแล้ว!', 'success');
      setIsProductModalOpen(false);
      fetchProducts();
    } catch (err) {
      showToast('บันทึกข้อมูลสินค้าล้มเหลว: ' + err.message, 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบสินค้าชิ้นนี้ออกจากระบบ?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      showToast('ลบสินค้าออกจากระบบสำเร็จแล้ว');
      fetchProducts();
    } catch (err) {
      showToast('ลบล้มเหลว: ' + err.message, 'error');
    }
  };

  // Order status modal controls
  const openOrderModal = (o) => {
    setEditOrderId(o._id);
    setOrderStatus(o.status);
    setOrderTracking(o.trackingNumber || '');
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/orders/${editOrderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: orderStatus, trackingNumber: orderTracking })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      showToast('อัปเดตสถานะออเดอร์สำเร็จแล้ว!', 'success');
      setIsOrderModalOpen(false);
      fetchOrders();
    } catch (err) {
      showToast('อัปเดตสถานะออเดอร์ล้มเหลว: ' + err.message, 'error');
    }
  };

  return (
    <div>
      <div className="hero" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
        <h1>ระบบจัดการ <span>ผู้ดูแลระบบ (Admin)</span></h1>
        <p>ควบคุมจัดการคลังสินค้า เพิ่มรายการสินค้าใหม่ และตรวจสอบสถานะคำสั่งซื้อพัสดุของลูกค้า</p>
      </div>

      <div className="admin-grid">
        {/* Sidebar Tabs Toggle */}
        <aside className="admin-sidebar">
          <button 
            className={`admin-sidebar-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Boxes size={18} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /> จัดการคลังสินค้า
          </button>
          <button 
            className={`admin-sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Receipt size={18} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /> จัดการคำสั่งซื้อ
          </button>
        </aside>

        {/* Dashboard Content area */}
        <section className="admin-content">
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <Loader2 size={32} className="fa-spin" style={{ color: 'var(--accent-secondary)', margin: '0 auto' }} />
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>กำลังโหลดข้อมูล...</p>
            </div>
          ) : activeTab === 'products' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#fff' }}>รายการสินค้าเกมมิ่งเกียร์</h3>
                <button className="btn-primary" onClick={openAddProductModal} style={{ maxWidth: '180px' }}>
                  <Plus size={16} /> เพิ่มสินค้าใหม่
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ภาพ</th>
                      <th>ชื่อสินค้า</th>
                      <th>หมวดหมู่</th>
                      <th>ราคา</th>
                      <th>ในคลัง</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td>
                          <img 
                            src={p.images?.[0] || 'https://placehold.co/40x40?text=Gear'} 
                            alt={p.name} 
                            style={{ height: '40px', width: '40px', objectFit: 'contain', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: '2px' }}
                            onError={e => e.target.src = 'https://placehold.co/40x40?text=Gear'}
                          />
                        </td>
                        <td style={{ fontWeight: 600, color: '#fff' }}>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.price.toLocaleString()} ฿</td>
                        <td>
                          <span style={{ color: p.stock > 0 ? 'var(--success)' : 'var(--danger)' }}>{p.stock} ชิ้น</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn-secondary" onClick={() => openEditProductModal(p)} style={{ padding: '0.4rem 0.6rem' }}><Edit size={14} /></button>
                            <button className="btn-secondary" onClick={() => handleDeleteProduct(p._id)} style={{ padding: '0.4rem 0.6rem', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.1)' }}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>รายการใบสั่งซื้อทั้งหมดของลูกค้า</h3>
              
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>เลขที่ใบเสร็จ</th>
                      <th>ชื่อผู้รับ</th>
                      <th>ยอดรวม</th>
                      <th>วิธีชำระ</th>
                      <th>สถานะออเดอร์</th>
                      <th>เลขพัสดุ</th>
                      <th>การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id}>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{o._id}</td>
                        <td style={{ color: '#fff' }}>{o.shippingAddress?.receiverName}</td>
                        <td style={{ fontWeight: 700, color: 'var(--accent-secondary)' }}>{o.totalAmount?.toLocaleString()} ฿</td>
                        <td>{o.paymentMethod}</td>
                        <td>
                          <span className={`status-badge ${o.status?.toLowerCase()}`}>{o.status}</span>
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{o.trackingNumber || '-'}</td>
                        <td>
                          <button className="btn-secondary" onClick={() => openOrderModal(o)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                            อัปเดต
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </section>
      </div>

      {/* Product Create/Edit Modal */}
      <div className={`modal-overlay ${isProductModalOpen ? 'active' : ''}`}>
        <div className="modal-content" style={{ maxWidth: '600px' }}>
          <button className="modal-close" onClick={() => setIsProductModalOpen(false)}><X size={20} /></button>
          <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>{editProductId ? 'แก้ไขข้อมูลสินค้า' : 'เพิ่มสินค้าชิ้นใหม่'}</h3>
          
          <form onSubmit={handleProductSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>ชื่อสินค้า</label>
                <input type="text" value={prodName} onChange={e => setProdName(e.target.value)} required placeholder="เช่น Logitech GPX2" />
              </div>
              <div className="form-group">
                <label>หมวดหมู่</label>
                <select value={prodCategory} onChange={e => setProdCategory(e.target.value)}>
                  <option value="Mouse">เมาส์ (Mouse)</option>
                  <option value="Keyboard">คีย์บอร์ด (Keyboard)</option>
                  <option value="Headset">หูฟัง (Headset)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>ราคาจำหน่าย (฿)</label>
                <input type="number" value={prodPrice} onChange={e => setProdPrice(e.target.value)} required placeholder="เช่น 4500" min="0" />
              </div>
              <div className="form-group">
                <label>จำนวนเริ่มต้นในคลัง</label>
                <input type="number" value={prodStock} onChange={e => setProdStock(e.target.value)} required placeholder="เช่น 20" min="0" />
              </div>
            </div>

            <div className="form-group">
              <label>คำอธิบายรายละเอียด</label>
              <input type="text" value={prodDesc} onChange={e => setProdDesc(e.target.value)} placeholder="เช่น เมาส์ไร้สายเกรดอีสปอร์ต สำหรับแข่งขัน" />
            </div>

            <div className="form-group">
              <label>URL รูปภาพสินค้า</label>
              <input type="text" value={prodImage} onChange={e => setProdImage(e.target.value)} placeholder="เช่น /images/products/viper-v3-pro-white.png" />
            </div>

            <h4 style={{ color: 'var(--accent-secondary)', marginTop: '1.5rem', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>สเปกทางเทคนิค</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label>สี (Color)</label>
                <input type="text" value={specColor} onChange={e => setSpecColor(e.target.value)} placeholder="เช่น White" />
              </div>
              <div className="form-group">
                <label>การเชื่อมต่อ</label>
                <input type="text" value={specConnection} onChange={e => setSpecConnection(e.target.value)} placeholder="เช่น Wireless 2.4GHz" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>น้ำหนัก (g)</label>
                <input type="text" value={specWeight} onChange={e => setSpecWeight(e.target.value)} placeholder="เช่น 51g" />
              </div>
              <div className="form-group">
                <label>เซนเซอร์ (เมาส์)</label>
                <input type="text" value={specSensor} onChange={e => setSpecSensor(e.target.value)} placeholder="เช่น PixArt PAW3395" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Polling Rate</label>
                <input type="text" value={specPolling} onChange={e => setSpecPolling(e.target.value)} placeholder="เช่น 4000Hz" />
              </div>
              <div className="form-group">
                <label>ชนิดสวิตช์ (คีย์บอร์ด)</label>
                <input type="text" value={specSwitch} onChange={e => setSpecSwitch(e.target.value)} placeholder="เช่น Hall Effect Linear" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Hot-Swappable</label>
                <select value={specHotswap} onChange={e => setSpecHotswap(e.target.value)}>
                  <option value="false">ไม่รองรับ (False)</option>
                  <option value="true">รองรับ (True)</option>
                </select>
              </div>
              <div className="form-group">
                <label>แบตเตอรี่ (ไร้สาย)</label>
                <input type="text" value={specBattery} onChange={e => setSpecBattery(e.target.value)} placeholder="เช่น สูงสุด 70 ชั่วโมง" />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
              บันทึกข้อมูลสินค้า <Save size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Order Status Modal */}
      <div className={`modal-overlay ${isOrderModalOpen ? 'active' : ''}`}>
        <div className="modal-content" style={{ maxWidth: '450px' }}>
          <button className="modal-close" onClick={() => setIsOrderModalOpen(false)}><X size={20} /></button>
          <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>อัปเดตสถานะการสั่งซื้อ</h3>
          
          <form onSubmit={handleOrderSubmit}>
            <div className="form-group">
              <label>สถานะออเดอร์</label>
              <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)}>
                <option value="Pending">Pending (รอชำระเงิน)</option>
                <option value="Paid">Paid (ชำระเงินแล้ว)</option>
                <option value="Processing">Processing (กำลังเตรียมจัดส่ง)</option>
                <option value="Shipped">Shipped (จัดส่งพัสดุแล้ว)</option>
                <option value="Delivered">Delivered (ได้รับพัสดุแล้ว)</option>
                <option value="Cancelled">Cancelled (ยกเลิกคำสั่งซื้อ)</option>
              </select>
            </div>

            <div className="form-group">
              <label>เลขพัสดุติดตามการจัดส่ง</label>
              <input 
                type="text" 
                value={orderTracking} 
                onChange={e => setOrderTracking(e.target.value)} 
                placeholder="เช่น TH0102030405A" 
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
              บันทึกสถานะพัสดุ <Save size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
