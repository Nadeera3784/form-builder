import React from 'react';

const ParagraphElement = ({ element, header, wrapperProps }) => {
  return (
    <div {...wrapperProps}>
      {header}
      <p className="text-gray-700">{element.label || "This is a paragraph text block. You can use this for instructions or additional information."}</p>
    </div>
  );
};

export default ParagraphElement;
