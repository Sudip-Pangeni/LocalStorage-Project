import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogListPage from '../src/pages/BlogListPage';
import SingleBlogPage from './pages/SingleBlogPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import BlogListTable from './pages/Dashboard/BlogListTable';
import AdminProfile from './pages/Dashboard/AdminProfile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <Header />
          <main className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/blogs" element={<BlogListPage />} />
              <Route path="/blogs/:id" element={<SingleBlogPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                <Route index element={<BlogListTable />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;