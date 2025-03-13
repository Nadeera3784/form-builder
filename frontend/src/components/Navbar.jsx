import { Link } from "react-router-dom";

const Navbar = ({ user, isAuthenticated, logout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Form Builder</Link>
        
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link to="/form-builder" className="hover:text-gray-300">Create Form</Link>
              {user && user.role === 'admin' && (
                <Link to="/admin" className="hover:text-gray-300">Admin</Link>
              )}
              <button 
                onClick={logout} 
                className="hover:text-gray-300"
              >
                Logout
              </button>
              <span className="text-gray-400">Welcome, {user?.name}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 