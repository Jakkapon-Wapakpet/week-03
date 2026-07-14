const Product = require('../models/Product');

// @คำอธิบาย  ดึงสินค้าทั้งหมด (รองรับ filter และ search ผ่าน query string)
// @route     GET /api/products?category=Mouse&search=razer&color=black
// @การเข้าถึง สาธารณะ (ไม่ต้องล็อกอิน)
const getProducts = async (req, res) => {
  try {
    const { category, search, color } = req.query;
    let query = {}; // object ที่จะส่งให้ MongoDB ใช้กรองข้อมูล

    // กรองตาม category (case-insensitive: Mouse = mouse = MOUSE)
    if (category) {
      query.category = { $regex: new RegExp('^' + category + '$', 'i') };
    }

    // กรองตามสีในสเปกสินค้า
    if (color) {
      query['specifications.color'] = { $regex: new RegExp(color, 'i') };
    }

    // ค้นหาจากชื่อสินค้า หรือ tags ($or = หรือ)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },      // ค้นชื่อ
        { tags: { $in: [new RegExp(search, 'i')] } }       // ค้น tags
      ];
    }

    // เรียงลำดับสินค้าใหม่ก่อน (createdAt: -1 = ล่าสุดก่อน)
    const products = await Product.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, count: products.length, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  ดูรายละเอียดสินค้าชิ้นเดียว
// @route     GET /api/products/:id
// @การเข้าถึง สาธารณะ (ไม่ต้องล็อกอิน)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json({ success: true, product });
    } else {
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้านี้ในระบบ' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      // กรณี id ที่ส่งมาไม่ใช่ ObjectId ที่ถูกต้อง (format ผิด)
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้านี้ในระบบ' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  เพิ่มสินค้าใหม่
// @route     POST /api/products
// @การเข้าถึง เฉพาะ Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, images, specifications, tags } = req.body;

    // ตรวจสอบฟิลด์บังคับ
    if (!name || !category || !price || stock === undefined || !specifications) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลสินค้าให้ครบทุกช่องที่บังคับ' });
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      images: images || [],       // ถ้าไม่มีรูป ใช้ array ว่าง
      specifications,
      tags: tags || []            // ถ้าไม่มี tags ใช้ array ว่าง
    });

    return res.status(201).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  แก้ไขข้อมูลสินค้า
// @route     PUT /api/products/:id
// @การเข้าถึง เฉพาะ Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, images, specifications, tags } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      // อัพเดตเฉพาะฟิลด์ที่ส่งมา (ถ้าไม่ส่งมา ใช้ค่าเดิม)
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
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้านี้ในระบบ' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้านี้ในระบบ' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  ลบสินค้า
// @route     DELETE /api/products/:id
// @การเข้าถึง เฉพาะ Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      return res.json({ success: true, message: 'ลบสินค้าออกจากระบบเรียบร้อยแล้ว' });
    } else {
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้านี้ในระบบ' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้านี้ในระบบ' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @คำอธิบาย  เพิ่มรีวิวสินค้า (1 user ต่อ 1 สินค้าเท่านั้น)
// @route     POST /api/products/:id/reviews
// @การเข้าถึง ต้องล็อกอิน (Private)
const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกคะแนนและข้อความรีวิว' });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      // ตรวจว่า user นี้เคยรีวิวสินค้านี้แล้วหรือยัง
      const alreadyReviewed = product.reviews.find(
        (r) => r.username === req.user.username
      );

      if (alreadyReviewed) {
        return res.status(400).json({ success: false, message: 'คุณเคยรีวิวสินค้านี้ไปแล้ว' });
      }

      // สร้าง object รีวิวใหม่แล้ว push เข้า array ของสินค้า
      const review = {
        username: req.user.username,
        rating: Number(rating),
        comment,
        createdAt: new Date()
      };

      product.reviews.push(review);
      await product.save(); // บันทึกทั้ง document

      return res.status(201).json({ success: true, message: 'บันทึกรีวิวสำเร็จแล้ว' });
    } else {
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้านี้ในระบบ' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview
};
