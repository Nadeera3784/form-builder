import React from 'react';

const RangeElement = ({ element, header, wrapperProps }) => {
  return (
    <div {...wrapperProps}>
      {header}
      <label className="block mb-2 text-sm font-medium text-gray-700">{element.label}</label>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">0</span>
        <input
          type="range"
          min="0"
          max="100"
          className="w-full"
          disabled
        />
        <span className="text-sm text-gray-500">100</span>
      </div>
    </div>
  );
};

export default RangeElement;
