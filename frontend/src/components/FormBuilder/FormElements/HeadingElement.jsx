import React from 'react';

const HeadingElement = ({ element, header, wrapperProps }) => {
  return (
    <div {...wrapperProps}>
      {header}
      <h2 className="text-xl font-bold text-gray-800">{element.label || "Section Heading"}</h2>
    </div>
  );
};

export default HeadingElement;
