import React from 'react';

export default function SearchBar() {
  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="جستجو..."
        />
        <div className="search-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-number">1000+</span>
          <span className="stat-label">آرایشگر</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">آرایشگاه</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">شهر</span>
        </div>
      </div>
    </div>
  );
} 