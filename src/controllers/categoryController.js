const Category = require('../models/Category');

// ایجاد دسته‌بندی جدید
exports.createCategory = async (req, res) => {
    try {
        const { name, description, parent, image, is_active, show_in_menu } = req.body;

        if (!name) {
            return res.status(400).json({ 
                success: false,
                message: 'نام دسته‌بندی الزامی است' 
            });
        }

        // ساخت slug از نام
        const slug = name
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');

        // بررسی تکراری نبودن نام و slug
        const existingCategory = await Category.findOne({ 
            $or: [{ name }, { slug }]
        });
        
        if (existingCategory) {
            return res.status(400).json({ 
                success: false,
                message: 'این نام دسته‌بندی قبلاً ثبت شده است' 
            });
        }

        // ایجاد دسته‌بندی جدید
        const categoryData = {
            name: name.trim(),
            slug: slug,
            description: description ? description.trim() : '',
            isActive: is_active === undefined ? true : Boolean(is_active),
            show_in_menu: show_in_menu === undefined ? true : Boolean(show_in_menu)
        };

        // اضافه کردن parent فقط اگر مقدار معتبر داشته باشد
        if (parent && parent !== '') {
            categoryData.parent = parent;
        }

        // اضافه کردن image فقط اگر وجود داشته باشد
        if (image) {
            categoryData.image = image;
        }

        const category = new Category(categoryData);
        await category.save();

        res.status(201).json({
            success: true,
            message: 'دسته‌بندی با موفقیت ایجاد شد',
            category
        });
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ 
            success: false,
            message: 'خطا در ایجاد دسته‌بندی',
            error: error.message 
        });
    }
};

// دریافت همه دسته‌بندی‌ها
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('parent', 'name')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ 
            success: false,
            message: 'خطا در دریافت دسته‌بندی‌ها',
            error: error.message 
        });
    }
};

// دریافت یک دسته‌بندی با ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('parent', 'name');

        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: 'دسته‌بندی یافت نشد' 
            });
        }

        res.json({
            success: true,
            category
        });
    } catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({ 
            success: false,
            message: 'خطا در دریافت دسته‌بندی',
            error: error.message 
        });
    }
};

// به‌روزرسانی دسته‌بندی
exports.updateCategory = async (req, res) => {
    try {
        const { name, description, parent, image, isActive } = req.body;

        // بررسی تکراری نبودن نام
        if (name) {
            const existingCategory = await Category.findOne({ 
                name, 
                _id: { $ne: req.params.id } 
            });
            if (existingCategory) {
                return res.status(400).json({ 
                    success: false,
                    message: 'این نام دسته‌بندی قبلاً ثبت شده است' 
                });
            }
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description, parent, image, isActive },
            { new: true, runValidators: true }
        ).populate('parent', 'name');

        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: 'دسته‌بندی یافت نشد' 
            });
        }

        res.json({
            success: true,
            message: 'دسته‌بندی با موفقیت به‌روزرسانی شد',
            category
        });
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ 
            success: false,
            message: 'خطا در به‌روزرسانی دسته‌بندی',
            error: error.message 
        });
    }
};

// حذف دسته‌بندی
exports.deleteCategory = async (req, res) => {
    try {
        // بررسی وجود زیردسته‌ها
        const hasChildren = await Category.findOne({ parent: req.params.id });
        if (hasChildren) {
            return res.status(400).json({ 
                success: false,
                message: 'ابتدا باید زیردسته‌های این دسته‌بندی را حذف کنید' 
            });
        }

        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: 'دسته‌بندی یافت نشد' 
            });
        }

        res.json({
            success: true,
            message: 'دسته‌بندی با موفقیت حذف شد'
        });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ 
            success: false,
            message: 'خطا در حذف دسته‌بندی',
            error: error.message 
        });
    }
};

// دریافت زیردسته‌های یک دسته‌بندی
exports.getSubcategories = async (req, res) => {
    try {
        const subcategories = await Category.find({ parent: req.params.id })
            .populate('parent', 'name');

        res.json({
            success: true,
            subcategories
        });
    } catch (error) {
        console.error('Get subcategories error:', error);
        res.status(500).json({ 
            success: false,
            message: 'خطا در دریافت زیردسته‌ها',
            error: error.message 
        });
    }
}; 