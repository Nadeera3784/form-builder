import React from 'react';
import { HelpCircle, X, Type, AlignLeft, CheckSquare, Circle } from 'lucide-react';

const HelpModal = ({ closeHelp }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-3xl h-3/4 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <HelpCircle size={18} className="text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-800">Help & Documentation</h2>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={closeHelp}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-medium mb-4 text-gray-800">Getting Started</h3>
            <p className="mb-6 text-gray-600">FormBuilder Pro allows you to create custom forms by dragging and dropping elements onto the canvas.</p>
            
            <h4 className="font-medium mb-2 text-gray-800">Building Your Form</h4>
            <ol className="list-decimal pl-5 mb-6 space-y-2 text-gray-600">
              <li>Drag elements from the left panel onto the canvas</li>
              <li>Click on any element to edit its properties in the right panel</li>
              <li>Rearrange elements by dragging them to a new position</li>
              <li>Preview your form by clicking the Preview button</li>
            </ol>
            
            <h4 className="font-medium mb-2 text-gray-800">Element Types</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-2">
                <Type size={18} className="text-indigo-600 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block">Text Field</span>
                  <span className="text-sm text-gray-600">Basic single-line text input</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlignLeft size={18} className="text-indigo-600 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block">Text Area</span>
                  <span className="text-sm text-gray-600">Multi-line text input</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare size={18} className="text-indigo-600 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block">Checkbox</span>
                  <span className="text-sm text-gray-600">Single checkbox for yes/no options</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Circle size={18} className="text-indigo-600 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block">Radio Button</span>
                  <span className="text-sm text-gray-600">Choose one from multiple options</span>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium mb-2 text-gray-800">Keyboard Shortcuts</h4>
            <div className="mb-6 space-y-1 text-gray-600">
              <div className="flex">
                <span className="w-32 font-medium">Ctrl + Z</span>
                <span>Undo</span>
              </div>
              <div className="flex">
                <span className="w-32 font-medium">Ctrl + Y</span>
                <span>Redo</span>
              </div>
              <div className="flex">
                <span className="w-32 font-medium">Delete</span>
                <span>Remove selected element</span>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <h4 className="font-medium mb-2 text-indigo-800">Need More Help?</h4>
              <p className="text-indigo-700 text-sm">
                Check our documentation for detailed guides and examples, or contact support for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
