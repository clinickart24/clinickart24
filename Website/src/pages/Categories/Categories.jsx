import React, { useRef } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import images from "../../lib/exportImages";
import { useNavigate } from "react-router-dom";



const Categories = () => {
  const navigate = useNavigate();

const categories = [
  {
    name: "WHEEL CHAIR",
    discount: "Up To 15% Off",
    id:1
  },
  { name: "AIROTOR", discount: "Up To 15% Off",id:2 },
  {
    name: "COMPOSITE",
    discount: "Up To 15% Off",
    id:3
  },
  {
    name: "ENDOMOTOR",
    discount: "Up To 15% Off",
    id:4
  },
  {
    name: "CEMENTS",
    discount: "Up To 15% Off",
    id:5
  },
  {
    name: "BRACKETS",
    discount: "Up To 15% Off",
    id:6
  },
  {
    name: "SPARE PARTS",
    discount: "Up To 15% Off",
    id:7
  },
  {
    name: "AUTOCLAVE",
    discount: "Up To 15% Off",
    id:8
  },
  ];
  const CategoryCard = ({ category, index }) => {
    const categoryImage =
      images?.pages?.homePage?.categories?.[index]?.image ||
      images?.fallbackImage;

    return (
      <div className="w-full p-4 text-center rounded-lg ">
        <div
          className="flex flex-col items-center justify-center p-4 rounded-lg w-full"
          style={{
            backgroundImage: `url(${images.pages.homePage.banners[1].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}

          onClick={()=>navigate(`/products/${category?.id}`)}
        >
          <img
            src={categoryImage}
            alt={category?.name || "Category Image"}
            className="w-[200px] h-[200px] object-contain mb-2"
            loading="lazy"
          />
          <h3 className="text-lg font-bold text-gray-500">
            {category?.name || "Unnamed Category"}
          </h3>
        </div>
        {category?.discount && (
          <p className="mt-4 text-md font-bold text-black">
            {category.discount}
          </p>
        )}
      </div>
    );
  };
  return (
    <div className="px-8 py-6 bg-white min-h-screen max-w-7xl mx-auto">
      <div className="text-sm text-gray-500 mb-4 bg-[#f2f2f2] p-3">
        <span className="mr-2">HOME</span> &gt;{" "}
        <span className="text-red-500 ml-2">CATEGORIES</span>
      </div>

      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
