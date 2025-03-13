import React from 'react';

const RadioElement = ({ element, header, wrapperProps }) => {
  return (
    <div {...wrapperProps}>
      {header}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">{element.label}</legend>
        <div className="space-y-2">
          {element.options && element.options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`radio-${element.id}-${index}`}
                name={`radio-${element.id}`}
                value={option.value}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                disabled
              />
              <label 
                htmlFor={`radio-${element.id}-${index}`} 
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
          {(!element.options || element.options.length === 0) && (
            <div className="text-sm text-gray-500 italic">No options defined</div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default RadioElement;
