import { Icon } from "@iconify-icon/react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ toggleSidebar, isSidebarVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 768 && toggleSidebar) {
      toggleSidebar();
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-[85vh] overflow-y-scroll p-4 pt-20 md:pt-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6 border border-gray-200 p-2 rounded">
          <div className="w-10 h-10 bg-pink-200 text-pink-800 rounded-full flex items-center justify-center text-lg font-semibold">
            <Icon icon="mdi:account" width="20" />
          </div>
          <div>
            <div className="text-black text-xs font-semibold px-2 py-0.5 rounded w-fit mb-1">
              Hello,
            </div>
            <div className="text-sm font-bold">CLINIC KART</div>
          </div>
        </div>
        <div className="mb-4">
          <h3
            className={`text-xs font-semibold mb-2 flex items-center justify-between gap-2 w-full cursor-pointer rounded px-2 py-3 ${
              isActive("/my-orders")
                ? "bg-pink-100 text-pink-700"
                : "text-gray-500 hover:bg-gray-100 hover:text-pink-600"
            }`}
            onClick={() => handleNavigate("/my-orders")}
          >
            <span className="flex items-center gap-2">
              <Icon
                icon="mdi:package-variant-closed"
                className="text-pink-600"
                width="16"
              />
              <span>MY ORDERS</span>
            </span>
            <span>
              <Icon icon="iconamoon:arrow-right-2" width="16" />
            </span>
          </h3>
        </div>
        <div className="mb-4">
          <h3 className="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-2">
            <Icon icon="mdi:account-cog" className="text-pink-600" width="16" />
            ACCOUNT SETTINGS
          </h3>
          <ul>
            <li
              className={`p-2 rounded mb-2 cursor-pointer ${
                isActive("/profile")
                  ? "bg-pink-100 text-pink-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleNavigate("/profile")}
            >
              Profile Information
            </li>
            <li
              className={`p-2 mb-2 cursor-pointer ${
                isActive("/manage-addresses")
                  ? "bg-pink-100 text-pink-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleNavigate("/manage-addresses")}
            >
              Manage Addresses
            </li>
            <li
              className={`p-2 mb-2 cursor-pointer ${
                isActive("/pan-card-information")
                  ? "bg-pink-100 text-pink-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleNavigate("/pan-card-information")}
            >
              Pan Card Information
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-2">
            <Icon icon="mdi:wallet" className="text-pink-600" width="16" />
            PAYMENTS
          </h3>
          <ul>
            <li
              className="p-2 mb-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigate("/gift-card")}
            >
              Gift Cards
            </li>
            <li
              className="p-2 mb-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigate("/manage-upi")}
            >
              Saved UPI
            </li>
            <li
              className="p-2 mb-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigate("/manage-cards")}
            >
              Saved Cards
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs text-gray-500 font-semibold mb-2 flex items-center gap-2">
            <Icon
              icon="mdi:tag-multiple"
              className="text-pink-600"
              width="16"
            />
            MY STUFFS
          </h3>
          <ul>
            <li
              className="p-2 mb-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigate("/coupons")}
            >
              My Coupons
            </li>
            <li
              className="p-2 mb-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigate("/review-dashboard")}
            >
              All Reviews & Ratings
            </li>
            <li className="p-2 mb-2 hover:bg-gray-100 cursor-pointer">
              All Notifications
            </li>
            <li
              className="p-2 mb-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigate("/wishlist")}
            >
              My Wishlist
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <button className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600">
          <Icon icon="mdi:power" width="18" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
