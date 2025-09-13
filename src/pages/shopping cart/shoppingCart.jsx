import React, { useEffect } from "react";
import NavDesktop from "../../navbar/navDesktop";
import TopMenuMobile from "../../navbar/topMenuMobile";
import "./shoppingCart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
export default function ShoppingCart() {
  const navigate = useNavigate();
  useEffect(() => {
    const Tokenuser = localStorage.getItem("tokenUserLogin");
    if (!Tokenuser) {
      navigate("/home");
    }
  }, []);
  const { items, subtotal, removeItem, updateQty, clearCart } = useCart();
  return (
    <>
      <NavDesktop />
      <TopMenuMobile />
      <br />
      <div className="container p-5" dir="rtl">
        <div className="row">
          <div className="col-sm-8 col-md-8">
            <span className="me-2">محصولات</span>
            {items.map((it) => (
              <div
                className="order p-3 m-2 rounded bg-white d-flex flex-wrap align-items-center gap-2"
                key={it.product._id}
              >
                <div className="imagesProduct">
                  <img src="" alt="محصول" className="imageThumbnailProduct" />
                </div>

                <div className="infoProduct ms-3 d-flex flex-column text-secondary flex-grow-1 min-w-0">
                  <p className="titeProduct me-3 ">{it.product.name}</p>
                  <p className="colorProduct me-3">{it.quantity} عدد</p>
                 
                </div>

                <div className="d-flex align-items-center gap-2">
                  {/* <button className="btn btn-light"
                    onClick={() => updateQty(it.product._id, it.quantity - 1)}
                  >
                    -
                  </button>
                  <span>0</span>
                  <button className="btn btn-light"
                    onClick={() => updateQty(it.product._id, it.quantity + 1)}
                  >
                    +
                  </button> */}
           
                </div>

                <p className="priceProduct text-danger mb-0 ms-auto text-break">
                  قیمت : {it.product.price}
                </p>

                <button className="btn btn-danger mt-2 mt-sm-0" onClick={() => removeItem(it.product._id)}>حذف</button>
              </div>
            ))}
          </div>

          <div className="col-sm-4 col-md-4">
            <span className="me-2">خلاصه سفارش</span>
            <div className="paymentSummary p-3 m-2 rounded bg-white">
              <p className="accountName bg-light text-center rounded p-2">
                نام شما:
              </p>

              <div className="row">
                <div className="col-md-4 col-sm-8 mt-1">کد تخفیف:</div>
                <div className="col-md-8 col-sm-4">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="کد تخفیف را وارد کنید"
                  />
                </div>

                <hr className="hrProduct" />

                <div className="col-md-4 col-sm-8 mt-3">
                  <p className="text-secondary">تعداد محصول:</p>
                </div>
                <div className="col-md-8 col-sm-4 mt-3">
                  <p className="text-secondary">0</p>
                </div>

                <div className="col-md-4 col-sm-8 mt-3">
                  <p className="text-secondary">قیمت تخفیف:</p>
                </div>
                <div className="col-md-8 col-sm-4 mt-3">
                  <p className="text-danger">0 تومان</p>
                </div>

                <div className="col-md-4 col-sm-8 mt-3">
                  <p className="text-secondary">مجموع قیمت:</p>
                </div>
                <div className="col-md-8 col-sm-4 mt-3">
                  <p className="text-danger">{subtotal}</p>
                </div>

                <hr className="hrProduct" />

                <button className="Payment btn btn-success p-2 d-block mx-auto">
                  پرداخت نهایی
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="alert alert-dark mt-4 " role="alert">
              هیچ اخطاری یافت نشد!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



//delet it

// import { useCart } from "../context/CartContext";

// function Navbar() {
//   const { totalQty } = useCart();
//   return <span>سبد ({totalQty})</span>;
// }

// function ProductCard({ product }) {
//   const { addItem } = useCart();
//   return (
//     <button onClick={() => addItem(product._id)}>افزودن به سبد</button>
//   );
// }

// function ShoppingCartPage() {
//   const { items, subtotal, removeItem, updateQty, clearCart } = useCart();
//   return (
//     <div>
//       {items.map((it) => (
//         <div key={it.product._id}>
//           <p>{it.product.name}</p>
//           <button onClick={() => updateQty(it.product._id, it.quantity + 1)}>
//             +
//           </button>
//           <button onClick={() => updateQty(it.product._id, it.quantity - 1)}>
//             -
//           </button>
//           <button onClick={() => removeItem(it.product._id)}>حذف</button>
//         </div>
//       ))}
//       <p>جمع کل: {subtotal} تومان</p>
//       <button onClick={clearCart}>خالی کردن</button>
//     </div>
//   );
// }
