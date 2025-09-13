import React from 'react';
import Slider from 'react-slick';

export default function SliderTopStylist() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className="boxTopStylist">
          <div className="imgTopStylist">
            <div className="placeholder-image">آرایشگر {item}</div>
          </div>
          <h3>نام آرایشگر</h3>
          <p>امتیاز: {item * 0.5}</p>
        </div>
      ))}
    </Slider>
  );
} 