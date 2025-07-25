import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-[#01CAFE] w-8/12 mx-auto my-1 px-2 rounded-[30px] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Blog App</Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/blogs" className="hover:underline">Blogs</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="hover:underline">Dashboard</Link>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-[10px]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-green-600 rounded-[20px] hover:bg-green-500 px-4 py-1 ">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;