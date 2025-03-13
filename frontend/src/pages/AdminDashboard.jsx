import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalUsers: "--",
    totalForms: "--",
    totalSubmissions: "--"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setStats(response.data.data);
        } else {
          setError("Failed to fetch system statistics");
        }
      } catch (err) {
        console.error("Error fetching system statistics:", err);
        setError(err.response?.data?.error || "Failed to fetch system statistics");
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p className="text-gray-600 mb-4">
            View and manage all users in the system. You can edit user details, change roles, or delete users.
          </p>
          <Link
            to="/admin/users"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Manage Users
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Form Management</h2>
          <p className="text-gray-600 mb-4">
            View and manage all forms created by users. You can view, edit, or delete any form in the system.
          </p>
          <Link
            to="/admin/forms"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Manage Forms
          </Link>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">System Statistics</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-800">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                stats.totalUsers
              )}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-800">Total Forms</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                stats.totalForms
              )}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-800">Total Submissions</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                stats.totalSubmissions
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 