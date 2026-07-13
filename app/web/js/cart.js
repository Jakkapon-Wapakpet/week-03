// Shopping Cart Helper Methods
const Cart = {
  // Get cart items from localStorage
  getCart() {
    const cartStr = localStorage.getItem('cart');
    return cartStr ? JSON.parse(cartStr) : [];
  },

  // Save cart to localStorage and dispatch update event
  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch custom event to notify UI components (e.g. Header cart badge)
    window.dispatchEvent(new CustomEvent('cart-updated'));
  },

  // Add item to cart
  addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.productId === product._id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images && product.images[0] ? product.images[0] : '',
        quantity: Number(quantity)
      });
    }

    this.saveCart(cart);
  },

  // Remove item from cart
  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.productId !== productId);
    this.saveCart(cart);
  },

  // Update item quantity
  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = Number(quantity);
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart(cart);
      }
    }
  },

  // Empty cart
  clearCart() {
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cart-updated'));
  },

  // Get total price
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Get total count of items in cart
  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};

window.Cart = Cart;
