import React, { useContext } from "react";
import { AdminContext } from "../../context/adminLayoutContext";
import Avatar from "./avatar";
import avatar1 from "../../assets/images/avatar/avatar1.jpg";
import SidebarGroupItem from "./sidebarGroupItem";
import SidebarItem from "./sidebarItem";

export default function SideBarAdmin() {
  const { showSidebar } = useContext(AdminContext);
  return (
    <section id="sidebar_section">
      <div
        className={`mini_sidebar collapsedd bg-dark h-100 ${
          showSidebar ? "expanded" : null
        }`}
      >
        <div className="p-0 m-0">
          <Avatar name="محمدحسین رجبی" imagePath={avatar1} />

          <SidebarItem targetPath="/admin/dashboard" title="داشبورد" icon="fas fa-tachometer-alt" />
          {/* <!-- =================================== --> */}
          <SidebarGroupItem title="فروشگاه" />
          <SidebarItem targetPath="/admin/category" title="مدیریت دسته بندی آرایشگاه ها" icon="fas fa-stream" />

          <SidebarItem targetPath="/admin/product" title="مدیریت محصول" icon="fa-brands fa-product-hunt" />

          {/* <!-- =================================== --> */}

          <SidebarGroupItem title="آرایشگران" />
          <SidebarItem targetPath="/admin/stylist" title="مدیریت آرایشگران" icon="fa-regular fa-face-smile" />

          {/* <!-- =================================== --> */}

          <SidebarGroupItem title="کاربران و همکاران" />

          <SidebarItem targetPath="/admin/article" title="مدیریت مطالب" icon="fa-regular fa-file" />

          {/* <!-- =================================== --> */}
          {/* <SidebarGroupItem title="ارتباطات"/> */}
        </div>
      </div>
    </section>
  );
}
