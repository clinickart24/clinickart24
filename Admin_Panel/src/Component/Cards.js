/** @format */

import { useNavigate } from "react-router-dom";

export const DashboardCards = ({ bg, link, title, number, icon }) => {
  const navigate = useNavigate();
  return (
    <div
      className="cardDiv"
      style={{
        backgroundColor: bg,
      }}
      onClick={() => navigate(link)}
    >
      <div className="grid  justify-between grid-cols-4 gap-2">
        <div className="flex flex-col col-span-3 space-y-1">
          <span
            className="tracking-widest text-gray-900"
            style={{ color: "#fff" }}
          >
            {title}
          </span>
          <span
            className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
            style={{ color: "#fff" }}
          >
            {number}
          </span>
        </div>
        <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
          {icon}
        </div>
      </div>
    </div>
  );
};
