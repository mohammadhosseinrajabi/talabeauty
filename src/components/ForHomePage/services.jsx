import React from 'react'
import { FaCut } from 'react-icons/fa'

export default function Services() {
  return (
    <section className="services-section">
        <div className="container">
          <h2 className="text-center mb-5">خدمات ما</h2>
          <div className="row">
            {["آرایش مو", "آرایش صورت", "ناخن", "میکاپ"].map((title, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="service-card">
                  <div className="service-icon">
                    <FaCut />
                    <FaCut />
                    <FaCut />
                    <FaCut />
                  </div>
                  <h3>{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
