import { Navigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import UsersModal from '../../components/UsersModal';

export default function Users() {
  const { isAdmin } = useOutletContext();
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('isAdmin:', isAdmin);

  const handleSearch = async () => {
    if (!email.trim()) return;
    
    setLoading(true);
    setError('');
    setUserInfo(null);

    try {
      const token = localStorage.getItem('token');
      console.log('Making API call with email:', email);

      const response = await fetch(`http://localhost:5000/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('User not found');
      
      const allUsers = await response.json();
      console.log('All users:', allUsers);

      // Find the specific user by email
      const foundUser = allUsers.find(user => user.email === email);
      
      if (!foundUser) {
        throw new Error('User not found');
      }

      console.log('Found user object:', foundUser);
      setUserInfo(foundUser);
    } catch (err) {
      console.error('Error:', err);
      setError('User not found or error occurred');
    } finally {
      setLoading(false);
    }
  };

  if(!isAdmin) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className="w-full">
      <div className="flex justify-center p-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white p-2 rounded-xl w-fit px-5 hover:bg-primary/80 transition-colors duration-200"
        >
          Search User
        </button>
      </div>

      {isModalOpen && (
        <UsersModal 
          onClose={() => setIsModalOpen(false)}
          email={email}
          setEmail={setEmail}
          userInfo={userInfo}
          loading={loading}
          error={error}
          handleSearch={handleSearch}
        />
      )}
      <div className="p-6">
        <table className="w-full text-left text-gray-200">
          <thead className="uppercase bg-[#172554]/70 text-gray-200">
            <tr>
              <th className="px-6 py-3 rounded-tl-lg">Nr</th>
              <th className="px-6 py-3">Name/Surname</th>
              <th className="px-6 py-3">Account Type</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3 rounded-tr-lg">Zip Code</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#60a5fa]/10 border-b border-gray-700 ">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4 font-medium">Labinot Paqarada</td>
              <td className="px-6 py-4">credit</td>
              <td className="px-6 py-4">admin</td>
              <td className="px-6 py-4">active</td>
              <td className="px-6 py-4">Prishtina</td>
              <td className="px-6 py-4">5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

