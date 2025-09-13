import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function HeroTitle() {
  return (
  <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">فروشگاه آنلاین و رزور نوبت آرایشگاه طلا</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="جستجوی آرایشگر یا سالن آرایش..."
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </section>
  )
}
