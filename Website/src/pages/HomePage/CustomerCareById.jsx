import { useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../lib/exportImages";

const CustomerCareById = () => {
  const [selectedIssue, setSelectedIssue] = useState("Health with your issues");
  const navigate = useNavigate();

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 text-gray-800 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg p-2">
          <h2 className="text-md font-semibold text-black mb-2">
            TYPE OF ISSUE
          </h2>
          <ul className="mb-4 space-y-3">
            {[
              "Health with your issues",
              "Health with your order",
              "Health with other issues",
            ].map((issue) => (
              <li
                key={issue}
                onClick={() => handleIssueClick(issue)}
                className={`text-sm hover:underline cursor-pointer hover:bg-red-100 hover:text-red-600 py-3 px-2 ${
                  selectedIssue === issue ? "font-bold text-red-600 bg-red-100 py-3 px-2" : ""
                }`}
              >
                {issue}
              </li>
            ))}
          </ul>

          <h2 className="text-md font-semibold text-black mb-2">HELP TOPICS</h2>
          <ul className="space-y-3">
            {[
              "Delivery related",
              "Login and my account",
              "Refunds related",
              "Clinic Kart",
              "Payment",
              "Refunds & Pickup related",
              "Cancellation related",
              "Subscription",
            ].map((topic) => (
              <li
                key={topic}
                onClick={() => handleIssueClick(topic)}
                className={`text-sm hover:underline cursor-pointer ${
                  selectedIssue === topic ? "font-bold text-red-600 bg-red-100" : ""
                }`}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 space-y-6 rounded-lg">
          <div className="bg-white rounded-lg p-4">
            <p className="text-md font-normal text-gray-500 mb-2">
              Help Center
            </p>
            <h3 className="font-medium mb-3">Your issues: {selectedIssue}</h3>

            <div className="flex items-start gap-4">
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
      </div>
    </div>
  );
};

export default CustomerCareById;
