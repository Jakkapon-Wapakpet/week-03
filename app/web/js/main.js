let currentCategory = '';
let currentSearch = '';
let debounceTimer;

async function loadProducts() {
  const container = document.getElementById('products-container');
  const loading = document.getElementById('products-loading');
  const errorEl = document.getElementById('products-error');
  const bentoContainer = document.getElementById('bento-showcase-container');
  
  if (!container || !loading || !errorEl) return;

  container.style.display = 'none';
  errorEl.style.display = 'none';
  loading.style.display = 'block';

  try {
    let url = '/products?';
    if (currentCategory) url += `category=${encodeURIComponent(currentCategory)}&`;
    if (currentSearch) url += `search=${encodeURIComponent(currentSearch)}&`;

    const data = await apiCall(url);

    if (data.success) {
      if (data.products.length === 0) {
        errorEl.textContent = 'ไม่พบสินค้าที่ค้นหา';
        errorEl.style.display = 'block';
        errorEl.style.color = 'var(--text-muted)';
        if (bentoContainer) bentoContainer.innerHTML = '';
      } else {
        renderProducts(data.products);
        container.style.display = 'grid';

        // Render Bento grid only if no search & no category selected
        if (bentoContainer) {
          if (!currentCategory && !currentSearch) {
            renderBentoGrid(data.products);
          } else {
            bentoContainer.innerHTML = '';
          }
        }
      }
    } else {
      errorEl.textContent = data.message || 'เกิดข้อผิดพลาดในการโหลดสินค้า';
      errorEl.style.display = 'block';
    }
  } catch (error) {
    errorEl.textContent = 'Network error: ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
    errorEl.style.display = 'block';
  } finally {
    loading.style.display = 'none';
    lucide.createIcons();
  }
}

function renderBentoGrid(products) {
  const bentoContainer = document.getElementById('bento-showcase-container');
  if (!bentoContainer) return;

  // Find 3 highlight products
  const mouse = products.find(p => p.name.includes('Pulsar') || p.name.includes('Viper')) || products.find(p => p.category === 'Mouse');
  const kb = products.find(p => p.name.includes('Wooting') || p.name.includes('Keychron')) || products.find(p => p.category === 'Keyboard');
  const headset = products.find(p => p.name.includes('Arctis') || p.name.includes('Astro')) || products.find(p => p.category === 'Headset');

  if (!mouse || !kb || !headset) {
    bentoContainer.innerHTML = '';
    return;
  }

  const mouseJson = encodeURIComponent(JSON.stringify(mouse));
  const kbJson = encodeURIComponent(JSON.stringify(kb));
  const headsetJson = encodeURIComponent(JSON.stringify(headset));

  bentoContainer.innerHTML = `
    <section class="bento-section">
      <h2 class="bento-title">🔥 อุปกรณ์ยอดนิยมระดับโปร (Pro Gear Spotlight)</h2>
      <div class="bento-grid">
        <!-- Bento Card 1: Mouse (span-2) -->
        <div class="bento-card span-2" onclick="handleOpenDetails('${mouseJson}')">
          <div class="bento-card-info">
            <div>
              <span class="bento-card-badge">เมาส์น้ำหนักเบาพิเศษ</span>
              <h3>${mouse.name}</h3>
              <p class="bento-card-desc">${mouse.description || ''}</p>
            </div>
            <div class="bento-card-specs">
              <span>⚡ ${mouse.specifications?.sensor || 'PAW3395 Sensor'}</span>
              <span>⚖️ ${mouse.specifications?.weight || 'Ultralight'}</span>
              <span>🎯 ${mouse.specifications?.pollingRate || 'High Polling'}</span>
            </div>
          </div>
          <div class="bento-card-image">
            <img src="${mouse.images?.[0] || 'https://via.placeholder.com/150'}" alt="${mouse.name}">
          </div>
        </div>

        <!-- Bento Card 2: Keyboard -->
        <div class="bento-card" onclick="handleOpenDetails('${kbJson}')">
          <div class="bento-card-info">
            <div>
              <span class="bento-card-badge">คีย์บอร์ดความเร็วสูง</span>
              <h3>${kb.name}</h3>
            </div>
            <div class="bento-card-specs">
              <span>⌨️ ${kb.specifications?.switchType || 'Mechanical'}</span>
              <span>⚡ Rapid Trigger</span>
            </div>
          </div>
          <div class="bento-card-image" style="margin-top: 1rem;">
            <img src="${kb.images?.[0] || 'https://via.placeholder.com/150'}" alt="${kb.name}" style="max-height: 110px;">
          </div>
        </div>

        <!-- Bento Card 3: Headset -->
        <div class="bento-card" onclick="handleOpenDetails('${headsetJson}')">
          <div class="bento-card-info">
            <div>
              <span class="bento-card-badge">หูฟังมิติเสียงรอบทิศ</span>
              <h3>${headset.name}</h3>
            </div>
            <div class="bento-card-specs">
              <span>🎧 ${headset.specifications?.connection || 'Wireless Audio'}</span>
              <span>🔋 ${headset.specifications?.batteryLife || 'Long Battery'}</span>
            </div>
          </div>
          <div class="bento-card-image" style="margin-top: 1rem;">
            <img src="${headset.images?.[0] || 'https://via.placeholder.com/150'}" alt="${headset.name}" style="max-height: 110px;">
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    const isOutOfStock = product.stock <= 0;
    const imageUrl = product.images && product.images.length > 0 
      ? product.images[0] 
      : 'https://via.placeholder.com/200?text=No+Image';

    const card = document.createElement('div');
    card.className = 'product-card';
    
    const productJson = encodeURIComponent(JSON.stringify(product));
    
    card.innerHTML = `
      <div class="product-image" onclick="handleOpenDetails('${productJson}')" style="cursor: pointer;">
        <div class="product-tag">${product.category}</div>
        <img src="${imageUrl}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3 class="product-title" onclick="handleOpenDetails('${productJson}')" style="cursor: pointer; text-decoration: none;">${product.name}</h3>
        <p class="product-desc">${product.description || 'ไม่มีคำอธิบาย'}</p>
        
        <div class="product-price-row">
          <span class="price">${product.price.toLocaleString()}</span>
          ${isOutOfStock 
            ? '<span style="color: var(--danger); font-size: 0.85rem; font-weight: 700;">สินค้าหมด</span>' 
            : `<span style="color: var(--success); font-size: 0.85rem; font-weight: 700;">เหลือ ${product.stock} ชิ้น</span>`
          }
        </div>
        
        <div class="actions-row">
          <button 
            class="btn-primary" 
            onclick="handleAddToCart('${productJson}')"
            ${isOutOfStock ? 'disabled' : ''}
          >
            <i data-lucide="shopping-cart" style="width: 18px; height: 18px;"></i>
            ${isOutOfStock ? 'สินค้าหมด' : 'ใส่ตะกร้า'}
          </button>
          <button 
            class="btn-secondary" 
            onclick="handleAddToCompare('${productJson}')"
            title="เปรียบเทียบสเปก"
          >
            <i data-lucide="git-compare" style="width: 18px; height: 18px;"></i>
          </button>
          <button 
            class="btn-secondary" 
            onclick="handleToggleWishlist('${productJson}', this)"
            title="รายการโปรด"
          >
            <i data-lucide="heart" style="width: 18px; height: 18px; ${Wishlist.isInWishlist(product._id) ? 'color: var(--accent-cta); fill: var(--accent-cta);' : ''}"></i>
          </button>
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// Global functions for inline click handlers
window.handleAddToCart = function(encodedProduct) {
  const product = JSON.parse(decodeURIComponent(encodedProduct));
  if (Cart.addToCart(product, 1)) {
    alert(`เพิ่ม ${product.name} ลงตะกร้าแล้ว!`);
  }
};

window.handleAddToCompare = function(encodedProduct) {
  const product = JSON.parse(decodeURIComponent(encodedProduct));
  Compare.addToCompare(product);
};

window.handleToggleWishlist = function(encodedProduct, buttonEl) {
  const product = JSON.parse(decodeURIComponent(encodedProduct));
  const isAdded = Wishlist.toggleWishlist(product);
  const icon = buttonEl.querySelector('i');
  if (isAdded) {
    icon.style.color = 'var(--accent-cta)';
    icon.style.fill = 'var(--accent-cta)';
  } else {
    icon.style.color = '';
    icon.style.fill = '';
  }
};

// Details Modal handlers
window.handleOpenDetails = function(encodedProduct) {
  const product = JSON.parse(decodeURIComponent(encodedProduct));
  window.activeProductId = product._id;
  
  const modal = document.getElementById('details-modal');
  const body = document.getElementById('details-modal-body');
  
  if (!modal || !body) return;

  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/200?text=No+Image';

  // Render specifications specific to product category
  let specsHtml = `
    <div style="display: flex; justify-content: space-between;">
      <span>สี (Color)</span><span style="color: #fff;">${product.specifications?.color || 'N/A'}</span>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <span>การเชื่อมต่อ</span><span style="color: #fff;">${product.specifications?.connection || 'N/A'}</span>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <span>น้ำหนัก</span><span style="color: #fff;">${product.specifications?.weight || 'N/A'}</span>
    </div>
  `;

  if (product.category === 'Mouse') {
    specsHtml += `
      <div style="display: flex; justify-content: space-between;">
        <span>เซนเซอร์ (Sensor)</span><span style="color: #fff;">${product.specifications?.sensor || '-'}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Polling Rate</span><span style="color: #fff;">${product.specifications?.pollingRate || '-'}</span>
      </div>
    `;
  } else if (product.category === 'Keyboard') {
    specsHtml += `
      <div style="display: flex; justify-content: space-between;">
        <span>ชนิดสวิตช์</span><span style="color: #fff;">${product.specifications?.switchType || '-'}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Hot-Swappable</span><span style="color: #fff;">${product.specifications?.hotSwappable ? 'รองรับ' : 'ไม่รองรับ'}</span>
      </div>
    `;
  } else if (product.category === 'Headset') {
    specsHtml += `
      <div style="display: flex; justify-content: space-between;">
        <span>ชั่วโมงแบตเตอรี่</span><span style="color: #fff;">${product.specifications?.batteryLife || 'N/A'}</span>
      </div>
    `;
  } else if (product.category === 'Microphone') {
    specsHtml += `
      <div style="display: flex; justify-content: space-between;">
        <span>รูปแบบรับเสียง</span><span style="color: #fff;">${product.specifications?.polarPattern || '-'}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>ความถี่ตอบสนอง</span><span style="color: #fff;">${product.specifications?.frequencyResponse || '-'}</span>
      </div>
    `;
  }

  // Render reviews list
  let reviewsHtml = '';
  if (!product.reviews || product.reviews.length === 0) {
    reviewsHtml = '<p style="color: var(--text-muted); font-size: 0.85rem; font-style: italic; text-align: center; padding: 1rem 0;">ยังไม่มีผู้ใดรีวิวสินค้านี้ มาร่วมแชร์รีวิวแรกกันเถอะ!</p>';
  } else {
    product.reviews.forEach(rev => {
      reviewsHtml += `
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--panel-border); padding: 0.8rem; borderRadius: 8px; font-size: 0.85rem; margin-bottom: 0.5rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
            <span style="font-weight: 600; color: #fff;">@${rev.username}</span>
            <span style="color: #fbbf24; font-weight: bold;">⭐ ${rev.rating}</span>
          </div>
          <p style="color: var(--text-main); line-height: 1.4;">${rev.comment}</p>
        </div>
      `;
    });
  }

  // Render active user review form if logged in
  const isLoggedIn = Auth.isLoggedIn();
  let reviewFormHtml = '';
  if (isLoggedIn) {
    reviewFormHtml = `
      <form id="details-review-form" style="background: rgba(10, 14, 23, 0.6); border: 1px solid var(--panel-border); padding: 1rem; border-radius: 10px; margin-top: 1.5rem;">
        <h4 style="font-size: 0.9rem; color: #fff; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.3rem;">
          <i data-lucide="message-square-plus" style="width: 14px; height: 14px; color: var(--accent-secondary);"></i> เขียนรีวิวของคุณ
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 2.5fr; gap: 1rem; align-items: center; margin-bottom: 0.8rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.75rem;">คะแนน (Rating)</label>
            <select id="reviewRating" style="padding: 0.5rem; font-size: 0.9rem;">
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.75rem;">ความคิดเห็น</label>
            <input type="text" id="reviewComment" required placeholder="แบ่งปันความคิดเห็นเกี่ยวกับอุปกรณ์นี้..." style="padding: 0.5rem; font-size: 0.9rem;">
          </div>
        </div>
        <button type="submit" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem; width: auto; float: right;">ส่งรีวิว</button>
        <div style="clear: both;"></div>
      </form>
    `;
  } else {
    reviewFormHtml = `
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--panel-border); padding: 1rem; border-radius: 10px; text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-top: 1.5rem;">
        กรุณา <a href="login.html" style="color: var(--accent-secondary); font-weight: 600; text-decoration: none;">เข้าสู่ระบบ</a> เพื่อเขียนความคิดเห็นและให้คะแนนสินค้า
      </div>
    `;
  }

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <!-- Left: image & technical specs -->
      <div>
        <div style="background: rgba(10, 14, 23, 0.4); border-radius: 12px; padding: 1.5rem; display: flex; justify-content: center; margin-bottom: 1.5rem;">
          <img src="${imageUrl}" alt="${product.name}" style="max-height: 250px; object-fit: contain;">
        </div>
        <h4 style="color: var(--accent-secondary); font-size: 1rem; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.4rem;">สเปกทางเทคนิค</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
          ${specsHtml}
        </div>
      </div>
      
      <!-- Right: details & reviews -->
      <div>
        <span class="product-category" style="color: var(--accent-secondary); font-weight: bold; font-size: 0.85rem;">${product.category}</span>
        <h2 style="color: #fff; font-size: 1.8rem; font-weight: 700; margin: 0.2rem 0 0.8rem;">${product.name}</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.4;">${product.description || 'ไม่มีคำอธิบายสำหรับสินค้าชิ้นนี้'}</p>
        
        <h3 style="font-size: 1.1rem; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.4rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.3rem;">
          ⭐ รีวิวและคะแนนจากลูกค้า (${product.reviews?.length || 0})
        </h3>
        
        <div style="max-height: 180px; overflow-y: auto; padding-right: 0.4rem;">
          ${reviewsHtml}
        </div>
        
        ${reviewFormHtml}
      </div>
    </div>
  `;

  modal.classList.add('active');
  lucide.createIcons();

  // Attach submit handler to dynamically created form
  const reviewForm = document.getElementById('details-review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewSubmit);
  }
};

window.closeDetailsModal = function() {
  const modal = document.getElementById('details-modal');
  if (modal) modal.classList.remove('active');
};

async function handleReviewSubmit(e) {
  e.preventDefault();
  const rating = Number(document.getElementById('reviewRating').value);
  const comment = document.getElementById('reviewComment').value;
  
  if (!window.activeProductId) return;

  const res = await apiCall(`/products/${window.activeProductId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({ rating, comment })
  });

  if (res.success) {
    alert('ส่งรีวิวเรียบร้อยแล้ว!');
    closeDetailsModal();
    // Refresh catalog products list to update ratings cache
    loadProducts();
  } else {
    alert(res.message || 'เกิดข้อผิดพลาดในการส่งรีวิว');
  }
}

// Event Listeners for Filters and Search
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value.trim();
        loadProducts();
      }, 500);
    });
  }

  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.getAttribute('data-category');
        loadProducts();
      });
    });
  }

  if (document.getElementById('products-container')) {
    loadProducts();
  }
});
