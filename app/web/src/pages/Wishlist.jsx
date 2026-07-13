import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--panel-bg)', borderRadius: '16px', border: '1px solid var(--panel-border)', margin: '2rem 0' }}>
        <Heart size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', margin: '0 auto' }} />
        <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>ยังไม่มีรายการโปรดของคุณ</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>กดไอคอนหัวใจ ❤️ บนการ์ดสินค้าหน้าร้านเพื่อบันทึกสินค้าที่สนใจไว้ได้เลย</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', maxWidth: '200px' }}>
          กลับไปดูสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="hero" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
        <h1>สินค้าที่ <span>คุณถูกใจ</span></h1>
        <p>รวบรวมรายการอุปกรณ์เกมมิ่งเกียร์ที่คุณบันทึกเก็บไว้ช็อปปิ้งในภายหลัง</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#fff' }}>รายการโปรดทั้งหมด ({wishlist.length} ชิ้น)</h3>
      </div>

      <section className="products-grid">
        {wishlist.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default Wishlist;
