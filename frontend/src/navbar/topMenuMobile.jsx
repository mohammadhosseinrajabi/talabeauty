import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/login";
import LoginHomeBtn from "./loginHomeBtn";
import axios from "axios";
import "./topMenuMobile.css";
export default function TopMenuMobile() {
  const [isshowMenu, setIsShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleShowMenu = () => {
    setIsShowMenu(true);
  };

  return (
    <div className="topMenuMobile aasasass d-flex bg-light" id="topMenuMobile">
      <div
        className={`navMobile ${isshowMenu ? "showMenuMobile" : ""}`}
        onClick={() => setIsShowMenu(false)}
      ></div>
      <div className={`navList ${isshowMenu ? "showMenuMobile" : ""}`}>
        <button
          className="close-button bg-transparent border-none p-2"
          onClick={() => setIsShowMenu(false)}
        >
          ❌
        </button>
        <div>
          <img src="/auth/images/logo.webp" alt="" className="logo-menu" />
        </div>
        <ul className="list-unstyled p-1 mt-5">
          <li className="mb-3">
            <a
              href="#"
              className="d-flex align-items-center gap-2 text-dark text-decoration-none w-100"
              onClick={(e) => {
                e.preventDefault();
                setShowProducts(!showProducts);
              }}
            >
              <i className="fas fa-info-circle text-warning"></i> محصولات
              <i className={`fas fa-angle-${showProducts ? 'down' : 'left'} ms-auto`}></i>
            </a>
            {showProducts && (
              <div className="submenu" id="submenuMobile">
                <ul className="list-unstyled ps-4">
                  {categories.map((category) => (
                    <li key={category._id} className="mb-2">
                      <a href="#" className="text-dark text-decoration-none">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          <li className="mb-3">
            <a
              href="#"
              className="d-flex align-items-center gap-2 text-dark text-decoration-none w-100"
            >
              <i className="fas fa-star text-warning"></i> آرایشگران برتر
              <i className="fas fa-angle-left ms-auto"></i>
            </a>
          </li>
          <li className="mb-3">
            <a
              href="#"
              className="d-flex align-items-center gap-2 text-dark text-decoration-none w-100"
            >
              <i className="fas fa-user-circle text-warning"></i> ورود
              <i className="fas fa-angle-left ms-auto"></i>
            </a>
          </li>
        </ul>
      </div>
      <button
        className="h-25 text-hide mt-1 border-none bg-transparent"
        type="button"
        onClick={handleShowMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0,0,256,256"
          className="w-25 h-25"
        >
          <g
            fill="#cf9e86"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
          >
            <g transform="scale(5.12,5.12)">
              <path d="M5,8c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,23c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,38c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path>
            </g>
          </g>
        </svg>
      </button>
      <a className="logo mt-1" href="#">
        نوبت دهی آرایشگران
      </a>
      <div className="dir-ltr me-auto">
      <LoginHomeBtn targetPath="/login" title="ورود کاربران" showUserNameIfLoggedIn={true}/>
      </div>
    </div>
  );
}
