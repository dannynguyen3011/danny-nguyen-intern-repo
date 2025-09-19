import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * Profile page component demonstrating routing and user data management
 */
const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: true
    }
  });

  // Simulate loading user data on component mount
  useEffect(() => {
    console.log('👤 Profile page mounted, loading user data...');
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Full-stack developer passionate about React and modern web technologies.',
        avatar: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=JD',
        joinDate: '2023-01-15',
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true
        },
        stats: {
          projectsCompleted: 42,
          hoursLogged: 1337,
          skillLevel: 'Advanced'
        }
      };
      
      setUser(mockUser);
      setFormData({
        name: mockUser.name,
        email: mockUser.email,
        bio: mockUser.bio,
        preferences: { ...mockUser.preferences }
      });
      setLoading(false);
      
      console.log('✅ User data loaded:', mockUser);
    }, 1500);

    return () => {
      console.log('👤 Profile page unmounting, cleaning up...');
      clearTimeout(timer);
    };
  }, []);

  // Log route changes
  useEffect(() => {
    console.log('🧭 Current route:', location.pathname);
    console.log('🧭 Route state:', location.state);
  }, [location]);

  const handleEdit = useCallback(() => {
    setEditing(true);
    console.log('✏️ Entering edit mode');
  }, []);

  const handleSave = useCallback(() => {
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      preferences: { ...formData.preferences }
    }));
    setEditing(false);
    console.log('💾 Profile saved:', formData);
  }, [formData]);

  const handleCancel = useCallback(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bio: user.bio,
        preferences: { ...user.preferences }
      });
    }
    setEditing(false);
    console.log('❌ Edit cancelled');
  }, [user]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handlePreferenceChange = useCallback((preference, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value
      }
    }));
  }, []);

  const handleGoHome = useCallback(() => {
    console.log('🏠 Navigating to Home page');
    navigate('/', { state: { from: 'profile' } });
  }, [navigate]);

  const handleGoBack = useCallback(() => {
    console.log('⬅️ Going back in history');
    navigate(-1);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Loading Profile...</h2>
            <p className="text-gray-600">Please wait while we fetch your data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">👤 User Profile</h1>
            <div className="flex gap-3">
              <Link
                to="/"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
              >
                🏠 Home
              </Link>
              <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                ⬅️ Back
              </button>
              <button
                onClick={handleGoHome}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
              >
                Navigate Home →
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-200"
                />
                <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Member since {new Date(user?.joinDate).toLocaleDateString()}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects:</span>
                  <span className="font-semibold">{user?.stats.projectsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours Logged:</span>
                  <span className="font-semibold">{user?.stats.hoursLogged}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skill Level:</span>
                  <span className="font-semibold text-green-600">{user?.stats.skillLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Basic Information</h3>
                {!editing ? (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">{user?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {editing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">{user?.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {editing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">{user?.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Theme</span>
                  <select
                    value={formData.preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    disabled={!editing}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Language</span>
                  <select
                    value={formData.preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    disabled={!editing}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Notifications</span>
                  <button
                    onClick={() => handlePreferenceChange('notifications', !formData.preferences.notifications)}
                    disabled={!editing}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      formData.preferences.notifications ? 'bg-green-500' : 'bg-gray-300'
                    } ${!editing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                        formData.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Routing Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🧭 Routing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Current Path:</strong>
              <span className="ml-2 text-purple-600">{location.pathname}</span>
            </div>
            <div>
              <strong>Search Params:</strong>
              <span className="ml-2 text-purple-600">{location.search || 'None'}</span>
            </div>
            <div>
              <strong>Hash:</strong>
              <span className="ml-2 text-purple-600">{location.hash || 'None'}</span>
            </div>
            <div>
              <strong>State:</strong>
              <span className="ml-2 text-purple-600">
                {location.state ? JSON.stringify(location.state) : 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
