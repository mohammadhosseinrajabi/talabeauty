import React, { useEffect, useState } from 'react'
import sliderSettings from '../../config/sliders/sliderSettings'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AxiosExclusive from '../axiosConfig';

export default function Products() {
  const [products, setproducts] = useState([]);

      useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await AxiosExclusive.get("/products");
        if (res.status === 200) {
         

          setproducts(res.data.products);
        }
      } catch (error) {}
    };
    fetchProductData();
  }, []);

  return (
      <section className="stylists-section">
            <div className="container">
              <h2 className="section-title mb-5" id="productsSection">
                {" "}
                محصولات
              </h2>
              <Slider {...sliderSettings}>
                {products.map((product) => (
                  <div key={product._id} className="px-2" id="productsCard">
                    <div className="stylist-card">
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? `http://localhost:5000${product.images[0]}`
                            : "/images/img-01.png" // عکس پیش‌فرض
                        }
                        alt={product.name}
                        className="stylist-image"
                      />
                      <div className="stylist-info">
                        <h4>
                          <Link
                            to={`/ProductPage/${product._id}`}
                            className="linkProductName"
                          >
                            {product.name}
                          </Link>
                        </h4>
                        <p className="">{product.price.toLocaleString()} تومان</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
  )
}
