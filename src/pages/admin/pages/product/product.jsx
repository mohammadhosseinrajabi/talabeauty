import React from "react";
import TableProduct from "./tableProduct";
import AddProduct from "./addProduct";
import ProducTable from "./producTable";
import { GetCategoryProv } from "../../../../context/getCategoryContext";
import ProductsContextContainer from "../../../../context/productsContext";

export default function Product({ children }) {
  return (
    <GetCategoryProv>
      <ProductsContextContainer>
      <div
        id="manage_product_section"
        className="manage_product_section main_section "
      >
        <h4 className="text-center my-3">مدیریت محصولات</h4>
        <div className="row justify-content-between">
          <div className="col-10 col-md-6 col-lg-4">
            {children}
            {/* <div className="input-group mb-3 dir_ltr">
            <input
              type="text"
              className="form-control"
              placeholder="قسمتی از عنوان را وارد کنید"
            />
            <span className="input-group-text">جستجو</span>
          </div> */}
          </div>
          <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
            <button
              className="btn btn-success d-flex justify-content-center align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_product_modal"
            >
              <i className="fas fa-plus text-light"></i>
            </button>
          </div>
          <AddProduct />
        </div>
        {/* <TableProduct/> */}
        <ProducTable />
      </div>
      </ProductsContextContainer>
    </GetCategoryProv>
  );
}
