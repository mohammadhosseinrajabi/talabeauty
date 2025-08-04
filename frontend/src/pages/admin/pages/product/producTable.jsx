import React, { useContext, useEffect, useState } from "react";
import PaginatedTable from "../../../../components/admin/paginatedTable";
import AddProduct from "./addProduct";
import axios from "axios";
import { Alert, AlertDetele } from "../../../../utils/alert";
import { ProductsContext } from "../../../../context/productsContext";

export default function ProducTable() {
  const [data, setdata] = useState([]);
  const { setEditId } = useContext(ProductsContext);

  const token = localStorage.getItem("token");
  const handleGetProduct = async () => {
  
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (res.status === 200) {
      
        setdata(res.data.products);
      } else {
     
        Alert("خطا در دریافت محصولات", "error");
      }
    } catch (error) {
      console.error("Error in handleGetProduct:", error);
      console.error("Error details:", error.response?.data);
      Alert(
        "خطا در دریافت محصولات",
        error.response?.data?.message || "خطا در ارتباط با سرور",
        "error"
      );
    }
  };
  useEffect(() => {
    handleGetProduct();
  }, []);

  const dataInfo = [
    // { field: "_id", title: "#" },
    { field: "category.name", title: "دسته" },
    { field: "name", title: "نام محصول" },
    { field: "description", title: "توضیحات" },
    { field: "price", title: "قیمت (تومان)" },
    { field: "stock", title: "موجودی" },
    {
      field: "images",
      title: "تصویر",
      elements: (image) => (
        <div>
          <img
            src={image[0]}
            alt="product"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div style={{ fontSize: "12px", marginTop: "5px" }}>{image[0]}</div>
        </div>
      ),
    },
  ];

  //delete product
  const handleDeleteProduct = async (id) => {
   
    const willDelete = await AlertDetele(
      "آیا مطمئن هستید؟",
      "این عملیات قابل بازگشت نیست!",
      "warning"
    );
    if (willDelete) {
      try {
 
        const res = await axios.delete(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        if (res.status === 200) {
          Alert("محصول با موفقیت حذف شد", "success");
       
          handleGetProduct();
        }
      } catch (error) {
        console.error("Error in handleDeleteProduct:", error);
        console.error("Error details:", error.response?.data);
        if (error.response?.status === 400) {
          Alert("خطا", error.response.data.message, "error");
        } else if (error.response?.status === 404) {
          Alert("خطا", "محصول یافت نشد", "error");
        } else {
          Alert("خطا", "خطا در حذف محصول", "error");
        }
      }
    } else {
 
      Alert("آیتم مورد نظر شما امن ماند", "info");
    }
  };

  const additionalElements = (item) => {
    return (
      <>
        <i
          className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
          title="زیرمجموعه"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        ></i>
        <i
          className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
          title="ویرایش محصول"
          data-bs-toggle="modal"
          data-bs-placement="top"
          data-bs-target="#add_product_modal"
          onClick={() => {
            if (item && item._id) {
              setEditId(item._id);
            }
          }}
        ></i>
        <i
          className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
          title="افزودن ویژگی"
          data-bs-toggle="modal"
          data-bs-target="#add_product_category_attr_modal"
        ></i>
        <i
          className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
          title="حذف دسته"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          onClick={() => {
            if (item && item._id) {
              handleDeleteProduct(item._id);
            }
          }}
        ></i>
      </>
    );
  };
  const additionField = {
    title: "عملیات",
    elements: (itemId) => additionalElements(itemId),
  };

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      additionField={additionField}
      searchParams={searchParams}
      numberOfPage={8}
    >
      <AddProduct />
    </PaginatedTable>
  );
}
