import React from 'react'

export default function Card() {
  return (
    <div className="row justify-content-center">
    {/* کارت ۱ */}
    <div className="col-6 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className="boxStylist">
        <img
          src="/auth/images/arayesh.jpg"
          alt="خدمات آرایشگری"
          className="picStylist"
        />
        <p className="service-text">خدمات آرایشگری</p>
      </div>
    </div>

    {/* کارت ۲ */}
    <div className="col-6 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className="boxStylist">
        <img
          src="/auth/images/arayesh.jpg"
          alt="نوبت دهی  سالن"
          className="picStylist"
        />
        <p className="service-text">نوبت دهی سالن</p>
      </div>
    </div>

    {/* کارت ۳ */}
    <div className="col-6 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className="boxStylist">
        <img
          src="/auth/images/arayesh.jpg"
          alt="سالن خالی"
          className="picStylist"
        />
        <p className="service-text">سالن خالی</p>
      </div>
    </div>

    {/* کارت ۴ */}
    <div className="col-6 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className="boxStylist">
        <img
          src="/auth/images/arayesh.jpg"
          alt="نوبت‌دهی تتو"
          className="picStylist"
        />
        <p className="service-text">نوبت دهی تتو</p>
      </div>
    </div>
  </div>
  )
}
