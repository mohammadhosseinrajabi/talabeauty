import React, { useContext, useEffect, useState } from "react";
import PaginatedTable from "../../../../components/admin/paginatedTable";
import Addcategory from "./addcategory";
import axios from "axios";
import { Alert, AlertDetele } from "../../../../utils/alert";
import { ForceRender } from "../../../../context/forceRenderContext";
import { CategoryContext } from "../../../../context/categoryContext";

export default function CategoryTable() {
  const [data, setData] = useState([]);
  // const [forceRender,setForceRender]=useState(0)
  const { forceRender, setForceRender } = useContext(ForceRender);
  const { setEditId } = useContext(CategoryContext);
  const token = localStorage.getItem("token");

  const handleGetStylist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
 
      if (res.status === 200) {
        setData(res.data.categories);
      } else {
        Alert("خطا", res.data.message, "error");
      }
    } catch (err) {
      
      Alert("خطا", "مشکل در ارتباط با سرور", "error");
    }
  };

  useEffect(() => {
    handleGetStylist();
  }, [forceRender]);

  const dataInfo = [
    { field: "_id", title: "#" },
    { field: "name", title: "نام دسته" },
    { field: "description", title: "توضیحات" },
    { field: "isActive", title: "وضعیت" },
  ];

  // const handleEdit = async (id) => {
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:5000/api/categories/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       Alert("موفق", "دسته با موفقیت ویرایش شد", "success");
  //       handleGetStylist();
  //     }
  //   } catch (err) {
  //     console.error("Error editing category:", err);
  //     Alert("خطا", "مشکل در ویرایش دسته", "error");
  //   }
  // };

  const handleDeleteCategory = async (id) => {
    const willDelete = await AlertDetele(
      "آیا مطمئن هستید؟",
      "این عملیات قابل بازگشت نیست!",
      "warning"
    );
    if (willDelete) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/api/categories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          Alert("دسته بندی با موفقیت حذف شد", "success");
          handleGetStylist();
        }
      } catch (error) {
        if (error.response?.status === 400) {
          Alert("خطا", error.response.data.message, "error");
        } else if (error.response?.status === 404) {
          Alert("خطا", "دسته‌بندی یافت نشد", "error");
        } else {
          Alert("خطا", "خطا در حذف دسته‌بندی", "error");
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
          className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
          title="ویرایش دسته"
          data-bs-toggle="modal"
          data-bs-placement="top"
          data-bs-target="#add_product_category_modal"
          onClick={() => {
            if (item && item._id) {
              setEditId(item._id);
              // document.getElementById('add_product_category_modal').classList.add('show');
            }
          }}
        ></i>
        <i
          className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
          title="حذف دسته"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          onClick={() => {
            if (item && item._id) {
              handleDeleteCategory(item._id);
            }
          }}
        ></i>
      </>
    );
  };

  const additionField = {
    title: "عملیات",
    elements: (item) => additionalElements(item),
  };

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از نام دسته را وارد کنید",
    searchField: "name",
  };

  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      additionField={additionField}
      searchParams={searchParams}
      numberOfPage={8}
    >
      <Addcategory
        onSuccess={handleGetStylist}
        setForceRender={setForceRender}
      />
    </PaginatedTable>
  );
}
