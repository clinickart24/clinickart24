import React, { useState, useEffect, useContext } from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import {
  ReusablePaginationComponent,
  ReusableTableComponent,
} from "../../../components/common/ReusableComponent/ReusableComponent";
import { Icon } from "@iconify-icon/react";
import images from "../../../lib/exportImages";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";

const Products = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    if (user && userProfile?.vendor_id) {
      fetchProducts();
      fetchCategories();
    }
  }, [user, userProfile]);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, statusFilter, categoryFilter, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name)
        `)
        .eq('vendor_id', userProfile.vendor_id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match the expected format
      const transformedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        category: product.categories?.name || 'Uncategorized',
        category_id: product.category_id,
        status: product.status || 'draft',
        stock: product.inventory || 0,
        price: parseFloat(product.price || 0),
        compare_price: parseFloat(product.compare_price || 0),
        priceDisplay: `$${parseFloat(product.price || 0).toFixed(2)}`,
        image: product.images?.[0] || images.homePage.login.dashboard.products.images[0].image,
        description: product.description,
        created_at: new Date(product.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }));

      setProducts(transformedProducts);
      setFilteredProducts(transformedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFilter = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category_id === categoryFilter);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (key === 'price') {
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (key === 'stock') {
        return direction === 'asc' ? a.stock - b.stock : b.stock - a.stock;
      }
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) throw error;

      await fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const paginatedData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const ProductCell = ({ value, image, description }) => (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={value} className="w-full h-full object-cover" />
        ) : (
          <Icon icon="mdi:image" className="text-gray-400 text-lg" />
        )}
      </div>
      <div>
        <div className="font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500 truncate max-w-xs">
          {description || 'No description'}
        </div>
      </div>
    </div>
  );

  const StatusCell = ({ value }) => {
    let colorClass = "";
    switch (value?.toLowerCase()) {
      case "active":
      case "published":
        colorClass = "bg-green-100 text-green-800";
        break;
      case "draft":
        colorClass = "bg-yellow-100 text-yellow-800";
        break;
      case "out_of_stock":
        colorClass = "bg-red-100 text-red-800";
        break;
      case "scheduled":
        colorClass = "bg-blue-100 text-blue-800";
        break;
      default:
        colorClass = "bg-gray-100 text-gray-800";
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
      >
        {value?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown'}
      </span>
    );
  };

  const StockCell = ({ value }) => {
    let colorClass = "text-gray-900";
    if (value === 0) {
      colorClass = "text-red-600 font-medium";
    } else if (value < 10) {
      colorClass = "text-yellow-600 font-medium";
    } else if (value > 100) {
      colorClass = "text-green-600 font-medium";
    }

    return (
      <span className={colorClass}>
        {value} {value === 0 ? '(Out of Stock)' : value < 10 ? '(Low Stock)' : ''}
      </span>
    );
  };

  const columns = [
    {
      Header: "PRODUCT",
      accessor: "name",
      Cell: ({ value, row }) => (
        <ProductCell
          value={value}
          image={row.original.image}
          description={row.original.description}
        />
      ),
      sortable: true,
    },
    {
      Header: "CATEGORY",
      accessor: "category",
      sortable: true,
      Cell: ({ value }) => (
        <span className="text-gray-900">{value}</span>
      )
    },
    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ value }) => <StatusCell value={value} />,
      sortable: true,
    },
    {
      Header: "STOCK",
      accessor: "stock",
      sortable: true,
      Cell: ({ value }) => <StockCell value={value} />
    },
    {
      Header: "PRICE",
      accessor: "priceDisplay",
      sortable: true,
      Cell: ({ value, row }) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          {row.original.compare_price > row.original.price && (
            <div className="text-sm text-gray-500 line-through">
              ${row.original.compare_price.toFixed(2)}
            </div>
          )}
        </div>
      )
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
            onClick={() => navigate(`/products/edit/${row.original.id}`)}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800 text-sm font-medium"
            onClick={() => handleDeleteProduct(row.original)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

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
          onClick={fetchProducts}
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
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory ({filteredProducts.length} total)</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            <Icon icon="mdi:download" />
            Export
          </button>
          <button
            onClick={() => navigate("/products/add")}
            className="bg-[#C53958] hover:bg-[#A12E47] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Icon icon="mdi:plus" />
            Add Product
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C53958] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort Options */}
            <button
              onClick={() => handleSort('name')}
              className="text-sm flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
            >
              <Icon icon="mdi:sort" />
              Name
              {sortConfig.key === 'name' && (
                <Icon icon={sortConfig.direction === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'} />
              )}
            </button>

            <button
              onClick={() => handleSort('price')}
              className="text-sm flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
            >
              <Icon icon="mdi:currency-usd" />
              Price
              {sortConfig.key === 'price' && (
                <Icon icon={sortConfig.direction === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Product List</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {paginatedData.length} of {filteredProducts.length} products
          </p>
        </div>

        <ReusableTableComponent data={paginatedData} columns={columns} />

        <div className="p-4 border-t border-gray-200">
          <ReusablePaginationComponent
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default HOC(Products);
