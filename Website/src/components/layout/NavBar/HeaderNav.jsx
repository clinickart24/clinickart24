import React from "react";
import { Icon } from "@iconify-icon/react";
import { useNavigate } from "react-router-dom";
import images from "../../../lib/exportImages";
import {
  ReusableModal,
  ReusablePopover,
} from "../../common/ReusableComponent/ReusableComponent";
import { useState } from "react";

const HeaderNav = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [view, setView] = useState("login");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  return (
    <>
      <div className="w-full">
        <div
          className="w-full h-12 bg-contain bg-repeat py-2 px-4 text-sm text-black font-medium"
          style={{ backgroundImage: `url(${images.navbar.bgImage})` }}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-1 text-black font-bold text-sm">
            <p className="text-sm sm:text-base md:text-md">
              Summer Sale Is Live!
            </p>

            <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base font-bold mt-2 sm:mt-0">
              <button
                className="flex items-center gap-1 hover:underline cursor-pointer"
                aria-label="Get App"
              >
                <Icon icon="bi:phone" className="text-lg" />
                <span>Get App</span>
              </button>

              <span className="text-gray-400 hidden sm:inline">|</span>

              <button
                className="flex items-center gap-1 hover:underline cursor-pointer"
                aria-label="Help"
              >
                <Icon
                  icon="material-symbols:help-outline"
                  className="text-lg"
                />
                <span>Help</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white py-3 px-4 flex flex-wrap lg:flex-nowrap items-center justify-between max-w-7xl mx-auto gap-y-3">
          <div className="flex items-center gap-2">
            <img
              src={images.navbar.logo || "/logo.png"}
              alt="logo"
              className="h-10 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-full lg:max-w-xl mx-0 lg:mx-4 order-3 lg:order-none">
            <input
              type="text"
              placeholder="Search for product"
              className="w-full bg-transparent outline-none text-sm"
            />
            <span className="flex items-center gap-2">
              <Icon
                icon="mdi:microphone"
                className="text-gray-500 text-xl mr-2"
              />
              <span className="hidden sm:inline">|</span>
              <Icon icon="mdi:magnify" className="text-gray-500 text-xl" />
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-sm">
            <select className="bg-gray-100 rounded px-2 py-2">
              <option>Select Location</option>
            </select>
            <div className="flex items-center gap-1">
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India"
                className="w-5 h-5"
              />
              <select className="text-sm outline-none bg-transparent">
                <option>En</option>
                <option>Hi</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-0 lg:ml-4 order-2 lg:order-none w-full lg:w-auto justify-end">
            <div className="flex items-center gap-4 w-full justify-end">
              <div
                className="relative flex items-center gap-1 cursor-pointer text-black"
                onClick={() => navigate("/cart")}
                role="button"
                aria-label="Go to cart"
              >
                <Icon icon="f7:cart" className="text-2xl" />
                <span className="absolute -top-2 right-6 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 leading-none">
                  0
                </span>
                <span className="text-sm font-medium">Cart</span>
              </div>

              <ReusablePopover
                content={
                  <div className="w-42 p-1 text-sm text-[#333]">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-700">
                        New Customer?
                      </span>
                      <button
                        className="text-sm text-pink-600 font-medium hover:underline"
                        onClick={() => {
                          setShowLoginModal(true);
                          setView("signup");
                        }}
                      >
                        {" "}
                        Sign Up
                      </button>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-2 hover:text-black cursor-pointer"
                      >
                        <Icon icon="mynaui:user-circle" className="text-lg" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => navigate("/my-orders")}
                        className="flex items-center gap-2 hover:text-black cursor-pointer"
                      >
                        <Icon
                          icon="mdi:package-variant-closed"
                          className="text-lg"
                        />
                        <span className="">Orders</span>
                      </button>

                      <button
                        onClick={() => navigate("/wishlist")}
                        className="flex items-center gap-2 hover:text-black cursor-pointer"
                      >
                        <Icon icon="mdi:heart-outline" className="text-lg" />
                        <span>Wishlist</span>
                      </button>

                      <button className="flex items-center gap-2 hover:text-black cursor-pointer">
                        <Icon icon="mdi:tag-outline" className="text-lg" />
                        <span>Rewards</span>
                      </button>
                    </div>
                  </div>
                }
                direction="bottom-left"
                directionClass="top-10 right-7"
              >
                <button className="text-black text-sm px-2 sm:px-4 py-2 rounded font-medium transition-colors flex items-center gap-2 hover:bg-amber-400 cursor-pointer">
                  <Icon icon="mdi:user-circle-outline" className="text-lg" />
                  <span
                    className="hover:underline pb-1"
                    onClick={() => { setShowLoginModal(true); setView("login")}}
                  >
                    Login
                  </span>
                  <Icon
                    icon="iconamoon:arrow-down-2-light"
                    className="text-lg"
                  />
                </button>
              </ReusablePopover>
              <span>
                <ReusablePopover
                  content={
                    <div className="space-y-6 text-sm text-black min-w-[200px] p-2">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Icon
                          icon="iconamoon:notification-light"
                          className="text-lg"
                        />
                        <span>Notification Preferences</span>
                      </div>
                      <div
                        onClick={() => navigate("/download-app")}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Icon icon="mdi:download" className="text-lg" />
                        <span>Download App</span>
                      </div>
                      <div
                        onClick={() => navigate("/customer-care")}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Icon icon="mdi:headset" className="text-lg" />
                        <span>24×7 Customer Support</span>
                      </div>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Icon icon="mdi:store-outline" className="text-lg" />
                        <span>Become a Vendor</span>
                      </div>
                    </div>
                  }
                  direction="bottom-left"
                >
                  <Icon
                    icon="qlementine-icons:menu-dots-16"
                    className="text-2xl text-black cursor-pointer"
                  />
                </ReusablePopover>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ReusableModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        size="4xl"
        hideCloseButton
      >
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[700px]">
          <div className="flex items-center justify-center bg-gray-50">
            <img
              src={images.login.backgroundImage}
              alt="Login Illustration"
              className="w-full object-cover max-h-[700px]"
            />
          </div>

          <div className="flex flex-col justify-center px-8 py-10 bg-white overflow-y-auto">
            {view === "login" && (
              <>
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <input
                  type="text"
                  placeholder="Enter mobile number or email"
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-yellow-500 text-sm placeholder-gray-500"
                />
                <button
                  type="button"
                  className="w-full py-3 text-black font-medium rounded bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition mb-4"
                  onClick={() => setView("otp")}
                >
                  Continue
                </button>
                <div className="flex items-center mb-4">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-gray-500 text-sm">OR</span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 mb-3 border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Icon icon="flat-color-icons:google" className="text-lg" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#3b5998] text-white rounded hover:bg-[#334d84] mb-4"
                >
                  <Icon icon="ant-design:facebook-filled" className="text-xl" />
                  Continue with Facebook
                </button>
                <p className="text-center text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => setView("register")}
                  >
                    Register now
                  </button>
                </p>
              </>
            )}

            {view === "otp" && (
              <>
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <p className="text-gray-600 mb-4">
                  Please enter the OTP sent to +91 96XXXXXX58{" "}
                  <button
                    className="text-green-600 ml-1"
                    onClick={() => setView("login")}
                  >
                    Change
                  </button>
                </p>
                <div className="flex gap-2 mb-6">
                  {Array(6)
                    .fill("")
                    .map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-10 h-12 border border-gray-300 text-center text-lg rounded focus:outline-none focus:border-yellow-500"
                      />
                    ))}
                </div>
                <button
                  type="button"
                  className="w-full py-3 text-black font-medium rounded bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition mb-4"
                >
                  Verify
                </button>
                <p className="text-gray-600 text-sm">
                  Not received your code?{" "}
                  <button className="text-green-600">Resend code</button>
                </p>
              </>
            )}

            {view === "register" && (
              <>
                <h2 className="text-2xl font-bold mb-6">Create account</h2>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-1/2 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-500 text-sm placeholder-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-1/2 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-500 text-sm placeholder-gray-500"
                  />
                </div>
                <div className="flex gap-3 mb-4">
                  <select className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-500 text-sm">
                    <option>UZ +998</option>
                  </select>
                  <input
                    type="text"
                    placeholder="00-000-00-00"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-500 text-sm placeholder-gray-500"
                  />
                </div>
                <button
                  type="button"
                  className="w-full py-3 text-black font-medium rounded bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition mb-4"
                >
                  Request OTP
                </button>
                <label className="flex items-center gap-2 mb-4">
                  <input type="checkbox" />
                  <span>
                    I agree with{" "}
                    <a href="#" className="text-red-500">
                      Terms and Conditions
                    </a>
                  </span>
                </label>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => setView("login")}
                  >
                    Login in
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </ReusableModal>
    </>
  );
};

export default HeaderNav;
