// src/components/SectionHeader.js
import React from 'react';

const SectionHeader = ({ title, subtitle, bgColor }) => {
  return (
    <div className={`container bg-${bgColor}`}>
      <h1 className="display-4 text-center">{title}</h1>
      <p className="lead text-center">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;