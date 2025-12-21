import { Edit, Trash2, Plus } from "lucide-react";
import {useState} from "react";
import UserModal from "./UserModal";

const UserTable = ({
  users,
  setUsers,
  getStatusColor,
  searchQuery
}) => {

  const [editingUser, setEditingUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const [userForm, setUserForm] = useState({
      name: '',
      email: '',
      role: 'user',
      status: 'Active'
    });

  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({
      name: '',
      email: '',
      mobileNumber:'',
      role: 'user',
      status: 'Active'
    });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) {
      alert('Please fill all fields');
      return;
    }

    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...userForm }
          : u
      ));
      alert('User updated successfully!');
    } else {
      const newUser = {
        id: users.length + 1,
        ...userForm,
        joined: new Date().toISOString().split('T')[0],
        orders: 0
      };
      setUsers([...users, newUser]);
      alert('User added successfully!');
    }
    setShowUserModal(false);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
                  <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    {
                      showUserModal && <UserModal
                                              editingUser={editingUser}
                                              userForm={userForm}
                                              setUserForm={setUserForm}
                                              handleSaveUser={handleSaveUser}
                                              setShowUserModal={setShowUserModal} />
                    }
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
                      <p className="text-gray-600 mt-1">Manage all registered users</p>
                    </div>
                    <button
                      onClick={handleAddUser}
                      className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add User</span>
                    </button>
                  </div>
    
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="text-left p-4 text-sm font-semibold text-gray-600">Name</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-600">Email</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-600">Mobile Number</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-600">Role</th>

                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="p-4 text-sm font-semibold text-gray-800">{user.name}</td>
                              <td className="p-4 text-sm text-gray-700">{user.email}</td>
                              <td className="p-4 text-sm text-gray-700">{user.mobileNumber}</td>
                              <td className="p-4 text-sm text-gray-700">{user.role}</td>
                              
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
  );
};

export default UserTable;
