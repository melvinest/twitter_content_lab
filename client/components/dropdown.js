import React from 'react';

const Dropdown = ({ param, options, handleOptionChange, label, value }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-label">{label}</div>
      <select value={value} onChange={(e) => handleOptionChange(e, param)}>
        {options.map((option) => (<option key={option}>{option}</option>))}
      </select>
    </div>
  );
};

export default Dropdown;