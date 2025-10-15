# Services Documentation

## Overview
This folder contains all reusable services for API calls and data management.

## Files

### `companyService.js`
Handles company data enrichment and API integration.

**Functions:**
- `enrichCompanyData(companyName, domain)` - Get company logo and details
- `searchCompanies(query)` - Search companies (Supabase integration coming)
- `addCompany(companyData)` - Add new company to database
- `getCompanyById(id)` - Get company by ID
- `submitCompanyReview(id, rating, review)` - Submit a review

**Usage:**
```javascript
import { enrichCompanyData, addCompany } from '../services/companyService';

// Get company details with logo
const companyData = await enrichCompanyData('Netflix', 'netflix.com');

// Add a new company
const newCompany = await addCompany({ name: 'Shopify', domain: 'shopify.com' });
```

### `localCompanyDB.js`
Manages seed data (20 pre-populated companies) until Supabase is ready.

**Functions:**
- `getAllCompanies()` - Get all 20 companies
- `searchLocalCompanies(query)` - Search by name, industry, location
- `getCompanyById(id)` - Get specific company
- `filterCompanies(filters)` - Filter by location, industry, size, rating
- `getTopRatedCompanies(limit)` - Get highest rated companies
- `getCompaniesByIndustry(industry)` - Filter by industry

**Usage:**
```javascript
import { searchLocalCompanies, filterCompanies } from '../services/localCompanyDB';

// Search
const results = searchLocalCompanies('Google');

// Filter
const filtered = filterCompanies({
  location: 'Canada',
  industry: 'Technology',
  rating: '4'
});
```

## Example: Use in HomePage

```javascript
import React, { useState, useEffect } from 'react';
import { searchLocalCompanies, filterCompanies } from '../services/localCompanyDB';

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load all companies on mount
    const allCompanies = searchLocalCompanies('');
    setCompanies(allCompanies);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = searchLocalCompanies(query);
    setCompanies(results);
  };

  return (
    <div>
      <input 
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search companies..."
      />
      
      {companies.map(company => (
        <div key={company.id}>
          <img src={company.logo} alt={company.name} />
          <h3>{company.name}</h3>
          <p>{company.industry}</p>
          <p>Rating: {company.rating}⭐ ({company.reviewCount} reviews)</p>
        </div>
      ))}
    </div>
  );
};
```

## Future Integration

When Supabase is ready:
1. Replace `localCompanyDB.js` calls with `companyService.js` functions
2. Add Clearbit API key to `.env.local`:
   ```
   REACT_APP_CLEARBIT_API_KEY=your_key_here
   ```
3. Uncomment Clearbit integration in `companyService.js`
4. Seed data will automatically sync to Supabase

## Where to Use These Services

✅ **HomePage** - Display and search companies
✅ **CompanyPage** - Show individual company details
✅ **ReviewForm** - Add new companies when reviewing
✅ **SearchComponent** - Autocomplete suggestions
✅ **Any component** that needs company data!

## Benefits

- ✅ **Centralized logic** - All API calls in one place
- ✅ **Reusable** - Import anywhere in your app
- ✅ **Easy to upgrade** - Switch to Supabase without changing components
- ✅ **Type-safe** - Consistent data structure
- ✅ **Testable** - Easy to mock for testing
