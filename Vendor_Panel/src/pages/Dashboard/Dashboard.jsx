import React, { useState, useEffect, useContext } from "react";
import HOC from "../../components/layout/LoginLayout/HOC";
import { AuthContext } from "../../context/AuthContext";
import { supabase } from "../../services/supabase";

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

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Welcome to your Vendor Dashboard!</h3>
        <p className="text-gray-600">
          Your dashboard is now connected to real data from Supabase.
          Start by adding products and managing your inventory.
        </p>
      </div>
    </div>
  );
};

export default HOC(Dashboard);
