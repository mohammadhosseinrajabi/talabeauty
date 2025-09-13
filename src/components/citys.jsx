import React from 'react';

export default function Citys({ city, tagLink, jobs }) {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="city">
        <h3>{city}</h3>
        <p>{jobs}</p>
        <a href="#">{tagLink}</a>
      </div>
    </div>
  );
} 