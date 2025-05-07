const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const Product = require('../models/Product');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('parent', 'name')
      .sort('name');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create category (admin only)
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').optional().trim(),
  body('parent').optional().isMongoId().withMessage('Valid parent category ID is required'),
  body('image').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, parent, image } = req.body;

    // Check if category with same name exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const category = new Category({
      name,
      description,
      parent,
      image
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update category (admin only)
router.put('/:id', [
  body('name').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('parent').optional().isMongoId(),
  body('image').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    // Check if new name already exists (if name is being updated)
    if (name) {
      const existingCategory = await Category.findOne({
        name,
        _id: { $ne: req.params.id }
      });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with this name already exists' });
      }
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete category (admin only)
router.delete('/:id', async (req, res) => {
  try {
    // Check if category has child categories
    const hasChildren = await Category.exists({ parent: req.params.id });
    if (hasChildren) {
      return res.status(400).json({ message: 'Cannot delete category with subcategories' });
    }

    // Check if category has products
    const hasProducts = await Product.exists({ category: req.params.id });
    if (hasProducts) {
      return res.status(400).json({ message: 'Cannot delete category with products' });
    }

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 