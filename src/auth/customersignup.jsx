import { Form, Formik } from "formik";
import React from "react";

import FormikControl from "../components/formikElements/formikControl";
import LightLoading from "../components/spinner/lightLoading";
import axios from "axios";
import * as Yup from 'yup';
import './signup.css';
import { Alert } from "../utils/alert";
import { useNavigate } from "react-router-dom";
import AxiosExclusive from "../components/axiosConfig";


export default function CustomerSignup() {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "male",
    address: {
      province: "",
      city: "",
      street: "",
      postalCode: ""
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("نام الزامی است")
      .min(2, "نام باید حداقل 2 کاراکتر باشد"),
    lastName: Yup.string()
      .required("نام خانوادگی الزامی است")
      .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد"),
    email: Yup.string()
      .required("ایمیل الزامی است")
      .email("فرمت ایمیل نامعتبر است"),
    password: Yup.string()
      .required("رمز عبور الزامی است")
      .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
    phoneNumber: Yup.string()
      .required("شماره تلفن الزامی است")
      .matches(/^[0-9]{11}$/, "شماره تلفن باید 11 رقم باشد"),
    gender: Yup.string()
      .required("جنسیت الزامی است")
      .oneOf(['male', 'female'], "جنسیت نامعتبر است"),
    address: Yup.object().shape({
      province: Yup.string().required("استان الزامی است"),
      city: Yup.string().required("شهر الزامی است"),
      street: Yup.string().required("خیابان الزامی است"),
      postalCode: Yup.string().required("کد پستی الزامی است")
    })
  });

  const onSubmit = (values, { setSubmitting }) => {
    AxiosExclusive.post('/customers/signup', values)
      .then((res) => {
        setTimeout(() => {
          Alert("ثبت نام شما با موفقیت انجام شد","success");
          localStorage.setItem("token", res.data.token);
          navigate("/home")
        }, 3000);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message || 'خطایی رخ داده است');
        } else {
          alert('خطای شبکه یا سرور');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <div className="signup-page" >
      <div className="signup-image-section">
        <img src="/auth/images/signupImage.png" alt="تصویر ثبت نام" className="signup-image" />
        <div className="image-overlay">
          <h1>به خانواده ما خوش آمدید</h1>
          <p>با ثبت نام در سایت ما از خدمات حرفه‌ای آرایشگری بهره‌مند شوید</p>
          <p>هم اکنون ثبت نام کنید و از تخفیف‌های ویژه ما بهره‌مند شوید</p>
        </div>
      </div>

      <div className="signup-form-section">
        <div className="signup-container">
          <div className="signup-header">
            <h2>ثبت نام در آرایشگاه آنلاین</h2>
            <p>برای استفاده از خدمات ما، لطفاً فرم زیر را تکمیل کنید</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="signup-form">
                <div className="form-grid">
                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="text"
                      label="نام شما"
                      name="firstName"
                      className="form-input"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="text"
                      label="نام خانوادگی"
                      name="lastName"
                      className="form-input"
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                  </div>

                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="email"
                      label="ایمیل"
                      name="email"
                      className="form-input"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="password"
                      label="رمز عبور"
                      name="password"
                      className="form-input"
                      placeholder="حداقل 6 کاراکتر"
                    />
                  </div>

                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="tel"
                      label="شماره تلفن"
                      name="phoneNumber"
                      className="form-input"
                      placeholder="09xxxxxxxxx"
                    />
                  </div>
                  <div className="form-group">
                    <FormikControl
                      control="select"
                      label="جنسیت"
                      name="gender"
                      options={[
                        { value: 'male', label: 'آقا' },
                        { value: 'female', label: 'خانم' }
                      ]}
                      className="form-select"
                    />
                  </div>

                  <div className="form-group full-width">
                    <h3 className="address-title">اطلاعات آدرس</h3>
                  </div>
                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="text"
                      label="استان"
                      name="address.province"
                      className="form-input"
                      placeholder="استان محل سکونت"
                    />
                  </div>
                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="text"
                      label="شهرشما"
                      name="address.city"
                      className="form-input"
                      placeholder="شهر محل سکونت"
                    />
                  </div>
                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="text"
                      label="خیابان"
                      name="address.street"
                      className="form-input"
                      placeholder="نام خیابان"
                    />
                  </div>
                  <div className="form-group">
                    <FormikControl
                      control="input"
                      type="text"
                      label="کد پستی"
                      name="address.postalCode"
                      className="form-input"
                      placeholder="کد پستی 10 رقمی"
                    />
                  </div>

                  <div className="form-group full-width">
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <LightLoading />
                      ) : (
                        <>
                          <span>ثبت نام</span>
                          <i className="fas fa-user-plus"></i>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <div className="login-link">
            <p>قبلاً ثبت‌نام کرده‌اید؟ <a href="/login">وارد شوید</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
