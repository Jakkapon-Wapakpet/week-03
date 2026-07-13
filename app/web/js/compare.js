// Comparison Helper Methods
const Compare = {
  // Get compared products from localStorage
  getCompareList() {
    const listStr = localStorage.getItem('compare_list');
    return listStr ? JSON.parse(listStr) : [];
  },

  // Save list and dispatch update event
  saveCompareList(list) {
    localStorage.setItem('compare_list', JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('compare-updated'));
  },

  // Add product to compare (max 3 items)
  addToCompare(product) {
    const list = this.getCompareList();
    
    // Check if already in list
    if (list.some(item => item._id === product._id)) {
      return { success: false, message: 'สินค้านี้อยู่ในรายการเปรียบเทียบแล้ว' };
    }

    // Limit to 3 items
    if (list.length >= 3) {
      return { success: false, message: 'คุณสามารถเปรียบเทียบสินค้าได้สูงสุด 3 ชิ้นเท่านั้น' };
    }

    list.push(product);
    this.saveCompareList(list);
    return { success: true };
  },

  // Remove product from compare
  removeFromCompare(productId) {
    let list = this.getCompareList();
    list = list.filter(item => item._id !== productId);
    this.saveCompareList(list);
  },

  // Clear all comparison items
  clearCompare() {
    localStorage.removeItem('compare_list');
    window.dispatchEvent(new CustomEvent('compare-updated'));
  },

  // Check if product is in comparison list
  isCompared(productId) {
    const list = this.getCompareList();
    return list.some(item => item._id === productId);
  },

  // Get total count of items in list
  getCompareCount() {
    return this.getCompareList().length;
  }
};

window.Compare = Compare;
