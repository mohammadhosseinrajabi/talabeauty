import React from 'react';
import Slider from 'react-slick';

export default function SliderArticle() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
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
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="Contents-card">
          <div className="placeholder-image">مقاله {item}</div>
          <h3>عنوان مقاله</h3>
          <p>توضیحات کوتاه درباره مقاله...</p>
        </div>
      ))}
    </Slider>
  );
} 