import React, { useState, useEffect, useContext } from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import { ReusablePaginationComponent, ReusableTableComponent } from "../../../components/common/ReusableComponent/ReusableComponent";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";
import { exportTableData } from "../../../utils/exportUtils";

// Add User Form Component
const AddUserForm = ({ onClose, onSuccess, userProfile }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipcode: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      setError('First name and email are required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Insert into customers table (vendor-specific)
      const { data, error } = await supabase
        .from('customers')
        .insert({
          vendor_id: userProfile.vendor_id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipcode: formData.zipcode,
          status: 'active',
          total_orders: 0,
          total_spent: 0
        })
        .select()
        .single();

      if (error) throw error;

      onSuccess();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C53958]"
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
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C53958]"
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
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C53958]"
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
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C53958]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C53958]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C53958]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zipcode
          </label>
          <input
            type="text"
            value={formData.zipcode}
            onChange={(e) => setFormData({...formData, zipcode: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C53958]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#A12E47] disabled:opacity-50"
        >
          {saving ? 'Adding...' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

const Users = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user && userProfile) {
      fetchUsers();
    }
  }, [user, userProfile]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Check if we have vendor_id, if not, show empty state
      if (!userProfile?.vendor_id) {
        console.log('No vendor_id found, showing empty state');
        setUsers([]);
        setFilteredUsers([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('vendor_id', userProfile.vendor_id)
        .eq('customer_type', 'user')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match expected format
      const transformedUsers = data.map(customer => ({
        id: customer.id,
        name: `${customer.first_name} ${customer.last_name || ''}`.trim(),
        email: customer.email,
        phone: customer.phone || 'No phone provided',
        address: customer.address ?
          `${customer.address.street || ''}, ${customer.address.city || ''}, ${customer.address.state || ''} ${customer.address.zip || ''}`.trim() :
          'No address provided',
        createdAt: new Date(customer.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        lastActivity: customer.last_order_date ?
          new Date(customer.last_order_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'No recent activity',
        isActive: customer.is_active,
        totalOrders: customer.total_orders || 0,
        totalSpent: customer.total_spent ? `$${parseFloat(customer.total_spent).toFixed(2)}` : '$0.00'
      }));

      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sortedUsers);
  };

  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      Header: "NAME",
      accessor: "name",
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
            <div className="text-sm text-gray-500">{row.original.phone}</div>
          </div>
        </div>
      ),
    },
    {
      Header: "EMAIL ADDRESS",
      accessor: "email",
      sortable: true,
      Cell: ({ value }) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      Header: "COMPLETE ADDRESS",
      accessor: "address",
      Cell: ({ value }) => (
        <span className="text-gray-600 text-sm">{value}</span>
      ),
    },
    {
      Header: "CREATED AT",
      accessor: "createdAt",
      sortable: true,
      Cell: ({ value }) => (
        <span className="text-gray-600">{value}</span>
      ),
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
      ),
    },
    {
      Header: "ACTION",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-[#D64860] hover:text-[#D64860] text-sm font-medium"
            onClick={() => handleViewDetails(row.original)}
          >
            View
          </button>
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={() => handleEditUser(row.original)}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (user) => {
    // TODO: Implement user details modal or navigation
    console.log('View user details:', user);
  };

  const handleEditUser = (user) => {
    // TODO: Implement user edit functionality
    console.log('Edit user:', user);
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
          onClick={fetchUsers}
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
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage your customer users ({filteredUsers.length} total)</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportTableData(filteredUsers, columns, 'customer-users', 'excel')}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Icon icon="mdi:download" />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#C53958] hover:bg-[#A12E47] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Icon icon="mdi:plus" />
            Add User
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleSort('name')}
              className="text-sm flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
            >
              <Icon icon="mdi:sort" />
              Sort by Name
              {sortConfig.key === 'name' && (
                <Icon icon={sortConfig.direction === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'} />
              )}
            </button>
            <button
              onClick={() => handleSort('createdAt')}
              className="text-sm flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
            >
              <Icon icon="mdi:calendar" />
              Sort by Date
              {sortConfig.key === 'createdAt' && (
                <Icon icon={sortConfig.direction === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {paginatedData.length} of {filteredUsers.length} users
          </p>
        </div>

        <ReusableTableComponent data={paginatedData} columns={columns} />

        <div className="p-4 border-t border-gray-200">
          <ReusablePaginationComponent
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New User</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>
            <AddUserForm
              onClose={() => setShowAddModal(false)}
              onSuccess={() => {
                setShowAddModal(false);
                fetchUsers();
              }}
              userProfile={userProfile}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HOC(Users);
