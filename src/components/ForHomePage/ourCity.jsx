import React from 'react'
import { FaCity } from 'react-icons/fa'

export default function OurCity() {
  return (
      <section className="services-section">
        <div className="container">
          <h2 className="text-center mb-5">شهر های مورد پوشش ما</h2>
          <div className="row">
            {["اصفهان", "شیراز", "تهران", "رشت"].map((title, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="city-card">
                  <div className="service-icon">
                    <FaCity />
                  </div>
                  <h3>{title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            {["اهواز", "بندرعباس", "بوشهر", "کرمان"].map((title, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="city-card">
                  <div className="service-icon">
                    <FaCity />
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
