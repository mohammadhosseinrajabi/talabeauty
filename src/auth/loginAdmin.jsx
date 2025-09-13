import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./login.css";
import AxiosExclusive from "../components/axiosConfig";
import { Alert } from "../utils/alert";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  password: Yup.string()
    .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
    .required("رمز عبور الزامی است"),
  captcha: Yup.string().required("کد کپچا الزامی است"),
});

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 

  useEffect(() => {
    fetchCaptcha();
  }, []);
  
  useEffect(() => {
    if (error) {
      Alert("خطا", "error", error);
      setError(""); 
    }
  }, [error]);
  
  useEffect(() => {
    if (successMessage) {
      Alert("ورود موفق", "success", successMessage);
      setSuccessMessage(""); 
    }
  }, [successMessage]);

  const fetchCaptcha = async () => {
    try {
      const response = await AxiosExclusive.get("/captcha/generate");
      if (response.data.success) {
        setCaptchaImage(response.data.captchaImage);
        setCaptchaId(response.data.captchaId);
      } else {
        throw new Error("خطا در دریافت کپچا");
      }
    } catch (err) {
      console.error("Error fetching captcha:", err);
      setError("خطا در دریافت کپچا");
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    setError(""); 
    
    try {
      // Step 1: Verify captcha
      const captchaResponse = await AxiosExclusive.post("/captcha/verify", {
        captchaId,
        captchaText: values.captcha,
      });

      if (!captchaResponse.data.success || !captchaResponse.data.isValid) {
        setError("کد کپچا اشتباه است");
        await fetchCaptcha();
        return;
      }

      // Step 2: Attempt admin login
      const loginAdminResponse = await AxiosExclusive.post("/auth/admin/login", {
        email: values.email,
        password: values.password,
      });

 

      
      if (loginAdminResponse.data.token && loginAdminResponse.data.admin) {
    
        localStorage.setItem("token", loginAdminResponse.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: loginAdminResponse.data.admin.id,
            name: loginAdminResponse.data.admin.name,
            email: loginAdminResponse.data.admin.email,
            role: loginAdminResponse.data.admin.role,
          })
        );
        
        setSuccessMessage("ورود با موفقیت انجام شد");
        resetForm();
        
        // Navigate to admin dashboard
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
       
        const errorMessage = loginAdminResponse.data.message || "ورود ناموفق بود";
        setError(errorMessage);
        await fetchCaptcha();
      }

    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error?.response?.data?.message || "خطای ناشناخته در ورود";
      setError(errorMessage);
      await fetchCaptcha();
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container" dir="ltr">
      <div className="login-left">
        <div className="login-text">
          <h1>به پنل مدیریت خوش آمدید</h1>
          <p>برای دسترسی به پنل مدیریت، لطفاً وارد حساب کاربری خود شوید.</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>ورود به پنل ادمین</h2>
            <p>لطفاً اطلاعات خود را وارد کنید</p>
          </div>

          <Formik
            initialValues={{ email: "", password: "", captcha: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="form-group">
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="ایمیل"
                  />
                  {errors.email && touched.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="رمز عبور"
                  />
                  {errors.password && touched.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="captcha-container">
                  <div className="captcha-image">
                    {captchaImage && (
                      <img
                        src={`data:image/svg+xml;base64,${btoa(captchaImage)}`}
                        alt="captcha"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="refresh-button"
                    onClick={fetchCaptcha}
                  >
                    🔄
                  </button>
                </div>

                <div className="form-group">
                  <Field
                    type="text"
                    name="captcha"
                    className="form-control"
                    placeholder="کد کپچا"
                  />
                  {errors.captcha && touched.captcha && (
                    <div className="error-message">{errors.captcha}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? "در حال ورود..." : "ورود به ادمین"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
