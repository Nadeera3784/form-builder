import React from 'react';
import FormElement from './FormElement';

const FormCanvas = ({ 
  formElements, 
  selectedElement, 
  setSelectedElement, 
  handleDrop, 
  handleDragOver, 
  handleDragLeave, 
  handleDragStart, 
  handleDragEnd, 
  duplicateElement, 
  deleteElement,
  showTemplates
}) => {
  return (
    <div 
      className="flex-1 p-6 bg-white overflow-y-auto relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {formElements.map(element => (
        <FormElement 
          key={element.id}
          element={element}
          isSelected={selectedElement === element.id}
          onClick={() => setSelectedElement(element.id)}
          onDragStart={(e) => handleDragStart(element.type, false, element.id)}
          onDragEnd={handleDragEnd}
          onDuplicate={duplicateElement}
          onDelete={deleteElement}
        />
      ))}
      
      {formElements.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 p-8 border-2 border-dashed border-gray-200 rounded-lg">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div className="text-center">
            <p className="mb-1 font-medium">Your form is empty</p>
            <p className="text-sm">Drag and drop elements from the library to build your form</p>
          </div>
          <button 
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
            onClick={showTemplates}
          >
            Choose a Template
          </button>
        </div>
      )}
      
      {/* Drop indicator */}
      <div id="drop-indicator" className="hidden h-0.5 w-full bg-indigo-500 absolute left-0 transition-all duration-200 z-10"></div>
    </div>
  );
};

export default FormCanvas;
