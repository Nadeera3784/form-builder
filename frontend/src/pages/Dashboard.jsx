import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Dashboard = ({ user }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/forms`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          setForms(res.data.data);
        }
      } catch (err) {
        setError(
          err.response?.data?.error || 
          "Failed to fetch forms. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${API_BASE_URL}/api/forms/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          setForms(forms.filter(form => form._id !== id));
        }
      } catch (err) {
        setError(
          err.response?.data?.error || 
          "Failed to delete form. Please try again."
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Forms</h1>
        <Link
          to="/form-builder"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create New Form
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {forms.length === 0 ? (
        <div className="bg-white shadow-md rounded-md p-6 text-center">
          <p className="text-gray-600 mb-4">You haven't created any forms yet.</p>
          <Link
            to="/form-builder"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create your first form
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submissions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shareable Link
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forms.map((form) => (
                <tr key={form._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{form.title}</div>
                    <div className="text-sm text-gray-500">{form.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(form.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{form.submissions?.length || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/form/${form.shareableLink}`
                          );
                          alert("Link copied to clipboard!");
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Copy Link
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/form-builder/${form._id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/form-submissions/${form._id}`}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      Submissions
                    </Link>
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 