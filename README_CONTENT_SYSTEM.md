# سیستم مدیریت محتوای وب‌سایت

این سیستم مدیریت محتوا برای وب‌سایت فروشگاه زیبایی طراحی شده است که شامل مدیریت مقالات، دسته‌بندی‌ها و محتوای سایت می‌باشد.

## ویژگی‌های اصلی

### 🔧 Backend (Node.js + Express + MongoDB)
- **مدل Article**: مدیریت کامل مقالات با فیلدهای مختلف
- **کنترلر Article**: عملیات CRUD کامل برای مقالات
- **API Routes**: مسیرهای API برای مدیریت محتوا
- **احراز هویت**: سیستم احراز هویت برای ادمین‌ها و کاربران

### 🎨 Frontend (React)
- **صفحه مقالات**: نمایش لیست مقالات منتشر شده
- **صفحه مقاله تکی**: نمایش کامل مقاله با محتوای کامل
- **پنل ادمین**: مدیریت مقالات (افزودن، ویرایش، حذف)
- **طراحی ریسپانسیو**: سازگار با تمام دستگاه‌ها

## ساختار فایل‌ها

### Backend
```
src/
├── models/
│   └── Article.js              # مدل مقاله
├── controllers/
│   └── articleController.js    # کنترلر مقاله
├── routes/
│   └── articleRoutes.js        # مسیرهای API
└── middleware/
    └── authMiddleware.js       # احراز هویت
```

### Frontend
```
frontend/src/
├── pages/
│   ├── articlesPage/           # صفحه لیست مقالات
│   │   ├── articlesPage.jsx
│   │   └── articlesPage.css
│   └── singleArticle/          # صفحه مقاله تکی
│       ├── singleArticle.jsx
│       └── singleArticle.css
└── pages/admin/pages/Article/  # پنل ادمین
    ├── article.jsx
    ├── articleTable.jsx
    └── addArticle.jsx
```

## API Endpoints

### مقالات عمومی (بدون نیاز به احراز هویت)
- `GET /api/articles/published` - دریافت مقالات منتشر شده
- `GET /api/articles/popular` - دریافت مقالات محبوب
- `GET /api/articles/related` - دریافت مقالات مرتبط
- `GET /api/articles/slug/:slug` - دریافت مقاله با slug
- `GET /api/articles/:id` - دریافت مقاله با ID

### مقالات ادمین (نیاز به احراز هویت)
- `GET /api/articles` - دریافت همه مقالات (با فیلتر)
- `POST /api/articles` - ایجاد مقاله جدید
- `PUT /api/articles/:id` - ویرایش مقاله
- `DELETE /api/articles/:id` - حذف مقاله

## مدل Article

```javascript
{
  title: String,           // عنوان مقاله
  slug: String,            // URL دوستانه
  content: String,         // محتوای اصلی
  excerpt: String,         // خلاصه مقاله
  category: ObjectId,      // دسته‌بندی
  author: ObjectId,        // نویسنده
  featuredImage: String,   // تصویر شاخص
  tags: [String],          // برچسب‌ها
  status: String,          // وضعیت (draft/published/archived)
  isFeatured: Boolean,     // مقاله ویژه
  allowComments: Boolean,  // اجازه نظرات
  viewCount: Number,       // تعداد بازدید
  metaTitle: String,       // عنوان متا (SEO)
  metaDescription: String, // توضیحات متا (SEO)
  publishedAt: Date,       // تاریخ انتشار
  createdAt: Date,         // تاریخ ایجاد
  updatedAt: Date          // تاریخ به‌روزرسانی
}
```

## نصب و راه‌اندازی

### 1. نصب Dependencies
```bash
# Backend
cd src
npm install

# Frontend
cd frontend
npm install
```

### 2. تنظیمات Database
```bash
# اطمینان از اجرای MongoDB
mongod

# اتصال به دیتابیس
mongodb://localhost:27017/eshop
```

### 3. اجرای سرور
```bash
# Backend
cd src
npm start

# Frontend
cd frontend
npm start
```

## نحوه استفاده

### برای ادمین‌ها

1. **ورود به پنل ادمین**
   - مسیر: `/admin`
   - نیاز به احراز هویت ادمین

2. **مدیریت مقالات**
   - مسیر: `/admin/articles`
   - امکان افزودن، ویرایش و حذف مقالات

3. **تنظیمات مقاله**
   - انتخاب دسته‌بندی
   - آپلود تصویر شاخص
   - تنظیم وضعیت انتشار
   - افزودن برچسب‌ها

### برای کاربران

1. **مشاهده مقالات**
   - مسیر: `/articles`
   - فیلتر بر اساس دسته‌بندی
   - جستجو در مقالات

2. **خواندن مقاله**
   - مسیر: `/article/:slug`
   - نمایش کامل محتوا
   - مقالات مرتبط

## ویژگی‌های پیشرفته

### SEO Optimization
- تولید خودکار slug از عنوان
- فیلدهای meta title و description
- ساختار URL دوستانه

### مدیریت تصاویر
- آپلود تصویر شاخص
- نمایش پیش‌نمایش
- بهینه‌سازی خودکار

### سیستم دسته‌بندی
- دسته‌بندی‌های سلسله‌مراتبی
- فیلتر مقالات بر اساس دسته
- نمایش دسته در مقالات

### آمار و گزارش
- شمارش بازدید مقالات
- مقالات محبوب
- مقالات مرتبط

## امنیت

- احراز هویت JWT
- بررسی دسترسی ادمین
- محافظت از API endpoints
- اعتبارسنجی ورودی‌ها

## عملکرد

- صفحه‌بندی مقالات
- جستجوی پیشرفته
- فیلترهای مختلف
- کش‌گذاری داده‌ها

## پشتیبانی از زبان‌ها

- پشتیبانی کامل از فارسی (RTL)
- تاریخ شمسی
- فونت‌های فارسی
- ترجمه پیام‌ها

## تست

```bash
# تست Backend
cd src
npm test

# تست Frontend
cd frontend
npm test
```

## مشارکت

برای مشارکت در توسعه:

1. Fork کنید
2. Branch جدید ایجاد کنید
3. تغییرات را commit کنید
4. Pull Request ارسال کنید

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## پشتیبانی

برای سوالات و مشکلات:
- ایجاد Issue در GitHub
- تماس با تیم توسعه
- مستندات کامل در Wiki

## تغییرات آینده

- [ ] سیستم نظرات
- [ ] مدیریت فایل‌ها
- [ ] API برای موبایل
- [ ] سیستم کش پیشرفته
- [ ] گزارش‌گیری آماری
- [ ] مدیریت چندزبانه

