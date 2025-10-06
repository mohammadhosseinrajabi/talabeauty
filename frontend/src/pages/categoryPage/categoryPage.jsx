import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFilters } from "../../context/FilterContext";
import NavDesktop from "../../navbar/navDesktop";
import TopMenuMobile from "../../navbar/topMenuMobile";
import Footer from "../../components/ForHomePage/footer";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const {
    loading,
    error,
    products,
    filteredProducts,
    priceRange,
    currentPriceRange,
    handlePriceChange,
    applyFilters,
    clearFilters,
    setActiveCategoryId,
    resetFiltersToAll,
  } = useFilters();

  // ورود: ست دستهٔ فعال / خروج: ریست کامل
  useEffect(() => {
    setActiveCategoryId(categoryId);
    return () => {
      resetFiltersToAll();
    };
  }, [categoryId, setActiveCategoryId, resetFiltersToAll]);

  return (
    <>
      <NavDesktop />
      <TopMenuMobile />

      <section className="container my-4" dir="rtl">
        <div className="row g-4">
          <aside className="col-md-3 col-12">
            <div className="card shadow-sm p-4">
              <h5 className="mb-4 fw-bold border-bottom pb-2">فیلترها</h5>

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
                <button type="button" className="btn btn-success rounded-pill" onClick={applyFilters}>
                  اعمال فیلتر
                </button>
                <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={clearFilters}>
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
                <div className="text-center py-5">
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
                  محصولی مطابق فیلترها یافت نشد.
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
                            <Link to={`/ProductPage/${product._id}`} className="linkProductName text-decoration-none">
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
}
