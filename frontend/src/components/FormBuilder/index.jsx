import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

import FormHeader from './FormHeader';
import FormElementLibrary from './FormElementLibrary';
import FormCanvas from './FormCanvas';
import ElementSettings from './ElementSettings';
import FormPreview from './FormPreview';
import TemplatesModal from './TemplatesModal';
import HelpModal from './HelpModal';

const FormBuilder = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formName, setFormName] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('');
  const [formElements, setFormElements] = useState([
    { id: 'name-field', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true }
  ]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggedElement, setDraggedElement] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [formTheme, setFormTheme] = useState('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  useEffect(() => {
    if (id) {
      fetchFormData();
    }
  }, [id]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to create or edit forms. Please log in and try again.');
    }
  }, []);
  
  useEffect(() => {
    saveToHistory(formElements);
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/forms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        const formData = response.data.data;
        setFormName(formData.title);
        setFormDescription(formData.description);
        setFormElements(formData.formFields);
        saveToHistory(formData.formFields);
      }
    } catch (err) {
      setError('Failed to load form data. Please try again.');
      console.error('Error loading form:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const saveForm = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      
      const formData = {
        title: formName,
        description: formDescription,
        formFields: formElements
      };
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to save forms. Please log in and try again.');
        setLoading(false);
        return;
      }
      
      let response;
      
      if (id) {
        response = await axios.put(
          `${API_BASE_URL}/api/forms/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}/api/forms`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }
      
      if (response.data.success) {
        setSuccessMessage('Form saved successfully!');
        
        if (!id && response.data.data._id) {
          navigate(`/form-builder/${response.data.data._id}`);
        }
      }
    } catch (err) {
      console.error('Error saving form:', err);
      setError(err.response?.data?.error || 'Failed to save form. Please try again.');
    } finally {
      setLoading(false);
      
      if (successMessage) {
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
  };

  const saveToHistory = (elements) => {
    const newHistory = [...history.slice(0, historyIndex + 1), JSON.parse(JSON.stringify(elements))];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setFormElements(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setFormElements(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  const handleDragStart = (type, fromLibrary = true, elementId = null) => {
    if (fromLibrary) {
      setDraggedElement({ type, fromLibrary });
    } else {
      setDraggedElement({ type, fromLibrary, elementId });
      const draggedEl = document.getElementById(elementId);
      if (draggedEl) {
        draggedEl.style.opacity = 0.4;
      }
    }
  };

  const handleDragEnd = () => {
    formElements.forEach(element => {
      const el = document.getElementById(element.id);
      if (el) {
        el.style.opacity = 1;
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedElement) return;

    const formCanvasRect = e.currentTarget.getBoundingClientRect();
    const dropY = e.clientY - formCanvasRect.top;
    
    let insertIndex = formElements.length;
    const elementRects = formElements.map((el, index) => {
      const rect = document.getElementById(el.id)?.getBoundingClientRect();
      return { index, rect, el };
    }).filter(item => item.rect);
    
    for (let i = 0; i < elementRects.length; i++) {
      const { rect, index } = elementRects[i];
      const elementMiddle = rect.top + rect.height / 2 - formCanvasRect.top;
      
      if (dropY < elementMiddle) {
        insertIndex = index;
        break;
      }
    }

    let newFormElements = [...formElements];
    
    if (draggedElement.fromLibrary) {
      const newElement = {
        id: `${draggedElement.type}-${Date.now()}`,
        type: draggedElement.type,
        label: `New ${draggedElement.type.charAt(0).toUpperCase() + draggedElement.type.slice(1)}`,
        placeholder: `Enter ${draggedElement.type} here`
      };
      
      if (draggedElement.type === 'select' || draggedElement.type === 'radio') {
        newElement.options = [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ];
      }
      
      newFormElements.splice(insertIndex, 0, newElement);
      setSelectedElement(newElement.id);
    } else {

      const draggedElementIndex = newFormElements.findIndex(el => el.id === draggedElement.elementId);
      if (draggedElementIndex !== -1) {

        const [movedElement] = newFormElements.splice(draggedElementIndex, 1);
        
        const adjustedInsertIndex = draggedElementIndex < insertIndex ? insertIndex - 1 : insertIndex;
        
        newFormElements.splice(adjustedInsertIndex, 0, movedElement);
        setSelectedElement(movedElement.id);
      }
    }
    
    setFormElements(newFormElements);
    saveToHistory(newFormElements);
    setDraggedElement(null);
  };

  const updateElementSetting = (id, field, value) => {
    const updatedElements = formElements.map(el => 
      el.id === id ? { ...el, [field]: value } : el
    );
    setFormElements(updatedElements);
    saveToHistory(updatedElements);
  };

  const deleteElement = (id) => {
    const updatedElements = formElements.filter(el => el.id !== id);
    setFormElements(updatedElements);
    saveToHistory(updatedElements);
    if (selectedElement === id) setSelectedElement(null);
  };

  const duplicateElement = (id) => {
    const elementToDuplicate = formElements.find(el => el.id === id);
    if (elementToDuplicate) {
      const duplicatedElement = {
        ...JSON.parse(JSON.stringify(elementToDuplicate)),
        id: `${elementToDuplicate.type}-${Date.now()}`
      };
      
      const elementIndex = formElements.findIndex(el => el.id === id);
      const updatedElements = [...formElements];
      updatedElements.splice(elementIndex + 1, 0, duplicatedElement);
      
      setFormElements(updatedElements);
      saveToHistory(updatedElements);
      setSelectedElement(duplicatedElement.id);
    }
  };

  const getSelectedElement = () => {
    return formElements.find(el => el.id === selectedElement);
  };

  const addOption = () => {
    const element = getSelectedElement();
    if (element && (element.type === 'select' || element.type === 'radio')) {
      const options = element.options || [];
      const newOptions = [...options, { value: `option${options.length + 1}`, label: `Option ${options.length + 1}` }];
      const updatedElements = formElements.map(el => 
        el.id === selectedElement ? { ...el, options: newOptions } : el
      );
      setFormElements(updatedElements);
      saveToHistory(updatedElements);
    }
  };

  const removeOption = (index) => {
    const element = getSelectedElement();
    if (element && (element.type === 'select' || element.type === 'radio') && element.options) {
      const newOptions = [...element.options];
      newOptions.splice(index, 1);
      const updatedElements = formElements.map(el => 
        el.id === selectedElement ? { ...el, options: newOptions } : el
      );
      setFormElements(updatedElements);
      saveToHistory(updatedElements);
    }
  };

  const updateOption = (index, field, value) => {
    const element = getSelectedElement();
    if (element && (element.type === 'select' || element.type === 'radio') && element.options) {
      const newOptions = [...element.options];
      newOptions[index] = { ...newOptions[index], [field]: value };
      const updatedElements = formElements.map(el => 
        el.id === selectedElement ? { ...el, options: newOptions } : el
      );
      setFormElements(updatedElements);
      saveToHistory(updatedElements);
    }
  };

  const applyTemplate = (template) => {
    setFormElements(JSON.parse(JSON.stringify(template.elements)));
    setFormName(template.name);
    setFormDescription(template.description || '');
    saveToHistory(template.elements);
    setShowTemplates(false);
  };

  const exportForm = () => {
    const formConfig = {
      name: formName,
      description: formDescription,
      elements: formElements,
      theme: formTheme
    };
    
    const blob = new Blob([JSON.stringify(formConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formName.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  };

  const importForm = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const formConfig = JSON.parse(event.target.result);
          setFormName(formConfig.name || 'Imported Form');
          setFormDescription(formConfig.description || '');
          setFormElements(formConfig.elements || []);
          setFormTheme(formConfig.theme || 'default');
          saveToHistory(formConfig.elements || []);
        } catch (error) {
          alert('Invalid form configuration file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <FormHeader 
        formName={formName}
        undo={undo}
        redo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        showTemplates={() => setShowTemplates(true)}
        showPreview={() => setShowPreview(true)}
        saveForm={saveForm}
        loading={loading}
      />
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 mx-6 mt-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-6 mt-4" role="alert">
          <span className="block sm:inline">{error}</span>
          {error.includes('logged in') && (
            <div className="mt-2">
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Go to Login Page
              </a>
            </div>
          )}
        </div>
      )}
      
      <div className="bg-white border-b border-gray-200 p-6">
        <input
          type="text"
          className="w-full text-2xl font-bold mb-2 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Enter form title"
        />
        <textarea
          className="w-full text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 resize-none"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Enter form description"
          rows={2}
        />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <FormElementLibrary 
          handleDragStart={handleDragStart}
          exportForm={exportForm}
          importForm={importForm}
          showHelp={() => setShowHelp(true)}
        />
        <FormCanvas 
          formElements={formElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          handleDrop={handleDrop}
          handleDragOver={(e) => {
            e.preventDefault();
            
          }}
          handleDragLeave={() => {
           
          }}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          duplicateElement={duplicateElement}
          deleteElement={deleteElement}
          showTemplates={() => setShowTemplates(true)}
        />
        
        <ElementSettings 
          selectedElement={getSelectedElement()}
          updateElementSetting={updateElementSetting}
          addOption={addOption}
          removeOption={removeOption}
          updateOption={updateOption}
          duplicateElement={duplicateElement}
          deleteElement={deleteElement}
          formTheme={formTheme}
          setFormTheme={setFormTheme}
        />
      </div>

      {/* Modals */}
      {showPreview && (
        <FormPreview 
          formName={formName}
          formDescription={formDescription}
          formElements={formElements}
          closePreview={() => setShowPreview(false)}
        />
      )}
      
      {showTemplates && (
        <TemplatesModal 
          applyTemplate={applyTemplate}
          closeTemplates={() => setShowTemplates(false)}
        />
      )}
      
      {showHelp && (
        <HelpModal 
          closeHelp={() => setShowHelp(false)}
        />
      )}
    </div>
  );
};

export default FormBuilder;
