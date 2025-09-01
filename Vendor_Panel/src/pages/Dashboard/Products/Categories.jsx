import React, { useState, useEffect, useContext } from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import {
  ReusablePaginationComponent,
  ReusableTableComponent,
} from "../../../components/common/ReusableComponent/ReusableComponent";
import { Icon } from "@iconify-icon/react";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";
import { exportTableData } from "../../../utils/exportUtils";

const Categories = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      const transformedCategories = data.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description || 'No description provided',
        status: category.is_active ? 'Active' : 'Inactive',
        image_url: category.image_url,
        sort_order: category.sort_order,
        created_at: new Date(category.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }));

      setCategories(transformedCategories);
      setFilteredCategories(transformedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedCategories = [...filteredCategories].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredCategories(sortedCategories);
  };

  // Custom Cell for Category (Image + Name)
  const CategoryCell = ({ value, image_url }) => (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        {image_url ? (
          <img src={image_url} alt={value} className="w-full h-full object-cover" />
        ) : (
          <Icon icon="mdi:image" className="text-gray-400 text-lg" />
        )}
      </div>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );

  // Custom Cell for Status (Colored Badge)
  const StatusCell = ({ value }) => {
    let colorClass = "";
    switch (value) {
      case "Active":
        colorClass = "bg-green-100 text-green-800";
        break;
      case "Inactive":
        colorClass = "bg-red-100 text-red-800";
        break;
      case "Draft":
        colorClass = "bg-yellow-100 text-yellow-800";
        break;
      default:
        colorClass = "bg-gray-100 text-gray-800";
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
      >
        {value}
      </span>
    );
  };

  const paginatedData = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      Header: "CATEGORY",
      accessor: "name",
      Cell: ({ value, row }) => <CategoryCell value={value} image_url={row.original.image_url} />,
      sortable: true,
    },
    {
      Header: "DESCRIPTION",
      accessor: "description",
      Cell: ({ value }) => (
        <span className="text-gray-600 text-sm">{value}</span>
      )
    },
    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ value }) => <StatusCell value={value} />,
      sortable: true,
    },
    {
      Header: "CREATED",
      accessor: "created_at",
      Cell: ({ value }) => (
        <span className="text-gray-600 text-sm">{value}</span>
      ),
      sortable: true,
    },
    {
      Header: "ACTION",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={() => handleEditCategory(row.original)}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800 text-sm font-medium"
            onClick={() => handleDeleteCategory(row.original)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowAddModal(true);
  };

  const handleDeleteCategory = async (category) => {
    if (!window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', category.id);

      if (error) throw error;

      await fetchCategories();
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  // Add Category Modal Component
  const AddCategoryModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      image_url: '',
      is_active: true
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
      if (editingCategory) {
        setFormData({
          name: editingCategory.name,
          description: editingCategory.description,
          image_url: editingCategory.image_url || '',
          is_active: editingCategory.status === 'Active'
        });
      } else {
        setFormData({
          name: '',
          description: '',
          image_url: '',
          is_active: true
        });
      }
    }, [editingCategory]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name.trim()) {
        alert('Category name is required');
        return;
      }

      setSaving(true);
      try {
        const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        if (editingCategory) {
          // Update existing category
          const { error } = await supabase
            .from('categories')
            .update({
              name: formData.name,
              slug: slug,
              description: formData.description,
              image_url: formData.image_url || null,
              is_active: formData.is_active
            })
            .eq('id', editingCategory.id);

          if (error) throw error;
        } else {
          // Create new category
          const { error } = await supabase
            .from('categories')
            .insert({
              name: formData.name,
              slug: slug,
              description: formData.description,
              image_url: formData.image_url || null,
              is_active: formData.is_active,
              sort_order: categories.length + 1
            });

          if (error) throw error;
        }

        await fetchCategories();
        setShowAddModal(false);
        setEditingCategory(null);
        alert(`Category ${editingCategory ? 'updated' : 'created'} successfully!`);
      } catch (error) {
        console.error('Error saving category:', error);
        alert('Failed to save category. Please try again.');
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
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingCategory(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <Icon icon="mdi:close" className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
                placeholder="Enter category name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
                placeholder="Enter category description"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
                placeholder="Enter image URL (optional)"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-4 w-4 text-[#C53958] focus:ring-[#C53958] border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCategory(null);
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
                {saving ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}
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
          onClick={fetchCategories}
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
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories ({filteredCategories.length} total)</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportTableData(filteredCategories, columns, 'categories', 'excel')}
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
            Add Category
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
                placeholder="Search categories by name or description..."
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
              onClick={() => handleSort('created_at')}
              className="text-sm flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
            >
              <Icon icon="mdi:calendar" />
              Sort by Date
              {sortConfig.key === 'created_at' && (
                <Icon icon={sortConfig.direction === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Categories List</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {paginatedData.length} of {filteredCategories.length} categories
          </p>
        </div>

        <ReusableTableComponent data={paginatedData} columns={columns} />

        <div className="p-4 border-t border-gray-200">
          <ReusablePaginationComponent
            totalItems={filteredCategories.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <AddCategoryModal />
    </div>
  );
};

export default HOC(Categories);
