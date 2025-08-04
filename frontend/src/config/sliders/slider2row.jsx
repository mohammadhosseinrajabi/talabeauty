import React from 'react';
import Slider from 'react-slick';

export default function Slider2row() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="boxTopStylist">
          <div className="imgTopStylist">
            <div className="placeholder-image">آرایشگر {item}</div>
          </div>
          <h3>نام آرایشگر</h3>
          <p>تخصص: آرایش مو و صورت</p>
        </div>
      ))}
    </Slider>
  );
} 