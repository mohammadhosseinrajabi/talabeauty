const express = require('express');
const router = express.Router();
const barberCategoryController = require('../controllers/barberCategoryController');

// Get all categories
router.get('/', barberCategoryController.getAllCategories);

// Get single category
router.get('/:id', barberCategoryController.getCategory);

// Create category
router.post('/', barberCategoryController.createCategory);

// Update category
router.put('/:id', barberCategoryController.updateCategory);

// Delete category
router.delete('/:id', barberCategoryController.deleteCategory);

module.exports = router; 