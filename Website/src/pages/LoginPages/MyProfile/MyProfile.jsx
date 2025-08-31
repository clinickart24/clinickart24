import React from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import images from "../../../lib/exportImages";

const MyProfile = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base font-semibold text-black">
          Personal Information
        </h2>
        <button className="text-pink-600 text-sm font-medium">Edit</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Mr."
          className="border border-gray-200 p-2 rounded text-sm w-full"
        />
        <input
          type="text"
          placeholder="Jackson"
          className="border border-gray-200 p-2 rounded text-sm w-full"
        />
        <input
          type="text"
          placeholder="Mike"
          className="border border-gray-200 p-2 rounded text-sm w-full"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <button className="text-pink-600 text-sm font-medium">Edit</button>
        </div>
        <input
          type="email"
          placeholder="myusername@gmail.com"
          className="w-full border border-gray-200 p-2 rounded text-sm"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Your Gender
        </label>
        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              defaultChecked
              className="accent-pink-600"
            />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" className="accent-pink-600" />
            Female
          </label>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <button className="text-pink-600 text-sm font-medium">Edit</button>
        </div>
        <input
          type="text"
          placeholder="9876543210"
          className="w-full border border-gray-200 p-2 rounded text-sm"
        />
      </div>

      <div className="bg-gray-50 rounded text-sm text-gray-700 leading-relaxed">
        <h3 className="font-semibold mb-2 text-black">FAQs</h3>

        <p className="mb-4">
          <strong>
            What happens when I update my email address (or mobile number)?
          </strong>
          <br />
          Your login email id (or mobile number) changes, likewise. You’ll
          receive all your account related communication on your updated email
          address (or mobile number).
        </p>

        <p className="mb-4">
          <strong>
            When will my Clinic Kart account be updated with the new email
            address (or mobile number)?
          </strong>
          <br />
          It happens as soon as you confirm the verification code sent to your
          email (or mobile) and save the changes.
        </p>

        <p>
          <strong>
            What happens to my existing Clinic Kart account when I update my
            email address (or mobile number)?
          </strong>
          <br />
          Updating your email address (or mobile number) doesn’t invalidate your
          account. Your account remains active and your order history remains
          intact.
        </p>
        <p>
          <strong>
            Does my Seller account get affected when I update my email address?
          </strong>
          <br />
          Clinic Kart has a 'single sign-on' policy. Any changes will reflect in
          your Seller account also.
        </p>
      </div>
      <p className="m-4 flex flex-col gap-4">
        <span className="text-[#C53958] font-semibold cursor-pointer">Deactivate Account</span>
        <span className="text-[#844E0F] font-semibold cursor-pointer">Delete Account</span>
      </p>
      <div>
          <img src={images.pages.loginPages.profilePage.image} alt="profile" />

      </div>
    </div>
  );
};

export default HOC(MyProfile);
