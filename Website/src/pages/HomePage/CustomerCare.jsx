import React from "react";
import { Icon } from "@iconify-icon/react";
import images from "../../lib/exportImages";
import { useNavigate } from "react-router-dom";

const CustomerCare = () => {
  const navigate=useNavigate();
  return (
    <div className="p-4 md:p-8 bg-gray-50 text-gray-800 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-3xl font-bold mb-2 text-black">
        Clinic Kart Help Center | 24×7 Customer Care Support
      </h1>

      <p className="text-sm md:text-base text-gray-600 mb-6 max-w-7xl">
        The Clinic Kart Help Centre page lists out various types of issues that
        you may have encountered so that there can be quick resolution and you
        can go back to shopping online. For example, you can get more
        information regarding order tracking, delivery date changes, help with
        returns (and refunds), and much more. The Flipkart Help Centre also
        lists out more information that you may need regarding Flipkart Plus,
        payment, shopping, and more. The page has various filters listed out on
        the left-hand side so that you can get your queries solved quickly,
        efficiently, and without a hassle. You can get the Flipkart Help Centre
        number or even access Flipkart Help Centre support if you need
        professional help regarding various topics. The support executive will
        ensure speedy assistance so that your shopping experience is positive
        and enjoyable. You can even inform your loved ones of the support page
        so that they can properly get their grievances addressed as well. Once
        you have all your queries addressed, you can pull out your shopping list
        and shop for all your essentials in one place. You can shop during
        festive sales to get your hands on some unbelievable deals online. This
        information is updated on 30-May-25
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg p-2">
          <h2 className="text-md font-semibold text-black mb-2">
            TYPE OF ISSUE
          </h2>
          <ul className="mb-4 space-y-3">
            <li className="text-sm hover:underline cursor-pointer" onClick={() => navigate("/customer-care/1")}>
              Health with your issues
            </li>
            <li className="text-sm hover:underline cursor-pointer" onClick={() => navigate("/customer-care/2")}>
              Health with your order
            </li>
            <li className="text-sm hover:underline cursor-pointer">
              Health with other issues
            </li>
          </ul>

          <h2 className="text-md font-semibold text-black mb-2">HELP TOPICS</h2>
          <ul className="space-y-3">
            <li className="text-sm hover:underline cursor-pointer">
              Delivery related
            </li>
            <li className="text-sm hover:underline cursor-pointer">
              Login and my account
            </li>
            <li className="text-sm hover:underline cursor-pointer">
              Refunds related
            </li>
            <li className="text-sm hover:underline cursor-pointer">
              Clinic Kart
            </li>
            <li className="text-sm hover:underline cursor-pointer">Payment</li>
            <li className="text-sm hover:underline cursor-pointer">
              Refunds & Pickup related
            </li>
            <li className="text-sm hover:underline cursor-pointer">
              Cancellation related
            </li>
            <li className="text-sm hover:underline cursor-pointer">
              Subscription
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-6 rounded-lg">
          <div className="bg-white rounded-lg p-4">
            <p className="text-md font-normal text-gray-500 mb-2">
              Help Center
            </p>
            <h3 className="font-medium mb-3">Your issues</h3>
            <div className="">
              <div className="flex items-start gap-4 ">
                <img
                  src={images.pages.homePage.helpCenter.images[0].image}
                  alt=""
                  className="w-26 h-26 object-contain border border-gray-200 rounded"
                />
                <div>
                  <p className="font-semibold">
                    I have a query about my cancelled order
                  </p>
                  <span className="text-xs text-green-600 font-medium">
                    Resolved
                  </span>
                  <span className="text-xs text-gray-400 ml-2">
                    Today, May 31
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <h3 className="font-medium mb-3 border-b border-gray-200 pb-3 p-3">
              Which item are you facing an issue with?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start justify-between gap-4 border-y border-gray-200 p-3">
                <div className="flex items-start gap-4">
                  <img
                    src={images.pages.homePage.helpCenter.images[1].image}
                    alt="Camera"
                    className="w-16 h-16 object-contain border border-gray-200 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      Ids Denmed HD 110 Intraoral Camera (Tv Model)
                    </p>
                    <span className="text-xs text-gray-400 flex items-center gap-2">
                      <Icon icon="bi:dot" width="36" height="36" className="text-green-500" />{" "}
                      <span> Delivered: Mon, May 26</span>
                    </span>

                  </div>
                </div>
              </li>
              <li className="flex items-start justify-between gap-4 border-y border-gray-200 p-3">
                <div className="flex items-start gap-4">
                  <img
                    src={images.pages.homePage.helpCenter.images[2].image}
                    alt="Motor"
                    className="w-16 h-16 object-contain border border-gray-200 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      Dentsply X-Smart Plus Endodontic Endo Motor
                    </p>
                    <span className="text-xs text-gray-400">
                      Delivered: Mon, May 26
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-2 text-red-600 text-sm font-medium hover:underline cursor-pointer text-center py-3">
              View more
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium mb-3">What issue are you facing?</h3>
            <ul className="divide-y text-sm">
              <li className="py-3 cursor-pointer flex justify-between hover:bg-gray-50">
                I want to manage my order{" "}
                <Icon icon="mdi:chevron-right" width="20" />
              </li>
              <li className="py-3 cursor-pointer flex justify-between hover:bg-gray-50">
                I want to help with returns & refunds{" "}
                <Icon icon="mdi:chevron-right" width="20" />
              </li>
              <li className="py-3 cursor-pointer flex justify-between hover:bg-gray-50">
                I want to help with other issues{" "}
                <Icon icon="mdi:chevron-right" width="20" />
              </li>
              <li className="py-3 cursor-pointer flex justify-between hover:bg-gray-50">
                I want to contact the seller{" "}
                <Icon icon="mdi:chevron-right" width="20" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
