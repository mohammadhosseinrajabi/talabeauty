import React from 'react'
import { FaEnvelope, FaInstagram, FaMapMarkerAlt, FaPhone, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
   <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="footer-info">
                  <h3>فروشگاه آنلاین و رزور نوبت آرایشگاه tala</h3>
                  <p className="mb-4">
                    ما به شما کمک می‌کنیم تا بهترین خدمات آرایشی را با بهترین
                    آرایشگران تجربه کنید.
                  </p>
                  <div className="social-links">
                    <a href="#">
                      <FaInstagram />
                    </a>
                    <a href="#">
                      <FaTwitter />
                    </a>
                    <a href="#">
                      <FaTelegram />
                    </a>
                    <a href="#">
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="footer-links">
                  <h4>دسترسی سریع</h4>
                  <ul>
                    <li>
                      <a href="#">صفحه اصلی</a>
                    </li>
                    <li>
                      <a href="#">درباره ما</a>
                    </li>
                    <li>
                      <a href="#">خدمات</a>
                    </li>
                    <li>
                      <a href="#">تماس با ما</a>
                    </li>
                    <li>
                      <a href="#">سوالات متداول</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer-links">
                  <h4>خدمات ما</h4>
                  <ul>
                    <li>
                      <a href="#">آرایش مو</a>
                    </li>
                    <li>
                      <a href="#">آرایش صورت</a>
                    </li>
                    <li>
                      <a href="#">خدمات ناخن</a>
                    </li>
                    <li>
                      <a href="#">میکاپ</a>
                    </li>
                    <li>
                      <a href="#">رنگ مو</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer-contact">
                  <h4>تماس با ما</h4>
                  <p>
                    <FaMapMarkerAlt className="me-2" /> تهران، خیابان ولیعصر،
                    پلاک ۱۲۳
                  </p>
                  <p>
                    <FaPhone className="me-2" /> ۰۲۱-۱۲۳۴۵۶۷۸
                  </p>
                  <p>
                    <FaEnvelope className="me-2" /> info@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="copyright">
                تمامی حقوق برای سایت فروشگاه آنلاین و رزور نوبت آرایشگاه tala محفوظ است © 1404
            </div>
          </div>
        </div>
      </footer>
  )
}
