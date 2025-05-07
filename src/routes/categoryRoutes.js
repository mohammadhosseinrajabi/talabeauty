const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { adminAuth } = require('../middleware/authMiddleware');

// روت‌های عمومی (بدون نیاز به احراز هویت)
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/subcategories', categoryController.getSubcategories);

// روت‌های مخصوص ادمین
router.post('/', adminAuth, categoryController.createCategory);
router.put('/:id', adminAuth, categoryController.updateCategory);
router.delete('/:id', adminAuth, categoryController.deleteCategory);

module.exports = router; 