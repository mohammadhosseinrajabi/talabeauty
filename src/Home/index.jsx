// import React from "react";
// import "./homePage.css";
// import NavDesktop from "../navbar/navDesktop";
// import SliderMostvisited from "../components/sliders/sliderMostvisited";
// import SeemoreLine from "../components/seemoreLine";
// import Card from "../components/Card";
// import SearchBar from "../components/SearchBar";
// import TopMenuMobile from "../navbar/topMenuMobile";
// import Citys from "../components/citys";
// import AboutUsBox from "../components/aboutUsBox";
// import Slider2row from "../components/sliders/slider2row";
// import SliderTopStylist from "../components/sliders/sliderTopStylist";
// import SliderArticle from "../components/sliders/sliderArticle";
// import Footer from "../footer/footer";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Index() {
//   /*top stylists */

//   return (
//     <div className="bodyPage" dir="rtl">
//       <NavDesktop />
//       <TopMenuMobile />

//       <SearchBar />

//       <div className="container top-50px">
//         <Card />
//       </div>

//       <SeemoreLine title={"پربازدیدترین آرایشگران"} linkText={"مشاهده همه"} />

//       {/* اسلایدر کارت‌ها */}
//       <div className="container sliderContainer">
//         <SliderMostvisited />
//       </div>

//       <SeemoreLine title={"شهر های ما"} linkText={"مشاهده همه"} />

//       {/* citys */}
//       <div className="citys mt-5">
//         <div className="container d-flex justify-content-center">
//           <div className="row">
//             <Citys
//               city={"تهران"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"تهران"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"تهران"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"تهران"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//           </div>
//         </div>

//         <div className="container d-flex justify-content-center">
//           <div className="row">
//             <Citys
//               city={"اصفهان"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"اصفهان"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"اصفهان"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"اصفهان"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//           </div>
//         </div>

//         <div className="container d-flex justify-content-center">
//           <div className="row">
//             <Citys
//               city={"شیراز"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"شیراز"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"شیراز"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//             <Citys
//               city={"شیراز"}
//               tagLink={"مشاهده همه"}
//               jobs={"نوبت‌دهی آرایشگاه / خدمات آرایشگری /آرایشگاه ها"}
//             />
//           </div>
//         </div>
//       </div>

//       {/* about us */}
//       <div className="container">
//         <AboutUsBox />
//       </div>

//       {/* stylists */}

//       <SeemoreLine title={"آرایشگران ما"} linkText={"مشاهده همه"} />

//       <div className="container w-85 mt-5 img-thumbnail">
//         <Slider2row />
//       </div>

//       {/*top stylists */}

//       <SeemoreLine title={"برترین آرایشگران"} linkText={"مشاهده همه"} />

//       <div className="container w-85  mt-5">
//         <SliderTopStylist />
//       </div>

//       {/* matlab  */}

//       <SeemoreLine title={"آخرین مطالب"} linkText={"مشاهده همه"} />

//       <div className="container w-85  mt-5">
//         <SliderArticle />
//       </div>

//       {/* footer */}
//       <Footer />
//     </div>
//   );
// }
