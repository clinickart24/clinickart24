import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import images from "../../../lib/exportImages";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";

const CreateInvoice = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000000)}`
  );
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("Waiting");

  const [businessName, setBusinessName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [sellerCountryCode, setSellerCountryCode] = useState("+1");
  const [contactNumber, setContactNumber] = useState("");

  const [products, setProducts] = useState([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user && userProfile) {
      fetchProducts();
      loadUserData();
    }
  }, [user, userProfile]);

  const fetchProducts = async () => {
    try {
      if (!userProfile?.vendor_id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', userProfile.vendor_id)
        .eq('status', 'active');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = () => {
    if (userProfile) {
      setBusinessName(`${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() || 'Business Name');
      setSellerEmail(userProfile.email || '');
      setContactNumber(userProfile.phone || '');
    }
  };

  const addItemToInvoice = (product, quantity = 1) => {
    const newItem = {
      id: product.id,
      product: product.name,
      sku: product.sku || `SKU-${product.id}`,
      size: product.specifications?.size || 'N/A',
      color: product.specifications?.color || 'N/A',
      qty: quantity,
      price: parseFloat(product.price) || 0,
      total: (parseFloat(product.price) || 0) * quantity,
      image: product.image_url || images.homePage.login.dashboard.products.images[0]?.image,
    };

    setItems(prevItems => [...prevItems, newItem]);
    setShowAddItemModal(false);
  };

  const removeItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateItemQuantity = (index, newQty) => {
    if (newQty < 1) return;

    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, qty: newQty, total: item.price * newQty }
          : item
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const gst = subtotal * 0.18;
  const totalAmount = subtotal + gst;

  const handlePreviewInvoice = () => {
    navigate("/invoice/preview");
  };

  const handleReject = () => {
    console.log("Reject Invoice");
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Create Invoice</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Customer Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-gray-600">Customer Name</label>
            <input
              className="border border-gray-200 rounded p-2 w-full"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <label className="text-gray-600">Email</label>
            <input
              type="email"
              className="border border-gray-200 rounded p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-gray-600">Date</label>
            <input
              type="text"
              className="border border-gray-200 rounded p-2 w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="text-gray-600">Invoice</label>
            <input
              className="border border-gray-200 rounded p-2 w-full"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />

            <label className="text-gray-600">Phone Number</label>
            <div className="flex gap-2">
              <select
                className="border border-gray-200 rounded p-2"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+62">+62</option>
                <option value="+1">+1</option>
              </select>
              <input
                className="border border-gray-200 rounded p-2 flex-1"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <label className="text-gray-600">Status</label>
            <select
              className={`border border-gray-200 rounded p-2 w-full ${
                status === "Waiting"
                  ? "bg-yellow-50 text-yellow-800"
                  : status === "Approved"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Waiting">Waiting</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 pt-6">
          <h2 className="text-lg font-semibold">Seller Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-gray-600">Business Name</label>
            <input
              className="border border-gray-200 rounded p-2 w-full"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />

            <label className="text-gray-600">Email</label>
            <input
              type="email"
              className="border border-gray-200 rounded p-2 w-full"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
            />

            <label className="text-gray-600">Address</label>
            <textarea
              className="border border-gray-200 rounded p-2 w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label className="text-gray-600">Contact Number</label>
            <div className="flex gap-2">
              <select
                className="border border-gray-200 rounded p-2"
                value={sellerCountryCode}
                onChange={(e) => setSellerCountryCode(e.target.value)}
              >
                <option value="+62">+62</option>
                <option value="+1">+1</option>
              </select>
              <input
                className="border border-gray-200 rounded p-2 flex-1"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Item List</h2>
            <button
              onClick={() => setShowAddItemModal(true)}
              className="bg-[#C53958] hover:bg-[#A12E47] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <Icon icon="mdi:plus" />
              Add Item
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "PRODUCT",
                    "SKU",
                    "SIZE",
                    "COLOR",
                    "QTY",
                    "PRICE",
                    "TOTAL",
                  ].map((h) => (
                    <th
                      key={h}
                      className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2 px-4 flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.product}
                        className="w-8 h-8 rounded"
                      />
                      <span>{item.product}</span>
                    </td>
                    <td className="py-2 px-4">{item.sku}</td>
                    <td className="py-2 px-4">{item.size}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor:
                              item.color === "Cream"
                                ? "#f5f5dc"
                                : item.color === "Pink"
                                ? "#ffc0cb"
                                : "",
                          }}
                        ></div>
                        <span>{item.color}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4">{item.qty}</td>
                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 px-4">${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4 flex-col items-end space-y-2">
            <div className="flex gap-16">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex gap-16">
              <p className="text-gray-600">GST (18%)</p>
              <p className="font-medium">${gst.toFixed(2)}</p>
            </div>
            <div className="flex gap-16 font-bold text-lg">
              <p className="text-gray-800">Total Amount</p>
              <p className="font-semibold">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={handleReject}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
          >
            Reject
          </button>
          <button
            onClick={handlePreviewInvoice}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Preview Invoice
          </button>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Item to Invoice</h3>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C53958] mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No products available. Please add products first.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image_url || images.homePage.login.dashboard.products.images[0]?.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">SKU: {product.sku || `SKU-${product.id}`}</p>
                        <p className="text-lg font-semibold text-[#C53958]">${product.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => addItemToInvoice(product)}
                      className="w-full mt-3 bg-[#C53958] hover:bg-[#A12E47] text-white py-2 px-4 rounded-md text-sm font-medium"
                    >
                      Add to Invoice
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HOC(CreateInvoice);
