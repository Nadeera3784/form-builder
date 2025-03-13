import React from 'react';

const DateElement = ({ element, header, wrapperProps }) => {
  return (
    <div {...wrapperProps}>
      {header}
      <label className="block mb-2 text-sm font-medium text-gray-700">{element.label}</label>
      <input
        type="date"
        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        readOnly
      />
    </div>
  );
};

export default DateElement;
