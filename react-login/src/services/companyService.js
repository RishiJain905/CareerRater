/**
 * Company Service
 * Handles all company-related API calls and data enrichment
 */

// For now, using a free logo service. Later can integrate Clearbit API
const CLEARBIT_LOGO_API = 'https://logo.clearbit.com';

/**
 * Enrich company data by fetching logo and additional info
 * @param {string} companyName - Name of the company
 * @param {string} companyDomain - Company website domain (optional)
 * @returns {Promise<Object>} Enriched company data
 */
export const enrichCompanyData = async (companyName, companyDomain = null) => {
  try {
    // If domain is provided, use it. Otherwise, try to guess from company name
    const domain = companyDomain || guessCompanyDomain(companyName);
    
    // For now, just get the logo (free, no API key needed)
    const logo = `${CLEARBIT_LOGO_API}/${domain}`;
    
    // TODO: When you get Clearbit API key, uncomment this:
    // const clearbitData = await fetchClearbitData(domain);
    
    return {
      name: companyName,
      logo: logo,
      domain: domain,
      // Placeholder data (will be from API later)
      employees: 'Unknown',
      industry: 'Other',
      location: 'Unknown',
      description: `${companyName} - Add your review to help others learn about this company.`
    };
  } catch (error) {
    console.error('Error enriching company data:', error);
    return getFallbackCompanyData(companyName);
  }
};

/**
 * Fetch company data from Clearbit API (requires API key)
 * Uncomment when you have Clearbit API key
 */
/*
const fetchClearbitData = async (domain) => {
  const CLEARBIT_API_KEY = process.env.REACT_APP_CLEARBIT_API_KEY;
  
  const response = await fetch(
    `https://company.clearbit.com/v2/companies/find?domain=${domain}`,
    {
      headers: {
        'Authorization': `Bearer ${CLEARBIT_API_KEY}`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Clearbit API request failed');
  }
  
  const data = await response.json();
  
  return {
    name: data.name,
    logo: data.logo,
    domain: data.domain,
    employees: data.metrics?.employees || 'Unknown',
    industry: data.category?.industry || 'Other',
    location: `${data.geo?.city || ''}, ${data.geo?.country || ''}`.trim(),
    description: data.description || ''
  };
};
*/

/**
 * Guess company domain from name
 * @param {string} companyName 
 * @returns {string} Guessed domain
 */
const guessCompanyDomain = (companyName) => {
  // Remove common company suffixes and convert to lowercase
  const cleaned = companyName
    .toLowerCase()
    .replace(/\s+(inc|llc|ltd|corp|corporation|company|co)\s*$/i, '')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  
  return `${cleaned}.com`;
};

/**
 * Fallback data when API fails or is unavailable
 * @param {string} companyName 
 * @returns {Object} Basic company data
 */
const getFallbackCompanyData = (companyName) => {
  // Use UI Avatars as fallback for logo
  const fallbackLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&size=200&background=1e3a8a&color=fff&bold=true`;
  
  return {
    name: companyName,
    logo: fallbackLogo,
    domain: guessCompanyDomain(companyName),
    employees: 'Unknown',
    industry: 'Other',
    location: 'Unknown',
    description: `${companyName} - Add your review to help others learn about this company.`
  };
};

/**
 * Search companies (will integrate with Supabase later)
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of companies
 */
export const searchCompanies = async (query) => {
  // TODO: Replace with Supabase query when backend is ready
  // For now, return empty array or mock data
  
  // Later this will be:
  // const { data, error } = await supabase
  //   .from('companies')
  //   .select('*')
  //   .ilike('name', `%${query}%`)
  //   .limit(10);
  
  return [];
};

/**
 * Add a new company to the database
 * @param {Object} companyData - Company data
 * @returns {Promise<Object>} Created company
 */
export const addCompany = async (companyData) => {
  // TODO: Integrate with Supabase
  // For now, just return the enriched data
  
  const enriched = await enrichCompanyData(companyData.name, companyData.domain);
  
  // Later this will be:
  // const { data, error } = await supabase
  //   .from('companies')
  //   .insert([enriched])
  //   .select();
  
  console.log('Company would be added:', enriched);
  return enriched;
};

/**
 * Get company by ID
 * @param {number} companyId 
 * @returns {Promise<Object>} Company data
 */
export const getCompanyById = async (companyId) => {
  // TODO: Integrate with Supabase
  // const { data, error } = await supabase
  //   .from('companies')
  //   .select('*')
  //   .eq('id', companyId)
  //   .single();
  
  return null;
};

/**
 * Update company rating
 * @param {number} companyId 
 * @param {number} rating 
 * @param {string} review 
 * @returns {Promise<Object>}
 */
export const submitCompanyReview = async (companyId, rating, review) => {
  // TODO: Integrate with Supabase
  // const { data, error } = await supabase
  //   .from('reviews')
  //   .insert([{
  //     company_id: companyId,
  //     rating: rating,
  //     review: review,
  //     user_id: currentUserId
  //   }]);
  
  console.log('Review would be submitted:', { companyId, rating, review });
  return { success: true };
};
