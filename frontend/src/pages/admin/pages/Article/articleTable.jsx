import React, { useEffect, useState } from "react";
import PaginatedTable from "../../../../components/admin/paginatedTable";

import AxiosExclusive from "../../../../components/axiosConfig";
import { Alert } from "../../../../utils/alert";

export default function ArticleTable() {
  const [data, setData] = useState([]);

  const dataInfo = [
    { field: "_id", title: "#" },
    { field: "title", title: "عنوان مقاله" },
    { field: "category", title: "دسته‌بندی" },
    { field: "status", title: "وضعیت" },
    { field: "createdAt", title: "تاریخ ایجاد" },
  ];

   const token = localStorage.getItem("token");
  const getAllArticle = async () => {
    try {
      const res = await AxiosExclusive.get("/articles",{
           headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setData(res.data);
        console.log("data article:", res.data);
      } else {
        Alert("خطا", "دریافت اطلاعات با خطا مواجه شد");
      }
    } catch (err) {
      Alert("خطا", "مشکل در ارتباط با سرور", "error");
    }
  };

  useEffect(() => {
    getAllArticle();
  }, []);

  const additionalElements = (item) => {
    return (
      <>
        <i
          className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
          title="ویرایش مقاله"
          data-bs-toggle="modal"
          data-bs-placement="top"
          data-bs-target="#add_article_modal"
          //   onClick={() => {
          //     if (item && item._id) {
          //       setEditId(item._id);

          //     }
          //   }}
        ></i>
        <i
          className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
          title="حذف مقاله"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          //   onClick={() => {
          //       if (item && item._id) {
          //         handleDeleteArticle(item._id);
          //       }
          //     }
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
    placeholder: "قسمتی از عنوان مقاله را وارد کنید",
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
      {/* <AddArticle
        onSuccess={getAllArticle}
        setForceRender={setForceRender}
      /> */}
    </PaginatedTable>
  );
}
