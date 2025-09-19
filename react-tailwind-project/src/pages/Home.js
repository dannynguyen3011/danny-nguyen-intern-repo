import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import UseMemoDemo from '../components/UseMemoDemo';
import UseCallbackDemo from '../components/UseCallbackDemo';
import UseEffectDemo from '../components/UseEffectDemo';

/**
 * Home page component showcasing React hooks demonstrations
 */
const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    console.log('🧭 Navigating to Profile page programmatically');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('welcome')}
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            {t('performance.description')}
          </p>
          
          {/* Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            <Link
              to="/"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              🏠 Home
            </Link>
            <Link
              to="/profile"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              👤 Profile
            </Link>
            <Link
              to="/form"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              📝 Contact Form
            </Link>
            <Link
              to="/counter"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              🔢 Counter Demo
            </Link>
            <Link
              to="/hello"
              className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              👋 HelloWorld
            </Link>
            <button
              onClick={handleNavigateToProfile}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Navigate to Profile →
            </button>
          </div>
        </div>

        {/* Components Grid */}
        <div className="space-y-8">
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Performance Demos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <UseMemoDemo />
            </div>
            <div>
              <UseCallbackDemo />
            </div>
          </div>
          
          {/* UseEffect Demo */}
          <UseEffectDemo />
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-blue-100 text-sm">
            Open DevTools Console to see hooks optimization in action! 🔍
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
