import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import HOC from "../../../components/layout/LoginLayout/HOC";

const GiftCard = () => {
  const [cards, setCards] = useState([
    {
      email: "",
      mobile: "",
      value: "",
      count: 1,
      name: "",
      message: "",
    },
  ]);

  const addNewCard = () => {
    setCards([
      ...cards,
      {
        email: "",
        mobile: "",
        value: "",
        count: 1,
        name: "",
        message: "",
      },
    ]);
  };

  const handleChange = (index, e) => {
    const newCards = [...cards];
    newCards[index][e.target.name] = e.target.value;
    setCards(newCards);
  };

  const totalValue = cards.reduce(
    (sum, card) => sum + Number(card.value || 0) * Number(card.count || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 text-gray-800">
      <h2 className="text-xl font-semibold mb-4">Clinic Kart Gift Card</h2>

      <button className="flex items-center gap-2 text-pink-600 border border-gray-200 rounded px-4 py-2 mb-6 font-semibold text-sm bg-white">
        <Icon icon="mdi:plus" className="text-lg" />
        ADD A GIFT CARD
      </button>

      {cards?.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-pink-200 rounded-md p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Enter Receiver Email ID
              </label>
              <input
                type="email"
                name="email"
                value={card.email}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter email"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Enter Receiver Name</label>
              <input
                type="text"
                name="mobile"
                value={card.mobile}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter mobile number"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Enter Card Value</label>
              <input
                type="number"
                name="value"
                value={card.value}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter card value"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">No. of Cards</label>
              <select
                name="count"
                value={card.count}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">
                Enter Gift's Name (optional)
              </label>
              <input
                type="text"
                name="name"
                value={card.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter name"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Write the message</label>
              <textarea
                name="message"
                value={card.message}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter message"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>

          <div className="">
            <div className="homePageLoginBackgroundImage rounded-lg relative w-full h-[300px]">
              <div className="absolute bottom-10 left-5 flex items-center justify-center">
                <p className="flex flex-col gap-1">
                  <span pan className="text-black text-md font-semibold">
                    Gift Card Value
                  </span>
                  <span className="text-black text-md font-semibold">
                    ₹ {card.value}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={addNewCard}
            className="text-pink-600 text-sm font-medium mb-6 hover:underline w-fit px-2 py-1"
          >
            + Buy Another Gift Card
          </button>
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <button className=" bg-pink-600 text-white font-semibold py-2 rounded text-sm w-fit px-2 py-1">
          BUY GIFT CARD FOR ₹{totalValue}
        </button>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">FAQs</h3>
        <div className="text-sm text-gray-700 space-y-4">
          <p>
            <strong>
              What happens when I update my email address (or mobile number)?
            </strong>
            <br />
            Your login email ID (or mobile number) changes, likewise. You’ll
            receive all your account-related communication on your updated email
            address (or mobile number).
          </p>
          <p>
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
            Updating your email address (or mobile number) doesn’t invalidate
            your account. Your account remains fully functional. You’ll continue
            seeing your Order history, saved information and personal details.
          </p>
          <p>
            <strong>
              Does my Seller account get affected when I update my email
              address?
            </strong>
            <br />
            Clinic Kart has a ‘single sign-on’ policy. Any changes will reflect
            in your Seller account also.
          </p>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Terms & Conditions</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li className="pl-3">
            Clinic Kart Gift Cards (“GCs” or “Gift Cards”) are issued by
            Qwikcilver Solutions Pvt. Ltd.
          </li>
          <li className="pl-3">
            The Gift Cards can be redeemed online against Sellers listed on
            www.ClinicKart.com or Clinic Kart Mobile App or Clinic Kart m-site
            (Platform) only.
          </li>
          <li className="pl-3">
            Gift Cards can be purchased on www.ClinicKart.com or Clinic Kart
            Mobile App using the following payment modes only - Credit Card,
            Debit Card and Net Banking.
          </li>
          <li className="pl-3">
            Gift Cards can be redeemed by selecting the payment mode as Gift
            Card.
          </li>
          <li className="pl-3">
            Gift Cards cannot be used to purchase other Clinic Kart Gift Cards
            or Clinic Kart First subscriptions.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HOC(GiftCard);
