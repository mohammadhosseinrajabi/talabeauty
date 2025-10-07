import React, { useEffect } from "react";
import NavDesktop from "../../navbar/navDesktop";
import TopMenuMobile from "../../navbar/topMenuMobile";
import Footer from "../../components/ForHomePage/footer";
import { useFilters } from "../../context/FilterContext";
import "./allProducts.css";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    selectedCategories,
    handleCategoryChange,
    handlePriceChange,
    applyFilters,
    clearFilters,
    priceRange,
    currentPriceRange,
    resetFiltersToAll,
  } = useFilters();

  // ریست بشه که همهه ی محصولات رو نشون بده از حالت فیلتر خارج بشه
  useEffect(() => {
    resetFiltersToAll();

  }, []);

  return (
    <>
      <NavDesktop />
      <TopMenuMobile />
      <section className="container my-4" dir="rtl">
        <div className="row g-4">
          <aside className="col-md-3 col-12">
            <div className="card shadow-sm p-4">
              <h5 className="mb-4 fw-bold border-bottom pb-2">فیلترها</h5>

              {/* دسته‌بندی */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">دسته‌بندی</h6>
                <ul className="flex flex-col gap-2 list-unstyled">
                  {categories.map((category) => {
                    const catId = String(category._id);
                    return (
                      <li key={catId} className="mb-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`check-${catId}`}
                            className="form-check-input"
                            checked={selectedCategories.includes(catId)}
                            onChange={() => handleCategoryChange(catId)}
                          />
                          <label
                            htmlFor={`check-${catId}`}
                            className="form-check-label cursor-pointer me-3"
                          >
                            {category.name}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* قیمت */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">قیمت</h6>
                <input
                  type="range"
                  className="form-range"
                  min={priceRange[0]}
                  max={priceRange[1]}
                  step="10000"
                  value={currentPriceRange[1]}
                  onChange={handlePriceChange}
                  aria-label="فیلتر قیمت"
                  disabled={priceRange[0] === priceRange[1]}
                />
                <div className="d-flex justify-content-between text-muted small mt-2">
                  <span>{priceRange[0].toLocaleString("fa-IR")}</span>
                  <span>{currentPriceRange[1].toLocaleString("fa-IR")}</span>
                </div>
                <div className="text-center mt-2">
                  <small className="text-primary">
                    تا {currentPriceRange[1].toLocaleString("fa-IR")} تومان
                  </small>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-success rounded-pill" onClick={applyFilters}>
                  اعمال فیلتر
                </button>
                <button
                  className="btn btn-outline-secondary rounded-pill"
                  onClick={clearFilters}
                >
                  پاک کردن فیلترها
                </button>
              </div>
            </div>
          </aside>

          <div className="col-md-9 col-12">
            <div className="card shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">محصولات</h4>
                <span className="text-muted">
                  {filteredProducts.length} از {products.length} محصول
                </span>
              </div>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="alert alert-info" role="alert">
                  محصولی یافت نشد.
                </div>
              ) : (
                <div className="row g-4">
                  {filteredProducts.map((product) => (
                    <article key={product._id} className="col-lg-4 col-md-6 col-12">
                      <div className="card h-100 border-0 shadow-sm overflow-hidden">
                        <Link to={`/ProductPage/${product._id}`}>
                          <img
                            src={
                              product.images?.length > 0
                                ? `http://localhost:5000${product.images[0]}`
                                : "/images/img-01.png"
                            }
                            alt={product.name}
                            className="card-img-top stylist-image"
                            loading="lazy"
                          />
                        </Link>
                        <div className="card-body text-center">
                          <h6 className="card-title fw-bold">
                            <Link to={`/ProductPage/${product._id}`} className="linkProductName">
                              {product.name}
                            </Link>
                          </h6>
                          <p className="text-muted mb-3">
                            {Number(product.price).toLocaleString("fa-IR")} تومان
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllProducts;
