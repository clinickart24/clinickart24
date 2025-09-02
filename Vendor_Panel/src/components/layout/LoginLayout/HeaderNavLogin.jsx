import React, { useContext } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import images from "../../../lib/exportImages";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import RealTimeNotifications from "../../common/RealTimeNotifications";

const HeaderNavLogin = () => {
  const navigate = useNavigate();
  const { userProfile } = useContext(AuthContext);
  return (
    <header className="max-w-7xl mx-auto w-full bg-white border-b border-gray-200 px-4 py-1 flex items-center justify-between">
      <div className="flex flex-col items-center gap-2 w-full lg:w-60 sm:flex-row sm:justify-start">
        <img
          src={images.navbar.logo}
          alt="Clinic Kart Logo"
          className="w-[120px] h-20 object-contain"
        />
      </div>

      <div className="flex-1 mx-6 hidden md:flex">
        <div className="relative w-full max-w-lg">
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
          />
          <input
            type="text"
            placeholder="What are you looking for"
            className="w-full border border-gray-200 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <RealTimeNotifications />

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/settings/manage-profile")}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {userProfile?.avatar_url ? (
              <img
                src={userProfile.avatar_url}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold">
                {userProfile?.first_name?.charAt(0)?.toUpperCase() || userProfile?.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">
              {`${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`.trim() || userProfile?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500">
              {userProfile?.role?.charAt(0)?.toUpperCase() + userProfile?.role?.slice(1) || 'Vendor'}
            </p>
          </div>
          <Icon icon="mdi:chevron-down" className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default HeaderNavLogin;
