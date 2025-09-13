import React, { useEffect, useState } from "react";
import sliderSettings from "../../config/sliders/sliderSettings";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaClock, FaStar } from "react-icons/fa";
import AxiosExclusive from "../axiosConfig";

export default function Stylists() {
  const [stylist, setStylist] = useState([]);

  useEffect(() => {
    const fetchStylistData = async () => {
      try {
        const res = await AxiosExclusive.get("/stylists");
        if (res.status === 200 && Array.isArray(res.data.stylists)) {
          setStylist(res.data.stylists);
        
        } else {
          setStylist([]); // fallback
          console.warn("Unexpected stylist data:", res.data);
        }
      } catch (error) {
        console.error("Error fetching stylist data:", error);
        setStylist([]);
      }
    };
    fetchStylistData();
  }, []);
  return (
    <section className="most-visited-section">
      <div className="container">
        <h2 className="section-title" id="papular-hairdresser">
          پربازدیدترین آرایشگران
        </h2>
        <Slider {...sliderSettings}>
          {stylist.map((stylists) => (
            <div key={stylists.id} className="px-2">
              <div className="most-visited-card">
                <div className="card-image-wrapper">
                  <img
                    src={
                      stylists.image
                        ? `http://localhost:5000${stylists.image}`
                        : "/images/img-01.png"
                    }
                    alt={stylists.name}
                    className="stylist-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/img-01.png";
                    }}
                  />
                  <div className="appointment-count">
                    <FaClock className="me-1" />
                    {stylists.appointments} نوبت خالی
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="stylist-name">{stylists.name}</h3>
                  <p className="specialty">{stylists.specialty}</p>
                  <div className="rating">
                    <FaStar className="star-icon" />
                    <span>{stylists.rating}</span>
                  </div>
                    <Link
                      to={`/StylistPage/${stylists._id}`}
                      className="linkProductName"
                    >
                  <button className="book-button">
                      رزرو نوبت
                  </button>
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
