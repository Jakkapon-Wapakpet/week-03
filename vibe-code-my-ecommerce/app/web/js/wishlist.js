const Wishlist = {
  getWishlist: () => {
    const list = localStorage.getItem('wishlist');
    return list ? JSON.parse(list) : [];
  },

  saveWishlist: (list) => {
    localStorage.setItem('wishlist', JSON.stringify(list));
    Wishlist.updateWishlistCount();
  },

  toggleWishlist: (product) => {
    let list = Wishlist.getWishlist();
    const index = list.findIndex(item => item._id === product._id);

    if (index > -1) {
      // Remove it
      list.splice(index, 1);
      Wishlist.saveWishlist(list);
      alert(`ลบ ${product.name} ออกจากรายการโปรดแล้ว`);
      return false; // Removed
    } else {
      // Add it
      list.push(product);
      Wishlist.saveWishlist(list);
      alert(`เพิ่ม ${product.name} เข้ารายการโปรดแล้ว`);
      return true; // Added
    }
  },

  isInWishlist: (productId) => {
    const list = Wishlist.getWishlist();
    return list.some(item => item._id === productId);
  },

  getWishlistCount: () => {
    return Wishlist.getWishlist().length;
  },

  updateWishlistCount: () => {
    const count = Wishlist.getWishlistCount();
    const countEls = document.querySelectorAll('.wishlist-count-badge');
    countEls.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Wishlist.updateWishlistCount();
});
