import React from 'react';
import { Save, Eye, Undo, Redo } from 'lucide-react';

const FormHeader = ({ 
  formName, 
  undo, 
  redo, 
  canUndo, 
  canRedo, 
  showTemplates, 
  showPreview, 
  saveForm, 
  loading 
}) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="#4F46E5" strokeWidth="2"/>
          <path d="M3 10H21" stroke="#4F46E5" strokeWidth="2"/>
          <path d="M7 15H12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h1 className="text-lg font-semibold text-gray-800">Form Builder</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <button 
            className={`p-1.5 rounded ${canUndo ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button 
            className={`p-1.5 rounded ${canRedo ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
          >
            <Redo size={18} />
          </button>
        </div>
        
        <div className="flex gap-3">
          <button 
            className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center gap-1.5"
            onClick={showTemplates}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Templates
          </button>
          
          <button 
            className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center gap-1.5"
            onClick={showPreview}
          >
            <Eye size={16} />
            Preview
          </button>
          
          <button 
            className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center gap-1.5"
            onClick={saveForm}
            disabled={loading}
          >
            {loading ? 'Saving...' : (
              <>
                <Save size={16} />
                Save Form
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default FormHeader;
