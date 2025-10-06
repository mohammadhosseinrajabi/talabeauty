const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { adminAuth, userAuth } = require('../middleware/authMiddleware');

// روت‌های عمومی (بدون نیاز به احراز هویت)
router.get('/published', articleController.getPublishedArticles);
router.get('/popular', articleController.getPopularArticles);
router.get('/related', articleController.getRelatedArticles);
router.get('/slug/:slug', articleController.getArticleBySlug);
router.get('/:id', articleController.getArticleById);

// روت‌های مخصوص کاربران احراز هویت شده
router.get('/', userAuth, articleController.getAllArticles);

// روت‌های مخصوص ادمین
router.post('/', adminAuth, articleController.createArticle);
router.put('/:id', adminAuth, articleController.updateArticle);
router.delete('/:id', adminAuth, articleController.deleteArticle);

module.exports = router;
