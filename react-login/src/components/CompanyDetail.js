import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../services/localCompanyDB';

const CompanyDetail = ({ user, onLogout }) => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch company data
    const companyData = getCompanyById(parseInt(companyId));
    if (companyData) {
      setCompany(companyData);
    }
    setLoading(false);
  }, [companyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Not Found</h2>
          <p className="text-gray-600 mb-6">The company you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-blue-900 transition-colors"
                title="Back to Home"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent cursor-pointer" onClick={() => navigate('/')}>
                CareerRater
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                Browse Jobs
              </a>
              <a href="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                Companies
              </a>
              <a href="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                My Reviews
              </a>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {/* TODO: Navigate to settings */}}
                  >
                    ⚙️ Settings
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {/* TODO: Navigate to my reviews */}}
                  >
                    📝 My Reviews
                  </button>
                  <hr className="my-1" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    onClick={onLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Company Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-6">
            {/* Company Logo */}
            <img 
              src={company.logo} 
              alt={`${company.name} logo`}
              className="w-24 h-24 rounded-2xl object-contain bg-white p-3 shadow-lg"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&size=96&background=fff&color=1e3a8a&bold=true`;
              }}
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
              <p className="text-blue-100 text-lg mb-3">{company.description}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center space-x-2 bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full">
                  <span>📍</span>
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full">
                  <span>👥</span>
                  <span>{company.employees} employees</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full">
                  <span>🏢</span>
                  <span>{company.industry}</span>
                </div>
              </div>
            </div>
            {/* Rating Box */}
            <div className="bg-white text-gray-800 rounded-xl p-6 text-center shadow-lg min-w-[160px]">
              <div className="text-5xl font-bold text-blue-900 mb-1">
                {company.rating > 0 ? company.rating.toFixed(1) : 'N/A'}
              </div>
              <div className="text-yellow-500 text-2xl mb-2">
                {'⭐'.repeat(Math.round(company.rating))}
              </div>
              <p className="text-sm text-gray-600">
                {company.reviewCount === 0 
                  ? 'No reviews yet' 
                  : `${company.reviewCount.toLocaleString()} ${company.reviewCount === 1 ? 'review' : 'reviews'}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {company.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{company.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="text-sm text-gray-500 mb-1">Website</p>
                  <a 
                    href={`https://${company.domain}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 hover:underline font-medium"
                  >
                    {company.domain}
                  </a>
                </div>
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="text-sm text-gray-500 mb-1">Industry</p>
                  <p className="font-medium text-gray-800">{company.industry}</p>
                </div>
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="text-sm text-gray-500 mb-1">Company Size</p>
                  <p className="font-medium text-gray-800">{company.employees} employees</p>
                </div>
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="text-sm text-gray-500 mb-1">Headquarters</p>
                  <p className="font-medium text-gray-800">{company.location}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Employee Reviews</h2>
                <button
                  className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow-md hover:shadow-lg"
                  onClick={() => alert('Review functionality coming in Phase 3! 🚀')}
                >
                  ✍️ Write a Review
                </button>
              </div>

              {/* Empty State */}
              {company.reviewCount === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-6">Be the first to share your experience at {company.name}!</p>
                  <button
                    className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold inline-flex items-center space-x-2"
                    onClick={() => alert('Review functionality coming in Phase 3! 🚀')}
                  >
                    <span>✨</span>
                    <span>Write the First Review</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Reviews will be displayed here in Phase 3 */}
                  <p className="text-gray-500 italic">Reviews will appear here once users start submitting them.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Rating Breakdown & Quick Stats */}
          <div className="space-y-6">
            {/* Rating Breakdown */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Rating Breakdown</h3>
              
              {company.reviewCount === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">No ratings available yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* These will be calculated from actual reviews in Phase 3 */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Work/Life Balance</span>
                      <span className="font-semibold">-</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-900 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Compensation</span>
                      <span className="font-semibold">-</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-900 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Management</span>
                      <span className="font-semibold">-</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-900 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Career Growth</span>
                      <span className="font-semibold">-</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-900 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Culture</span>
                      <span className="font-semibold">-</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-900 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-left flex items-center space-x-3">
                  <span className="text-xl">💼</span>
                  <span className="font-medium">View Open Positions</span>
                </button>
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-left flex items-center space-x-3">
                  <span className="text-xl">💰</span>
                  <span className="font-medium">View Salaries</span>
                </button>
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-left flex items-center space-x-3">
                  <span className="text-xl">📊</span>
                  <span className="font-medium">Compare Companies</span>
                </button>
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-left flex items-center space-x-3">
                  <span className="text-xl">⭐</span>
                  <span className="font-medium">Follow Company</span>
                </button>
              </div>
            </div>

            {/* Did You Know Box */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-2">💡 Did You Know?</h3>
              <p className="text-sm text-blue-800">
                All reviews on CareerRater are completely anonymous. Your identity is protected, 
                allowing you to share honest feedback without concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
