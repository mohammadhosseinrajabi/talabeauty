import React from 'react';

export default function SeemoreLine({ title, linkText }) {
  return (
    <div className="container d-flex justify-content-between align-items-center mt-5">
      <h2 className="oneText">{title}</h2>
      <a href="#" className="twoText">{linkText}</a>
    </div>
  );
} 