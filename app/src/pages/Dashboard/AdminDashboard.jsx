import { Outlet, Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 bg-gray-100 border border-gray-400 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            <Link 
              to="/admin" 
              className="block px-4 py-2 rounded hover:bg-gray-300"
            >
              Blog Posts
            </Link>
            <Link 
              to="/admin/profile" 
              className="block px-4 py-2 rounded hover:bg-gray-300"
            >
              Profile
            </Link>
          </nav>
        </aside>
        
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;