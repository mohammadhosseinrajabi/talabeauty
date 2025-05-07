import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../../../components/admin/paginatedTable';
import AddProduct from './addProduct';
import axios from 'axios';
import { Alert } from '../../../../utils/alert';

export default function ProducTable() {
  const [data,setdata]=useState([])
  

  const token = localStorage.getItem('token');
  const handleGetProduct = async()=>{
    try{
      const res =await axios.get('http://localhost:5000/api/products',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(res.data.products);
      if (res.status===200) {
        setdata(res.data.products)
      }
      else{
        Alert('خطا در دریافت محصولات','error')
      }
    }
    catch (error){
      // console.log(error);
    }
  }
  useEffect(()=>{
    handleGetProduct();
  },[])
 
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
        <img 
          src={image[0]} 
          alt="product" 
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      )
    }
  ];

  const additionalElements = (itemId) => {
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
          title="ویرایش دسته"
          data-bs-toggle="modal"
          data-bs-placement="top"
          data-bs-target="#add_product_category_modal"
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
        ></i>
      </>
    );
  };
  const additionField ={
    title: "عملیات",
    elements: (itemId) =>additionalElements(itemId),
  }

  const searchParams = {
    title:"جستجو",
    placeholder:"قسمتی از عنوان را وارد کنید",
    searchField : "title"
  }
  return (
    <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField} searchParams={searchParams} numberOfPage={2}>
      <AddProduct/>
    </PaginatedTable>

  )
}
