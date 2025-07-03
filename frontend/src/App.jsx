import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

import FormBuilder from "./components/FormBuilder";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import FormManagement from "./pages/FormManagement";
import PublicForm from "./pages/PublicForm";
import FormSubmissions from "./pages/FormSubmissions";
import NotFound from "./pages/NotFound";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} isAuthenticated={isAuthenticated} logout={logout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={<Login login={login} isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/register" 
              element={<Register login={login} isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Dashboard user={user} />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/form-builder" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <FormBuilder user={user} />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/form-builder/:id" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <FormBuilder user={user} />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/form-submissions/:id" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <FormSubmissions />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading} requiredRole="admin">
                  <AdminDashboard user={user} />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading} requiredRole="admin">
                  <UserManagement user={user} />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/forms" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading} requiredRole="admin">
                  <FormManagement user={user} />
                </PrivateRoute>
              } 
            />
            <Route path="/form/:shareableLink" element={<PublicForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Form Builder. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;