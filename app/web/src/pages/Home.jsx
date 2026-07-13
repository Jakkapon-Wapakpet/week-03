import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Loader2, AlertTriangle } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load products from API
  useEffect(() => {
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

    // Debounce search inputs
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, search ? 400 : 0);

    return () => clearTimeout(delayDebounce);
  }, [category, search]);

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
            onClick={() => setCategory(category)} // triggers re-fetch
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
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;
