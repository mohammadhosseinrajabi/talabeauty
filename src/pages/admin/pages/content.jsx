import React, { useContext } from "react";
import Category from "./category/category";
import Addcategory from "./category/addcategory";
import { AdminContext } from "../context/adminLayoutContext";
import Product from "./product/product";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./dashboard/dashboard";
import Logout from "../../auth/logout";
import Stylist from "./stylist/stylist";
import Article from "./Article/article";

export default function Content() {
  const { showSidebar } = useContext(AdminContext);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}
    >
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="category" element={<Category />} />
        <Route path="product" element={<Product />} />
        <Route path="stylist" element={<Stylist />} />
        <Route path="article" element={<Article />} />
        {/* <Route path="logout" element={<Logout/>}/> */}
      </Routes>
    </section>

  );
}
