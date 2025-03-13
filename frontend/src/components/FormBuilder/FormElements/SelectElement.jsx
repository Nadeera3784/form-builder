import React from 'react';

const SelectElement = ({ element, header, wrapperProps }) => {
  return (
    <div {...wrapperProps}>
      {header}
      <label className="block mb-2 text-sm font-medium text-gray-700">{element.label}</label>
      <select 
        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
        disabled
      >
        <option value="" disabled>Select an option</option>
        {element.options && element.options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      {(!element.options || element.options.length === 0) && (
        <div className="mt-1 text-sm text-gray-500 italic">No options defined</div>
      )}
    </div>
  );
};

export default SelectElement;
