import React, { useState, useEffect, useContext } from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import {
  ReusablePaginationComponent,
  ReusableTableComponent,
} from "../../../components/common/ReusableComponent/ReusableComponent";
import { Icon } from "@iconify-icon/react";
import { AuthContext } from "../../../context/AuthContext";
import { transactionsAPI } from "../../../services/api";
import { exportTableData } from "../../../utils/exportUtils";

// Static data removed - now using dynamic data from Supabase

const TransactionList = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    if (user && userProfile) {
      fetchTransactions();
    }
  }, [user, userProfile]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, transactions]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      if (!userProfile?.vendor_id) {
        setError("Vendor profile not found");
        setLoading(false);
        return;
      }

      const transactionHistory = await transactionsAPI.getHistory(userProfile.vendor_id);

      // Transform data to match UI format
      const transformedTransactions = transactionHistory.map(transaction => ({
        id: transaction.id,
        transactionNumber: transaction.orderNumber,
        customerName: `${transaction.customer?.first_name || ''} ${transaction.customer?.last_name || ''}`.trim() || 'Unknown Customer',
        purchasedProduct: 'Order Items', // This would need to be enhanced with actual product details
        totalProduct: 1, // This would need to be calculated from order items
        paymentAmount: `$${transaction.amount.toFixed(2)}`,
        status: transaction.status === 'completed' ? 'Arrived' :
                transaction.status === 'processing' ? 'Process' :
                transaction.status === 'shipped' ? 'Sent' :
                transaction.status === 'pending' ? 'Packing' : 'Failed',
        originalStatus: transaction.status
      }));

      setTransactions(transformedTransactions);
      setFilteredTransactions(transformedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to load transaction data");
      setTransactions([]);
      setFilteredTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter(
      (transaction) =>
        transaction.transactionNumber.includes(searchTerm) ||
        transaction.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.purchasedProduct
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StatusCell = ({ value }) => {
    let colorClass = "";
    switch (value) {
      case "Process":
        colorClass = "bg-blue-100 text-blue-800";
        break;
      case "Sent":
        colorClass = "bg-indigo-100 text-indigo-800";
        break;
      case "Packing":
        colorClass = "bg-yellow-100 text-yellow-800";
        break;
      case "Arrived":
        colorClass = "bg-green-100 text-green-800";
        break;
      case "Failed":
        colorClass = "bg-red-100 text-red-800";
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

  const columns = [
    {
      Header: "TRANSACTION NUMBER",
      accessor: "transactionNumber",
      sortable: true,
    },
    { Header: "CUSTOMER NAME", accessor: "customerName", sortable: true },
    { Header: "PURCHASED PRODUCT", accessor: "purchasedProduct" },
    { Header: "TOTAL PRODUCT", accessor: "totalProduct", sortable: true },
    { Header: "PAYMENT AMOUNT", accessor: "paymentAmount", sortable: true },
    {
      Header: "STATUS",
      accessor: "status",
      Cell: (row) => <StatusCell value={row.status} />,
      sortable: true,
    },
    {
      Header: "ACTION",
      accessor: "action",
      Cell: () => (
        <button className="text-[#D64860] hover:text-[#D64860] font-medium">
          Detail
        </button>
      ),
    },
  ];

  const handleExport = () => {
    exportTableData(filteredTransactions, 'transactions-list', 'Transaction List');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C53958]"></div>
        <span className="ml-2 text-gray-600">Loading transactions...</span>
      </div>
    );
  }

  return (
    <div>
      <h5 className="text-lg font-semibold">Transaction</h5>

      <div className="bg-white rounded-lg shadow p-4 mt-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Transaction List</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <button
              onClick={() => exportTableData(paginatedData, columns, 'transactions', 'excel')}
              className="text-sm flex items-center gap-1 border border-[#D64860] text-[#D64860] px-3 py-1.5 rounded hover:bg-[#D64860] hover:text-white transition-colors"
            >
              <Icon icon="mdi:export" className="text-lg" />
              Export
            </button>

            <button className="text-sm flex items-center gap-1 bg-gray-200 px-3 py-1.5 rounded">
              Sort
              <Icon icon="mdi:sort" className="text-lg ml-1" />
            </button>

            <button className="text-sm flex items-center gap-1 bg-gray-200 px-3 py-1.5 rounded">
              <Icon icon="mdi:filter" className="text-lg ml-1" />
              Filters
            </button>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <Icon icon="mdi:receipt" className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No transactions found</p>
            <p className="text-gray-400 text-sm">Transaction history will appear here when orders are placed</p>
          </div>
        ) : (
          <>
            <ReusableTableComponent data={paginatedData} columns={columns} />

            <div className="mt-3">
              <ReusablePaginationComponent
                totalItems={filteredTransactions.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HOC(TransactionList);
