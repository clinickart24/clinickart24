import React from "react";
import { Icon } from "@iconify-icon/react";
import HOC from "../../../components/layout/LoginLayout/HOC";
import images from "../../../lib/exportImages";

const wishlistItems = [
  {
    name: "Ids Denmed HDi I10 Intraoral Camera (Tv Model)",
    currentPrice: "₹2650.00",
    originalPrice: "₹5200.00",
    discount: "49% off",
    image: images.pages.homePage.helpCenter.images?.[0]?.image,
  },
  {
    name: "Dentsply X-Smart Plus Endodontic Endo Motor",
    currentPrice: "₹2650.00",
    originalPrice: "₹5200.00",
    discount: "49% off",
    image: images.pages.homePage.helpCenter.images?.[1]?.image,
  },
  {
    name: "Waldent RTA Smart Ray Portable DC Xray Machine By Woodpecker",
    currentPrice: "₹2650.00",
    originalPrice: "₹5200.00",
    discount: "49% off",
    image: images.pages.homePage.helpCenter.images?.[2]?.image,
  },
 
];

const WishlistItem = ({ item }) => (
  <div className="flex justify-between items-center p-3 border-b border-gray-200">
    <div className="flex gap-4 items-center">
      <img
        src={item.image}
        alt={item.name}
        className="w-14 h-14 object-cover"
      />
      <div>
        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
        <div className="flex items-center gap-2 mt-1 text-sm">
          <span className="font-semibold text-gray-800">
            {item.currentPrice}
          </span>
          <span className="line-through text-gray-400">
            {item.originalPrice}
          </span>
          <span className="text-green-600 font-medium">{item.discount}</span>
        </div>
      </div>
    </div>
    <button className="text-gray-400 hover:text-red-500">
      <Icon icon="mdi:trash-can-outline" width="20" />
    </button>
  </div>
);

const Wishlist = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4 bg-white">
      <h2 className="text-base font-semibold border-b border-gray-200 pb-2">
        My Wishlist (12)
      </h2>
      {wishlistItems.map((item, index) => (
        <WishlistItem key={index} item={item} />
      ))}
    </div>
  );
};

export default HOC(Wishlist);
