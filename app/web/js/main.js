let currentCategory = '';
let currentSearch = '';
let debounceTimer;

async function loadProducts() {
  const container = document.getElementById('products-container');
  const loading = document.getElementById('products-loading');
  const errorEl = document.getElementById('products-error');
  
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
      } else {
        renderProducts(data.products);
        container.style.display = 'grid';
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
    
    // Store product data as JSON string in data attribute for easy access
    const productJson = encodeURIComponent(JSON.stringify(product));
    
    card.innerHTML = `
      <div class="product-image">
        <div class="product-tag">${product.category}</div>
        <img src="${imageUrl}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
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

// Global function to be called from inline onclick
window.handleAddToCart = function(encodedProduct) {
  const product = JSON.parse(decodeURIComponent(encodedProduct));
  if (Cart.addToCart(product, 1)) {
    // Show a simple alert or toast
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
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Update category and reload
        currentCategory = e.target.getAttribute('data-category');
        loadProducts();
      });
    });
  }

  // Load products on initial page load if container exists
  if (document.getElementById('products-container')) {
    loadProducts();
  }
});
