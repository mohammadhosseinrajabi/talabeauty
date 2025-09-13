import React, { useState, useEffect, useContext } from "react";
import ModalsContainer from "../../../../components/admin/modalsContainer";
import axios from "axios";
import { Alert } from "../../../../utils/alert";
import { Formik, Form, Field } from "formik";
import { CategoryContext } from "../../../../context/categoryContext";
import { useParams } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  parent: "",
  image: null,
  is_active: true,
  show_in_menu: true,
};

export default function Addcategory({ setForceRender }) {
  const [categories, setCategories] = useState([]);
  const { editID, setEditId } = useContext(CategoryContext);
  const params = useParams();
  const [reInitialValues, setreInitialValues] = useState();
  const [editCategory, setEditCategory] = useState(null);

  const onSubmit = async (values, { resetForm }, setForceRender, edit) => {
    try {
      if (!values.name || values.name.trim() === "") {
        Alert("خطا", "نام دسته‌بندی الزامی است", "error");
        return;
      }

      // Remove parent field if it's empty string فیلد های خالی رو ریمو کن اگ خالی بووود
      const dataToSend = { ...values };
      if (dataToSend.parent === "") {
        delete dataToSend.parent;
      }

      const token = localStorage.getItem("token");

      if (edit) {
        const res = await axios.put(
          `http://localhost:5000/api/categories/${edit}`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          Alert("دسته‌بندی با موفقیت ویرایش شد", "success");
          setForceRender((last) => last + 1);
          resetForm();
          setEditId(null);
        }
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/categories",
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 201) {
          Alert("دسته‌بندی با موفقیت ایجاد شد", "success");
          setForceRender((last) => last + 1);
          resetForm();
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        Alert("خطا", "لطفا ابتدا وارد حساب کاربری خود شوید", "error");
      } else if (error.response?.status === 500) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "خطا در ثبت دسته‌بندی";
        Alert("خطا", errorMessage, "error");
      } else {
        Alert("خطا", "عملیات با خطا مواجه شد", "error");
      }
    }
  };

  useEffect(() => {
    //دریافت دسته بندی کلی
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setCategories(response.data.categories || []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        Alert("خطا", "خطا در دریافت دسته‌بندی‌ها", "error");
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleGetSingleCategory = async () => {
    // دریافت دسته بندی تکی برای ویرایش
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/categories/${editID}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
    
      if (res.status === 200) {
        setEditCategory(res.data.category);
      } else {
        setEditCategory(null);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      Alert("مشکل دسته بندی مورد نظر یافت نشد", "warning");
    }
  };
  useEffect(() => {
    if (editID) {
    
      handleGetSingleCategory();
    } else setEditCategory(null);
  }, [editID]);

  useEffect(() => {
    if (params.cate) {
      handleGetSingleCategory();
    }
  }, [params.cate]);

  useEffect(() => {
    if (editCategory) {
      setreInitialValues({
        name: editCategory.name,
        description: editCategory.description,
        parent: editCategory.parent || "",
        image: editCategory.image,
        is_active: editCategory.is_active,
        show_in_menu: editCategory.show_in_menu,
      });
    } else {
      setreInitialValues(null);
    }
  }, [editCategory]);

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
        onClick={() => {
       
          setEditId(null);
        }}
      >
        <i className="fas fa-plus text-light"></i>
      </button>

      <ModalsContainer
        FullScreen={true}
        id="add_product_category_modal"
        title={
          editID
            ? "ویرایش دسته‌بندی:  " + (editCategory ? editCategory.name : "")
            : "افزودن دسته‌بندی جدید"
        }
      >
        <Formik
          enableReinitialize
          initialValues={reInitialValues || initialValues}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, setForceRender, editID)
          }
        >
          {({ setFieldValue }) => (
            <Form className="container">
              {/* {editID} */}
              <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="نام دسته‌بندی"
                      required
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      نام
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <Field as="select" name="parent" className="form-control">
                      <option value="">بدون والد</option>
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                    </Field>
                    <span className="input-group-text w_6rem justify-content-center">
                      دسته والد
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                      placeholder="توضیحات دسته‌بندی"
                      rows="5"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      توضیحات
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(event) =>
                        setFieldValue("image", event.currentTarget.files[0])
                      }
                      accept="image/*"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      تصویر
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                  <div className="form-check form-switch col-5 col-md-2">
                    <Field
                      className="form-check-input pointer"
                      type="checkbox"
                      name="is_active"
                    />
                    <label className="form-check-label pointer">
                      وضعیت فعال
                    </label>
                  </div>
                  <div className="form-check form-switch col-5 col-md-2">
                    <Field
                      className="form-check-input pointer"
                      type="checkbox"
                      name="show_in_menu"
                    />
                    <label className="form-check-label pointer">
                      نمایش در منو
                    </label>
                  </div>
                </div>

                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <button type="submit" className="btn btn-primary">
                    ذخیره
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </ModalsContainer>
    </>
  );
}
