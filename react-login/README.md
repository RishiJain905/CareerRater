# React Login Page for CareerRater

A React-based login/signup system with Tailwind CSS styling and backend integration.

## Setup Instructions

### 1. Install Dependencies
```powershell
cd react-login
npm install
```

### 2. Start Development Server
```powershell
npm start
```

The app will open at `http://localhost:3000`

## Features Built

✅ **React Components**:
- `LoginForm` - Email/password login with validation
- `SignupForm` - Name/email/password signup with confirmation
- `Message` - Success/error message display
- `App` - Main component managing state and form switching

✅ **Tailwind CSS Styling**:
- Responsive design
- Gradient backgrounds
- Smooth animations and transitions
- Form validation styling
- Modern component design

✅ **Browser Validation**:
- Email format validation
- Password length (minimum 8 characters)
- Strong password requirements (uppercase, lowercase, numbers)
- Password confirmation matching
- Real-time error display

✅ **Backend Integration**:
- Fetch API for HTTP requests
- POST requests to login/signup endpoints
- Loading states during requests
- Error handling for network issues

✅ **Success/Error Handling**:
- Success → stores JWT token and redirects
- Error → displays specific error messages
- Auto-clearing messages after 5 seconds

## Backend API Expected

The React app expects these endpoints:
- `POST http://localhost:3000/api/auth/login`
- `POST http://localhost:3000/api/auth/signup`

## File Structure
```
react-login/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LoginForm.js
│   │   ├── SignupForm.js
│   │   └── Message.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── tailwind.config.js
```

## Usage

1. **Login Form**: Email + password validation, remember me option
2. **Signup Form**: Name, email, password, confirm password, terms agreement
3. **Form Switching**: Click links to switch between login/signup
4. **Validation**: Real-time validation as user types
5. **Backend Communication**: Sends data to API and handles responses
