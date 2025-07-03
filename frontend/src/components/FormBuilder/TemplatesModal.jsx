import React from 'react';
import { X, PlusCircle } from 'lucide-react';

const TemplatesModal = ({ applyTemplate, closeTemplates }) => {

  const formTemplates = [
    {
      name: 'Contact Form',
      description: 'Basic contact information form',
      elements: [
        { id: 'name-field', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { id: 'email-field', type: 'email', label: 'Email Address', placeholder: 'your@email.com', required: true },
        { id: 'phone-field', type: 'tel', label: 'Phone Number', placeholder: '(123) 456-7890', required: false },
        { id: 'message-field', type: 'textarea', label: 'Message', placeholder: 'Enter your message here', required: true }
      ]
    },
    {
      name: 'Event Registration',
      description: 'Form for event signup',
      elements: [
        { id: 'name-field', type: 'text', label: 'Attendee Name', placeholder: 'Enter your full name', required: true },
        { id: 'email-field', type: 'email', label: 'Email Address', placeholder: 'your@email.com', required: true },
        { id: 'date-field', type: 'date', label: 'Attendance Date', required: true },
        { id: 'dietary-field', type: 'select', label: 'Dietary Restrictions', options: [
          { value: 'none', label: 'No Restrictions' },
          { value: 'vegetarian', label: 'Vegetarian' },
          { value: 'vegan', label: 'Vegan' },
          { value: 'gluten-free', label: 'Gluten Free' }
        ], required: false },
        { id: 'comments-field', type: 'textarea', label: 'Additional Comments', placeholder: 'Any special requirements?', required: false }
      ]
    },
    {
      name: 'Feedback Survey',
      description: 'Customer satisfaction survey',
      elements: [
        { id: 'name-field', type: 'text', label: 'Your Name', placeholder: 'Enter your name (optional)', required: false },
        { id: 'rating-field', type: 'radio', label: 'How would you rate our service?', options: [
          { value: '5', label: 'Excellent' },
          { value: '4', label: 'Good' },
          { value: '3', label: 'Average' },
          { value: '2', label: 'Below Average' },
          { value: '1', label: 'Poor' }
        ], required: true },
        { id: 'recommend-field', type: 'checkbox', label: 'Would you recommend us to others?', required: false },
        { id: 'comments-field', type: 'textarea', label: 'Additional Comments', placeholder: 'Please share your thoughts', required: false }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-3xl h-3/4 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="#4F46E5" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="#4F46E5" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="#4F46E5" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="#4F46E5" strokeWidth="2"/>
            </svg>
            <h2 className="text-lg font-medium text-gray-800">Choose a Template</h2>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={closeTemplates}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formTemplates.map((template, index) => (
              <div 
                key={index}
                className="bg-white p-5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => applyTemplate(template)}
              >
                <h3 className="font-medium mb-2 text-gray-800">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="space-y-1.5">
                  {template.elements.slice(0, 3).map((element, idx) => (
                    <div key={idx} className="h-8 bg-gray-100 rounded-md flex items-center px-3">
                      <span className="text-xs text-gray-500 truncate">{element.label}</span>
                    </div>
                  ))}
                  {template.elements.length > 3 && (
                    <div className="text-xs text-gray-500 mt-1">
                      +{template.elements.length - 3} more elements
                    </div>
                  )}
                </div>
                <button className="mt-4 w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
                  Use Template
                </button>
              </div>
            ))}
            <div 
              className="bg-white p-5 rounded-lg border border-dashed border-gray-300 hover:border-indigo-300 transition-all cursor-pointer flex flex-col items-center justify-center text-center"
              onClick={closeTemplates}
            >
              <div className="h-14 w-14 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                <PlusCircle size={24} className="text-indigo-600" />
              </div>
              <h3 className="font-medium mb-1 text-gray-800">Start from Scratch</h3>
              <p className="text-sm text-gray-600">Create a custom form with your own elements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesModal;
