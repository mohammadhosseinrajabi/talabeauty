import React, { useState, useEffect, useContext } from "react";
import ModalsContainer from "../../../../components/admin/modalsContainer";
import axios from "axios";
import { Alert } from "../../../../utils/alert";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import { StylistContext } from "../../../../context/stylistContext";

const initialValues = {
  name: "",
  specialty: "",
  rating: "",
  appointments: "",
  image: "",
};

export default function AddStylist({ setForceRender }) {
  const [stylists, setStylist] = useState([]);
  const { editID, setEditId } = useContext(StylistContext);
  const params = useParams();
  const [reInitialValues, setreInitialValues] = useState();
  const [editStylist, setEditStylist] = useState(null);

  const onSubmit = async (values, { resetForm }, setForceRender, edit) => {
    try {
      if (!values.name || values.name.trim() === "") {
        Alert("خطا", "نام آرایشگر الزامی است", "error");
        return;
      }

      if (!values.specialty || values.specialty.trim() === "") {
        Alert("خطا", "تخصص آرایشگر الزامی است", "error");
        return;
      }

      // Remove parent field if it's empty string فیلد های خالی رو ریمو کن اگ خالی بووود
      const dataToSend = { ...values };
      if (dataToSend.parent === "") {
        delete dataToSend.parent;
      }

      // فیلدهای عددی اگر خالی بودند حذف شوند یا مقدار پیش‌فرض بگیرند
      if (dataToSend.rating === "" || dataToSend.rating === undefined) {
        delete dataToSend.rating;
      }
      if (dataToSend.appointments === "" || dataToSend.appointments === undefined) {
        delete dataToSend.appointments;
      }
      // فقط فیلدهای مجاز را ارسال کن
      delete dataToSend.is_active;
      delete dataToSend.show_in_menu;
      delete dataToSend.description;

      const token = localStorage.getItem("token");

      let formData = null;
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      if (dataToSend.image && typeof dataToSend.image !== "string") {
        // If image is a File, use FormData
        formData = new FormData();
        Object.keys(dataToSend).forEach((key) => {
          if (dataToSend[key] !== undefined && dataToSend[key] !== null) {
            formData.append(key, dataToSend[key]);
          }
        });
      }

      if (edit) {
        const res = await axios.put(
          `http://localhost:5000/api/stylists/${edit}`,
          formData || dataToSend,
          {
            headers: formData ? headers : { ...headers, "Content-Type": "application/json" },
          }
        );
        if (res.status === 200) {
          Alert("آرایشگر با موفقیت ویرایش شد", "success");
          setForceRender((last) => last + 1);
          resetForm();
          setEditId(null);
        }
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/stylists",
          formData || dataToSend,
          {
            headers: formData ? headers : { ...headers, "Content-Type": "application/json" },
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
          "خطا در ثبت آرایشگر";
        Alert("خطا", errorMessage, "error");
      } else {
        Alert("خطا", "عملیات با خطا مواجه شد", "error");
      }
    }
  };

  useEffect(() => {
    //دریافت دسته بندی کلی
    const fetchstylist = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/stylists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setStylist(response.data.stylists || []);
        } else {
          setStylist([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        Alert("خطا", "خطا در دریافت آرایشگر", "error");
        setStylist([]);
      }
    };

    fetchstylist();
  }, []);

  const handleGetSingleStylist = async () => {
    // دریافت آرایشگر تکی برای ویرایش
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/stylists/${editID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setEditStylist(res.data.stylists);
      } else {
        setEditStylist(null);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      Alert("مشکل ارایشگر مورد نظر یافت نشد", "warning");
    }
  };
  useEffect(() => {
    if (editID) {
 
      handleGetSingleStylist();
    } else setEditStylist(null);
  }, [editID]);

  useEffect(() => {
    if (params.cate) {
      handleGetSingleStylist();
    }
  }, [params.cate]);

  useEffect(() => {
    if (editStylist) {
    
      setreInitialValues({
        name: editStylist.name,
        specialty: editStylist.specialty,
        rating: editStylist.rating,
        appointments: editStylist.appointments,
        image: editStylist.image,
      });
    } else {

      setreInitialValues(null);
    }
  }, [editStylist]);

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
            ? "ویرایش دسته‌بندی:  " + (editStylist ? editStylist.name : "")
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
                      placeholder="نام آرایشگر"
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
                      type="text"
                      name="specialty"
                      className="form-control"
                      placeholder="تخصص آرایشگر"
                      required
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      تخصص
                    </span>
                  </div>
                </div>


                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                      placeholder="توضیحات آرایشگر"
                      rows="5"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      توضیحات
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <Field
                      type="number"
                      name="rating"
                      className="form-control"
                      placeholder="امتیاز آرایشگر"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      امتیاز
                    </span>
                  </div>
                </div>
                
                   <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <Field
                      type="number"
                      name="appointments"
                      className="form-control"
                      placeholder="نوبت خالی"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      نوبت
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
