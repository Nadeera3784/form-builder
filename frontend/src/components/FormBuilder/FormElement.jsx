import React from 'react';
import { Copy, Trash2 } from 'lucide-react';

// Import individual element components
import TextElement from './FormElements/TextElement';
import TextareaElement from './FormElements/TextareaElement';
import CheckboxElement from './FormElements/CheckboxElement';
import RadioElement from './FormElements/RadioElement';
import DateElement from './FormElements/DateElement';
import NumberElement from './FormElements/NumberElement';
import EmailElement from './FormElements/EmailElement';
import TelElement from './FormElements/TelElement';
import SelectElement from './FormElements/SelectElement';
import RangeElement from './FormElements/RangeElement';
import TimeElement from './FormElements/TimeElement';
import HeadingElement from './FormElements/HeadingElement';
import ParagraphElement from './FormElements/ParagraphElement';

const FormElement = ({ 
  element, 
  isSelected, 
  onClick, 
  onDragStart, 
  onDragEnd, 
  onDuplicate, 
  onDelete 
}) => {
  // Common wrapper with drag handlers for reordering
  const wrapperProps = {
    id: element.id,
    className: `mb-4 p-3 border rounded-md transition-all duration-200 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} cursor-pointer`,
    onClick: onClick,
    draggable: true,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd
  };
  
  // Add move handle and actions
  const elementHeader = (
    <div className="flex justify-between mb-2">
      <div className="flex gap-2 items-center">
        <div className="text-gray-400 cursor-move p-1 hover:bg-gray-100 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="6" r="2"/>
            <circle cx="8" cy="12" r="2"/>
            <circle cx="8" cy="18" r="2"/>
            <circle cx="16" cy="6" r="2"/>
            <circle cx="16" cy="12" r="2"/>
            <circle cx="16" cy="18" r="2"/>
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-800">{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</span>
        {element.required && <span className="text-red-500 text-xs px-2 py-0.5 bg-red-50 rounded-full">Required</span>}
      </div>
      <div className="flex gap-1">
        <button 
          className="p-1 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded"
          onClick={(e) => { e.stopPropagation(); onDuplicate(element.id); }}
          title="Duplicate"
        >
          <Copy size={16} />
        </button>
        <button 
          className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded"
          onClick={(e) => { e.stopPropagation(); onDelete(element.id); }}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );

  // Render the appropriate element based on type
  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return <TextElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'textarea':
        return <TextareaElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'checkbox':
        return <CheckboxElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'radio':
        return <RadioElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'date':
        return <DateElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'number':
        return <NumberElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'email':
        return <EmailElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'tel':
        return <TelElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'select':
        return <SelectElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'range':
        return <RangeElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'time':
        return <TimeElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'heading':
        return <HeadingElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      case 'paragraph':
        return <ParagraphElement element={element} header={elementHeader} wrapperProps={wrapperProps} />;
      default:
        return (
          <div {...wrapperProps}>
            {elementHeader}
            <div className="p-4 bg-gray-100 rounded text-gray-500 text-center">
              Unknown element type: {element.type}
            </div>
          </div>
        );
    }
  };

  return renderElement();
};

export default FormElement;
