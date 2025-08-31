import React from "react";
import HOC from "../../../components/layout/LoginLayout/HOC";

const coupons = {
  available: [
    {
      id: 1,
      title: "Extra 20% off on Brand",
      description: "Extra 20% off on brand (valid till: 11:59 PM, 11 Jun)",
      expiry: "11 Jun, 2025",
    },
    {
      id: 2,
      title: "Extra 20% off on Brand",
      description: "Extra 20% off on brand (valid till: 11:59 PM, 11 Jun)",
      expiry: "11 Jun, 2025",
    },
    {
      id: 3,
      title: "Extra 20% off on Brand",
      description: "Extra 20% off on brand (valid till: 11:59 PM, 11 Jun)",
      expiry: "11 Jun, 2025",
    },
  ],
  upcoming: [
    {
      id: 4,
      title: "Extra 20% off on Brand",
      description: "Extra 20% off on brand (valid till: 11:59 PM, 11 Jun)",
      expiry: "11 Jun, 2025",
    },
    {
      id: 5,
      title: "Extra 20% off on Brand",
      description: "Extra 20% off on brand (valid till: 11:59 PM, 11 Jun)",
      expiry: "11 Jun, 2025",
    },
  ],
};

const CouponCard = ({ title, description, expiry, isAvailable }) => (
  <div className="flex justify-between items-start border border-gray-200 rounded-md p-4 bg-white">
    <div>
      <p
        className={`text-sm font-semibold ${
          isAvailable ? "text-green-600" : "text-black"
        }`}
      >
        {title}
      </p>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
    <div className="text-right text-sm">
      <p className="text-gray-500">Valid till {expiry}</p>
      <button className="text-red-500 font-medium hover:underline mt-1">
        View T&C
      </button>
    </div>
  </div>
);

const CouponsPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div>
        <h2 className="text-base font-semibold mb-3">Available Coupons</h2>
        <div className="space-y-3">
          {coupons.available.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} isAvailable />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold mb-3">Upcoming Coupons</h2>
        <div className="space-y-3">
          {coupons.upcoming.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} isAvailable={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HOC(CouponsPage);
