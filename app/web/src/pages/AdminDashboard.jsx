import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  Boxes, Receipt, Plus, Edit, Trash2, Save, X, Loader2, 
  DollarSign, ShoppingBag, AlertCircle, PackageCheck, ChevronDown, ChevronUp,
  LayoutDashboard, TrendingUp, BarChart3, Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Expand Order State
  const [expandedOrderId, setExpandedOrderId] = useState('');

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
  const [specPolar, setSpecPolar] = useState('');
  const [specFreq, setSpecFreq] = useState('');
  const [specForm, setSpecForm] = useState('');

  // Order Status Modal State
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

  // Load BOTH products and orders on mount to compute dashboard stats accurately
  useEffect(() => {
    loadAllData();
  }, [token]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchProductsList(), fetchOrdersList()]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsList = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    if (data.success) {
      setProducts(data.products);
    } else throw new Error(data.message);
  };

  const fetchOrdersList = async () => {
    const res = await fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.success) {
      setOrders(data.orders);
    } else throw new Error(data.message);
  };

  // Re-fetch functions for Tab toggling updates
  const fetchProducts = async () => {
    try {
      await fetchProductsList();
    } catch (err) {
      showToast('ดึงข้อมูลสินค้าล้มเหลว: ' + err.message, 'error');
    }
  };

  const fetchOrders = async () => {
    try {
      await fetchOrdersList();
    } catch (err) {
      showToast('ดึงข้อมูลคำสั่งซื้อล้มเหลว: ' + err.message, 'error');
    }
  };

  // Quick Stock adjustment handler (+1 / -1)
  const handleQuickStockAdjust = async (productId, currentStock, change) => {
    const newStock = currentStock + change;
    if (newStock < 0) return;

    // Optimistic Update UI
    setProducts(prevProducts => 
      prevProducts.map(p => p._id === productId ? { ...p, stock: newStock } : p)
    );

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ stock: newStock })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      
      showToast(`ปรับสต็อกสินค้าสำเร็จ (${newStock} ชิ้น)`, 'success');
    } catch (err) {
      // Revert on error
      fetchProducts();
      showToast('ปรับสต็อกสินค้าล้มเหลว: ' + err.message, 'error');
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
    setSpecPolar('');
    setSpecFreq('');
    setSpecForm('');
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
    setSpecPolar(spec.polarPattern || '');
    setSpecFreq(spec.frequencyResponse || '');
    setSpecForm(spec.formFactor || '');

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
        batteryLife: specBattery,
        polarPattern: specPolar,
        frequencyResponse: specFreq,
        formFactor: specForm
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
      loadAllData(); // reload stats and lists
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
      loadAllData();
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
      loadAllData(); // reload stats and list
    } catch (err) {
      showToast('อัปเดตสถานะออเดอร์ล้มเหลว: ' + err.message, 'error');
    }
  };

  const toggleExpandOrder = (orderId) => {
    setExpandedOrderId(prev => prev === orderId ? '' : orderId);
  };

  // --- ANALYTICS CALCULATIONS ---
  const activeOrders = orders.filter(o => o.status !== 'Cancelled');
  
  // Total Revenue: Sum of non-pending, non-cancelled orders
  const totalRevenue = activeOrders
    .filter(o => o.status !== 'Pending') 
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  
  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const totalInventoryCount = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  // Latest Orders (reversed list)
  const recentOrders = [...orders].reverse().slice(0, 4);

  // Revenue by Category calculation
  const categorySales = { Mouse: 0, Keyboard: 0, Headset: 0, Microphone: 0 };
  
  activeOrders.forEach(o => {
    if (o.status === 'Pending') return;
    o.items?.forEach(item => {
      // Find item category in products list or use custom logic
      const prod = products.find(p => p._id === item.productId);
      const cat = prod ? prod.category : 'Mouse'; // fallback
      if (categorySales[cat] !== undefined) {
        categorySales[cat] += (item.price * item.quantity);
      }
    });
  });

  const maxSales = Math.max(...Object.values(categorySales), 1);

  // Top Selling Products calculation
  const productSalesMap = {};
  activeOrders.forEach(o => {
    if (o.status === 'Pending') return;
    o.items?.forEach(item => {
      productSalesMap[item.productId] = (productSalesMap[item.productId] || 0) + item.quantity;
    });
  });

  const topProducts = Object.entries(productSalesMap)
    .map(([id, qty]) => {
      const p = products.find(prod => prod._id === id);
      return {
        name: p ? p.name : 'Unknown Product',
        category: p ? p.category : 'Gaming Gear',
        quantity: qty,
        image: p?.images?.[0] || ''
      };
    })
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 3);

  return (
    <div>
      <div className="hero" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
        <h1>ระบบจัดการ <span>ผู้ดูแลระบบ (Admin)</span></h1>
        <p>ภาพรวมสรุปผลวิเคราะห์ยอดขาย ตรวจสอบคลังสินค้า และประมวลผลการจัดส่งพัสดุ</p>
      </div>

      <div className="admin-grid">
        {/* Sidebar Tabs Toggle */}
        <aside className="admin-sidebar">
          <button 
            className={`admin-sidebar-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /> ภาพรวมแดชบอร์ด
          </button>
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
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>กำลังโหลดข้อมูลแดชบอร์ด...</p>
            </div>
          ) : activeTab === 'overview' ? (
            <div>
              {/* 4 Analytics Metrics Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(10, 14, 23, 0.4)', border: '1px solid var(--panel-border)', padding: '1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ background: 'rgba(0, 229, 255, 0.1)', color: 'var(--accent-secondary)', padding: '0.6rem', borderRadius: '10px' }}>
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ยอดขายสะสม</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginTop: '0.1rem' }}>{totalRevenue.toLocaleString()} ฿</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(10, 14, 23, 0.4)', border: '1px solid var(--panel-border)', padding: '1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ background: 'rgba(138, 43, 226, 0.1)', color: 'var(--accent-primary)', padding: '0.6rem', borderRadius: '10px' }}>
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ออเดอร์ทั้งหมด</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginTop: '0.1rem' }}>{orders.length} รายการ</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(10, 14, 23, 0.4)', border: '1px solid var(--panel-border)', padding: '1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ background: lowStockCount > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: lowStockCount > 0 ? 'var(--danger)' : 'var(--success)', padding: '0.6rem', borderRadius: '10px' }}>
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>คลังสต็อกต่ำ (≤5)</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginTop: '0.1rem' }}>{lowStockCount} ชิ้น</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(10, 14, 23, 0.4)', border: '1px solid var(--panel-border)', padding: '1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.6rem', borderRadius: '10px' }}>
                    <PackageCheck size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>จำนวนสินค้าในคลัง</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginTop: '0.1rem' }}>{totalInventoryCount} ชิ้น</div>
                  </div>
                </div>
              </div>

              {/* Multi-column Analytics Row */}
              <div className="responsive-two-col-grid" style={{ marginTop: '2rem' }}>
                
                {/* Column 1: Sales By Category & Top Products */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Section 1: Sales by Category */}
                  <div style={{ background: 'rgba(10, 14, 23, 0.2)', border: '1px solid var(--panel-border)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <BarChart3 size={18} style={{ color: 'var(--accent-secondary)' }} /> สัดส่วนรายได้แยกตามหมวดหมู่
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {Object.entries(categorySales).map(([cat, val]) => {
                        const pct = (val / maxSales) * 100;
                        const glowColor = cat === 'Mouse' ? 'var(--accent-secondary)' : cat === 'Keyboard' ? 'var(--accent-primary)' : cat === 'Headset' ? 'var(--success)' : '#fbbf24';
                        return (
                          <div key={cat}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                              <span style={{ fontWeight: 600, color: '#fff' }}>{cat === 'Mouse' ? 'เมาส์ (Mouse)' : cat === 'Keyboard' ? 'คีย์บอร์ด (Keyboard)' : cat === 'Headset' ? 'หูฟัง (Headset)' : 'ไมโครโฟน (Microphone)'}</span>
                              <span style={{ color: 'var(--text-muted)' }}>{val.toLocaleString()} ฿</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: glowColor, borderRadius: '10px', boxShadow: `0 0 8px ${glowColor}` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: Top Selling Products */}
                  <div style={{ background: 'rgba(10, 14, 23, 0.2)', border: '1px solid var(--panel-border)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <TrendingUp size={18} style={{ color: 'var(--success)' }} /> สินค้าขายดี 3 อันดับแรก
                    </h3>
                    
                    {topProducts.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' }}>ยังไม่มียอดขายบันทึกเข้าระบบ</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {topProducts.map((p, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '0.8rem', borderBottom: idx < topProducts.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: idx === 0 ? '#fbbf24' : idx === 1 ? '#94a3b8' : '#b45309', minWidth: '24px' }}>
                              #{idx + 1}
                            </div>
                            {p.image && (
                              <img src={p.image} alt={p.name} style={{ height: '40px', width: '40px', objectFit: 'contain', background: 'rgba(255,255,255,0.02)', padding: '2px', borderRadius: '4px' }} />
                            )}
                            <div style={{ flex: 1 }}>
                              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{p.name}</div>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.category}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>{p.quantity}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ชิ้นที่ขายได้</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Column 2: Recent Orders list */}
                <div style={{ background: 'rgba(10, 14, 23, 0.2)', border: '1px solid var(--panel-border)', padding: '1.5rem', borderRadius: '12px', height: 'fit-content' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={18} style={{ color: 'var(--accent-primary)' }} /> รายการคำสั่งซื้อล่าสุด
                  </h3>
                  
                  {recentOrders.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>ไม่มีคำสั่งซื้อล่าสุดในระบบ</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {recentOrders.map((o, idx) => (
                        <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', paddingBottom: '0.8rem', borderBottom: idx < recentOrders.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                          <div>
                            <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{o.shippingAddress?.receiverName}</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>ID: {o._id.substring(18)}...</div>
                          </div>
                          
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 700, color: '#fff' }}>{o.totalAmount?.toLocaleString()} ฿</div>
                            <span 
                              className={`status-badge ${o.status?.toLowerCase()}`} 
                              style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', marginTop: '2px', display: 'inline-block' }}
                            >
                              {o.status}
                            </span>
                          </div>
                        </div>
                      ))}
                      <button 
                        className="btn-primary" 
                        onClick={() => setActiveTab('orders')}
                        style={{ width: '100%', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', fontSize: '0.85rem' }}
                      >
                        ดูคำสั่งซื้อทั้งหมด
                      </button>
                    </div>
                  )}
                </div>

              </div>
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
                      <th style={{ textAlign: 'center' }}>ในคลัง</th>
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                            <button 
                              className="btn-secondary" 
                              onClick={() => handleQuickStockAdjust(p._id, p.stock, -1)}
                              disabled={p.stock <= 0}
                              style={{ width: '24px', height: '24px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                            >
                              -
                            </button>
                            <span style={{ color: p.stock > 5 ? 'var(--success)' : p.stock > 0 ? '#f59e0b' : 'var(--danger)', fontWeight: 600, minWidth: '40px', textAlign: 'center' }}>
                              {p.stock}
                            </span>
                            <button 
                              className="btn-secondary" 
                              onClick={() => handleQuickStockAdjust(p._id, p.stock, 1)}
                              style={{ width: '24px', height: '24px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                            >
                              +
                            </button>
                          </div>
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
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <React.Fragment key={o._id}>
                        {/* Main Info Row */}
                        <tr 
                          onClick={() => toggleExpandOrder(o._id)}
                          style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                          className={expandedOrderId === o._id ? 'active-row' : ''}
                        >
                          <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            {expandedOrderId === o._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {o._id}
                          </td>
                          <td style={{ color: '#fff' }}>{o.shippingAddress?.receiverName}</td>
                          <td style={{ fontWeight: 700, color: 'var(--accent-secondary)' }}>{o.totalAmount?.toLocaleString()} ฿</td>
                          <td>{o.paymentMethod}</td>
                          <td>
                            <span className={`status-badge ${o.status?.toLowerCase()}`}>{o.status}</span>
                          </td>
                          <td style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{o.trackingNumber || '-'}</td>
                          <td>
                            <button 
                              className="btn-secondary" 
                              onClick={(e) => { e.stopPropagation(); openOrderModal(o); }} 
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                              อัปเดต
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Order Details Row */}
                        {expandedOrderId === o._id && (
                          <tr>
                            <td colSpan="7" style={{ background: 'rgba(10, 14, 23, 0.4)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
                              <div className="responsive-two-col-grid">
                                {/* Left Side: Order Items */}
                                <div>
                                  <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '0.8rem', fontSize: '0.95rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>รายการสินค้าในออเดอร์</h4>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {o.items?.map((item, idx) => (
                                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                                        <div>
                                          <span style={{ color: '#fff', fontWeight: 500 }}>{item.name}</span>
                                          <span style={{ color: 'var(--text-muted)', marginLeft: '10px' }}>x{item.quantity}</span>
                                        </div>
                                        <div style={{ color: '#fff', fontWeight: 600 }}>{(item.price * item.quantity).toLocaleString()} ฿</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Side: Shipping address */}
                                <div style={{ fontSize: '0.9rem' }}>
                                  <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '0.8rem', fontSize: '0.95rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>ข้อมูลผู้รับและที่จัดส่ง</h4>
                                  <p style={{ marginBottom: '0.3rem' }}><strong>ชื่อผู้รับ:</strong> {o.shippingAddress?.receiverName}</p>
                                  <p style={{ marginBottom: '0.3rem' }}><strong>เบอร์โทรศัพท์:</strong> {o.shippingAddress?.phone}</p>
                                  <p style={{ lineHeight: '1.4' }}>
                                    <strong>ที่อยู่จัดส่ง:</strong> {o.shippingAddress?.addressLine} ต.{o.shippingAddress?.subDistrict} อ.{o.shippingAddress?.district} จ.{o.shippingAddress?.province} {o.shippingAddress?.postalCode}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
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
                  <option value="Microphone">ไมโครโฟน (Microphone)</option>
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

            <div className="form-row">
              <div className="form-group">
                <label>รูปแบบรับเสียง (ไมโครโฟน)</label>
                <input type="text" value={specPolar} onChange={e => setSpecPolar(e.target.value)} placeholder="เช่น Cardioid" />
              </div>
              <div className="form-group">
                <label>ความถี่ตอบสนอง (ไมโครโฟน)</label>
                <input type="text" value={specFreq} onChange={e => setSpecFreq(e.target.value)} placeholder="เช่น 20Hz - 20kHz" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>รูปทรง (ไมโครโฟน)</label>
                <input type="text" value={specForm} onChange={e => setSpecForm(e.target.value)} placeholder="เช่น Dynamic Podcast Mic" />
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
