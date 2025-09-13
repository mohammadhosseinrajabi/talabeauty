import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AxiosExclusive from '../../components/axiosConfig';
import './singleArticle.css';

const SingleArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await AxiosExclusive.get(`/articles/slug/${slug}`);
      if (response.data.success) {
        setArticle(response.data.article);
        fetchRelatedArticles(response.data.article._id);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('مقاله یافت نشد');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (articleId) => {
    try {
      const response = await AxiosExclusive.get(`/articles/related?articleId=${articleId}&limit=3`);
      if (response.data.success) {
        setRelatedArticles(response.data.articles);
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="article-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-error">
        <div className="container text-center py-5">
          <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
          <h3>مقاله یافت نشد</h3>
          <p className="text-muted mb-4">
            {error || 'مقاله مورد نظر وجود ندارد یا حذف شده است'}
          </p>
          <Link to="/articles" className="btn btn-primary">
            بازگشت به لیست مقالات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="single-article">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="article-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">خانه</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/articles">مقالات</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        <div className="row">
          {/* Main Article Content */}
          <div className="col-lg-8">
            <article className="article-main">
              {/* Article Header */}
              <header className="article-header">
                <div className="article-meta mb-3">
                  <span className="article-category">
                    {article.category?.name}
                  </span>
                  <span className="article-date">
                    <i className="fas fa-calendar-alt me-2"></i>
                    {formatDate(article.publishedAt || article.createdAt)}
                  </span>
                  <span className="article-author">
                    <i className="fas fa-user me-2"></i>
                    {article.author?.name}
                  </span>
                  <span className="article-views">
                    <i className="fas fa-eye me-2"></i>
                    {article.viewCount} بازدید
                  </span>
                </div>

                <h1 className="article-title">{article.title}</h1>
                
                {article.excerpt && (
                  <div className="article-excerpt">
                    {article.excerpt}
                  </div>
                )}
              </header>

              {/* Featured Image */}
              {article.featuredImage && (
                <div className="article-featured-image mb-4">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="img-fluid rounded"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="article-content">
                <div 
                  className="article-text"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              {/* Article Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="article-tags mt-4">
                  <h6>برچسب‌ها:</h6>
                  <div className="tags-list">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Footer */}
              <footer className="article-footer mt-5">
                <div className="article-share">
                  <h6>اشتراک‌گذاری:</h6>
                  <div className="share-buttons">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn facebook"
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn linkedin"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a
                      href={`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn telegram"
                    >
                      <i className="fab fa-telegram"></i>
                    </a>
                  </div>
                </div>
              </footer>
            </article>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <aside className="article-sidebar">
              {/* Author Info */}
              <div className="sidebar-widget author-widget">
                <h5>نویسنده</h5>
                <div className="author-info">
                  <div className="author-avatar">
                    <i className="fas fa-user-circle fa-2x"></i>
                  </div>
                  <div className="author-details">
                    <h6>{article.author?.name}</h6>
                    <p className="text-muted">
                      نویسنده در {article.category?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="sidebar-widget related-articles">
                  <h5>مقالات مرتبط</h5>
                  <div className="related-articles-list">
                    {relatedArticles.map(relatedArticle => (
                      <div key={relatedArticle._id} className="related-article">
                        {relatedArticle.featuredImage && (
                          <div className="related-article-image">
                            <img
                              src={relatedArticle.featuredImage}
                              alt={relatedArticle.title}
                              className="img-fluid"
                            />
                          </div>
                        )}
                        <div className="related-article-content">
                          <h6>
                            <Link to={`/article/${relatedArticle.slug}`}>
                              {relatedArticle.title}
                            </Link>
                          </h6>
                          <p className="text-muted">
                            {truncateText(relatedArticle.excerpt || '', 80)}
                          </p>
                          <small className="text-muted">
                            {formatDate(relatedArticle.publishedAt || relatedArticle.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Info */}
              <div className="sidebar-widget category-widget">
                <h5>دسته‌بندی</h5>
                <div className="category-info">
                  <Link to={`/articles?category=${article.category?._id}`} className="category-link">
                    <i className="fas fa-folder me-2"></i>
                    {article.category?.name}
                  </Link>
                  <p className="text-muted mt-2">
                    مقالات بیشتر در این دسته‌بندی
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;

