import React, { useContext, useEffect, useState } from "react";
import PaginatedTable from "../../../../components/admin/paginatedTable";
import Addcategory from "./addcategory";
import axios from "axios";
import { Alert } from "../../../../utils/alert";
import { ForceRender } from "../../../../context/forceRenderContext";

export default function CategoryTable() {
  const [data, setData] = useState([]);
  // const [forceRender,setForceRender]=useState(0)
  const {forceRender,setForceRender}=useContext(ForceRender)
  const token = localStorage.getItem('token');


  const handleGetStylist = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log('Response from server:', res.data.categories);
      if (res.status === 200) {
        setData(res.data.categories);
      } else {
        Alert('خطا', res.data.message, 'error');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      Alert('خطا', 'مشکل در ارتباط با سرور', 'error');
    }
  };

  useEffect(() => {
    handleGetStylist();
  }, [forceRender]);

  const dataInfo = [
    // { field: "_id", title: "#" },
    { field: "name", title: "نام دسته" },
    { field: "description", title: "توضیحات" },
    { field: "isActive", title: "وضعیت" }
  ];

  // const handleDelete = async (id) => {
  //   try {
  //     const res = await axios.delete(`http://localhost:5000/api/categories/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     if (res.status === 200) {
  //       Alert('موفق', 'دسته با موفقیت حذف شد', 'success');
  //       handleGetStylist();
  //     }
  //   } catch (err) {
  //     Alert('خطا', 'مشکل در حذف دسته', 'error');
  //   }
  // };



  const additionalElements = (item) => {
    return (
      <>
       <i
          className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
          title="ویرایش دسته"
          data-bs-toggle="modal"
          data-bs-placement="top"
          data-bs-target="#add_product_category_modal"
        ></i>
           <i
          className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
          title="حذف دسته"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
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
    searchField: "name"
  };

  return (
    <PaginatedTable 
      data={data} 
      dataInfo={dataInfo} 
      additionField={additionField} 
      searchParams={searchParams} 
      numberOfPage={8}
    >
   
      <Addcategory onSuccess={handleGetStylist} setForceRender={setForceRender}/>
    </PaginatedTable>
  );
}
