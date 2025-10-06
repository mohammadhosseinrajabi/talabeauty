const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Helper to resolve owner filter from req (supports both User and Customer tokens)
function getOwnerFilter(req) {
  if (req.user) {
    return { user: req.user.id };
  }
  if (req.customerId) {
    return { customer: req.customerId };
  }
  return null;
}

exports.getCart = async (req, res) => {
  try {
    const owner = getOwnerFilter(req);
    if (!owner) return res.status(401).json({ message: 'لطفاً وارد شوید' });

    const cart = await Cart.findOne(owner).populate('items.product', 'name price images');
    return res.json(cart || { items: [] });
  } catch (error) {
    console.error('getCart error:', error);
    return res.status(500).json({ message: 'خطای سرور' });
  }
};

exports.addItem = async (req, res) => {
  try {
    const owner = getOwnerFilter(req);
    if (!owner) return res.status(401).json({ message: 'لطفاً وارد شوید' });

    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId الزامی است' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'محصول یافت نشد' });

    let cart = await Cart.findOne(owner);
    if (!cart) {
      cart = new Cart({ ...owner, items: [] });
    }

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx > -1) {
      cart.items[idx].quantity += Number(quantity);
      cart.items[idx].price = product.price; // keep price in sync
    } else {
      cart.items.push({ product: product._id, quantity: Number(quantity), price: product.price });
    }

    await cart.save();
    const populated = await cart.populate('items.product', 'name price images');
    return res.status(200).json(populated);
  } catch (error) {
    console.error('addItem error:', error);
    return res.status(500).json({ message: 'خطای سرور' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const owner = getOwnerFilter(req);
    if (!owner) return res.status(401).json({ message: 'لطفاً وارد شوید' });

    const { productId, quantity } = req.body;
    if (!productId || typeof quantity !== 'number') {
      return res.status(400).json({ message: 'productId و quantity معتبر لازم است' });
    }

    const cart = await Cart.findOne(owner);
    if (!cart) return res.status(404).json({ message: 'سبد خرید یافت نشد' });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx === -1) return res.status(404).json({ message: 'آیتم در سبد موجود نیست' });

    cart.items[idx].quantity = Math.max(1, quantity);
    await cart.save();
    const populated = await cart.populate('items.product', 'name price images');
    return res.json(populated);
  } catch (error) {
    console.error('updateItem error:', error);
    return res.status(500).json({ message: 'خطای سرور' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const owner = getOwnerFilter(req);
    if (!owner) return res.status(401).json({ message: 'لطفاً وارد شوید' });

    const { productId } = req.params;
    if (!productId) return res.status(400).json({ message: 'productId الزامی است' });

    const cart = await Cart.findOne(owner);
    if (!cart) return res.status(404).json({ message: 'سبد خرید یافت نشد' });

    const newItems = cart.items.filter(i => i.product.toString() !== productId);
    cart.items = newItems;
    await cart.save();
    const populated = await cart.populate('items.product', 'name price images');
    return res.json(populated);
  } catch (error) {
    console.error('removeItem error:', error);
    return res.status(500).json({ message: 'خطای سرور' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const owner = getOwnerFilter(req);
    if (!owner) return res.status(401).json({ message: 'لطفاً وارد شوید' });

    const cart = await Cart.findOne(owner);
    if (!cart) return res.status(404).json({ message: 'سبد خرید یافت نشد' });

    cart.items = [];
    await cart.save();
    return res.json(cart);
  } catch (error) {
    console.error('clearCart error:', error);
    return res.status(500).json({ message: 'خطای سرور' });
  }
};



