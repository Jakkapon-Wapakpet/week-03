import React from 'react';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';
import { ShoppingCart, Sliders, Check, AlertCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isCompared } = useCompare();
  const { showToast } = useToast();

  const inCompare = isCompared(product._id);
  const outOfStock = product.stock === 0;

  const handleCartAdd = () => {
    addToCart(product, 1);
    showToast(`หยิบ "${product.name}" ใส่ตะกร้าเรียบร้อย!`, 'success');
  };

  const handleCompareToggle = () => {
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

  return (
    <article className="product-card">
      <div class="product-image">
        <span class="product-tag">{product.specifications?.color || 'Premium'}</span>
        <img 
          src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/200x200?text=No+Image'} 
          alt={product.name} 
          onError={(e) => { e.target.src = 'https://placehold.co/200x200?text=Gaming+Gear' }}
        />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
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
