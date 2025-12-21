import { Edit, Trash2, Plus } from "lucide-react";
import {useState} from "react";
import UserModal from "./UserModal";

const UserTable = ({
  users,
  setUsers,
  getStatusColor,
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
      role: 'user',
      status: 'Active'
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
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

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      alert('User deleted successfully!');
    }
  };
  
  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
          <p className="text-gray-600 mt-1">
            Manage all registered users
          </p>
        </div>

        <button
          onClick={handleAddUser}
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 
                     bg-gradient-to-r from-blue-500 to-purple-600 
                     text-white rounded-lg hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* User Modal*/}
      {showUserModal &&
        <UserModal editingUser={editingUser}
                  setShowUserModal={setShowUserModal}
                  setUserForm={setUserForm}
                  userForm={userForm}
                  handleSaveUser={handleSaveUser}/>
      }

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Joined
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Orders
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users?.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-6 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users?.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-4 text-sm font-semibold text-gray-800">
                      {user.name}
                    </td>

                    <td className="p-4 text-sm text-gray-700">
                      {user.email}
                    </td>

                    <td className="p-4 text-sm text-gray-700">
                      {user.role}
                    </td>

                    <td className="p-4 text-sm text-gray-700">
                      {user.joined}
                    </td>

                    <td className="p-4 text-sm text-gray-700">
                      {user.orders}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserTable;
