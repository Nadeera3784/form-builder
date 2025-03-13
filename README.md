# Form Builder

A modern, full-stack web application for creating, sharing, and managing custom forms and submission tracking.

## Description

Form Builder is a powerful and intuitive platform that allows users to create custom forms using a drag-and-drop interface. The application provides a seamless experience for form creation, sharing, and submission analysis. Users can create various types of forms, share them via unique links, and collect and analyze submissions in real-time.

## Features

- **User Authentication**: Secure login and registration system with JWT authentication
- **Drag-and-Drop Form Builder**: Intuitive interface for creating custom forms
- **Multiple Form Elements**: Support for various form elements including:
  - Text inputs
  - Textareas
  - Checkboxes
  - Radio buttons
  - Select dropdowns
  - Date pickers
  - Number inputs
  - Email inputs
  - Phone inputs
  - Range sliders
  - Time pickers
  - Headings and paragraphs
- **Form Templates**: Pre-built templates for common form types
- **Form Sharing**: Generate unique shareable links for forms
- **Submission Management**: View, analyze, and export form submissions
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Admin Dashboard**: Comprehensive admin panel for user and form management
- **Real-time Validation**: Client-side form validation for better user experience

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **React Router**: For client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API requests
- **Lucide React**: Icon library
- **Vite**: Build tool and development server

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Library for password hashing
- **Docker**: Containerization for easy deployment

## Architecture

The application follows a modern client-server architecture:

### Frontend Architecture
- **Component-Based Structure**: Modular React components for reusability
- **State Management**: React hooks for local state management
- **Routing**: React Router for navigation between pages
- **API Integration**: Axios for communication with the backend

### Backend Architecture
- **RESTful API**: Express routes organized by resource
- **MVC Pattern**: Models, routes, and controllers separation
- **Authentication Middleware**: JWT verification for protected routes
- **Database Models**: Mongoose schemas for data structure
- **Error Handling**: Centralized error handling middleware

### Database Schema
- **Users**: Store user information and authentication details
- **Forms**: Store form configurations and metadata
- **Submissions**: Store form submission data linked to forms

## Installation Guide

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Docker (optional)

### Frontend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/Nadeera3784/form-builder.git
   cd form-builder
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the frontend development server
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:5173 (or another port if 5173 is in use)

### Backend Setup
1. Navigate to the backend directory
   ```bash
   cd ../backend
   ```

2. Install backend dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/form-builder
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the backend development server
   ```bash
   npm run dev
   ```
   The backend API will be available at http://localhost:5000

### Using Docker (Optional)
1. Make sure Docker and Docker Compose are installed on your system
2. From the root directory, run:
   ```bash
   docker-compose up
   ```
   This will start both the frontend and backend services

### Creating an Admin User
To create an admin user for accessing the admin dashboard, run:
```bash
npm run seed:admin
```

This will create an admin user with the following credentials:
- Email: admin@formbuilder.com
- Password: Admin123!

For security reasons, please change the password after the first login.

## Usage

1. Register a new account or log in with existing credentials
2. Navigate to the dashboard to view your forms
3. Click "Create New Form" to start building a form
4. Use the drag-and-drop interface to add form elements
5. Configure element properties in the right sidebar
6. Save your form and get a shareable link
7. View form submissions from the dashboard

## License

This project is licensed under the MIT License - see the LICENSE file for details.


## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) 