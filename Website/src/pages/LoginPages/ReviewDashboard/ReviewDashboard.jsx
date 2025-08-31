import React from "react";
import { Icon } from "@iconify-icon/react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import images from "../../../lib/exportImages";

const productImage = images.pages.homePage.helpCenter.images?.[0]?.image; // Replace with real image URL

const MyReviews = () => (
  <div className="p-4 border border-gray-200 rounded-md shadow-sm bg-white">
    <div className="flex gap-4 items-start">
      <img
        src={productImage}
        alt="Product"
        className="w-16 h-16 object-cover"
      />
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">
          Waldent Glasseal Glass Ionomer Liner LC
        </h4>
        <div className="flex items-center mt-1">
          <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm mr-2">
            1 ★
          </div>
          <span className="text-sm font-semibold text-gray-700">Very Poor</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">low quality</p>
        <p className="text-xs text-gray-400 mt-2">
          John Dow •{" "}
          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mx-1" />{" "}
          Certified Buyer 17 Mar, 2019
        </p>
        <div className="flex items-center text-gray-400 mt-2 gap-2">
          <Icon icon="mdi:thumb-down-outline" />
          <span className="text-xs">0</span>
          <Icon icon="mdi:thumb-up-outline" />
          <span className="text-xs">0</span>
        </div>
        <div className="mt-3 flex gap-4 text-sm text-pink-600 font-medium">
          <button>Edit</button>
          <button>Delete</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  </div>
);

const ReviewPromptCard = () => (
  <div className="flex gap-4 items-start p-4 border border-gray-200 rounded-md bg-white shadow-sm">
    <img src={productImage} alt="Product" className="w-16 h-16 object-cover" />
    <div>
      <h4 className="text-sm font-medium text-gray-800">
        Waldent Glasseal Glass Ionomer Liner LC
      </h4>
      <div className="flex items-center mt-2 gap-1 text-gray-300">
        {[...Array(5)].map((_, i) => (
          <Icon key={i} icon="mdi:star-outline" className="text-lg" />
        ))}
      </div>
      <button className="text-sm text-pink-600 font-medium mt-1 hover:underline">
        Rate and Review
      </button>
    </div>
  </div>
);

const ReviewDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <section className="bg-white p-4 rounded-md">
        <h2 className="text-base font-semibold mb-3">
          My Reviews <span className="text-sm text-gray-400">(1)</span>
        </h2>
        <MyReviews />
      </section>

      <section className="bg-white p-4 rounded-md">
        <h2 className="text-base font-semibold mb-3">
          Orders you might be interested reviewing
        </h2>
        <div className="space-y-4">
          <ReviewPromptCard />
          <ReviewPromptCard />
          <ReviewPromptCard />
        </div>
      </section>
    </div>
  );
};

export default HOC(ReviewDashboard);
