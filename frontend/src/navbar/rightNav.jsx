import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HomeNew from "../home_new/HomeNew";

export default function RightNav() {
  const [categories, setCategories] = useState([]);

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

  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link active" to="/HomeNew">
          خانه
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#productsSection">
          محصولات
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#papular-hairdresser">
          پربازدیدترین آرایشگران
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          دسته بندی ها
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          {categories.map((category) => (
            <li key={category._id}>
              <a className="dropdown-item" href="#">
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
