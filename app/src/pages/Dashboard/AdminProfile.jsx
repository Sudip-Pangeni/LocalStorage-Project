import { useAuth } from '../../context/AuthContext';

const AdminProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-gray-900">{user?.email}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="mt-1 text-gray-900">Administrator</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminProfile;