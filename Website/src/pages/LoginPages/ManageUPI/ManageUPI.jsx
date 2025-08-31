import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import HOC from "../../../components/layout/LoginLayout/HOC";

const ManageUPI = () => {
  const [upiList, setUpiList] = useState([
    { id: 1, name: "Google Pay UPI", upi: "clinickart@upi.com" },
    { id: 2, name: "Google Pay UPI", upi: "clinickart@upi.com" },
    { id: 3, name: "Google Pay UPI", upi: "clinickart@upi.com" },
  ]);

  const handleDelete = (id) => {
    setUpiList(upiList.filter((upi) => upi.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-lg font-semibold mb-4 text-black">
        Managed Saved UPI
      </h2>

      <div className="space-y-4 mb-8">
        {upiList.map((upi) => (
          <div
            key={upi.id}
            className="flex justify-between items-center bg-white border border-gray-200 rounded px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-medium text-gray-800">{upi.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                  <Icon icon="logos:google-pay" className="text-xl" />
                  <span>{upi.upi}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(upi.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <Icon icon="mdi:trash-can-outline" className="text-xl" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-700 space-y-4">
        <h3 className="text-base font-semibold text-black">FAQs</h3>
        <div>
          <strong>
            What happens when I update my email address (or mobile number)?
          </strong>
          <p>
            Your login email id (or mobile number) changes, likewise. You'll
            receive all your account related communication on your updated email
            address (or mobile number).
          </p>
        </div>
        <div>
          <strong>
            When will my Clinic Kart account be updated with the new email
            address (or mobile number)?
          </strong>
          <p>
            It happens as soon as you confirm the verification code sent to your
            email (or mobile) and save the changes.
          </p>
        </div>
        <div>
          <strong>
            What happens to my existing Clinic Kart account when I update my
            email address (or mobile number)?
          </strong>
          <p>
            Updating your email address (or mobile number) doesn’t invalidate
            your account. Your account remains fully functional. You'll continue
            seeing your Order history, saved information and personal details.
          </p>
        </div>
        <div>
          <strong>
            Does my Seller account get affected when I update my email address?
          </strong>
          <p>
            Clinic Kart has a ‘single sign-on’ policy. Any changes will reflect
            in your Seller account also.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HOC(ManageUPI);
