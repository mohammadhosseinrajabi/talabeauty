import React from "react";

import "./HomeNew.css";
import NavDesktop from "../navbar/navDesktop";
import TopMenuMobile from "../navbar/topMenuMobile";

import HeroTitle from "../components/ForHomePage/heroTitle";
import Services from "../components/ForHomePage/services";

import Products from "../components/ForHomePage/products";
import OurCity from "../components/ForHomePage/ourCity";
import Stylists from "../components/ForHomePage/stylists";
import Footer from "../components/ForHomePage/footer";
import ProductsPage from "../pages/single productsPage/productsPage";

const HomeNew = () => {
  const latestArticles = [
    {
      id: 1,
      title: "جدیدترین ترندهای رنگ مو در سال ۲۰۲۴",
      excerpt: "با جدیدترین ترندهای رنگ مو در سال جدید آشنا شوید...",
      image: "./auth/images/arayesh.jpg",
      date: "۱۵ فروردین ۱۴۰۳",
    },
    {
      id: 2,
      title: "راهنمای کامل مراقبت از مو",
      excerpt: "نکات طلایی برای داشتن موهایی سالم و درخشان...",
      image: "./auth/images/arayesh.jpg",
      date: "۱۲ فروردین ۱۴۰۳",
    },
    {
      id: 3,
      title: "ترندهای میکاپ بهار ۱۴۰۳",
      excerpt: "آشنایی با جدیدترین سبک‌های آرایش در فصل بهار...",
      image: "./auth/images/arayesh.jpg",
      date: "۱۰ فروردین ۱۴۰۳",
    },
    {
      id: 4,
      title: "مراقبت از پوست در بهار",
      excerpt: "روش‌های مراقبت از پوست در فصل بهار...",
      image: "./auth/images/arayesh.jpg",
      date: "۸ فروردین ۱۴۰۳",
    },
  ];

  return (
    <div className="home-container" dir="rtl">
      <NavDesktop />
      <TopMenuMobile />

      <HeroTitle />

      <Services />

      <Products />
      <OurCity />

      {/* Stylists Section */}
      <Stylists />
      {/* Latest Articles Section*/}
      <section className="articles-section">
        <div className="container">
          <h2 className="section-title">آخرین مطالب</h2>
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
                    <a href="#" className="read-more">
                      ادامه مطلب
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomeNew;
