import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../../../components/admin/paginatedTable';
import AddProduct from './addProduct';
import axios from 'axios';
import { Alert } from '../../../../utils/alert';

export default function ProducTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  
  const handleGetProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (res.status === 200) {
        setData(res.data.products);
      } else {
        Alert('خطا در دریافت محصولات', 'error');
      }
    } catch (error) {
      // console.log(error);
      Alert('خطا در ارتباط با سرور', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetProduct();
  }, []);

  const dataInfo = [
    { field: "_id", title: "#" },
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

  const handleDelete = async (productId) => {
    if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 200) {
          Alert('محصول با موفقیت حذف شد', 'success');
          handleGetProduct(); // بروزرسانی لیست
        }
      } catch (error) {
        // console.log(error);
        Alert('خطا در حذف محصول', 'error');
      }
    }
  };

  const handleEdit = (productId) => {
    // TODO: پیاده‌سازی ویرایش محصول
    // console.log("Edit product:", productId); 
  };

  const additionalElements = (itemId) => {
    return (
      <>
        <i
          className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
          title="ویرایش محصول"
          data-bs-toggle="modal"
          data-bs-placement="top"
          data-bs-target="#add_product_modal"
          onClick={() => handleEdit(itemId)}
        ></i>
        <i
          className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
          title="حذف محصول"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          onClick={() => handleDelete(itemId)}
        ></i>
      </>
    );
  };

  const additionField = {
    title: "عملیات",
    elements: (itemId) => additionalElements(itemId),
  }

  const searchParams = {
    title: "جستجو",
    placeholder: "نام محصول را وارد کنید",
    searchField: "name"
  }

  return (
    <>
      {loading ? (
        <div className="text-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <PaginatedTable 
          data={data} 
          dataInfo={dataInfo} 
          additionField={additionField} 
          searchParams={searchParams}
          numberOfPage={8}
        >
          <AddProduct onAdd={handleGetProduct} />
        </PaginatedTable>
      )}
    </>
  )
}