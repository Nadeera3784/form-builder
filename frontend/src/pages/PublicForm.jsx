import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const PublicForm = () => {
  const { shareableLink } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/forms/public/${shareableLink}`);
        
        if (res.data.success) {
          setForm(res.data.data);
          
          // Initialize form data
          const initialData = {};
          res.data.data.formFields.forEach(field => {
            if (field.type !== 'heading' && field.type !== 'paragraph') {
              initialData[field.id] = '';
            }
          });
          setFormData(initialData);
        }
      } catch (err) {
        setError(
          err.response?.data?.error || 
          "Failed to load form. The form may not exist or has been removed."
        );
      } finally {
        setLoading(false);
      }
    };

    if (shareableLink) {
      fetchForm();
    }
  }, [shareableLink]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/forms/submit/${shareableLink}`,
        formData
      );
      
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        "Failed to submit form. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Form submitted successfully!</span>
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Form not found.</span>
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
        {form.description && <p className="text-gray-600 mb-6">{form.description}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {form.formFields.map((field) => {
            switch (field.type) {
              case 'text':
              case 'email':
              case 'tel':
              case 'number':
                return (
                  <div key={field.id} className="mb-4">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                );
              case 'textarea':
                return (
                  <div key={field.id} className="mb-4">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <textarea
                      id={field.id}
                      name={field.id}
                      value={formData[field.id] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                );
              case 'checkbox':
                return (
                  <div key={field.id} className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={field.id}
                        name={field.id}
                        checked={formData[field.id] || false}
                        onChange={handleChange}
                        required={field.required}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={field.id} className="ml-2 block text-sm text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    </div>
                  </div>
                );
              case 'radio':
                return (
                  <div key={field.id} className="mb-4">
                    <fieldset>
                      <legend className="text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </legend>
                      <div className="mt-2 space-y-2">
                        {field.options && field.options.map((option, idx) => (
                          <div key={idx} className="flex items-center">
                            <input
                              id={`${field.id}-${idx}`}
                              name={field.id}
                              type="radio"
                              value={option.value}
                              checked={formData[field.id] === option.value}
                              onChange={handleChange}
                              required={field.required}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor={`${field.id}-${idx}`} className="ml-2 block text-sm text-gray-700">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                );
              case 'select':
                return (
                  <div key={field.id} className="mb-4">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <select
                      id={field.id}
                      name={field.id}
                      value={formData[field.id] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an option</option>
                      {field.options && field.options.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              case 'date':
                return (
                  <div key={field.id} className="mb-4">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      type="date"
                      id={field.id}
                      name={field.id}
                      value={formData[field.id] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                );
              case 'time':
                return (
                  <div key={field.id} className="mb-4">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      type="time"
                      id={field.id}
                      name={field.id}
                      value={formData[field.id] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                );
              case 'heading':
                return (
                  <div key={field.id} className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{field.label}</h2>
                  </div>
                );
              case 'paragraph':
                return (
                  <div key={field.id} className="mb-4">
                    <p className="text-gray-700">{field.label}</p>
                  </div>
                );
              default:
                return null;
            }
          })}
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicForm; 