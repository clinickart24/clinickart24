import React, { useState, useEffect, useContext } from "react";
import HOC from "../../components/layout/LoginLayout/HOC";
import { AuthContext } from "../../context/AuthContext";
import { supabase } from "../../services/supabase";
import { Icon } from "@iconify-icon/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const Dashboard = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [stats, setStats] = useState([
    { title: "Total Sales", value: "0", change: "", changeColor: "", subValue: "" },
    { title: "Total Users", value: "0", change: "", changeColor: "", subValue: "" },
    { title: "Total Buyers", value: "0", change: "", changeColor: "", subValue: "" },
    { title: "Total Orders", value: "0", change: "", changeColor: "", subValue: "" },
    { title: "Total Customers", value: "0", change: "", changeColor: "", subValue: "" },
    { title: "Return Orders", value: "0", change: "", changeColor: "", subValue: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (user && userProfile) {
      if (userProfile.vendor_id) {
        fetchDashboardData();
      } else {
        // If user doesn't have vendor_id, show default stats and stop loading
        setLoading(false);
      }
    }
  }, [user, userProfile]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const vendorId = userProfile.vendor_id;

      // Fetch analytics data
      const { data: analytics, error: analyticsError } = await supabase
        .from('vendor_analytics')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('date', { ascending: false })
        .limit(1)
        .single();

      // Fetch real-time counts
      const [
        { count: totalOrders },
        { count: totalCustomers },
        { count: totalProducts },
        { data: recentOrders }
      ] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('vendor_id', vendorId),
        supabase.from('customers').select('*', { count: 'exact', head: true }).eq('vendor_id', vendorId),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('vendor_id', vendorId),
        supabase.from('orders').select('total_amount, status').eq('vendor_id', vendorId).eq('status', 'completed')
      ]);

      // Calculate total sales
      const totalSales = recentOrders?.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0) || 0;

      // Count return orders
      const { count: returnOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', vendorId)
        .eq('status', 'returned');

      // Fetch enhanced analytics data
      await fetchEnhancedAnalytics(vendorId);

      // Update stats with real data
      setStats([
        {
          title: "Total Sales",
          value: `$${totalSales.toLocaleString()}`,
          change: analytics?.revenue ? `+${((totalSales - analytics.revenue) / analytics.revenue * 100).toFixed(1)}%` : "",
          changeColor: "text-green-500",
          subValue: "",
        },
        {
          title: "Total Users",
          value: totalCustomers?.toString() || "0",
          change: "",
          changeColor: "",
          subValue: "",
        },
        {
          title: "Total Buyers",
          value: totalCustomers?.toString() || "0",
          change: "",
          changeColor: "text-green-500",
          subValue: "",
        },
        {
          title: "Total Orders",
          value: totalOrders?.toString() || "0",
          change: "",
          changeColor: "",
          subValue: "0",
        },
        {
          title: "Total Customers",
          value: totalCustomers?.toString() || "0",
          change: "",
          changeColor: "",
          subValue: "0",
        },
        {
          title: "Return Orders",
          value: returnOrders?.toString() || "0",
          change: "",
          changeColor: "",
          subValue: "0",
        },
      ]);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const fetchEnhancedAnalytics = async (vendorId) => {
    try {
      // Fetch sales data for the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: salesHistory } = await supabase
        .from('orders')
        .select('created_at, total_amount, status')
        .eq('vendor_id', vendorId)
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      // Process sales data for chart
      const salesByDay = {};
      salesHistory?.forEach(order => {
        const date = new Date(order.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
        if (!salesByDay[date]) {
          salesByDay[date] = 0;
        }
        if (order.status === 'completed') {
          salesByDay[date] += parseFloat(order.total_amount || 0);
        }
      });

      const chartData = Object.entries(salesByDay).map(([date, amount]) => ({
        date,
        sales: amount
      }));

      setSalesData(chartData);

      // Fetch order status distribution
      const { data: orderStatuses } = await supabase
        .from('orders')
        .select('status')
        .eq('vendor_id', vendorId);

      const statusCounts = {};
      orderStatuses?.forEach(order => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
      });

      const statusData = Object.entries(statusCounts).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: count
      }));

      setOrderStatusData(statusData);

      // Fetch recent orders
      const { data: recentOrdersData } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          total_amount,
          status,
          created_at,
          customers(first_name, last_name)
        `)
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentOrders(recentOrdersData || []);

      // Fetch top products (this would need a products_orders junction table in real implementation)
      const { data: topProductsData } = await supabase
        .from('products')
        .select('id, name, price')
        .eq('vendor_id', vendorId)
        .eq('status', 'active')
        .limit(5);

      setTopProducts(topProductsData || []);

    } catch (error) {
      console.error('Error fetching enhanced analytics:', error);
    }
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#EFEFEF] rounded-lg p-4 shadow-sm">
            <h4 className="text-gray-600 text-sm">{stat.title}</h4>
            <p className="text-2xl font-bold mb-2">{stat.value}</p>
            {stat.change && (
              <p className={`text-sm font-medium ${stat.changeColor}`}>
                {stat.change}
              </p>
            )}
            {stat.subValue && (
              <p className="text-xs text-gray-500 pt-2">{stat.subValue}</p>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Icon icon="mdi:chart-line" className="mr-2 text-[#C53958]" />
            Sales Trend (Last 7 Days)
          </h3>
          {salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Sales']} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#C53958"
                  strokeWidth={2}
                  dot={{ fill: '#C53958' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <div className="text-center">
                <Icon icon="mdi:chart-line" className="text-4xl mb-2" />
                <p>No sales data available</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Icon icon="mdi:chart-pie" className="mr-2 text-[#C53958]" />
            Order Status Distribution
          </h3>
          {orderStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      index === 0 ? '#C53958' :
                      index === 1 ? '#10B981' :
                      index === 2 ? '#F59E0B' :
                      index === 3 ? '#EF4444' : '#6B7280'
                    } />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <div className="text-center">
                <Icon icon="mdi:chart-pie" className="text-4xl mb-2" />
                <p>No order data available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Icon icon="mdi:receipt" className="mr-2 text-[#C53958]" />
            Recent Orders
          </h3>
          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">#{order.order_number}</p>
                    <p className="text-sm text-gray-600">
                      {order.customers?.first_name} {order.customers?.last_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${parseFloat(order.total_amount || 0).toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Icon icon="mdi:receipt" className="text-4xl mb-2" />
              <p>No recent orders</p>
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Icon icon="mdi:star" className="mr-2 text-[#C53958]" />
            Your Products
          </h3>
          {topProducts.length > 0 ? (
            <div className="space-y-3">
              {topProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">Product ID: {product.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${parseFloat(product.price || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Icon icon="mdi:package-variant" className="text-4xl mb-2" />
              <p>No products yet</p>
              <p className="text-sm">Add your first product to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HOC(Dashboard);
