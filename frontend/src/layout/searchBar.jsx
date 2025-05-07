import React from 'react'

export default function SearchBar() {
  return (
    <section className="searchBar">
    <div className="searchBar-text d-flex align-items-center justify-content-center flex-column">
      <h1 className="oneText">نوبت دهی آرایشی</h1>
      <h3 className="twoText">نوبت‌دهی اینترنتی بدون آسان در ایران</h3>

      <div className="col-md-6 mt-1">
        <div className="search-container">
          <input
            type="text"
            className="form-control search-input"
            placeholder="نام ارایشگر، تخصص، نام آرایشگاه و... "
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>
      {/* بخش آمار زیر نوار جستجو */}
      <section className="stats-section">
        <div className="container">
          <div className="row text-center mt-5">
            <div className="col-md-4 col-4 stat-box border-end border-white">
              <h5 className="stat-number">39+</h5>
              <p className="stat-label ">شهر و روستا</p>
            </div>
            <div className="col-md-4 col-4 stat-box border-end border-white">
              <h5 className="stat-number">+1,245</h5>
              <p className="stat-label">شهر و روستا</p>
            </div>
            <div className="col-md-4 col-4 stat-box border-end border-white">
              <h5 className="stat-number">+1,245</h5>
              <p className="stat-label">شهر و روستا</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
  )
}
