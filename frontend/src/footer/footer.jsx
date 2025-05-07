import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-6">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <h5>درباره ما</h5>
          <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <h5>لینک‌های مفید</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="tag-a">خانه</a></li>
            <li><a href="#" className="tag-a">خدمات</a></li>
            <li><a href="#" className="tag-a">محصولات</a></li>
            <li><a href="#" className="tag-a">تماس با ما</a></li>
          </ul>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <h5>تماس با ما</h5>
          <p>شمال بابلرسر اونجا ک قشنگه</p>
          <p>ایمیل: info@example.com</p>
          <p>تلفن: 0123456789</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center mt-3">
          <p>کپی‌رایت © 2025. همه حقوق محفوظ است.</p>
          <div className="social-icons">
            <a href="#" className="text-white mx-2"><i className="fab fa-facebook-f tag-a"></i></a>
            <a href="#" className="text-white mx-2"><i className="fab fa-twitter tag-a"></i></a>
            <a href="#" className="text-white mx-2"><i className="fab fa-instagram tag-a"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}
