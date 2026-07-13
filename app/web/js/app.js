// Toast Notification Handler
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' 
    ? '<i class="fa-solid fa-circle-check" style="color: var(--success);"></i>'
    : '<i class="fa-solid fa-circle-exclamation" style="color: var(--danger);"></i>';
    
  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto-remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s reverse forwards';
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3000);
}

// Sync global counters and navigation UI
function syncHeaderUI() {
  // 1. Sync Cart Count
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    const count = Cart.getCartCount();
    if (count > 0) {
      cartCountEl.textContent = count;
      cartCountEl.style.display = 'flex';
    } else {
      cartCountEl.style.display = 'none';
    }
  }

  // 2. Sync Compare Count
  const compareCountEl = document.getElementById('compare-nav-count');
  if (compareCountEl) {
    const count = Compare.getCompareCount();
    compareCountEl.textContent = count;
    compareCountEl.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  // 3. Sync Auth Container
  const authContainer = document.getElementById('auth-container');
  if (authContainer) {
    if (Auth.isLoggedIn()) {
      const user = Auth.getUser();
      authContainer.innerHTML = `
        <span style="margin-right: 1rem; font-size: 0.95rem; color: var(--text-muted);">
          สวัสดี, <strong style="color:#fff;">${user.profile.firstName}</strong>
        </span>
        <button id="logout-btn" class="btn-auth" style="background: rgba(255,255,255,0.05); border: 1px solid var(--panel-border);">ออกจากระบบ</button>
      `;
      
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          Auth.logout();
        });
      }

      // Show Admin link if user is admin
      const adminLink = document.getElementById('admin-link');
      if (adminLink && user.role === 'admin') {
        adminLink.style.display = 'flex';
      }
    } else {
      authContainer.innerHTML = `<a href="login.html" class="btn-auth">เข้าสู่ระบบ</a>`;
      const adminLink = document.getElementById('admin-link');
      if (adminLink) adminLink.style.display = 'none';
    }
  }
}

// Listen to cart and compare updates
window.addEventListener('cart-updated', syncHeaderUI);
window.addEventListener('compare-updated', syncHeaderUI);

// Store for fetched products
let allProducts = [];
let activeCategory = '';
let searchQuery = '';

// Load products from API
async function loadProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  try {
    let url = `${window.API_BASE_URL}/products`;
    const params = [];
    if (activeCategory) params.push(`category=${encodeURIComponent(activeCategory)}`);
    if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'ดึงรายการสินค้าล้มเหลว');
    }

    allProducts = data.products;
    renderProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--danger);">
        <i class="fa-solid fa-triangle-exclamation fa-2xl"></i>
        <p style="margin-top: 1rem; font-weight: 500;">เกิดข้อผิดพลาดในการโหลดสินค้า</p>
        <p style="font-size: 0.9rem; color: var(--text-muted);">${error.message}</p>
        <button onclick="loadProducts()" class="btn-primary" style="margin: 1rem auto 0; max-width: 150px;">ลองใหม่อีกครั้ง</button>
      </div>
    `;
  }
}

// Render products to grid
function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  if (allProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
        <i class="fa-solid fa-magnifying-glass fa-2xl" style="margin-bottom: 1rem;"></i>
        <p style="font-weight: 500; font-size: 1.1rem;">ไม่พบสินค้าที่ตรงตามเงื่อนไขค้นหา</p>
        <p style="font-size: 0.9rem;">ลองเปลี่ยนคีย์เวิร์ดหรือประเภทสินค้าอื่น</p>
      </div>
    `;
    return;
  }

  container.innerHTML = allProducts.map(product => {
    const isCompared = Compare.isCompared(product._id);
    const compareBtnClass = isCompared ? 'btn-secondary active' : 'btn-secondary';
    const compareBtnTitle = isCompared ? 'นำออกจากการเปรียบเทียบ' : 'เพิ่มเปรียบเทียบสเปก';
    
    return `
      <article class="product-card">
        <div class="product-image">
          <span class="product-tag">${product.specifications.color || 'Premium'}</span>
          <img src="${product.images && product.images[0] ? product.images[0] : 'https://placehold.co/200x200?text=No+Image'}" alt="${product.name}" onerror="this.src='https://placehold.co/200x200?text=Gaming+Gear'">
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description || 'ไม่มีคำอธิบายสำหรับสินค้าชิ้นนี้'}</p>
          
          <div class="product-price-row">
            <span class="price">${product.price.toLocaleString()}</span>
            <span style="font-size:0.85rem; color:${product.stock > 0 ? 'var(--success)' : 'var(--danger)'};">
              ${product.stock > 0 ? `<i class="fa-solid fa-check"></i> ในคลัง: ${product.stock}` : '<i class="fa-solid fa-xmark"></i> สินค้าหมด'}
            </span>
          </div>

          <div class="actions-row">
            <button class="btn-primary" onclick="handleAddToCart('${product._id}')" ${product.stock === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-cart-plus"></i> หยิบใส่ตะกร้า
            </button>
            <button class="${compareBtnClass}" id="comp-btn-${product._id}" onclick="handleToggleCompare('${product._id}')" title="${compareBtnTitle}">
              <i class="fa-solid fa-sliders"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Add to cart click logic
function handleAddToCart(productId) {
  const product = allProducts.find(p => p._id === productId);
  if (!product) return;

  Cart.addToCart(product, 1);
  showToast(`หยิบ "${product.name}" ใส่ตะกร้าเรียบร้อย!`, 'success');
}

// Toggle comparison logic
function handleToggleCompare(productId) {
  const product = allProducts.find(p => p._id === productId);
  if (!product) return;

  const btn = document.getElementById(`comp-btn-${productId}`);

  if (Compare.isCompared(productId)) {
    Compare.removeFromCompare(productId);
    if (btn) {
      btn.className = 'btn-secondary';
      btn.title = 'เพิ่มเปรียบเทียบสเปก';
    }
    showToast(`นำ "${product.name}" ออกจากการเปรียบเทียบแล้ว`);
  } else {
    const res = Compare.addToCompare(product);
    if (res.success) {
      if (btn) {
        btn.className = 'btn-secondary active';
        btn.title = 'นำออกจากการเปรียบเทียบ';
      }
      showToast(`เพิ่ม "${product.name}" เข้าสู่การเปรียบเทียบแล้ว!`, 'success');
    } else {
      showToast(res.message, 'error');
    }
  }
}

// Setup Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Sync page components on load
  syncHeaderUI();
  Auth.fetchProfile().then(() => syncHeaderUI());

  // Load products list
  loadProducts();

  // Search input keyup query with simple debounce
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      searchQuery = e.target.value;
      debounceTimer = setTimeout(() => {
        loadProducts();
      }, 400);
    });
  }

  // Category filter buttons click handlers
  const filterBtnsContainer = document.getElementById('category-filters');
  if (filterBtnsContainer) {
    filterBtnsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        // Toggle active status
        filterBtnsContainer.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Set active category and query
        activeCategory = e.target.dataset.category;
        loadProducts();
      }
    });
  }
});

// Export functions to global scope for HTML onclick events
window.handleAddToCart = handleAddToCart;
window.handleToggleCompare = handleToggleCompare;
window.loadProducts = loadProducts;
window.showToast = showToast;
