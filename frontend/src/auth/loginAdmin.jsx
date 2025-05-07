import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login.css';
import { NavLink } from 'react-router-dom'

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

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaId, setCaptchaId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCaptcha();
  }, []);

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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/admin/login', {
        email: values.email,
        password: values.password,
        captchaId: captchaId,
        captchaText: values.captcha
      });

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.admin.id,
          name: response.data.admin.name,
          email: response.data.admin.email,
          role: response.data.admin.role
        }));
        alert('ورود با موفقیت انجام شد');
        resetForm();
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'خطا در ورود به سیستم');
      fetchCaptcha(); // در صورت خطا، کپچا جدید دریافت کن
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container" dir='ltr'>
      <div className="login-left">
        <div className="login-text">
          <h1>به پنل مدیریت خوش آمدید</h1>
          <p>برای دسترسی به پنل مدیریت، لطفاً وارد حساب کاربری خود شوید.</p>
          <h4 className=''dir='rtl' style={{backgroundColor:'red'}}>نام کاربری پنل ادمین:admin@example.com</h4>
          <h4 dir='rtl' style={{backgroundColor:'red'}}>و رمز عبور آن:admin123 می باشد</h4>
          <h6>جهت دیدن پنل ادمین</h6>

        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>ورود به پنل ادمین</h2>
            <p>لطفاً اطلاعات خود را وارد کنید</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <Formik
            initialValues={{ email: '', password: '', captcha: '' }}
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
                    {captchaImage && <img src={`data:image/svg+xml;base64,${btoa(captchaImage)}`} alt="captcha" />}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'در حال ورود...' : 'ورود'}
                </button>
              </Form>
            )}
          </Formik>
          <div className="login-link">
            <p>اگر حساب ادمین ندارید، <NavLink to="/signup">ثبت‌نام کنید</NavLink></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;