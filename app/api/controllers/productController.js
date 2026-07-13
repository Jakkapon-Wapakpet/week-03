const Product = require('../models/Product');

// @desc    Get all products (with optional filtering and search)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, color } = req.query;
    let query = {};

    // Filter by category
    if (category) {
      query.category = { $regex: new RegExp('^' + category + '$', 'i') }; // Case-insensitive exact match
    }

    // Filter by color in specifications
    if (color) {
      query['specifications.color'] = { $regex: new RegExp(color, 'i') };
    }

    // Search by name or tags
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const products = await Product.find(query);
    return res.json({ success: true, count: products.length, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product details
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json({ success: true, product });
    } else {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, images, specifications, tags } = req.body;

    if (!name || !category || !price || stock === undefined || !specifications) {
      return res.status(400).json({ success: false, message: 'Please add all required fields' });
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      images: images || [],
      specifications,
      tags: tags || []
    });

    return res.status(201).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, images, specifications, tags } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name !== undefined ? name : product.name;
      product.description = description !== undefined ? description : product.description;
      product.category = category !== undefined ? category : product.category;
      product.price = price !== undefined ? price : product.price;
      product.stock = stock !== undefined ? stock : product.stock;
      product.images = images !== undefined ? images : product.images;
      product.specifications = specifications !== undefined ? specifications : product.specifications;
      product.tags = tags !== undefined ? tags : product.tags;

      const updatedProduct = await product.save();
      return res.json({ success: true, product: updatedProduct });
    } else {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      return res.json({ success: true, message: 'Product removed' });
    } else {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
