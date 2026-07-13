const Cart = {
  getCart: () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  },

  saveCart: (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    Cart.updateCartCount();
  },

  addToCart: (product, quantity = 1) => {
    const cart = Cart.getCart();
    const existingIndex = cart.findIndex(item => item.productId === product._id);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : '',
        quantity: Number(quantity)
      });
    }
    
    Cart.saveCart(cart);
    return true;
  },

  removeFromCart: (productId) => {
    const cart = Cart.getCart();
    const newCart = cart.filter(item => item.productId !== productId);
    Cart.saveCart(newCart);
  },

  updateQuantity: (productId, quantity) => {
    const cart = Cart.getCart();
    const newCart = cart.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    Cart.saveCart(newCart);
  },

  clearCart: () => {
    Cart.saveCart([]);
  },

  getCartTotal: () => {
    const cart = Cart.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartCount: () => {
    const cart = Cart.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  updateCartCount: () => {
    const count = Cart.getCartCount();
    const countEls = document.querySelectorAll('.cart-count-badge');
    countEls.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Cart.updateCartCount();
});
