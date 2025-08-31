import React, { useState } from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

const addresses = [
  {
    type: "HOME",
    name: "John Doe",
    phone: "+91 7070812563",
    address:
      "plot no.25, sector 16a, hrdi psnr complex, bharat heavy electricals limited., noida, uttar pradesh - 201301",
  },
  {
    type: "WORK",
    name: "John Doe",
    phone: "+91 7070812563",
    address:
      "plot no.25, sector 16a, hrdi psnr complex, bharat heavy electricals limited., noida, uttar pradesh - 201301",
  },
];

const ManageAddresses = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    altPhone: "",
    type: "HOME",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h2 className="text-base font-semibold text-black mb-4">
        Manage Addresses
      </h2>
      {!isAdding ? (
        <>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-pink-600 border border-gray-200 rounded px-4 py-2 mb-6 font-semibold text-sm cursor-pointer w-full bg-white"
          >
            <Icon icon="mdi:plus" className="text-lg" />
            ADD A NEW ADDRESS
          </button>
          <div className="flex flex-col gap-4">
            {addresses.map((addr, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded p-4 flex justify-between items-start bg-white"
              >
                <div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded mb-2 inline-block">
                    {addr.type}
                  </span>
                  <p className="text-sm font-semibold text-black">
                    {addr.name}{" "}
                    <span className="text-gray-600 font-normal">
                      {addr.phone}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <Icon icon="mdi:dots-vertical" className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-[#fdf3f4] border border-pink-200 p-6 rounded-md">
          <button className="flex items-center gap-1 mb-4 text-sm text-white bg-[#C53958] px-3 py-2 rounded">
            <Icon icon="mdi:map-marker" className="text-lg" />
            Use my Current location
          </button>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col text-sm gap-2">
              <label className="text-xs font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="p-2 border border-gray-200 rounded text-sm bg-white"
              />
            </div>
            <div className="flex flex-col text-sm gap-2">
              <label className="text-xs font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter mobile Number here"
                className="p-2 border border-gray-200 rounded text-sm bg-white"
              />
            </div>
            <div className="flex flex-col text-sm gap-2">
              <label className="text-xs font-semibold">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                className="p-2 border border-gray-200 rounded text-sm bg-white"
              />
            </div>
            <div className="flex flex-col text-sm gap-2">
              <label className="text-xs font-semibold">Locality</label>
              <input
                type="text"
                name="locality"
                value={form.locality}
                onChange={handleChange}
                placeholder="Enter locality here"
                className="p-2 border border-gray-200 rounded text-sm bg-white"
              />
            </div>
          </div>
          <div className="flex flex-col text-sm gap-2 mb-4">
            <label className="text-xs font-semibold">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter area and street"
              className="w-full p-2 border border-gray-200 rounded text-sm bg-white"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col text-sm gap-2">
              <label className="text-xs font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city/District/Town"
                className="p-2 border border-gray-200 rounded text-sm bg-white"
              />
            </div>
            <div className="flex flex-col text-sm gap-2">
              <label className="text-xs font-semibold">State</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="p-2 border border-gray-200 rounded text-sm bg-white"
              >
                <option value="">Select State</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="DL">Delhi</option>
              </select>
            </div>
            <div className="flex flex-col text-sm gap-2">
              <label className="text-xs font-semibold">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Enter landmark (optional)"
                className="p-2 border border-gray-200 rounded text-sm bg-white"
              />
            </div>
            <div className="flex flex-col text-sm gap-2">
              <label className="text-xs font-semibold">Alternate Phone</label>
              <input
                type="text"
                name="altPhone"
                value={form.altPhone}
                onChange={handleChange}
                placeholder="Enter alternate phone number here"
                className="p-2 border border-gray-200 rounded text-sm bg-white"
              />
            </div>
          </div>
          <div className="mb-6 text-sm">
            <label className="block mb-1 font-medium">Address Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value="HOME"
                  checked={form.type === "HOME"}
                  onChange={handleChange}
                  className="accent-pink-600"
                />
                Home
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value="WORK"
                  checked={form.type === "WORK"}
                  onChange={handleChange}
                  className="accent-pink-600"
                />
                Work
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-pink-600 text-white px-6 py-2 rounded text-sm font-medium ">
              Save
            </button>
            <button
              className="text-pink-600 font-medium text-sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HOC(ManageAddresses);
