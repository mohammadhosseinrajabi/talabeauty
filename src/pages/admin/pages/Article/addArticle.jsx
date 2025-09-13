import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AxiosExclusive from '../../../../../components/axiosConfig';
import { Alert } from '../../../../../utils/alert';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('عنوان مقاله الزامی است')
    .min(10, 'عنوان باید حداقل 10 کاراکتر باشد'),
  content: Yup.string()
    .required('محتوای مقاله الزامی است')
    .min(50, 'محتوای مقاله باید حداقل 50 کاراکتر باشد'),
  category: Yup.string()
    .required('انتخاب دسته‌بندی الزامی است')
});

const AddArticle = ({ onSuccess, setForceRender, editData, setEditData }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await AxiosExclusive.get('/categories');
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true);
      const response = await AxiosExclusive.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setImagePreview(response.data.imageUrl);
      }
    } catch (error) {
      Alert('خطا', 'error', 'خطا در آپلود تصویر');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setIsLoading(true);

      const articleData = {
        ...values,
        featuredImage: imagePreview,
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
        status: values.status || 'draft'
      };

      let response;
      if (editData) {
        response = await AxiosExclusive.put(`/articles/${editData._id}`, articleData);
      } else {
        response = await AxiosExclusive.post('/articles', articleData);
      }

      if (response.data.success) {
        Alert('موفق', 'success', response.data.message);
        if (onSuccess) onSuccess();
        resetForm();
        setImagePreview('');
        setEditData(null);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'خطا در ذخیره مقاله';
      Alert('خطا', 'error', errorMessage);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  const initialValues = editData ? {
    title: editData.title || '',
    content: editData.content || '',
    excerpt: editData.excerpt || '',
    category: editData.category?._id || '',
    tags: editData.tags ? editData.tags.join(', ') : '',
    status: editData.status || 'draft'
  } : {
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'draft'
  };

  return (
    <div className="modal fade" id="add_article_modal" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editData ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, errors, touched, values }) => (
              <Form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">عنوان مقاله *</label>
                        <Field
                          type="text"
                          name="title"
                          className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
                          placeholder="عنوان مقاله را وارد کنید"
                        />
                        {errors.title && touched.title && (
                          <div className="invalid-feedback">{errors.title}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">دسته‌بندی *</label>
                        <Field
                          as="select"
                          name="category"
                          className={`form-select ${errors.category && touched.category ? 'is-invalid' : ''}`}
                        >
                          <option value="">انتخاب کنید</option>
                          {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                          ))}
                        </Field>
                        {errors.category && touched.category && (
                          <div className="invalid-feedback">{errors.category}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="excerpt" className="form-label">خلاصه مقاله</label>
                        <Field
                          as="textarea"
                          name="excerpt"
                          rows="3"
                          className="form-control"
                          placeholder="خلاصه کوتاهی از مقاله"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="content" className="form-label">محتوای مقاله *</label>
                        <Field
                          as="textarea"
                          name="content"
                          rows="10"
                          className={`form-control ${errors.content && touched.content ? 'is-invalid' : ''}`}
                          placeholder="محتوای کامل مقاله را وارد کنید"
                        />
                        {errors.content && touched.content && (
                          <div className="invalid-feedback">{errors.content}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="tags" className="form-label">برچسب‌ها</label>
                        <Field
                          type="text"
                          name="tags"
                          className="form-control"
                          placeholder="برچسب‌ها را با کاما جدا کنید"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">وضعیت</label>
                        <Field
                          as="select"
                          name="status"
                          className="form-select"
                        >
                          <option value="draft">پیش‌نویس</option>
                          <option value="published">منتشر شده</option>
                          <option value="archived">آرشیو شده</option>
                        </Field>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="featuredImage" className="form-label">تصویر شاخص</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isLoading}
                        />
                        {imagePreview && (
                          <div className="mt-2">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="img-thumbnail"
                              style={{ maxHeight: '100px' }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading ? 'در حال ذخیره...' : (editData ? 'ویرایش مقاله' : 'افزودن مقاله')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
