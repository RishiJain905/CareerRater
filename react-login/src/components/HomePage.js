import React, { useState } from 'react';

const HomePage = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    industry: '',
    companySize: '',
    rating: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement API search when backend is ready
    console.log('Searching for:', searchQuery);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                CareerRater
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                Browse Jobs
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                Companies
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
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

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div>
              <div className="inline-block bg-blue-700 bg-opacity-50 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                🔒 100% Anonymous Reviews
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Rate Your Workplace.
                <br />
                <span className="text-blue-300">Share Your Truth.</span>
              </h1>
              <p className="text-lg text-blue-100 mb-6">
                Discover authentic workplace insights from real employees. Search, compare, and make informed career decisions - all while staying completely anonymous.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">✓</span>
                  <span>Anonymous reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">✓</span>
                  <span>Real employee ratings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">✓</span>
                  <span>Unfiltered insights</span>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="flex justify-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                <div className="grid grid-cols-3 gap-4">
                  {/* Icon Grid */}
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">💼</div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">⭐</div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">📊</div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">👥</div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">💬</div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">🔍</div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">👍</div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">💡</div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">🎯</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-12">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for companies, job titles, or industries..."
                    className="w-full px-6 py-4 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">
                    🔍
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Companies</h3>
              
              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Select a location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  placeholder="E.g. healthcare, tech"
                  value={filters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Company Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size
                </label>
                <select
                  value={filters.companySize}
                  onChange={(e) => handleFilterChange('companySize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All sizes</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1,000 employees</option>
                  <option value="1001-10000">1,001-10,000 employees</option>
                  <option value="10001+">10,001+ employees</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Any rating</option>
                  <option value="4">4+ stars</option>
                  <option value="3.5">3.5+ stars</option>
                  <option value="3">3+ stars</option>
                  <option value="2.5">2.5+ stars</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Company ratings by category
                </label>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                    <input type="checkbox" className="mr-2 rounded" />
                    Work/life balance
                  </label>
                  <label className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                    <input type="checkbox" className="mr-2 rounded" />
                    Diversity and inclusion
                  </label>
                  <label className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                    <input type="checkbox" className="mr-2 rounded" />
                    Compensation and benefits
                  </label>
                  <label className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                    <input type="checkbox" className="mr-2 rounded" />
                    Career advancement
                  </label>
                  <label className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                    <input type="checkbox" className="mr-2 rounded" />
                    Management quality
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings Area */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Explore Companies</h2>
              <p className="text-sm text-gray-500">
                {/* Will show count when API is connected */}
                Ready to discover your next workplace
              </p>
            </div>

            {/* Placeholder Job Cards - Will be populated with API data */}
            <div className="space-y-4">
              {/* Example Job Card 1 */}
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-200 hover:border-blue-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center font-bold text-blue-900 text-xl">
                      TC
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">Tech Company</h3>
                      <p className="text-sm text-gray-500 mb-2">10,000+ employees • Multiple locations</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Leading technology company specializing in innovative solutions...
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-2xl">⭐</span>
                      <span className="text-xl font-bold text-gray-800">4.2</span>
                    </div>
                    <p className="text-xs text-gray-500">1.2K reviews</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Technology</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Great benefits</span>
                </div>
              </div>

              {/* Placeholder message when no API data */}
              <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-8 text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">More companies coming soon!</h3>
                <p className="text-gray-600 text-sm">
                  We're building the database of companies for you to explore and rate.
                  <br />
                  The search and filter features will be powered by our API integration.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
