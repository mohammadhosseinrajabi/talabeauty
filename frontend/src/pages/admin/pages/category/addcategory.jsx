import React, { useState, useEffect } from "react";
import ModalsContainer from "../../../../components/admin/modalsContainer";
import axios from "axios";
import { Alert } from "../../../../utils/alert";
import { Formik, Form, Field } from "formik";

const initialValues = {
  name: "",
  description: "",
  parent: "",
  image: null,
  is_active: true,
  show_in_menu: true
};

const onSubmit = async (values ,{ resetForm },setForceRender) => {
  // console.log('ssss',actions);
  
  try {
    if (!values.name || values.name.trim() === '') {
      Alert('خطا', 'نام دسته‌بندی الزامی است', 'error');
      return;
    }

    // Create the request body
    // const requestBody = {
    //   name: values.name.trim(),
    //   description: values.description ? values.description.trim() : '',
    //   is_active: values.is_active ? 1 : 0,
    //   show_in_menu: values.show_in_menu ? 1 : 0
    // };

    // // Only add parent if it's a valid ObjectId
    // if (values.parent && values.parent !== "") {
    //   requestBody.parent = values.parent;
    // }

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Log the data being sent
    // console.log('Sending data:', requestBody);

    const res = await axios.post('http://localhost:5000/api/categories', 
     // requestBody
     values
      , {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (res.status === 201) {
      Alert('دسته‌بندی با موفقیت ایجاد شد', 'success');
      setForceRender(last=>last+1)
      resetForm();
    }
  } catch (error) {
    // console.log('Error details:', error.response?.data);
    if (error.response?.status === 401) {
      Alert('خطا', 'لطفا ابتدا وارد حساب کاربری خود شوید', 'error');
    } else if (error.response?.status === 500) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'خطا در ثبت دسته‌بندی';
      Alert('خطا', errorMessage, 'error');
    } else {
      Alert('خطا', 'عملیات با خطا مواجه شد', 'error');
    }
  }
};

export default function Addcategory({setForceRender}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          setCategories(response.data.categories || []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert('خطا', 'خطا در دریافت دسته‌بندی‌ها', 'error');
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>

      <ModalsContainer
        FullScreen={true}
        id="add_product_category_modal"
        title="افزودن دسته‌بندی جدید"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values,actions)=>onSubmit(values,actions,setForceRender)}
        >
          {({ setFieldValue }) => (
            <Form className="container">
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
                    <Field
                      as="select"
                      name="parent"
                      className="form-control"
                    >
                      <option value="">بدون والد</option>
                      {Array.isArray(categories) && categories.map((category) => (
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
                      onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
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
