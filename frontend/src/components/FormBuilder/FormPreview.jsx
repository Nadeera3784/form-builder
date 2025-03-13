import React from 'react';
import { Eye, X } from 'lucide-react';

const FormPreview = ({ formName, formDescription, formElements, closePreview }) => {
  // Styles for preview elements
  const elementClasses = {
    wrapper: "mb-5",
    label: "block mb-2 text-sm font-medium text-gray-700",
    input: "w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200",
    requiredMark: "text-red-500 ml-1",
    select: "w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 bg-white",
    checkbox: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
    radio: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500",
    submitButton: "px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
  };

  // Render a form element for preview (without edit controls)
  const renderPreviewElement = (element) => {
    switch (element.type) {
      case 'text':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <input
              type="text"
              placeholder={element.placeholder}
              className={elementClasses.input}
              required={element.required}
            />
          </div>
        );
      case 'textarea':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              className={`${elementClasses.input} h-24`}
              required={element.required}
            />
          </div>
        );
      case 'checkbox':
        return (
          <div className={elementClasses.wrapper}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`preview-${element.id}`}
                className={elementClasses.checkbox}
                required={element.required}
              />
              <label htmlFor={`preview-${element.id}`} className="ml-2 text-sm font-medium text-gray-700">
                {element.label}
                {element.required && <span className={elementClasses.requiredMark}>*</span>}
              </label>
            </div>
          </div>
        );
      case 'radio':
        return (
          <div className={elementClasses.wrapper}>
            <div className="mb-2 text-sm font-medium text-gray-700">
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </div>
            <div className="space-y-2">
              {element.options && element.options.map((option, idx) => (
                <div key={idx} className="flex items-center">
                  <input
                    type="radio"
                    id={`preview-${element.id}-option${idx}`}
                    name={`preview-${element.id}`}
                    className={elementClasses.radio}
                    required={element.required}
                  />
                  <label htmlFor={`preview-${element.id}-option${idx}`} className="ml-2 text-sm font-medium text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case 'date':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <input
              type="date"
              className={elementClasses.input}
              required={element.required}
            />
          </div>
        );
      case 'number':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <input
              type="number"
              placeholder={element.placeholder}
              className={elementClasses.input}
              required={element.required}
            />
          </div>
        );
      case 'email':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <input
              type="email"
              placeholder={element.placeholder || "email@example.com"}
              className={elementClasses.input}
              required={element.required}
            />
          </div>
        );
      case 'tel':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <input
              type="tel"
              placeholder={element.placeholder || "123-456-7890"}
              className={elementClasses.input}
              required={element.required}
            />
          </div>
        );
      case 'select':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <select 
              className={elementClasses.select}
              required={element.required}
            >
              <option value="" disabled selected>Select an option</option>
              {element.options && element.options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        );
      case 'range':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">0</span>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
                required={element.required}
              />
              <span className="text-sm text-gray-500">100</span>
            </div>
          </div>
        );
      case 'time':
        return (
          <div className={elementClasses.wrapper}>
            <label className={elementClasses.label}>
              {element.label}
              {element.required && <span className={elementClasses.requiredMark}>*</span>}
            </label>
            <input
              type="time"
              className={elementClasses.input}
              required={element.required}
            />
          </div>
        );
      case 'heading':
        return (
          <div className={elementClasses.wrapper}>
            <h2 className="text-xl font-bold text-gray-800">{element.label || "Section Heading"}</h2>
          </div>
        );
      case 'paragraph':
        return (
          <div className={elementClasses.wrapper}>
            <p className="text-gray-700">{element.label || "This is a paragraph text block. You can use this for instructions or additional information."}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-3xl h-3/4 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Eye size={18} className="text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-800">Form Preview</h2>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={closePreview}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            {formName && <h2 className="text-2xl font-bold mb-2 text-gray-800">{formName}</h2>}
            {formDescription && <p className="text-gray-600 mb-6">{formDescription}</p>}
            
            <form className="space-y-4">
              {formElements.map(element => (
                <div key={`preview-${element.id}`}>
                  {renderPreviewElement(element)}
                </div>
              ))}
              {formElements.length > 0 && (
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm font-medium"
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
            {formElements.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="mt-3">No form elements to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
