import React, { useRef } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import images from "../../lib/exportImages";
import { useNavigate } from "react-router-dom";

const brands = [
  { name: "ORTHOMETRIC", discount: "Up To 15% Off", id: 1 },
  { name: "WALDENT", discount: "Up To 10% Off", id: 2 },
  { name: "SUPER ENDO", discount: "Up To 20% Off", id: 3 },
  { name: "ET DENTAL", discount: "Up To 25% Off", id: 4 },
  { name: "ALPHA DENT", discount: "Up To 12% Off", id: 5 },
  { name: "ALPHA DENT2", discount: "Up To 12% Off", id: 6 },
  { name: "ALPHA DENT3", discount: "Up To 12% Off", id: 7 },
  { name: "BRITE SMILE", discount: "Up To 18% Off", id: 8 },
  { name: "CLEAR ALIGN", discount: "Up To 22% Off", id: 9 },
  { name: "DENTOCARE", discount: "Up To 15% Off", id: 10 },
  { name: "EASY FLOSS", discount: "Up To 8% Off", id: 11 },
  { name: "FLEX BRUSH", discount: "Up To 10% Off", id: 12 },
  { name: "GOLDEN SMILES", discount: "Up To 20% Off", id: 13 },
  { name: "HELIODENT", discount: "Up To 16% Off", id: 12 },
  { name: "IMPLANTEX", discount: "Up To 30% Off", id: 13 },
  { name: "JOINT DENT", discount: "Up To 12% Off", id: 14 },
  { name: "KLEAN TEETH", discount: "Up To 25% Off", id: 15 },
  { name: "LUMINA DENT", discount: "Up To 15% Off", id: 16 },
  { name: "MEDIDENT", discount: "Up To 18% Off", id: 17 },
  { name: "NOVA SMILE", discount: "Up To 20% Off", id: 18 },
  { name: "ORAL TECH", discount: "Up To 15% Off", id: 19 },
  { name: "PEARL DENTAL", discount: "Up To 12% Off", id: 20 },
  { name: "QUICK ALIGN", discount: "Up To 22% Off", id: 21 },
  { name: "ROYAL BRUSH", discount: "Up To 18% Off", id: 22 },
  { name: "SMILEPRO", discount: "Up To 14% Off", id: 23 },
  { name: "TOOTH FAIRY", discount: "Up To 25% Off", id: 24 },
  { name: "ULTRA CLEAN", discount: "Up To 10% Off", id: 25 },
  { name: "VIVADENT", discount: "Up To 20% Off", id: 26 },
  { name: "WHITE PEARL", discount: "Up To 15% Off", id: 27 },
  { name: "XYLO DENT", discount: "Up To 12% Off", id: 28 },
  { name: "YOUNG SMILES", discount: "Up To 16% Off", id: 29 },
  { name: "ZIRCONIA PRO", discount: "Up To 30% Off", id: 30 },
];

const BrandCard = ({ brand, index }) => {
  const navigate = useNavigate();
  const brandImage =
    images?.pages?.homePage?.brands?.[index]?.image || images?.fallbackImage;

  return (
    <div
      className="w-full p-4 text-center rounded-lg cursor-pointer"
      onClick={() => navigate(`/products/${brand?.id}`)}
    >
      <div className="flex flex-col items-center justify-center p-4 bg-[#E6ECFF] rounded-lg">
        <img
          src={brandImage}
          alt={brand?.name || "Brand Image"}
          className="w-full max-h-[200px] object-contain mb-2"
          loading="lazy"
        />
        <h3 className="text-lg font-bold text-gray-500">
          {brand?.name || "Unnamed Brand"}
        </h3>
      </div>
      {brand?.discount && (
        <p className="mt-4 text-md font-bold text-black">{brand.discount}</p>
      )}
    </div>
  );
};

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

const Brands = () => {
  const navigate = useNavigate();
  const groupedBrands = groupByFirstLetter(brands);
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
        <span className="text-red-500 ml-2">BRANDS</span>
      </div>

      <div className="my-7 flex flex-col justify-center text-center">
        <h1 className="text-[3rem] lg:text-[5rem] font-bold mb-6">
          Feature{" "}
          <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-transparent bg-clip-text">
            BRANDS
          </span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center md:justify-between bg-[#F7D929] p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-2 text-lg font-medium">
          {"#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => (
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

      <div className="border border-gray-200 rounded-lg p-4">
        {Object.keys(groupedBrands)
          .sort()
          .map((letter) => (
            <div key={letter} ref={(el) => (sectionRefs.current[letter] = el)}>
              <h2 className="flex items-center w-full my-6">
                <span className="px-4 text-xl font-semibold text-gray-700">
                  {letter}
                </span>
                <div className="flex-grow border-t border-black"></div>
              </h2>

              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-6 flex-wrap">
                  {groupedBrands[letter]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((brand, index) => (
                      <div key={brand.id} className="w-[200px] flex-shrink-0">
                        <BrandCard brand={brand} index={index} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Brands;
