import React from 'react';

const CheckboxElement = ({ element, header, wrapperProps }) => {
  return (
    <div {...wrapperProps}>
      {header}
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`checkbox-${element.id}`}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          disabled
        />
        <label 
          htmlFor={`checkbox-${element.id}`} 
          className="ml-2 text-sm font-medium text-gray-700"
        >
          {element.label}
        </label>
      </div>
    </div>
  );
};

export default CheckboxElement;
