import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import images from "../../../lib/exportImages";

const ordersData = [
  {
    id: 1,
    name: "Ids Denmed HDi I10 Intraoral Camera (Tv Model)",
    price: "₹2650.00",
    status: "Order Placed",
    statusType: "success",
    note: "Your order has been placed successfully.",
    img:images.pages.cartPage.items?.[0]?.image,
  },
  {
    id: 2,
    name: "Ids Denmed HDi I10 Intraoral Camera (Tv Model)",
    price: "₹2650.00",
    status: "Order Placed",
    statusType: "success",
    note: "Your order has been placed successfully.",
    img:images.pages.cartPage.items?.[0]?.image,
  },
  {
    id: 3,
    name: "Ids Denmed HDi I10 Intraoral Camera (Tv Model)",
    price: "₹2650.00",
    status: "Order Placed",
    statusType: "success",
    note: "Your order has been placed successfully.",
    img:images.pages.cartPage.items?.[0]?.image,
  },
  {
    id: 4,
    name: "Ids Denmed HDi I10 Intraoral Camera (Tv Model)",
    price: "₹2650.00",
    status: "Order Not Placed",
    statusType: "error",
    note: "Your Payment was not confirmed by the bank",
    img:images.pages.cartPage.items?.[0]?.image,
  },
];

const MyOrders = () => {
  const [search, setSearch] = useState("");

  const filteredOrders = ordersData.filter((order) =>
    order.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-10">
      <div className="text-xs text-gray-500 mb-6 bg-gray-50 p-4">
        HOME &gt; MY ACCOUNT &gt;{" "}
        <span className="text-pink-600 font-semibold">MY ORDERS</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-gray-50">
          <h3 className="font-bold mb-4 text-lg">Filters</h3>
          <div className="mb-6">
            <h4 className="text-xs text-black mb-2 font-semibold">
              ORDER STATUS
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> On the way
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> Delivered
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> Cancelled
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> Returned
              </label>
            </div>
          </div>
          <div>
            <h4 className="text-xs text-black mb-2 font-bold">ORDER TIME</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> Last 30 days
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> 2024
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> 2023
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> 2022
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" /> Older
              </label>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your order here"
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm"
            />
            <button className="bg-[#C53958] text-white px-4 py-2 rounded-r flex items-center gap-1">
              <Icon icon="mdi:magnify" />
              Search Order
            </button>
          </div>

          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b border-gray-200 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.img}
                    alt={order.name}
                    className="w-16 h-16 border border-gray-300 rounded"
                  />
                  <div className="text-[#20212A]">
                    <h3 className="text-sm font-medium">{order.name}</h3>
                    <p className="font-semibold">{order.price}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      order.statusType === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        order.statusType === "success"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    ></span>
                    {order.status}
                  </p>
                  <p className="text-xs text-gray-500">{order.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
