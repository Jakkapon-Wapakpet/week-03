import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import { Search, Loader2, AlertTriangle, X, Star, MessageSquarePlus, Calendar } from 'lucide-react';

const Home = () => {
  const { isLoggedIn, user, token } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Details Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  // Load products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '/api/products';
      const params = [];
      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (params.length > 0) url += `?${params.join('&')}`;

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        throw new Error(data.message || 'ดึงรายการสินค้าล้มเหลว');
      }
    } catch (err) {
      console.error('Fetch products error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search inputs
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, search ? 400 : 0);

    return () => clearTimeout(delayDebounce);
  }, [category, search]);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setReviewRating(5);
    setReviewComment('');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      showToast('กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น', 'error');
      return;
    }
    if (reviewSubmitting) return;

    setReviewSubmitting(true);
    try {
      const res = await fetch(`/api/products/${selectedProduct._id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating: Number(reviewRating), comment: reviewComment })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'บันทึกรีวิวล้มเหลว');
      }

      showToast('ขอบคุณสำหรับการรีวิวสินค้า!', 'success');
      
      // Update local state reactive updates
      const newReview = {
        username: user.username,
        rating: Number(reviewRating),
        comment: reviewComment,
        createdAt: new Date().toISOString()
      };

      const updatedProduct = {
        ...selectedProduct,
        reviews: [...(selectedProduct.reviews || []), newReview]
      };

      setSelectedProduct(updatedProduct);
      setProducts(prev => prev.map(p => p._id === selectedProduct._id ? updatedProduct : p));

      setReviewComment('');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>ค้นหาอุปกรณ์เกมมิ่งเกียร์ที่ <span>ใช่สำหรับคุณ</span></h1>
        <p>เปรียบเทียบสเปก เช็คน้ำหนัก ขนาด และเลือกอุปกรณ์ที่ดีที่สุดสำหรับชัยชนะของคุณในคลิกเดียว</p>
      </section>

      {/* Main Content */}
      <div className="controls-panel">
        {/* Search Input */}
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาอุปกรณ์เกียร์, ยี่ห้อ, หรือคีย์เวิร์ด..."
          />
        </div>

        {/* Category Filters */}
        <div className="filters">
          <button 
            className={`filter-btn ${category === '' ? 'active' : ''}`}
            onClick={() => setCategory('')}
          >
            ทั้งหมด
          </button>
          <button 
            className={`filter-btn ${category === 'Mouse' ? 'active' : ''}`}
            onClick={() => setCategory('Mouse')}
          >
            เมาส์ (Mice)
          </button>
          <button 
            className={`filter-btn ${category === 'Keyboard' ? 'active' : ''}`}
            onClick={() => setCategory('Keyboard')}
          >
            คีย์บอร์ด (Keyboards)
          </button>
          <button 
            className={`filter-btn ${category === 'Headset' ? 'active' : ''}`}
            onClick={() => setCategory('Headset')}
          >
            หูฟัง (Headsets)
          </button>
        </div>
      </div>

      {/* Products rendering area */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <Loader2 size={48} className="fa-spin" style={{ color: 'var(--accent-secondary)', margin: '0 auto' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>กำลังโหลดรายการสินค้า...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--danger)' }}>
          <AlertTriangle size={48} style={{ margin: '0 auto' }} />
          <p style={{ marginTop: '1rem', fontWeight: 500 }}>เกิดข้อผิดพลาดในการโหลดสินค้า</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0.5rem auto' }}>{error}</p>
          <button 
            onClick={fetchProducts} 
            className="btn-primary" 
            style={{ margin: '1rem auto 0', maxWidth: '150px' }}
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
          <Search size={48} style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>ไม่พบสินค้าที่ตรงตามเงื่อนไขค้นหา</p>
          <p style={{ fontSize: '0.9rem' }}>ลองเปลี่ยนคีย์เวิร์ดหรือประเภทสินค้าอื่น</p>
        </div>
      ) : (
        <section className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onOpenDetails={handleOpenDetails} 
            />
          ))}
        </section>
      )}

      {/* Product Details & Reviews Modal */}
      {selectedProduct && (
        <div className="modal-overlay active">
          <div className="modal-content" style={{ maxWidth: '750px', width: '90%' }}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}><X size={20} /></button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {/* Left Column: Image and Specs */}
              <div>
                <div style={{ background: 'rgba(10, 14, 23, 0.4)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <img 
                    src={selectedProduct.images?.[0] || 'https://placehold.co/200x200?text=No+Image'} 
                    alt={selectedProduct.name} 
                    style={{ maxHeight: '180px', objectFit: 'contain' }} 
                  />
                </div>
                
                <h4 style={{ color: 'var(--accent-secondary)', fontSize: '0.95rem', marginBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>ข้อมูลทางเทคนิค</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>สี</span><span style={{ color: '#fff' }}>{selectedProduct.specifications?.color || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>การเชื่อมต่อ</span><span style={{ color: '#fff' }}>{selectedProduct.specifications?.connection || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>น้ำหนัก</span><span style={{ color: '#fff' }}>{selectedProduct.specifications?.weight || 'N/A'}</span>
                  </div>
                  {selectedProduct.category === 'Mouse' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>เซนเซอร์</span><span style={{ color: '#fff' }}>{selectedProduct.specifications?.sensor || '-'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Polling Rate</span><span style={{ color: '#fff' }}>{selectedProduct.specifications?.pollingRate || '-'}</span>
                      </div>
                    </>
                  )}
                  {selectedProduct.category === 'Keyboard' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>สวิตช์</span><span style={{ color: '#fff' }}>{selectedProduct.specifications?.switchType || '-'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Hot-Swappable</span>
                        <span style={{ color: '#fff' }}>{selectedProduct.specifications?.hotSwappable ? 'รองรับ' : 'ไม่รองรับ'}</span>
                      </div>
                    </>
                  )}
                  {selectedProduct.category === 'Headset' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>ชั่วโมงแบตเตอรี่</span><span style={{ color: '#fff' }}>{selectedProduct.specifications?.batteryLife || 'N/A'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Title, Description and Reviews */}
              <div>
                <span className="product-category">{selectedProduct.category}</span>
                <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700, margin: '0.2rem 0 0.8rem' }}>{selectedProduct.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>{selectedProduct.description || 'ไม่มีคำอธิบายสำหรับสินค้าชิ้นนี้'}</p>
                
                {/* Reviews Section */}
                <h3 style={{ fontSize: '1.1rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Star size={16} fill="var(--accent-secondary)" stroke="var(--accent-secondary)" /> รีวิวและคะแนนจากลูกค้า ({selectedProduct.reviews?.length || 0})
                </h3>

                <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem', paddingRight: '0.4rem' }}>
                  {(!selectedProduct.reviews || selectedProduct.reviews.length === 0) ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center', padding: '1rem 0' }}>ยังไม่มีผู้ใดรีวิวสินค้านี้ มาร่วมแชร์รีวิวแรกกันเถอะ!</p>
                  ) : (
                    selectedProduct.reviews.map((rev, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', padding: '0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                          <span style={{ fontWeight: 600, color: '#fff' }}>@{rev.username}</span>
                          <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.1rem', fontWeight: 'bold' }}>
                            <Star size={12} fill="#fbbf24" stroke="#fbbf24" /> {rev.rating}
                          </span>
                        </div>
                        <p style={{ color: 'var(--text-main)', lineHeight: '1.4' }}>{rev.comment}</p>
                        {rev.createdAt && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                            <Calendar size={10} /> {new Date(rev.createdAt).toLocaleDateString('th-TH')}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Write Review Form */}
                {isLoggedIn ? (
                  <form onSubmit={handleReviewSubmit} style={{ background: 'rgba(10, 14, 23, 0.6)', border: '1px solid var(--panel-border)', padding: '1rem', borderRadius: '10px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MessageSquarePlus size={14} style={{ color: 'var(--accent-secondary)' }} /> เขียนรีวิวของคุณ
                    </h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '1rem', alignItems: 'center', marginBottom: '0.8rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.75rem' }}>คะแนน (Rating)</label>
                        <select 
                          value={reviewRating} 
                          onChange={e => setReviewRating(e.target.value)} 
                          style={{ padding: '0.5rem', fontSize: '0.9rem' }}
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                          <option value="4">⭐⭐⭐⭐ (4)</option>
                          <option value="3">⭐⭐⭐ (3)</option>
                          <option value="2">⭐⭐ (2)</option>
                          <option value="1">⭐ (1)</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.75rem' }}>ความคิดเห็น</label>
                        <input 
                          type="text" 
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          required
                          placeholder="แบ่งปันความคิดเห็นเกี่ยวกับอุปกรณ์นี้..." 
                          style={{ padding: '0.5rem', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>
                    
                    <button type="submit" disabled={reviewSubmitting} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', width: 'auto', float: 'right' }}>
                      {reviewSubmitting ? 'กำลังบันทึก...' : 'ส่งรีวิว'}
                    </button>
                    <div style={{ clear: 'both' }}></div>
                  </form>
                ) : (
                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--panel-border)', padding: '1rem', borderRadius: '10px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    กรุณา <Link to="/login" onClick={() => setSelectedProduct(null)} style={{ color: 'var(--accent-secondary)', fontWeight: 600, textDecoration: 'none' }}>เข้าสู่ระบบ</Link> เพื่อเขียนความคิดเห็นและให้คะแนนสินค้า
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
