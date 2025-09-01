import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify-icon/react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import {
  ReusablePaginationComponent,
  ReusableTableComponent,
} from "../../../components/common/ReusableComponent/ReusableComponent";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";

const UserRole = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoles, setUserRoles] = useState([]);
  const [filteredUserRoles, setFilteredUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user) {
      fetchUserRoles();
    }
  }, [user]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, userRoles]);

  const fetchUserRoles = async () => {
    try {
      setLoading(true);
      // Get all users - for admin/vendor management
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedUsers = data.map(user => ({
        id: user.id,
        userName: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'No Name',
        emailAddress: user.email,
        userRole: user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'User',
        phoneNumber: user.phone || 'No phone provided',
        dateAdd: new Date(user.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        isActive: user.is_active !== false // Default to true if null
      }));

      setUserRoles(transformedUsers);
      setFilteredUserRoles(transformedUsers);
    } catch (error) {
      console.error("Error fetching user roles:", error);
      setError("Failed to load user roles");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredUserRoles(userRoles);
      return;
    }

    const filtered = userRoles.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userRole.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUserRoles(filtered);
    setCurrentPage(1);
  };

  const paginatedData = filteredUserRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteUser = async (userToDelete) => {
    if (!window.confirm(`Are you sure you want to delete "${userToDelete.userName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userToDelete.id);

      if (error) throw error;

      await fetchUserRoles();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setShowAddModal(true);
  };

  const columns = [
    {
      Header: "USER NAME",
      accessor: "userName",
      sortable: true,
      Cell: ({ value, row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {value.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.original.phoneNumber}</div>
          </div>
        </div>
      )
    },
    {
      Header: "EMAIL ADDRESS",
      accessor: "emailAddress",
      sortable: true,
      Cell: ({ value }) => (
        <span className="text-gray-900">{value}</span>
      )
    },
    {
      Header: "USER ROLE",
      accessor: "userRole",
      sortable: true,
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Admin' ? 'bg-red-100 text-red-800' :
          value === 'Vendor' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      Header: "PHONE NUMBER",
      accessor: "phoneNumber",
      Cell: ({ value }) => (
        <span className="text-gray-600">{value}</span>
      )
    },
    {
      Header: "DATE ADDED",
      accessor: "dateAdd",
      sortable: true,
      Cell: ({ value }) => (
        <span className="text-gray-600">{value}</span>
      )
    },
    {
      Header: "STATUS",
      accessor: "isActive",
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      Header: "ACTION",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={() => handleEditUser(row.original)}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800 text-sm font-medium"
            onClick={() => handleDeleteUser(row.original)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  // Add User Modal Component
  const AddUserModal = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'user',
      isActive: true
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
      if (editingUser) {
        const [firstName, ...lastNameParts] = editingUser.userName.split(' ');
        setFormData({
          firstName: firstName || '',
          lastName: lastNameParts.join(' ') || '',
          email: editingUser.emailAddress,
          phone: editingUser.phoneNumber === 'No phone provided' ? '' : editingUser.phoneNumber,
          role: editingUser.userRole.toLowerCase(),
          isActive: editingUser.isActive
        });
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          role: 'user',
          isActive: true
        });
      }
    }, [editingUser]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.firstName.trim() || !formData.email.trim()) {
        alert('First name and email are required');
        return;
      }

      setSaving(true);
      try {
        if (editingUser) {
          // Update existing user
          const { error } = await supabase
            .from('users')
            .update({
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              phone: formData.phone || null,
              role: formData.role,
              is_active: formData.isActive
            })
            .eq('id', editingUser.id);

          if (error) throw error;
        } else {
          // Create new user
          const { error } = await supabase
            .from('users')
            .insert({
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              phone: formData.phone || null,
              role: formData.role,
              is_active: formData.isActive
            });

          if (error) throw error;
        }

        await fetchUserRoles();
        setShowAddModal(false);
        setEditingUser(null);
        alert(`User ${editingUser ? 'updated' : 'created'} successfully!`);
      } catch (error) {
        console.error('Error saving user:', error);
        alert('Failed to save user. Please try again.');
      } finally {
        setSaving(false);
      }
    };

    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingUser(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <Icon icon="mdi:close" className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
                <option value="cashier">Cashier</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-[#C53958] focus:ring-[#C53958] border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#A12E47] disabled:opacity-50"
              >
                {saving ? 'Saving...' : (editingUser ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C53958]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
        <button
          onClick={fetchUserRoles}
          className="ml-4 text-sm bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Roles</h1>
          <p className="text-gray-600 mt-1">Manage user roles and permissions ({filteredUserRoles.length} total)</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            <Icon icon="mdi:download" />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#C53958] hover:bg-[#A12E47] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Icon icon="mingcute:user-add-line" />
            Add User Role
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">User Roles List</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {paginatedData.length} of {filteredUserRoles.length} users
          </p>
        </div>

        <ReusableTableComponent data={paginatedData} columns={columns} />

        <div className="p-4 border-t border-gray-200">
          <ReusablePaginationComponent
            totalItems={filteredUserRoles.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <AddUserModal />
    </div>
  );
};

export default HOC(UserRole);
