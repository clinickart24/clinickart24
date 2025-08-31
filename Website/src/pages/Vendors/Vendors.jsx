import React, { useRef } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import images from "../../lib/exportImages";
import { useNavigate } from "react-router-dom";

const vendors = [
  { name: "Alpha Tech", discount: "Up To 15% off" },
  { name: "Alpha Tech2", discount: "Up To 30% off" },
  { name: "Beta Solutions" },
  { name: "Cloud Nine" },
  { name: "Delta Works" },
  { name: "Echo Labs" },
  { name: "Futura Corp" },
  { name: "Gamma Gear" },
  { name: "Hawk Systems" },
  { name: "IntelliSoft" },
  { name: "Jetline Services" },
  { name: "Krypton Inc" },
  { name: "Lunar Tech" },
  { name: "MetaFrame" },
  { name: "Nova Enterprises" },
  { name: "OmniCloud" },
  { name: "PixelCraft" },
  { name: "QuantumCore" },
  { name: "RedStone Labs" },
  { name: "Skyline Ventures" },
  { name: "Techtonic" },
  { name: "Umbra Corp" },
  { name: "Vortex Digital" },
  { name: "Waveline Systems" },
  { name: "XenoTech" },
  { name: "Yellow Spark" },
  { name: "Zeta Solutions" },
];

const groupByFirstLetter = (vendors) => {
  return vendors.reduce((acc, vendor) => {
    const firstLetter = vendor.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(vendor);
    return acc;
  }, {});
};

const Vendors = () => {
  const navigate = useNavigate();
  const groupedVendors = groupByFirstLetter(vendors);
  const sectionRefs = useRef({});

  const scrollToSection = (letter) => {
    if (sectionRefs.current[letter]) {
      sectionRefs.current[letter].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="px-8 py-6 bg-white min-h-screen max-w-7xl mx-auto">
      <div className="text-sm text-gray-500 mb-4 bg-[#f2f2f2] p-3">
        <span className="mr-2">HOME</span> &gt;{" "}
        <span className="text-red-500 ml-2">VENDORS</span>
      </div>
      <div className="my-7 flex flex-col justify-center text-center">
        <h1 className="text-[3rem] lg:text-[5rem] font-bold mb-6">
          Feature{" "}
          <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-transparent bg-clip-text">
            Vendors
          </span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-between bg-[#F7D929] p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-2 text-lg font-medium">
          {"#ABCDEFGHIJKLMNOPQRSTUVWXYZ"?.split("").map((char) => (
            <span
              key={char}
              className="cursor-pointer hover:underline"
              onClick={() => scrollToSection(char)}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="relative mt-4 md:mt-0 w-full max-w-md">
          <input
            type="text"
            placeholder="Search your Brand"
            className="w-full border rounded pl-4 pr-20 py-2 outline-none"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-600">
            <Icon
              icon="mdi:microphone"
              className="w-5 h-5 cursor-pointer hover:text-red-500"
            />
            <span className="text-gray-400">|</span>
            <Icon icon="ri:search-line" className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
      <div>
       <div className="border border-gray-200 rounded-lg p-4">
          {Object.keys(groupedVendors)
            .sort()
            .map((letter) => (
              <div key={letter} ref={(el) => (sectionRefs.current[letter] = el)}>
                <h2 className="flex items-center w-full my-6">
                  <span className="px-4 text-xl font-semibold text-gray-700">
                    {letter}
                  </span>
                  <div className="flex-grow border-t border-black"></div>
                  <div className="flex-grow border-t border-black"></div>
                </h2>
                <div className="flex gap-6 flex-wrap">
                  {groupedVendors[letter].map((vendor, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-28 h-28 rounded-full flex items-center justify-center cursor-pointer ${
                          index % 2 === 0 ? "bg-[#FDF18B]" : "bg-[#F7D4D8]"
                        }`}
                        onClick={() => navigate(`/products/1`)}
                      >
                        <img
                          src={images.pages.homePage.images?.[0].image}
                          alt=""
                          className="w-1/2"
                        />
                      </div>
                      <p className="flex flex-col items-center gap-1">
                        <span className="text-sm font-medium text-center">
                          {vendor.name}
                        </span>
                        <span className="text-gray-500 text-md font-medium text-center">
                          {vendor.discount}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
       </div>
      </div>
    </div>
  );
};

export default Vendors;
