/**
 * Local Company Database
 * Uses seed data until Supabase is integrated
 */

import seedCompanies from '../data/companies.json';

/**
 * Get all companies from seed data
 * @returns {Array} All companies
 */
export const getAllCompanies = () => {
  return seedCompanies;
};

/**
 * Search companies by name or industry
 * @param {string} query - Search query
 * @returns {Array} Filtered companies
 */
export const searchLocalCompanies = (query) => {
  if (!query || query.trim() === '') {
    return seedCompanies;
  }

  const lowerQuery = query.toLowerCase();
  
  return seedCompanies.filter(company => 
    company.name.toLowerCase().includes(lowerQuery) ||
    company.industry.toLowerCase().includes(lowerQuery) ||
    company.location.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get company by ID
 * @param {number} id - Company ID
 * @returns {Object|null} Company or null
 */
export const getCompanyById = (id) => {
  return seedCompanies.find(company => company.id === id) || null;
};

/**
 * Filter companies by criteria
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered companies
 */
export const filterCompanies = (filters) => {
  let results = [...seedCompanies];

  // Filter by location
  if (filters.location && filters.location !== '') {
    results = results.filter(company => 
      company.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  // Filter by industry
  if (filters.industry && filters.industry !== '') {
    results = results.filter(company => 
      company.industry.toLowerCase().includes(filters.industry.toLowerCase())
    );
  }

  // Filter by company size
  if (filters.companySize && filters.companySize !== '') {
    results = results.filter(company => {
      const employeeCount = parseInt(company.employees.replace(/[^0-9]/g, ''));
      
      switch(filters.companySize) {
        case '1-50':
          return employeeCount <= 50;
        case '51-200':
          return employeeCount > 50 && employeeCount <= 200;
        case '201-1000':
          return employeeCount > 200 && employeeCount <= 1000;
        case '1001-10000':
          return employeeCount > 1000 && employeeCount <= 10000;
        case '10001+':
          return employeeCount > 10000;
        default:
          return true;
      }
    });
  }

  // Filter by minimum rating
  if (filters.rating && filters.rating !== '') {
    const minRating = parseFloat(filters.rating);
    results = results.filter(company => company.rating >= minRating);
  }

  return results;
};

/**
 * Get top rated companies
 * @param {number} limit - Number of companies to return
 * @returns {Array} Top rated companies
 */
export const getTopRatedCompanies = (limit = 10) => {
  return [...seedCompanies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

/**
 * Get companies by industry
 * @param {string} industry - Industry name
 * @returns {Array} Companies in that industry
 */
export const getCompaniesByIndustry = (industry) => {
  return seedCompanies.filter(company => 
    company.industry.toLowerCase().includes(industry.toLowerCase())
  );
};
