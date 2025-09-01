import React, { useState, useEffect, useContext } from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import {
  ReusablePaginationComponent,
  ReusableTableComponent,
} from "../../../components/common/ReusableComponent/ReusableComponent";
import { Icon } from "@iconify-icon/react";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";

// Static data removed - now using dynamic data from Supabase

const Buyers = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
    if (user && userProfile?.vendor_id) {
      fetchBuyers();
    }
  }, [user, userProfile]);

  const fetchBuyers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('vendor_id', userProfile.vendor_id)
        .eq('customer_type', 'buyer')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match expected format
      const transformedBuyers = data.map(customer => ({
        id: customer.id,
        name: `${customer.first_name} ${customer.last_name || ''}`.trim(),
        email: customer.email,
        phoneNumber: customer.phone || 'No phone provided',
        address: customer.address ?
          `${customer.address.street || ''} ${customer.address.city || ''} ${customer.address.state || ''}`.trim() :
          'No address provided',
        createdAt: new Date(customer.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        lastActivity: customer.last_order_date ?
          new Date(customer.last_order_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'No recent activity',
      }));

      setBuyers(transformedBuyers);
    } catch (error) {
      console.error("Error fetching buyers:", error);
      setError("Failed to load buyers");
    } finally {
      setLoading(false);
    }
  };

  const paginatedData = buyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { Header: "NAME", accessor: "name", sortable: true },
    { Header: "EMAIL ADDRESS", accessor: "email", sortable: true },
    { Header: "PHONE NUMBER", accessor: "phoneNumber", sortable: true },
    { Header: "COMPLETE ADDRESS", accessor: "address" },
    { Header: "LAST TRANSACTION", accessor: "lastActivity", sortable: true },
    {
      Header: "ACTION",
      accessor: "action",
      Cell: () => (
        <button className="text-[#D64860] hover:text-[#D64860]">Detail</button>
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
          onClick={fetchBuyers}
          className="ml-4 text-sm bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h5 className="text-lg font-semibold">Customers</h5>

      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Buyers</h2>
          <div className="flex gap-2">
            <button className="text-sm flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
              Sort
              <Icon icon="mdi:sort" className="text-lg ml-2" />
            </button>
            <button className="text-sm flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
              <Icon icon="mdi:filter" className="text-lg ml-2" />
              Filters
            </button>
          </div>
        </div>

        <ReusableTableComponent data={paginatedData} columns={columns} />

        <div className="mt-3">
          <ReusablePaginationComponent
            totalItems={buyers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default HOC(Buyers);
