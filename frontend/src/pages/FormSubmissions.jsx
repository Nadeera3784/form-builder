import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const FormSubmissions = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFormAndSubmissions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/forms/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          setForm(res.data.data);
          setSubmissions(res.data.data.submissions || []);
        }
      } catch (err) {
        setError(
          err.response?.data?.error || 
          "Failed to fetch form submissions. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFormAndSubmissions();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="text-center mt-4">
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Form not found.</span>
        </div>
        <div className="text-center mt-4">
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{form.title} - Submissions</h1>
          <p className="text-gray-600">{form.description}</p>
        </div>
        <Link
          to="/dashboard"
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Back to Dashboard
        </Link>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white shadow-md rounded-md p-6 text-center">
          <p className="text-gray-600 mb-4">No submissions yet for this form.</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Share your form with others to collect responses.</p>
            <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-1">Shareable Link:</p>
              <div className="flex items-center">
                <input
                  type="text"
                  value={`${window.location.origin}/form/${form.shareableLink}`}
                  readOnly
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/form/${form.shareableLink}`);
                    alert("Link copied to clipboard!");
                  }}
                  className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              Total Submissions: {submissions.length}
            </h2>
          </div>
          
          {submissions.map((submission, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">
                    Submission #{index + 1}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(submission.data).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-2 last:border-b-0">
                      <p className="text-sm font-medium text-gray-700">{key}</p>
                      <p className="text-sm text-gray-900">{value.toString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormSubmissions; 