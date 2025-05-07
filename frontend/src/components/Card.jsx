import React from 'react';

export default function Card() {
  return (
    <div className="card-container">
      <div className="row">
        <div className="col-md-4">
          <div className="boxStylist">
            <div className="picStylist">
              <div className="placeholder-image">خدمات آرایشی</div>
            </div>
            <div className="service-text">
              <h3>خدمات آرایشی</h3>
              <p>انواع خدمات آرایشی و زیبایی</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="boxStylist">
            <div className="picStylist">
              <div className="placeholder-image">خدمات مو</div>
            </div>
            <div className="service-text">
              <h3>خدمات مو</h3>
              <p>انواع خدمات مربوط به مو</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="boxStylist">
            <div className="picStylist">
              <div className="placeholder-image">خدمات ناخن</div>
            </div>
            <div className="service-text">
              <h3>خدمات ناخن</h3>
              <p>انواع خدمات مربوط به ناخن</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 