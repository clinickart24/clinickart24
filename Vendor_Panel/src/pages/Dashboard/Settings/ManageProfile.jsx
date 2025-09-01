import React, { useState, useContext, useEffect } from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";

const ManageProfile = () => {
  const { logout, userProfile } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [profile, setProfile] = useState({
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "",
    role: "",
    countryCode: "+1",
    phoneNumber: "",
    address: "",
    email: "",
    password: "********",
    categoryType: "",
    city: "",
    zipcode: "",
    aadharNumber: "",
    gstNumber: "",
    bankName: "",
    ifscCode: "",
    accountNumber: ""
  });

  useEffect(() => {
    if (userProfile) {
      setProfile({
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        name: `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() || userProfile.email?.split('@')[0] || 'User',
        role: userProfile.role?.charAt(0)?.toUpperCase() + userProfile.role?.slice(1) || 'User',
        countryCode: "+1",
        phoneNumber: userProfile.phone || "",
        address: userProfile.vendor_info?.address ?
          `${userProfile.vendor_info.address.street || ''}, ${userProfile.vendor_info.address.city || ''}, ${userProfile.vendor_info.address.state || ''} ${userProfile.vendor_info.address.zip || ''}`.trim() :
          "",
        email: userProfile.email || "",
        password: "********",
        categoryType: userProfile.vendor_info?.category_type || "",
        city: userProfile.vendor_info?.city || "",
        zipcode: userProfile.vendor_info?.zipcode || "",
        aadharNumber: userProfile.vendor_info?.aadhar_number || "",
        gstNumber: userProfile.vendor_info?.gst_number || "",
        bankName: userProfile.vendor_info?.bank_details?.bankName || "",
        ifscCode: userProfile.vendor_info?.bank_details?.ifscCode || "",
        accountNumber: userProfile.vendor_info?.bank_details?.accountNumber || ""
      });
    }
  }, [userProfile]);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!userProfile?.vendor_id) {
      setSaveMessage("Error: Vendor profile not found");
      return;
    }

    setSaving(true);
    setSaveMessage("");

    try {
      // Update vendor profile in database
      const { error } = await supabase
        .from('vendors')
        .update({
          category_type: profile.categoryType,
          city: profile.city,
          zipcode: profile.zipcode,
          aadhar_number: profile.aadharNumber,
          gst_number: profile.gstNumber,
          bank_details: {
            bankName: profile.bankName,
            ifscCode: profile.ifscCode,
            accountNumber: profile.accountNumber
          }
        })
        .eq('id', userProfile.vendor_id);

      if (error) throw error;

      setSaveMessage("Profile updated successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className=" min-h-screen">
      <h5 className="text-lg font-semibold">Settings</h5>
      <div className="bg-white rounded-lg p-6 space-y-6 mt-3">
        <h2 className="text-lg font-semibold">Manage Profile</h2>

        <div className="flex items-center gap-2">
          <div className="mr-3">
            <p>Avatar</p>
            <p className="text-xs text-gray-500">
              Only *.png, *.jpg and *.jpeg image <br /> files are accepted
            </p>
          </div>
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-20 h-20 border border-gray-200 rounded-lg object-cover"
            />
            <button className="absolute top-1 right-1 bg-white p-1 rounded-lg shadow hover:bg-gray-100 flex items-center justify-center">
              <Icon icon="mdi:edit" className="text-lg" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Role</label>
            <input
              type="text"
              value={profile.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Phone Number
            </label>
            <div className="flex gap-2 mt-1">
              <select
                value={profile.countryCode}
                onChange={(e) => handleChange("countryCode", e.target.value)}
                className="border border-gray-200 rounded-lg p-2"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
              <input
                type="text"
                value={profile.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg p-2"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Address</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 mt-1"
            />
          </div>

          {/* New Vendor Fields */}
          <div>
            <label className="text-sm font-medium text-gray-500">Category Type</label>
            <select
              value={profile.categoryType}
              onChange={(e) => handleChange("categoryType", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 mt-1 bg-gray-100 cursor-not-allowed"
              disabled
            >
              <option value="">Select Category (Will be updated later)</option>
              <option value="healthcare">Healthcare</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="medical_equipment">Medical Equipment</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">This field will be updated later by admin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">City</label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Zipcode</label>
              <input
                type="text"
                value={profile.zipcode}
                onChange={(e) => handleChange("zipcode", e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Aadhar Number</label>
            <input
              type="text"
              value={profile.aadharNumber}
              onChange={(e) => handleChange("aadharNumber", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 mt-1"
              maxLength="12"
              pattern="[0-9]{12}"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">GST Number</label>
            <input
              type="text"
              value={profile.gstNumber}
              onChange={(e) => handleChange("gstNumber", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 mt-1"
            />
          </div>

          {/* Bank Details Section */}
          <div className="border-t pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Bank Details</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Bank Name</label>
                <input
                  type="text"
                  value={profile.bankName}
                  onChange={(e) => handleChange("bankName", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">IFSC Code</label>
                <input
                  type="text"
                  value={profile.ifscCode}
                  onChange={(e) => handleChange("ifscCode", e.target.value.toUpperCase())}
                  className="w-full border border-gray-200 rounded-lg p-2 mt-1"
                  maxLength="11"
                  pattern="[A-Z]{4}[0-9]{7}"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Bank Account Number</label>
                <input
                  type="text"
                  value={profile.accountNumber}
                  onChange={(e) => handleChange("accountNumber", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2 mt-1"
                />
              </div>
            </div>
          </div>

          {/* Save Button and Message */}
          <div className="border-t pt-4">
            {saveMessage && (
              <div className={`mb-4 p-3 rounded-lg ${
                saveMessage.includes('successfully')
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {saveMessage}
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#C53958] hover:bg-[#A12E47] text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold">Manage Account</h2>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">EMAIL</p>
              <p>{profile.email}</p>
            </div>
            <button className="border border-[#C53958] text-[#C53958] px-3 py-1 rounded-lg hover:bg-[#C53958] hover:text-white">
              Change Email
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">PASSWORD</p>
              <p>{profile.password}</p>
            </div>
            <button className="border border-[#C53958] text-[#C53958] px-3 py-1 rounded-lg hover:bg-[#C53958] hover:text-white">
              Change Password
            </button>
          </div>
          <div className="pt-2 flex items-center justify-between gap-2">
            <p className="text-[#C53958]">Logout</p>
            <button
              onClick={logout}
              className="bg-[#FF5630] text-white px-4 py-2 rounded-lg hover:bg-[#FF5630]/80 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(ManageProfile);
