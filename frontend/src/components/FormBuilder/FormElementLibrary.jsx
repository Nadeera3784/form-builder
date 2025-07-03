import React from 'react';
import { 
  Type, 
  AlignLeft, 
  CheckSquare, 
  Circle, 
  Calendar, 
  Download, 
  Upload, 
  Code, 
  HelpCircle, 
  PlusCircle 
} from 'lucide-react';

const FormElementLibrary = ({ handleDragStart, exportForm, importForm, showHelp }) => {

  const libraryElements = [
    { type: 'text', icon: <Type size={18} />, label: 'Text Field' },
    { type: 'textarea', icon: <AlignLeft size={18} />, label: 'Text Area' },
    { type: 'checkbox', icon: <CheckSquare size={18} />, label: 'Checkbox' },
    { type: 'radio', icon: <Circle size={18} />, label: 'Radio Button' },
    { type: 'date', icon: <Calendar size={18} />, label: 'Date Picker' },
    { type: 'number', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7L9 17M15 7V17M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Number Input' },
    { type: 'email', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M1 7L12 13L23 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Email Field' },
    { type: 'tel', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C18.4 22.07 16.86 21.75 15.45 21.08C14.14 20.462 12.9605 19.6274 11.97 18.62C10.9626 17.6342 10.1276 16.4607 9.50997 15.15C8.82997 13.73 8.50997 12.18 8.62997 10.62C8.62925 10.0747 8.83807 9.54972 9.20818 9.17389C9.5783 8.79805 10.0988 8.58149 10.64 8.57H13.64C14.0978 8.56542 14.5429 8.73168 14.8838 9.03508C15.2247 9.33847 15.4326 9.75884 15.47 10.21C15.5455 10.9261 15.6848 11.6319 15.89 12.32C16.0101 12.7224 16.0212 13.1523 15.9216 13.561C15.8219 13.9697 15.6162 14.3389 15.33 14.62L14.33 15.62C15.0127 16.5888 15.8473 17.4561 16.8 18.19L17.8 17.19C18.0811 16.9038 18.4503 16.6981 18.859 16.5984C19.2677 16.4988 19.6976 16.5099 20.1 16.63C20.7881 16.8353 21.4939 16.9745 22.21 17.05C22.6639 17.0876 23.0858 17.2976 23.3893 17.6418C23.6928 17.9859 23.857 18.4346 23.85 18.9L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Phone Field' },
    { type: 'select', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 9L12 5L16 9M8 15L12 19L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Dropdown Select' },
    { type: 'range', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="12" r="3" fill="white" stroke="currentColor" strokeWidth="2"/></svg>, label: 'Range Slider' },
    { type: 'time', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, label: 'Time Picker' },
    { type: 'heading', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4V20M18 4V20M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, label: 'Heading' },
    { type: 'paragraph', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H21M3 12H21M3 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, label: 'Paragraph Text' }
  ];

  return (
    <div className="w-64 bg-white p-4 overflow-y-auto border-r border-gray-200">
      <h2 className="font-medium mb-3 text-gray-700 flex items-center gap-1.5">
        <PlusCircle size={16} />
        Form Elements
      </h2>
      
      <div className="space-y-2">
        {libraryElements.map((element, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white p-3 rounded-md cursor-move shadow-sm hover:shadow transition-shadow border border-gray-100"
            draggable
            onDragStart={() => handleDragStart(element.type)}
            title={`Drag to add ${element.label}`}
          >
            <div className="text-indigo-600">{element.icon}</div>
            <span className="text-sm font-medium text-gray-700">{element.label}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h2 className="font-medium mb-3 text-gray-700">Actions</h2>
        <div className="space-y-2">
          <button 
            className="flex items-center gap-2 w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            onClick={exportForm}
          >
            <Download size={16} className="text-gray-500" />
            Export Form
          </button>
          
          <label className="flex items-center gap-2 w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <Upload size={16} className="text-gray-500" />
            Import Form
            <input type="file" accept=".json" className="hidden" onChange={importForm} />
          </label>
          
          <button 
            className="flex items-center gap-2 w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            onClick={() => {
              const formCode = generateFormCode();
              alert(formCode);
            }}
          >
            <Code size={16} className="text-gray-500" />
            Generate Code
          </button>
          
          <button 
            className="flex items-center gap-2 w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            onClick={showHelp}
          >
            <HelpCircle size={16} className="text-gray-500" />
            Help & Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

const generateFormCode = () => {
  return `<form id="my-form" class="form-default">
  <!-- Form elements will be generated here -->
  <button type="submit">Submit</button>
</form>`;
};

export default FormElementLibrary;
