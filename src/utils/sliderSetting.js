// تنظیمات پایه‌ای مشترک
const baseSettings = {
  speed: 500,
  slidesToScroll: 1,
  infinite: true,
  centerMode: false,
  centerPadding: "40px",
  focusOnSelect: true,
};


const settings = {
  ...baseSettings, 
  dots: true,
  slidesToShow: 5,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

// تنظیمات مخصوص اسلایدر آرایشگران
const stylistsSettings = {
  ...baseSettings,  
  className: "center",
  centerMode: true,
  slidesToShow: 3,
  rows: 2,
  slidesPerRow: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        centerPadding: "50px",
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        centerPadding: "30px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerPadding: "20px",
      },
    },
  ],
};

export { settings, stylistsSettings };
