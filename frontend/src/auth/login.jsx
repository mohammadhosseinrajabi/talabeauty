import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login.css';
import { NavLink } from 'react-router-dom';

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('ایمیل نامعتبر است')
    .required('ایمیل الزامی است'),
  password: Yup.string()
    .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد')
    .required('رمز عبور الزامی است'),
  captcha: Yup.string()
    .required('کد کپچا الزامی است')
});

const Login = () => {
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaId, setCaptchaId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch new captcha on component mount
  useEffect(() => {
    fetchCaptcha();
  }, []);

  // Fetch captcha from backend
  const fetchCaptcha = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/captcha/generate');
      if (response.data.success) {
        setCaptchaImage(response.data.captchaImage);
        setCaptchaId(response.data.captchaId);
        setError('');
      } else {
        throw new Error('خطا در دریافت کپچا');
      }
    } catch (err) {
      setError('خطا در دریافت کپچا');
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');

      // Step 1: Verify captcha
      const captchaResponse = await axios.post('http://localhost:5000/api/captcha/verify', {
        captchaId: captchaId,
        captchaText: values.captcha
      });

      if (!captchaResponse.data.success || !captchaResponse.data.isValid) {
        setError('کد کپچا اشتباه است');
        fetchCaptcha(); // Get new captcha
        return;
      }

      // Step 2: Attempt login
      const loginResponse = await axios.post('http://localhost:5000/api/customers/login', {
        email: values.email,
        password: values.password
      });

      if (loginResponse.data.success) {
        // Store token and user data
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.data.customer));
        
        setSuccessMessage('ورود با موفقیت انجام شد');
        resetForm();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'خطا در ورود به سیستم';
      setError(errorMessage);
      fetchCaptcha(); // Get new captcha on error
    } finally {
      setSubmitting(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" dir='rtl'>
      <div className="login-left">
        <div className="login-text">
          <h1>ورود مشتریان</h1>
          <p>برای دسترسی به امکانات فروشگاه، لطفاً وارد حساب کاربری خود شوید.</p>
          <p>این صفحه مخصوص ورود مشتریان می‌باشد.</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>ورود به حساب کاربری</h2>
            <p>لطفاً اطلاعات خود را وارد کنید</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <Formik
            initialValues={{ email: '', password: '', captcha: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="email">ایمیل</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="example@email.com"
                  />
                  {errors.email && touched.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">رمز عبور</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="رمز عبور خود را وارد کنید"
                  />
                  {errors.password && touched.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="captcha-container">
                  <label>کد امنیتی</label>
                  <div className="captcha-wrapper">
                    <div className="captcha-image">
                      {captchaImage && <img src={`data:image/svg+xml;base64,${btoa(captchaImage)}`} alt="captcha" />}
                    </div>
                    <button
                      type="button"
                      className="refresh-button"
                      onClick={fetchCaptcha}
                      title="تغییر کد امنیتی"
                    >
                      🔄
                    </button>
                  </div>
                  <Field
                    type="text"
                    name="captcha"
                    className="form-control"
                    placeholder="کد امنیتی را وارد کنید"
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
                  {isLoading ? 'در حال ورود...' : 'ورود به حساب کاربری'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="login-links">
            <p>
              حساب کاربری ندارید؟{' '}
              <NavLink to="/customersignup" className="signup-link">
                ثبت نام کنید
              </NavLink>
            </p>
            <NavLink to="/forgot-password" className="forgot-password">
              فراموشی رمز عبور
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;