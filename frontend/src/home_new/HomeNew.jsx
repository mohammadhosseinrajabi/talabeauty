import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar, FaCut, FaInstagram, FaTwitter, FaTelegram, FaWhatsapp, FaClock, FaPhone, FaEnvelope, FaCrow, FaCrutch } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomeNew.css';
import NavDesktop from '../navbar/navDesktop';
import TopMenuMobile from '../navbar/topMenuMobile';

const HomeNew = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Most visited stylists data
  const mostVisitedStylists = [
    { id: 1, name: 'سارا محمدی', rating: 4.9, appointments: 150, image: './auth/images/arayesh.jpg', specialty: 'متخصص رنگ مو' },
    { id: 2, name: 'نیلوفر احمدی', rating: 4.8, appointments: 130, image: './auth/images/arayesh.jpg', specialty: 'متخصص میکاپ' },
    { id: 3, name: 'مریم کریمی', rating: 4.9, appointments: 145, image: './auth/images/arayesh.jpg', specialty: 'متخصص کوتاهی' },
    { id: 4, name: 'زهرا رضایی', rating: 4.7, appointments: 120, image: './auth/images/arayesh.jpg', specialty: 'متخصص رنگ و مش' },
    { id: 5, name: 'فاطمه حسینی', rating: 4.8, appointments: 135, image: './auth/images/arayesh.jpg', specialty: 'متخصص عروس' }
  ];

  // Latest articles data
  const latestArticles = [
    {
      id: 1,
      title: 'جدیدترین ترندهای رنگ مو در سال ۲۰۲۴',
      excerpt: 'با جدیدترین ترندهای رنگ مو در سال جدید آشنا شوید...',
      image: './auth/images/arayesh.jpg',
      date: '۱۵ فروردین ۱۴۰۳'
    },
    {
      id: 2,
      title: 'راهنمای کامل مراقبت از مو',
      excerpt: 'نکات طلایی برای داشتن موهایی سالم و درخشان...',
      image: './auth/images/arayesh.jpg',
      date: '۱۲ فروردین ۱۴۰۳'
    },
    {
      id: 3,
      title: 'ترندهای میکاپ بهار ۱۴۰۳',
      excerpt: 'آشنایی با جدیدترین سبک‌های آرایش در فصل بهار...',
      image: './auth/images/arayesh.jpg',
      date: '۱۰ فروردین ۱۴۰۳'
    },
    {
      id: 4,
      title: 'مراقبت از پوست در بهار',
      excerpt: 'روش‌های مراقبت از پوست در فصل بهار...',
      image: './auth/images/arayesh.jpg',
      date: '۸ فروردین ۱۴۰۳'
    }
  ];

  return (
    <div className="home-container" dir="rtl">
      <NavDesktop/>
      <TopMenuMobile/>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">نوبت دهی آنلاین آرایشگاه</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="جستجوی آرایشگر یا سالن آرایش..."
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="text-center mb-5">خدمات ما</h2>
          <div className="row">
            {[
              { icon: <FaCrutch />, title: 'آرایش مو' },
              { icon: <FaCut />, title: 'آرایش صورت' },
              { icon: <FaCut />, title: 'ناخن' },
              { icon: <FaCut />, title: 'میکاپ' }
            ].map((service, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Stylists Section */}
    
      <section className="stylists-section">
        <div className="container">
          <h2 className="text-center mb-5">برترین آرایشگران</h2>
          <div className="container">
          <Slider {...sliderSettings}>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="px-2">
                <div className="stylist-card">
                  <img
                    src={`./auth/images/arayesh.jpg`}
                    alt={`آرایشگر ${item}`}
                    className="stylist-image"
                  />
                  <div className="stylist-info">
                    <h4>آرایشگر {item}</h4>
                    <div className="d-flex align-items-center justify-content-center">
                      <FaStar className="text-warning me-1" />
                      <span>4.{item}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="cities-section">
      
          <h2 className="text-center mb-5">شهرهای ما</h2>
          <div className="container w-83">
       
          <div className="row">
            {['تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز', 'کرج'].map((city, index) => (
              <div key={index} className="col-md-4 col-sm-6">
                <div className="city-card">
                  <FaMapMarkerAlt className="mb-3" size={24} />
                  <h3>{city}</h3>
                  <p>خدمات آرایشگری در {city}</p>
                </div>
              </div>
            ))}
          </div>
         
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h2 className="mb-4">درباره ما</h2>
            <p className="lead">
              ما با ارائه خدمات آنلاین نوبت‌دهی آرایشگاه، تجربه‌ای متفاوت را برای شما فراهم کرده‌ایم.
              با استفاده از پلتفرم ما، می‌توانید به راحتی بهترین آرایشگران را پیدا کرده و نوبت خود را رزرو کنید.
            </p>
          </div>
        </div>
      </section>

      {/* Most Visited Stylists Section */}
      <section className="most-visited-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">پربازدیدترین آرایشگران</h2>
            <a href="#" className="view-all">مشاهده همه</a>
          </div>
          <Slider {...sliderSettings}>
            {mostVisitedStylists.map((stylist) => (
              <div key={stylist.id} className="px-2">
                <div className="most-visited-card">
                  <div className="card-image-wrapper">
                    <img src={stylist.image} alt={stylist.name} className="stylist-image" />
                    <div className="appointment-count">
                      <FaClock className="me-1" />
                      {stylist.appointments} نوبت
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="stylist-name">{stylist.name}</h3>
                    <p className="specialty">{stylist.specialty}</p>
                    <div className="rating">
                      <FaStar className="star-icon" />
                      <span>{stylist.rating}</span>
                    </div>
                    <button className="book-button">رزرو نوبت</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="articles-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">آخرین مطالب</h2>
            <a href="#" className="view-all">مشاهده همه</a>
          </div>
          <div className="row">
            {latestArticles.map((article) => (
              <div key={article.id} className="col-lg-3 col-md-6 mb-4">
                <div className="article-card">
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                    <div className="article-date">{article.date}</div>
                  </div>
                  <div className="article-content">
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <a href="#" className="read-more">ادامه مطلب</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="footer-info">
                  <h3>نوبت دهی آنلاین آرایشگاه</h3>
                  <p className="mb-4">
                    ما به شما کمک می‌کنیم تا بهترین خدمات آرایشی را با بهترین آرایشگران تجربه کنید.
                  </p>
                  <div className="social-links">
                    <a href="#" className="instagram"><FaInstagram /></a>
                    <a href="#" className="twitter"><FaTwitter /></a>
                    <a href="#" className="telegram"><FaTelegram /></a>
                    <a href="#" className="whatsapp"><FaWhatsapp /></a>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="footer-links">
                  <h4>دسترسی سریع</h4>
                  <ul>
                    <li><a href="#">صفحه اصلی</a></li>
                    <li><a href="#">درباره ما</a></li>
                    <li><a href="#">خدمات</a></li>
                    <li><a href="#">تماس با ما</a></li>
                    <li><a href="#">سوالات متداول</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="footer-links">
                  <h4>خدمات ما</h4>
                  <ul>
                    <li><a href="#">آرایش مو</a></li>
                    <li><a href="#">آرایش صورت</a></li>
                    <li><a href="#">خدمات ناخن</a></li>
                    <li><a href="#">میکاپ</a></li>
                    <li><a href="#">رنگ مو</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="footer-contact">
                  <h4>تماس با ما</h4>
                  <p>
                    <FaMapMarkerAlt className="me-2" />
                    تهران، خیابان ولیعصر، پلاک ۱۲۳
                  </p>
                  <p>
                    <FaPhone className="me-2" />
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </p>
                  <p>
                    <FaEnvelope className="me-2" />
                    info@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="copyright">
              تمامی حقوق برای سایت نوبت دهی آنلاین آرایشگاه محفوظ است © ۱۴۰۳
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeNew; 