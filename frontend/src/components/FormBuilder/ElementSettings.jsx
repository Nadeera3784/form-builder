import React from 'react';
import { Copy, Trash2, Settings, X } from 'lucide-react';

const ElementSettings = ({ 
  selectedElement, 
  updateElementSetting, 
  addOption, 
  removeOption, 
  updateOption, 
  duplicateElement, 
  deleteElement,
  formTheme,
  setFormTheme
}) => {
  return (
    <div className="w-80 bg-white p-4 overflow-y-auto border-l border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-gray-700 flex items-center gap-1.5">
          <Settings size={16} />
          Element Settings
        </h2>
        {selectedElement && (
          <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
            {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}
          </span>
        )}
      </div>
      
      {selectedElement ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Label</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
              value={selectedElement.label || ''}
              onChange={(e) => updateElementSetting(selectedElement.id, 'label', e.target.value)}
            />
          </div>
          
          {['text', 'textarea', 'email', 'tel', 'number'].includes(selectedElement.type) && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Placeholder</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                value={selectedElement.placeholder || ''}
                onChange={(e) => updateElementSetting(selectedElement.id, 'placeholder', e.target.value)}
              />
            </div>
          )}
          
          {(selectedElement.type === 'select' || selectedElement.type === 'radio') && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Options</label>
                <button 
                  className="text-indigo-600 text-sm py-1 px-2 rounded hover:bg-indigo-50 transition-colors"
                  onClick={addOption}
                >
                  + Add Option
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedElement.options?.length > 0 ? (
                  selectedElement.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
                        value={option.label}
                        onChange={(e) => updateOption(index, 'label', e.target.value)}
                        placeholder="Option label"
                      />
                      <input
                        type="text"
                        className="w-24 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
                        value={option.value}
                        onChange={(e) => updateOption(index, 'value', e.target.value)}
                        placeholder="Value"
                      />
                      <button 
                        className="text-red-500 hover:text-red-700 p-1"
                        onClick={(e) => { e.stopPropagation(); removeOption(index); }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <button 
                    className="w-full py-3 text-center text-indigo-600 border border-dashed border-indigo-300 rounded-md hover:bg-indigo-50 transition-colors"
                    onClick={addOption}
                  >
                    Add your first option
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="required-field"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={selectedElement.required || false}
                onChange={(e) => updateElementSetting(selectedElement.id, 'required', e.target.checked)}
              />
              <label htmlFor="required-field" className="ml-2 text-sm font-medium text-gray-700">Make this field required</label>
            </div>
          </div>
          
          <div className="pt-4 space-y-3 border-t border-gray-200 mt-4">
            <button
              className="w-full py-2 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium"
              onClick={(e) => { e.stopPropagation(); duplicateElement(selectedElement.id); }}
            >
              <Copy size={16} />
              Duplicate Element
            </button>
            
            <button
              className="w-full py-2 flex items-center justify-center gap-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
              onClick={(e) => { e.stopPropagation(); deleteElement(selectedElement.id); }}
            >
              <Trash2 size={16} />
              Delete Element
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-gray-500 h-64 border border-dashed border-gray-200 rounded-lg">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.5V19.5M19.5 12H4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="mt-3 text-center">
            Select an element to <br/>edit its properties
          </p>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium mb-3 text-gray-700">Form Theme</h3>
        <div className="grid grid-cols-2 gap-2">
          <button 
            className={`p-2 border ${formTheme === 'default' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-gray-300'} rounded-md text-sm transition-colors`}
            onClick={() => setFormTheme('default')}
          >
            Default
          </button>
          <button 
            className={`p-2 border ${formTheme === 'modern' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-gray-300'} rounded-md text-sm transition-colors`}
            onClick={() => setFormTheme('modern')}
          >
            Modern
          </button>
          <button 
            className={`p-2 border ${formTheme === 'minimal' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-gray-300'} rounded-md text-sm transition-colors`}
            onClick={() => setFormTheme('minimal')}
          >
            Minimal
          </button>
          <button 
            className={`p-2 border ${formTheme === 'classic' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-gray-300'} rounded-md text-sm transition-colors`}
            onClick={() => setFormTheme('classic')}
          >
            Classic
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementSettings;
