import React, { useState, useEffect, useContext } from "react";
import {
  FaShoppingCart,
  FaStar,
  FaHeart,
  FaShare,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaInstagram,
  FaTwitter,
  FaTelegram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import "./productsPage.css";
import NavDesktop from "../../navbar/navDesktop";
import TopMenuMobile from "../../navbar/topMenuMobile";
import { useParams } from "react-router-dom";
import axios from "axios";
import AxiosExclusive from "../../components/axiosConfig";
import { useCart } from "../../context/cartContext";
import { Alert } from "../../utils/alert";

const ProductsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const {addItem }=useCart();

  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const response = await AxiosExclusive.get(`/products/${id}`);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div dir="rtl">
      <NavDesktop />
      <TopMenuMobile />



      <div className="product-detail-page">
        <div className="product-container">
          {/* Product Images Section */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={
                  product.images && product.images.length > 0
                    ? `http://localhost:5000${product.images[selectedImage]}`
                    : "/images/arayesh.jpg"
                } 
                alt={product.name} 
              />
            </div>
            <div className="thumbnail-images">
              {product.images && product.images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={`http://localhost:5000${img}`} alt={`${product.name} - ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-price">
                <span className="current-price">{product.price.toLocaleString()} تومان</span>
              </div>
            </div>
            <p className="product-description">{product.description}</p>
            
            <div className="product-actions w-50 container">
              {/* <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div> */}
              <button className="add-to-cart-btn" onClick={async()=>{await addItem(product._id)
                Alert("به سبد خرید شما اضافه شد","success")
              }}>
                <FaShoppingCart /> افزودن به سبد خرید

              </button>
            </div>

            <div className="shipping-info">
              <div className="info-item">
                <FaTruck />
                <div>
                  <h4>ارسال سریع</h4>
                  <p>ارسال به سراسر کشور</p>
                </div>
              </div>
              <div className="info-item">
                <FaUndo />
                <div>
                  <h4>۷ روز ضمانت بازگشت</h4>
                  <p>بازگشت کالا بدون قید و شرط</p>
                </div>
              </div>
              <div className="info-item">
                <FaShieldAlt />
                <div>
                  <h4>ضمانت اصالت کالا</h4>
                  <p>تضمین اصالت تمامی محصولات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <footer className="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-info">
                    <h3>نوبت دهی آنلاین آرایشگاه</h3>
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
                تمامی حقوق برای سایتفروشگاه آنلاین و رزور نوبت آرایشگاه tala محفوظ است © 1404
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
};

export default ProductsPage;
