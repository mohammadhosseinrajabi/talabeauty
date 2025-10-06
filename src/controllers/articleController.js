const Article = require('../models/Article');
const Category = require('../models/Category');

// ایجاد مقاله جدید
exports.createArticle = async (req, res) => {
    try {
        const {
            title,
            content,
            excerpt,
            category,
            featuredImage,
            tags,
            status,
            isFeatured,
            allowComments,
            metaTitle,
            metaDescription
        } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({
                success: false,
                message: 'عنوان، محتوا و دسته‌بندی الزامی است'
            });
        }

        // بررسی وجود دسته‌بندی
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: 'دسته‌بندی انتخاب شده وجود ندارد'
            });
        }

        // ساخت slug از عنوان
        const slug = title
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');

        // بررسی تکراری نبودن slug
        const existingArticle = await Article.findOne({ slug });
        if (existingArticle) {
            return res.status(400).json({
                success: false,
                message: 'مقاله‌ای با این عنوان قبلاً وجود دارد'
            });
        }

        const articleData = {
            title: title.trim(),
            slug,
            content: content.trim(),
            excerpt: excerpt ? excerpt.trim() : '',
            category,
            author: req.user.id, // از middleware auth گرفته می‌شود
            featuredImage: featuredImage || '',
            tags: tags || [],
            status: status || 'draft',
            isFeatured: isFeatured || false,
            allowComments: allowComments !== undefined ? allowComments : true,
            metaTitle: metaTitle ? metaTitle.trim() : title.trim(),
            metaDescription: metaDescription ? metaDescription.trim() : excerpt ? excerpt.trim() : ''
        };

        // تنظیم publishedAt اگر مقاله منتشر شده باشد
        if (status === 'published') {
            articleData.publishedAt = Date.now();
        }

        const article = new Article(articleData);
        await article.save();

        // Populate category and author
        await article.populate('category', 'name');
        await article.populate('author', 'name email');

        res.status(201).json({
            success: true,
            message: 'مقاله با موفقیت ایجاد شد',
            article
        });
    } catch (error) {
        console.error('Create article error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد مقاله',
            error: error.message
        });
    }
};

// دریافت همه مقالات (با فیلتر و صفحه‌بندی)
exports.getAllArticles = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            status,
            category,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        const query = {};

        // فیلتر بر اساس وضعیت
        if (status && ['draft', 'published', 'archived'].includes(status)) {
            query.status = status;
        }

        // فیلتر بر اساس دسته‌بندی
        if (category) {
            query.category = category;
        }

        // جستجو در عنوان و محتوا
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const articles = await Article.find(query)
            .populate('category', 'name slug')
            .populate('author', 'name email')
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await Article.countDocuments(query);

        res.json({
            success: true,
            articles,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get articles error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت مقالات',
            error: error.message
        });
    }
};

// دریافت مقالات منتشر شده (برای نمایش عمومی)
exports.getPublishedArticles = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            category,
            search,
            featured
        } = req.query;

        const query = { status: 'published' };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }

        if (featured === 'true') {
            query.isFeatured = true;
        }

        const articles = await Article.find(query)
            .populate('category', 'name slug')
            .populate('author', 'name')
            .sort({ publishedAt: -1, isFeatured: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await Article.countDocuments(query);

        res.json({
            success: true,
            articles,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get published articles error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت مقالات',
            error: error.message
        });
    }
};

// دریافت یک مقاله با ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
            .populate('category', 'name slug')
            .populate('author', 'name email');

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'مقاله یافت نشد'
            });
        }

        // افزایش تعداد بازدید برای مقالات منتشر شده
        if (article.status === 'published') {
            article.viewCount += 1;
            await article.save();
        }

        res.json({
            success: true,
            article
        });
    } catch (error) {
        console.error('Get article error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت مقاله',
            error: error.message
        });
    }
};

// دریافت مقاله با slug
exports.getArticleBySlug = async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug, status: 'published' })
            .populate('category', 'name slug')
            .populate('author', 'name email');

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'مقاله یافت نشد'
            });
        }

        // افزایش تعداد بازدید
        article.viewCount += 1;
        await article.save();

        res.json({
            success: true,
            article
        });
    } catch (error) {
        console.error('Get article by slug error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت مقاله',
            error: error.message
        });
    }
};

// به‌روزرسانی مقاله
exports.updateArticle = async (req, res) => {
    try {
        const {
            title,
            content,
            excerpt,
            category,
            featuredImage,
            tags,
            status,
            isFeatured,
            allowComments,
            metaTitle,
            metaDescription
        } = req.body;

        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'مقاله یافت نشد'
            });
        }

        // بررسی دسترسی (فقط نویسنده یا ادمین)
        if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجاز به ویرایش این مقاله نیستید'
            });
        }

        // بررسی وجود دسته‌بندی
        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({
                    success: false,
                    message: 'دسته‌بندی انتخاب شده وجود ندارد'
                });
            }
        }

        const updateData = {};
        if (title) updateData.title = title.trim();
        if (content) updateData.content = content.trim();
        if (excerpt !== undefined) updateData.excerpt = excerpt.trim();
        if (category) updateData.category = category;
        if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
        if (tags !== undefined) updateData.tags = tags;
        if (status) updateData.status = status;
        if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
        if (allowComments !== undefined) updateData.allowComments = allowComments;
        if (metaTitle) updateData.metaTitle = metaTitle.trim();
        if (metaDescription) updateData.metaDescription = metaDescription.trim();

        // تنظیم publishedAt اگر وضعیت به published تغییر کند
        if (status === 'published' && article.status !== 'published') {
            updateData.publishedAt = Date.now();
        }

        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate('category', 'name slug').populate('author', 'name email');

        res.json({
            success: true,
            message: 'مقاله با موفقیت به‌روزرسانی شد',
            article: updatedArticle
        });
    } catch (error) {
        console.error('Update article error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی مقاله',
            error: error.message
        });
    }
};

// حذف مقاله
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'مقاله یافت نشد'
            });
        }

        // بررسی دسترسی (فقط نویسنده یا ادمین)
        if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجاز به حذف این مقاله نیستید'
            });
        }

        await Article.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'مقاله با موفقیت حذف شد'
        });
    } catch (error) {
        console.error('Delete article error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در حذف مقاله',
            error: error.message
        });
    }
};

// دریافت مقالات محبوب (بر اساس تعداد بازدید)
exports.getPopularArticles = async (req, res) => {
    try {
        const { limit = 5 } = req.query;

        const articles = await Article.find({ status: 'published' })
            .populate('category', 'name slug')
            .populate('author', 'name')
            .sort({ viewCount: -1, publishedAt: -1 })
            .limit(parseInt(limit))
            .exec();

        res.json({
            success: true,
            articles
        });
    } catch (error) {
        console.error('Get popular articles error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت مقالات محبوب',
            error: error.message
        });
    }
};

// دریافت مقالات مرتبط
exports.getRelatedArticles = async (req, res) => {
    try {
        const { articleId, limit = 4 } = req.query;

        const currentArticle = await Article.findById(articleId);
        if (!currentArticle) {
            return res.status(404).json({
                success: false,
                message: 'مقاله اصلی یافت نشد'
            });
        }

        const relatedArticles = await Article.find({
            _id: { $ne: articleId },
            status: 'published',
            $or: [
                { category: currentArticle.category },
                { tags: { $in: currentArticle.tags } }
            ]
        })
            .populate('category', 'name slug')
            .populate('author', 'name')
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .exec();

        res.json({
            success: true,
            articles: relatedArticles
        });
    } catch (error) {
        console.error('Get related articles error:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت مقالات مرتبط',
            error: error.message
        });
    }
};
