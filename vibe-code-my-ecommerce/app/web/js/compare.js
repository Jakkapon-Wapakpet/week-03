const Compare = {
  getCompareList: () => {
    const list = localStorage.getItem('compareList');
    return list ? JSON.parse(list) : [];
  },

  saveCompareList: (list) => {
    localStorage.setItem('compareList', JSON.stringify(list));
    Compare.updateCompareCount();
  },

  addToCompare: (product) => {
    const list = Compare.getCompareList();
    
    // Check if already in list
    if (list.some(item => item._id === product._id)) {
      alert('สินค้านี้อยู่ในรายการเปรียบเทียบแล้ว');
      return false;
    }

    // Limit to 3 items
    if (list.length >= 3) {
      alert('คุณสามารถเปรียบเทียบสินค้าได้สูงสุด 3 ชิ้นเท่านั้น');
      return false;
    }

    list.push(product);
    Compare.saveCompareList(list);
    alert(`เพิ่ม ${product.name} เข้าสู่รายการเปรียบเทียบเรียบร้อยแล้ว`);
    return true;
  },

  removeFromCompare: (productId) => {
    const list = Compare.getCompareList();
    const newList = list.filter(item => item._id !== productId);
    Compare.saveCompareList(newList);
  },

  clearCompare: () => {
    Compare.saveCompareList([]);
  },

  getCompareCount: () => {
    return Compare.getCompareList().length;
  },

  updateCompareCount: () => {
    const count = Compare.getCompareCount();
    const countEls = document.querySelectorAll('.compare-count-badge');
    countEls.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Compare.updateCompareCount();
});
