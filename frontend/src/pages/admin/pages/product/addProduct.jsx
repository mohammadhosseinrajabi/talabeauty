import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ModalsContainer from "../../../../components/admin/modalsContainer";
import axios from "axios";
import { Alert } from "../../../../utils/alert";
import { getCategory } from "../../../../context/getCategoryContext";
import { ProductsContext } from "../../../../context/productsContext";
import { useParams } from "react-router-dom";

// Validation Schema
const ProductSchema = Yup.object().shape({
  category: Yup.string().required("دسته‌بندی الزامی است"),
  name: Yup.string()
    .required("عنوان محصول الزامی است")
    .min(2, "عنوان محصول باید حداقل 2 کاراکتر باشد"),
  price: Yup.number()
    .required("قیمت الزامی است")
    .positive("قیمت باید مثبت باشد"),
  description: Yup.string()
    .required("توضیحات الزامی است")
    .min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
  images: Yup.array().of(Yup.mixed()).required("تصویر الزامی است"),
  stock: Yup.number()
    .required("موجودی الزامی است")
    .integer("موجودی باید عدد صحیح باشد")
    .min(0, "موجودی نمی‌تواند منفی باشد"),
});

export default function AddProduct() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedWarranties, setSelectedWarranties] = useState([]);
  const { categories } = useContext(getCategory);
  const [editProduct, setEditProduct] = useState(null);
  const [reInitialValues, setreInitialValues] = useState();
  const params = useParams();

  const { editID, setEditId } = useContext(ProductsContext);
  const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    stock: "",
  };

const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append("name", values.name.trim());
    formData.append("description", values.description.trim());
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("stock", values.stock);

    // اضافه کردن عکس‌ها
    values.images.forEach((img) => {
      formData.append("images", img);
    });

    if (editID) {
      const res = await axios.put(
        `http://localhost:5000/api/products/${editID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        Alert("محصول با موفقیت ویرایش شد", "success");
        resetForm();
        setEditId(null);
      }
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        Alert("محصول با موفقیت اضافه شد", "success");
        resetForm();
      }
    }
  } catch (error) {
    console.error("Error in handleSubmit:", error);
    console.error("Error details:", error.response?.data);

    if (error.response?.data?.errors) {
      const errorMessages = error.response.data.errors
        .map((err) => err.msg)
        .join("\n");
      Alert("خطا در ثبت محصول", errorMessages, "error");
    } else if (error.response?.data?.message) {
      Alert("خطا در ارسال اطلاعات", error.response.data.message, "error");
    } else {
      Alert("خطا در ارسال اطلاعات", "خطای ناشناخته رخ داد", "error");
    }
  } finally {
    setSubmitting(false);
  }
};


  const handleGetsingleproduct = async () => {
  
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${editID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.status === 200) {
   
        setEditProduct(res.data);
      } else {
   
        setEditProduct(null);
      }
    } catch (error) {
      console.error("Error in handleGetsingleproduct:", error);
      console.error("Error details:", error.response?.data);
      Alert("مشکل دسته بندی مورد نظر یافت نشد", "warning");
    }
  };
  useEffect(() => {

    if (editID) {
      handleGetsingleproduct();
    } else {
    
      setEditProduct(null);
    }
  }, [editID]);

  useEffect(() => {
    if (params.cate) {
      handleGetsingleproduct();
    }
  }, [params.cate]);

 useEffect(() => {
    if (editProduct) {

      const newValues = {
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price || "",
        category: typeof editProduct.category === 'object' ? editProduct.category._id : editProduct.category,
        images: editProduct.images || [],
        stock: editProduct.stock
      };
   
      setreInitialValues(newValues);
    } else {

      setreInitialValues(null);
    }
}, [editProduct]);

// if (editID && !reInitialValues) {
//   return <div className="text-center p-5">در حال بارگذاری اطلاعات محصول...</div>;
// }

  return (
    <ModalsContainer
      FullScreen={true}
      id="add_product_modal"
      title="افزودن محصول جدید"
    >
      
      <Formik
        initialValues={reInitialValues || initialValues}
        enableReinitialize={true}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-2 dir_ltr">
                  <Field
                    as="select"
                    name="category"
                    className={`form-control ${
                      errors.category && touched.category ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">انتخاب دسته محصول</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <span className="input-group-text w_6rem justify-content-center">
                    دسته
                  </span>
                  {errors.category && touched.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group my-3 dir_ltr">
                  <Field
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name && touched.name ? "is-invalid" : ""
                    }`}
                    placeholder="عنوان محصول"
                  />
                  <span className="input-group-text w_6rem justify-content-center">
                    عنوان
                  </span>
                  {errors.name && touched.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3 dir_ltr">
                  <Field
                    type="number"
                    name="price"
                    className={`form-control ${
                      errors.price && touched.price ? "is-invalid" : ""
                    }`}
                    placeholder="قیمت محصول"
                  />
                  <span className="input-group-text w_6rem justify-content-center">
                    قیمت
                  </span>
                  {errors.price && touched.price && (
                    <div className="invalid-feedback">{errors.price}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3 dir_ltr">
                  <Field
                    as="textarea"
                    name="description"
                    className={`form-control ${
                      errors.description && touched.description
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="توضیحات"
                    rows="5"
                  />
                  <span className="input-group-text w_6rem justify-content-center">
                    توضیحات
                  </span>
                  {errors.description && touched.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3 dir_ltr">
                  <input
                    type="file"
                    className={`form-control ${
                      errors.images && touched.images ? "is-invalid" : ""
                    }`}
                    onChange={(event) => {
                      const files = Array.from(event.currentTarget.files);
                      setFieldValue("images", files);
                    }}
                  />
                  <span className="input-group-text w_6rem justify-content-center">
                    تصویر
                  </span>
                  {errors.images && touched.images && (
                    <div className="invalid-feedback">{errors.images}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3 dir_ltr">
                  <Field
                    type="number"
                    name="stock"
                    className={`form-control ${
                      errors.stock && touched.stock ? "is-invalid" : ""
                    }`}
                    placeholder="موجودی"
                  />
                  <span className="input-group-text w_6rem justify-content-center">
                    موجودی
                  </span>
                  {errors.stock && touched.stock && (
                    <div className="invalid-feedback">{errors.stock}</div>
                  )}
                </div>
              </div>
              <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ثبت..." : "ذخیره"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalsContainer>
  );
}
