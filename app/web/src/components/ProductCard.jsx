import React from 'react';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ShoppingCart, Sliders, Check, AlertCircle, Heart, Star } from 'lucide-react';

const ProductCard = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isCompared } = useCompare();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const inCompare = isCompared(product._id);
  const outOfStock = product.stock === 0;
  const isLiked = isInWishlist(product._id);

  // Calculate review statistics
  const reviews = product.reviews || [];
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : null;

  const handleCartAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`หยิบ "${product.name}" ใส่ตะกร้าเรียบร้อย!`, 'success');
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product._id);
      showToast(`นำ "${product.name}" ออกจากการเปรียบเทียบแล้ว`);
    } else {
      const res = addToCompare(product);
      if (res.success) {
        showToast(`เพิ่ม "${product.name}" เข้าสู่การเปรียบเทียบแล้ว!`, 'success');
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      showToast(`เพิ่ม "${product.name}" ในรายการโปรดแล้ว ❤️`, 'success');
    } else {
      showToast(`นำ "${product.name}" ออกจากรายการโปรดแล้ว`);
    }
  };

  return (
    <article 
      className="product-card" 
      onClick={() => onOpenDetails && onOpenDetails(product)}
      style={{ cursor: onOpenDetails ? 'pointer' : 'default' }}
    >
      <div className="product-image">
        <span className="product-tag">{product.specifications?.color || 'Premium'}</span>
        
        {/* Wishlist Heart Toggle Button */}
        <button 
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(10, 14, 23, 0.7)',
            backdropFilter: 'blur(5px)',
            border: '1px solid var(--panel-border)',
            color: isLiked ? 'var(--danger)' : '#fff',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
          title={isLiked ? 'นำออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
        >
          <Heart size={16} fill={isLiked ? 'var(--danger)' : 'none'} />
        </button>

        <img 
          src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/200x200?text=No+Image'} 
          alt={product.name} 
          onError={(e) => { e.target.src = 'https://placehold.co/200x200?text=Gaming+Gear' }}
        />
      </div>
      
      <div className="product-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span className="product-category">{product.category}</span>
          
          {/* Average Rating Display */}
          {averageRating ? (
            <span style={{ fontSize: '0.85rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
              <Star size={13} fill="#fbbf24" stroke="#fbbf24" /> {averageRating} ({reviews.length})
            </span>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ยังไม่มีรีวิว</span>
          )}
        </div>

        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description || 'ไม่มีคำอธิบายสำหรับสินค้าชิ้นนี้'}</p>
        
        <div className="product-price-row">
          <span className="price">{product.price.toLocaleString()}</span>
          <span style={{ fontSize: '0.85rem', color: outOfStock ? 'var(--danger)' : 'var(--success)' }}>
            {!outOfStock ? (
              <>
                <Check size={14} style={{ display: 'inline', marginRight: '3px', verticalAlign: 'middle' }} /> 
                ในคลัง: {product.stock}
              </>
            ) : (
              <>
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '3px', verticalAlign: 'middle' }} /> 
                สินค้าหมด
              </>
            )}
          </span>
        </div>

        <div className="actions-row">
          <button 
            className="btn-primary" 
            onClick={handleCartAdd} 
            disabled={outOfStock}
          >
            <ShoppingCart size={16} /> หยิบใส่ตะกร้า
          </button>
          <button 
            className={`btn-secondary ${inCompare ? 'active' : ''}`}
            onClick={handleCompareToggle}
            title={inCompare ? 'นำออกจากการเปรียบเทียบ' : 'เพิ่มเปรียบเทียบสเปก'}
          >
            <Sliders size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
