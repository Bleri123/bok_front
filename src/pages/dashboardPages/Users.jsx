import { Navigate, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UsersModal from '../../components/UsersModal';
import AddUserModal from '../../components/AddUserModal';
import AccountsModal from '../../components/accountsModal';

export default function Users() {
  const { isAdmin } = useOutletContext();
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // State for Add User modal
  const [showAccountsModal, setshowAccountsModal] = useState(false);
  //This is used when showAccountsModal is shown so that we know which user we are talking about
  const [currentUserId, setCurrentUserId] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // State to hold all users

  console.log("isAdmin:", isAdmin);

  // Move fetchAllUsers function outside of useEffect
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();

      setAllUsers(users); // Store all users in state
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchAllUsers in useEffect
  useEffect(() => {
    fetchAllUsers(); // Call the function to fetch users
  }, []);

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
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('User not found');

      const allUsers = await response.json();
      console.log('All users:', allUsers);

      // Find the specific user by email
      const foundUser = allUsers.find((user) => user.email === email);

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

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="w-full overflow-hidden">
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

      {isAddUserModalOpen && ( // Render Add User modal
        <AddUserModal
          onClose={() => setIsAddUserModalOpen(false)}
          onUserRegistrationSuccess={() => {
            fetchAllUsers();
          }}
        />
      )}

      {
        showAccountsModal && <AccountsModal userId={currentUserId} isVisible={showAccountsModal} setIsVisible={setshowAccountsModal}/>
      }

      <div className="overflow-x-auto text-xs lg:text-sm xl:text-lg 2xl:text-xl">
        <table className="w-full text-center text-gray-200">
          <thead className="uppercase bg-[#172554]/70 text-gray-200">
            <tr>
              <th className="px-2 py-3 rounded-tl-lg">Nr</th>
              <th className="px-2 py-3">Name/Surname</th>
              <th className="px-2 py-3">Email</th>
              <th className="px-2 py-3">Account Type</th>
              <th className="px-2 py-3">Role</th>
              <th className="px-2 py-3">Status</th>
              <th className="px-2 py-3">City</th>
              <th className="px-2 py-3">Zip Code</th>
              <th className="px-2 py-3 rounded-tr-lg">
                <button
                  onClick={() => setIsAddUserModalOpen(true)} // Open the modal when "+" is clicked
                  className="bg-balancebg2 rounded w-[70px]"
                >
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr
                key={user.id}
                className="bg-[#60a5fa]/10 border-b border-gray-700"
              >
                <td className="px-2 py-4">{index + 1}</td>{' '}
                {/* Display row number */}
                <td className="px-2 py-4 font-medium">
                  {user.first_name} {user.last_name}
                </td>{" "}
                <td className="px-2 py-4">{user.email}</td>{' '}
                <td
                  className="px-2 py-4 text-slate-200 font-bold cursor-pointer"
                  onClick={() => {
                    setshowAccountsModal(true);
                    setCurrentUserId(user.id);
                  }}
                >
                  accounts
                </td>{' '}
                <td className="px-2 py-4">{user.role_name}</td>{' '}
                <td className="px-2 py-4">{user.user_account_status}</td>{" "}
                <td className="px-2 py-4">{user.city}</td>{' '}
                <td className="px-2 py-4">{user.zip_code}</td>{' '}

                <td className="px-2 py-4">
                  <button className="bg-primary rounded w-[70px]">Edit</button>
                </td>{' '}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
