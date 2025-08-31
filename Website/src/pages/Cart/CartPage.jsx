import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import images from "../../lib/exportImages";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      name: "Vasa Iodopure Microbicidal Solutions (Pack of 10)",
      price: 2850,
      originalPrice: 3850,
      discount: "76% off",
      delivery: "Get it by Tue, Jun 13",
      image: images.pages.cartPage.items?.[0]?.image,
    },
    {
      name: "Vasa Iodopure Microbicidal Solutions (Pack of 10)",
      price: 2850,
      originalPrice: 3850,
      discount: "76% off",
      delivery: "Get it by Tue, Jun 13",
      image: images.pages.cartPage.items?.[1]?.image,
    },
  ];

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="text-sm text-black mb-4 bg-[#f2f2f2] p-2 rounded">
        HOME &gt; CATEGORY &gt; WHEELCHAIR &gt; PRODUCT &gt;{" "}
        <span className="text-pink-600">CHECKOUT PAGE</span>
      </div>

      <div>
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-indigo-100 text-center p-3 rounded text-indigo-700 font-medium mb-4">
              🎁 ₹951 saved! Add items worth ₹2201 more for Free Delivery
            </div>
            <div className="border border-gray-200 bg-[#f2f2f2] p-3 rounded flex justify-between items-start mb-6">
              <div>
                <p className="text-sm">
                  Deliver to:{" "}
                  <span className="font-semibold">Clinic Kart, 560070</span>
                  <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded">
                    HOME
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Seventh Block, Plot 118, 80 Feet Rd, above Bodyworks Spa, KHB
                  Colo...
                </p>
              </div>
              <button className="text-sm text-pink-600 font-medium border px-3 py-1 rounded">
                Change
              </button>
            </div>
            {products.map((product, index) => (
              <div
                key={index}
                className="gap-4 border-b border-gray-200 pb-4 items-start"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 mt-3">
                    <img
                      src={product.image}
                      alt="Product"
                      className="w-26 h-26 rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-lg">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-green-600 text-sm">
                        {product.discount}
                      </span>
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                      or Pay ₹2750.00 + 100 Coins
                    </p>
                    <p className="text-xs mt-1 text-green-600">
                      <span className=" text-[#2A7E3B] text-sm flex items-center gap-2">
                        <span className="bg-[#D0FFDA] text-[#2A7E3B] text-xs px-2 py-1 rounded">
                          <Icon icon="nimbus:truck" className="text-xl" />
                        </span>
                        <span className="text-[#2A7E3B]">
                          {product.delivery}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center rounded-sm overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1 text-lg bg-[#C53958]"
                      >
                        -
                      </button>
                      <span className="px-4 bg-[#F5F5F5] py-1 ">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1 text-lg bg-[#C53958]"
                      >
                        +
                      </button>
                    </div>
                  </div>{" "}
                  <div className="flex gap-6 text-sm text-pink-600 mt-2">
                    <button>SAVE FOR LATER</button>
                    <button>REMOVE</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-gray-200 rounded p-4 space-y-4 ">
            <h3 className="text-sm font-semibold">PRICE DETAILS</h3>

            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm">
              <div className="flex items-start gap-2">
                <Icon
                  icon="material-symbols:autorenew-rounded"
                  className="text-gray-600 w-5 h-5"
                />
                <div className="">
                  <p className="font-medium">Auto Pay Subscription</p>
                  <p className="text-xs text-gray-500">
                    Enable Auto Pay for hassle-free monthly deliveries
                  </p>
                  <label className="flex items-center gap-2 mt-2">
                    <input type="checkbox" />
                    <span className="text-xs text-gray-700">
                      Enable Auto Pay for these items monthly (Save 5% extra on
                      every order)
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <span className="text-gray-600">
                      <Icon
                        icon="solar:calendar-outline"
                        className="text-gray-500 text-xl"
                      />
                    </span>{" "}
                    <span> Next auto-charge: July 13, 2025</span>
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium text-sm">Auto Pay</span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#C53958] peer-focus:outline-none rounded-full peer-checked:bg-green-500 transition-all"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
                      </label>
                    </label>
                  </div>
                  <label className="flex items-center gap-2 mt-2 text-xs">
                    <input type="checkbox" /> I authorize recurring payments
                  </label>
                </div>
              </div>
            </div>

            <div className="text-sm">
              <div className="flex justify-between py-1">
                <span>Price (2 items)</span>
                <span>₹2850.00</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Delivery Charges</span>
                <span className="text-green-600">
                  <span className="line-through text-gray-400 mr-1">
                    ₹49.00
                  </span>
                  FREE
                </span>
              </div>
              <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
                <span>Total</span>
                <span>₹2850.00</span>
              </div>
            </div>

            <button className="w-full bg-[#C53958] text-white py-2 rounded font-medium hover:bg-pink-700 transition-all">
              PROCEED TO CHECKOUT
            </button>

            <div className="border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium flex items-center gap-2">
                  {" "}
                  <Icon
                    icon="hugeicons:discount-tag-02"
                    className="text-xl"
                  />{" "}
                  <span>Coupons</span>
                </span>
                <button className="text-black text-sm">All Coupons &gt;</button>
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Type your Coupon Code here"
                  className="border border-[#C53958] rounded px-3 py-1 text-sm w-full"
                />
                <button className="px-4 py-1 rounded bg-gray-700 text-white text-sm">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
