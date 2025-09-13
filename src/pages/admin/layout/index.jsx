import React, { useContext, useEffect, useState } from "react";
import "../assets/css/style.css";
import "../assets/js/chart";
import "../assets/js/main";
import NavbarAdmin from "./Navbar/navbarAdmin";
import SideBarAdmin from "./sidebar/sideBarAdmin";
import AdminContextContainer, {
  AdminContext,
} from "../context/adminLayoutContext";
import Dashboard from "../pages/dashboard/dashboard";
import Category from "../pages/category/category";
import Addcategory from "../pages/category/addcategory";
import Content from "../pages/content";
import { Navigate } from "react-router-dom";

export default function IndexAdmin() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsLogin(!!token && user.role === 'admin');
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl">لطفا صبر کنید ....</h1>
      </div>
    );
  }

  if (!isLogin) {
    return <Navigate to="/LoginAdmin" replace />;
  }

  return (
    <AdminContextContainer>
      <>
        <Content />
        <NavbarAdmin />
        <SideBarAdmin />
      </>
    </AdminContextContainer>
  );
}









