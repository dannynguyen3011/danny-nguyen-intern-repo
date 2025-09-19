import React from 'react';
import { Link } from 'react-router-dom';
import FormikForm from '../components/FormikForm';

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <nav className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Home
          </Link>
        </nav>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Formik Form Demo
          </h1>
          <p className="text-gray-600">
            A form built with Formik and Yup validation
          </p>
        </div>

        {/* Form Component */}
        <FormikForm />

        {/* Information Section */}
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            About This Form
          </h3>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Formik:</strong> Handles form state, validation, and submission
            </p>
            <p>
              <strong>Yup:</strong> Provides schema-based validation with clear error messages
            </p>
            <p>
              <strong>Features:</strong> Real-time validation, error styling, and form reset
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
