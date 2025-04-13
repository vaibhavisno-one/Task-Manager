// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// // Page components
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import NotFound from './pages/NotFound';

// // Create Auth Context
// export const AuthContext = createContext();

// // Custom hook to use Auth Context
// export const useAuth = () => useContext(AuthContext);

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
  
//   // Show loading state if still checking auth status
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// };

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // Check for existing auth on mount (simulating token check)
//   useEffect(() => {
//     const checkAuth = () => {
//       // Check localStorage for token
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         // In a real app, you would validate the token here
//         setIsAuthenticated(true);
//         // Mock user data
//         setUser({ name: 'User', email: localStorage.getItem('userEmail') || 'user@example.com' });
//       }
//       setLoading(false);
//     };
    
//     checkAuth();
//   }, []);
  
//   // Login handler
//   const handleLogin = (email, password) => {
//     // Simulate authentication API call
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         // Simple validation (would be server-side in real app)
//         if (email && password) {
//           // Store auth data
//           localStorage.setItem('authToken', 'mock-jwt-token');
//           localStorage.setItem('userEmail', email);
          
//           // Update state
//           setUser({ name: 'User', email });
//           setIsAuthenticated(true);
//           resolve(true);
//         } else {
//           reject(new Error('Invalid credentials'));
//         }
//       }, 1000); // Simulate network delay
//     });
//   };
  
//   // Register handler
//   const handleRegister = (name, email, password) => {
//     // Simulate registration API call
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         // Simple validation (would be server-side in real app)
//         if (name && email && password) {
//           // Store auth data
//           localStorage.setItem('authToken', 'mock-jwt-token');
//           localStorage.setItem('userEmail', email);
          
//           // Update state
//           setUser({ name, email });
//           setIsAuthenticated(true);
//           resolve(true);
//         } else {
//           reject(new Error('Invalid registration data'));
//         }
//       }, 1000); // Simulate network delay
//     });
//   };
  
//   // Logout handler
//   const handleLogout = () => {
//     // Clear stored auth data
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userEmail');
    
//     // Update state
//     setUser(null);
//     setIsAuthenticated(false);
//   };
  
//   // Auth context value
//   const authContextValue = {
//     isAuthenticated,
//     user,
//     loading,
//     login: handleLogin,
//     register: handleRegister,
//     logout: handleLogout
//   };
  
//   return (
//     <AuthContext.Provider value={authContextValue}>
//       <BrowserRouter>
//         <Routes>
//           {/* Public routes */}
//           <Route 
//             path="/login" 
//             element={
//               isAuthenticated ? 
//                 <Navigate to="/" replace /> : 
//                 <Login onLogin={handleLogin} />
//             } 
//           />
//           <Route 
//             path="/register" 
//             element={
//               isAuthenticated ? 
//                 <Navigate to="/" replace /> : 
//                 <Register onRegister={handleRegister} />
//             } 
//           />
          
//           {/* Protected routes */}
//           <Route 
//             path="/" 
//             element={
//               <ProtectedRoute>
//                 <Dashboard user={user} onLogout={handleLogout} />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* 404 route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthContext.Provider>
//   );
// };

// export default App;

import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Page components
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// Create Auth Context
export const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state if still checking auth status
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing auth on mount (simulating token check)
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        setUser({ name: 'User', email: localStorage.getItem('userEmail') || 'user@example.com' });
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Login handler
  const handleLogin = (formData) => {
    // Simulate authentication API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password } = formData;
        
        if (email && password) {
          // Simulate success and store auth data
          localStorage.setItem('authToken', 'mock-jwt-token');
          localStorage.setItem('userEmail', email);
          
          setUser({ name: 'User', email });
          setIsAuthenticated(true);
          resolve(true);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  // Register handler
  const handleRegister = (formData) => {
    // Simulate registration API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { name, email, password } = formData;
        
        if (name && email && password) {
          // Simulate success and store auth data
          localStorage.setItem('authToken', 'mock-jwt-token');
          localStorage.setItem('userEmail', email);
          
          setUser({ name, email });
          setIsAuthenticated(true);
          resolve(true);
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 1000);
    });
  };
  
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Auth context value
  const authContextValue = {
    isAuthenticated,
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Register onRegister={handleRegister} />
            } 
          />
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
