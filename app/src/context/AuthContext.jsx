import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Remove useNavigate from here and handle navigation in components instead

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser(decoded);
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
    }
  }, []);

  const login = (email, password) => {
    // Hardcoded credentials
    const hardcodedCredentials = {
      email: 'admin@example.com',
      password: 'password123'
    };

    if (email === hardcodedCredentials.email && password === hardcodedCredentials.password) {
      const token = generateMockJWT(email);
      Cookies.set('authToken', token, { expires: 1/24 }); // Expires in 1 hour
      setIsAuthenticated(true);
      setUser({ email });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const generateMockJWT = (email) => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { 
      email,
      exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    };
    
    const fakeSignature = 'mock-signature';
    
    return [
      btoa(JSON.stringify(header)),
      btoa(JSON.stringify(payload)),
      fakeSignature
    ].join('.');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout: handleLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);