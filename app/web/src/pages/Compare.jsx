import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Trash2, ShoppingCart, Sliders, Feather, Tag } from 'lucide-react';

const Compare = () => {
  const { compareList, removeFromCompare } = useCompare();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [showDiffs, setShowDiffs] = useState(false);

  const handleRemove = (productId, productName) => {
    removeFromCompare(productId);
    showToast(`นำ "${productName}" ออกจากการเปรียบเทียบแล้ว`);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`หยิบ "${product.name}" ใส่ตะกร้าแล้ว!`, 'success');
  };

  if (compareList.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--panel-bg)', borderRadius: '16px', border: '1px solid var(--panel-border)', margin: '2rem 0' }}>
        <Sliders size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', margin: '0 auto' }} />
        <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>ไม่มีอุปกรณ์เกียร์ในตารางเปรียบเทียบ</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>คุณสามารถกดปุ่มปรับแต่งสเปกบนการ์ดสินค้าเพื่อเพิ่มสินค้ามาเทียบกันได้สูงสุด 3 ชิ้น</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', maxWidth: '200px' }}>
          กลับไปเลือกสินค้า
        </Link>
      </div>
    );
  }

  // Calculate best specifications (lowest price, lightest weight)
  const minPrice = Math.min(...compareList.map(p => p.price));
  
  const getWeightNumber = (wStr) => {
    if (!wStr) return Infinity;
    const matched = wStr.match(/(\d+(?:\.\d+)?)/);
    return matched ? parseFloat(matched[1]) : Infinity;
  };
  const weights = compareList.map(p => getWeightNumber(p.specifications?.weight));
  const minWeight = Math.min(...weights);

  // Helper to check if values are identical across all products in compare
  const isRowIdentical = (list) => {
    if (list.length <= 1) return true;
    return list.every(val => val === list[0]);
  };

  // Build rows check
  const showCategory = !(showDiffs && isRowIdentical(compareList.map(p => p.category)));
  const showPrice = !(showDiffs && isRowIdentical(compareList.map(p => p.price)));
  const showWeight = !(showDiffs && isRowIdentical(compareList.map(p => p.specifications?.weight || 'N/A')));
  const showColor = !(showDiffs && isRowIdentical(compareList.map(p => p.specifications?.color || 'N/A')));
  const showConnection = !(showDiffs && isRowIdentical(compareList.map(p => p.specifications?.connection || 'N/A')));
  const showSensor = !(showDiffs && isRowIdentical(compareList.map(p => p.specifications?.sensor || '-')));
  const showPolling = !(showDiffs && isRowIdentical(compareList.map(p => p.specifications?.pollingRate || '-')));
  const showSwitch = !(showDiffs && isRowIdentical(compareList.map(p => p.specifications?.switchType || '-')));
  const showHotswap = !(showDiffs && isRowIdentical(compareList.map(p => p.specifications?.hotSwappable || false)));
  const showBattery = !(showDiffs && isRowIdentical(compareList.map(p => p.specifications?.batteryLife || 'N/A')));

  return (
    <div>
      <div className="hero" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
        <h1>ตาราง <span>เปรียบเทียบคุณสมบัติ</span></h1>
        <p>วิเคราะห์เปรียบเทียบข้อมูลจำเพาะเชิงเทคนิค ขนาด น้ำหนัก และความคุ้มค่าแบบเคียงข้างกัน</p>
      </div>

      {/* Show Differences Toggle Switch */}
      {compareList.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.2rem' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid var(--panel-border)' }}>
            <input 
              type="checkbox" 
              checked={showDiffs} 
              onChange={(e) => setShowDiffs(e.target.checked)} 
              style={{ width: 'auto', cursor: 'pointer' }}
            />
            แสดงเฉพาะคุณสมบัติที่แตกต่าง (Show differences only)
          </label>
        </div>
      )}

      <div className="comparison-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>คุณสมบัติ (Specifications)</th>
              {compareList.map(p => (
                <td key={p._id} className="compare-header-cell">
                  <img 
                    src={p.images && p.images[0] ? p.images[0] : 'https://placehold.co/120x120?text=No+Image'} 
                    alt={p.name} 
                    onError={(e) => { e.target.src = 'https://placehold.co/120x120?text=Gaming+Gear' }}
                    style={{ maxHeight: '120px', objectFit: 'contain', marginBottom: '1rem' }}
                  />
                  <h3>{p.name}</h3>
                  <button 
                    className="compare-remove-btn" 
                    onClick={() => handleRemove(p._id, p.name)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', margin: '0.5rem auto 0' }}
                  >
                    <Trash2 size={12} /> เอาออก
                  </button>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Category */}
            {showCategory && (
              <tr>
                <th>หมวดหมู่</th>
                {compareList.map(p => <td key={p._id}>{p.category}</td>)}
              </tr>
            )}

            {/* Price */}
            {showPrice && (
              <tr>
                <th>ราคา</th>
                {compareList.map(p => {
                  const isCheapest = p.price === minPrice && compareList.length > 1;
                  return (
                    <td 
                      key={p._id} 
                      className={isCheapest ? 'spec-highlight' : ''}
                      style={isCheapest ? { color: 'var(--accent-secondary)', fontWeight: 'bold' } : {}}
                    >
                      {p.price.toLocaleString()} ฿ 
                      {isCheapest && <Tag size={14} style={{ display: 'inline', marginLeft: '5px', verticalAlign: 'middle' }} title="คุ้มสุด!" />}
                    </td>
                  );
                })}
              </tr>
            )}

            {/* Weight */}
            {showWeight && (
              <tr>
                <th>น้ำหนัก (Weight)</th>
                {compareList.map((p, idx) => {
                  const isLightest = weights[idx] === minWeight && weights[idx] !== Infinity && compareList.length > 1;
                  return (
                    <td 
                      key={p._id} 
                      className={isLightest ? 'spec-highlight' : ''}
                      style={isLightest ? { color: 'var(--success)', fontWeight: 'bold' } : {}}
                    >
                      {p.specifications?.weight || 'N/A'}
                      {isLightest && <Feather size={14} style={{ display: 'inline', marginLeft: '5px', verticalAlign: 'middle' }} title="เบาสุด!" />}
                    </td>
                  );
                })}
              </tr>
            )}

            {/* Color */}
            {showColor && (
              <tr>
                <th>สี (Color)</th>
                {compareList.map(p => <td key={p._id}>{p.specifications?.color || 'N/A'}</td>)}
              </tr>
            )}

            {/* Connection */}
            {showConnection && (
              <tr>
                <th>การเชื่อมต่อ (Connection)</th>
                {compareList.map(p => <td key={p._id}>{p.specifications?.connection || 'N/A'}</td>)}
              </tr>
            )}

            {/* Sensor */}
            {showSensor && (
              <tr>
                <th>เซนเซอร์ (Mice Sensor)</th>
                {compareList.map(p => <td key={p._id}>{p.specifications?.sensor || '-'}</td>)}
              </tr>
            )}

            {/* Polling Rate */}
            {showPolling && (
              <tr>
                <th>Polling Rate</th>
                {compareList.map(p => <td key={p._id}>{p.specifications?.pollingRate || '-'}</td>)}
              </tr>
            )}

            {/* Switch Type */}
            {showSwitch && (
              <tr>
                <th>สวิตช์ (Switch Type)</th>
                {compareList.map(p => <td key={p._id}>{p.specifications?.switchType || '-'}</td>)}
              </tr>
            )}

            {/* Hot Swappable */}
            {showHotswap && (
              <tr>
                <th>Hot-Swappable</th>
                {compareList.map(p => {
                  const val = p.specifications?.hotSwappable;
                  return (
                    <td key={p._id}>
                      {val === true ? (
                        <span style={{ color: 'var(--success)' }}><CheckIcon /> รองรับ</span>
                      ) : val === false ? (
                        <span style={{ color: 'var(--danger)' }}><CrossIcon /> ไม่รองรับ</span>
                      ) : '-'}
                    </td>
                  );
                })}
              </tr>
            )}

            {/* Battery */}
            {showBattery && (
              <tr>
                <th>ชั่วโมงแบตเตอรี่ (Battery)</th>
                {compareList.map(p => <td key={p._id}>{p.specifications?.batteryLife || 'N/A'}</td>)}
              </tr>
            )}

            {/* Action */}
            <tr>
              <th>การดำเนินการ</th>
              {compareList.map(p => (
                <td key={p._id}>
                  <button 
                    className="btn-primary" 
                    onClick={() => handleAddToCart(p)} 
                    disabled={p.stock === 0}
                    style={{ width: '100%' }}
                  >
                    <ShoppingCart size={16} /> ซื้อเลย
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline icon components
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '3px', verticalAlign: 'middle' }}><polyline points="20 6 9 17 4 12"/></svg>
);

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '3px', verticalAlign: 'middle' }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

export default Compare;
