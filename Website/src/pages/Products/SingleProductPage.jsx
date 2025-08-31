import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import images from "../../lib/exportImages";
import { ProductCard } from "../../components/common/Cards/Card";
import { useNavigate } from "react-router-dom";

const SingleProductPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const reviews = [
    {
      name: "Emily Guerra",
      date: "July 5, 2024",
      rating: 4,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan ex ac urna commodo rutrum. Vestibulum volutpat hendrerit lacus, in feugiat nisi venenatis nec.",
    },
    {
      name: "Darren Nixon",
      date: "June 26, 2025",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan ex ac urna commodo rutrum. Vestibulum volutpat hendrerit lacus, in feugiat nisi venenatis nec.",
    },
    {
      name: "Sabrina Murray",
      date: "June 2, 2025",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan ex ac urna commodo rutrum. Vestibulum volutpat hendrerit lacus, in feugiat nisi venenatis nec.",
    },
  ];
  const products = [
    {
      name: "Anthos Classe A3 Plus Dental Chair",
      image: images.pages.productPage.images[0].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Libral Study Model Cartoon Dental Chair",
      image: images.pages.productPage.images[1].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Bestdent Classic Dental Chair (FREE Installation in Delhi NCR)",
      image: images.pages.productPage.images[2].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Waldent Port Confident Chair 372 x 350",
      image: images.pages.productPage.images[3].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Unicorn Denmart Unique Hair And Chair",
      image: images.pages.productPage.images[4].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Bestdent Dental Chair 372 x 350",
      image: images.pages.productPage.images[5].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Bestdent A Class Confident Chair",
      image: images.pages.productPage.images[6].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Waldent Exl Confident Chair",
      image: images.pages.productPage.images[7].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Dobli Chrom Confident Chair 372 x 350",
      image: images.pages.productPage.images[8].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Normast Brotex Confident Chair 372 x 350",
      image: images.pages.productPage.images[9].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Confident M Confident Chair",
      image: images.pages.productPage.images[10].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
    {
      name: "Confident W Confident Chair 372 x 350",
      image: images.pages.productPage.images[11].image,
      rating: 4,
      reviews: 35,
      price: 5990,
      originalPrice: 8999,
    },
  ];
  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon={i < count ? "ic:round-star" : "ic:round-star-border"}
        className="text-yellow-400 w-4 h-4"
      />
    ));
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-black mb-4 flex gap-2 items-center bg-[#f2f2f2] p-2 rounded">
        <span>Home</span>
        <Icon icon="material-symbols:chevron-right-rounded" />
        <span>Category</span>
        <Icon icon="material-symbols:chevron-right-rounded" />
        <span className="text-pink-600 font-medium">Product</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/5 space-y-4">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-[#F4F5F6] p-1 rounded-md cursor-pointer"
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={images.pages.productPage.images[index]?.image}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-fit"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1 relative">
              <img
                src={images.pages.productPage.images[selectedImageIndex]?.image}
                alt="Product"
                className="w-full h-full object-contain"
              />

              <button
                className="absolute top-7 -right-2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 hover:bg-gray-200 p-1 rounded-full shadow-lg w-10 h-10 flex items-center justify-center cursor-pointer"
                title="Add to Cart"
              >
                <Icon icon="bx:heart" className="text-2xl" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="bg-[#C53958] hover:bg-[#C53958] text-white px-6 py-2 rounded w-full flex items-center gap-2 justify-center">
              <Icon icon="mdi:cart" className="text-2xl" /> ADD TO CART
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded w-full flex items-center gap-2 justify-center">
              <Icon icon="jam:thunder-f" className="text-2xl" />{" "}
              <span>BUY NOW</span>
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-sm text-gray-400 font-semibold">
            Suraksha Latex Medical Examination Gloves
          </h3>
          <h1 className="text-xl font-semibold">
            Vasa Iodopure Microbicidal Solutions (Pack of 10)
          </h1>
          <div className="text-green-600 text-sm font-semibold">
            Special Price
          </div>
          <div className="flex items-center gap-2 text-2xl font-bold text-rose-600">
            ₹2850.00
            <span className="text-sm text-gray-400 line-through font-medium">
              ₹11850.00
            </span>
            <span className="text-green-500 text-sm font-medium">76% off</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-2xl">
              4.2 ★
            </span>
            <span className="text-xs">476 ratings and 35 reviews</span>
          </div>
          <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-2 mt-4">
            <span className="text-[#FF001C] text-sm flex items-center gap-2">
              <span className="bg-[#FFEEEF] text-[#714012] text-xs px-2 py-1 rounded-full flex justify-center items-center w-6 h-6">
                <Icon icon="system-uicons:cross-circle" className="text-xl" />
              </span>
              <span className="text-[#FF001C]">COD not available</span>
            </span>
            <span className=" text-sm flex items-center gap-2">
              <span className="bg-[#FEFAC3] text-[#714012] text-xs px-2 py-1 rounded">
                <Icon icon="hugeicons:delivery-return-01" className="text-xl" />
              </span>
              <span className="text-[#714012]">15-days Returnable</span>
            </span>
            <span className=" text-[#2A7E3B] text-sm flex items-center gap-2">
              <span className="bg-[#D0FFDA] text-[#2A7E3B] text-xs px-2 py-1 rounded">
                <Icon icon="nimbus:truck" className="text-xl" />
              </span>
              <span className="text-[#2A7E3B]">Get it by Tue, Jan 13</span>
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center rounded-sm overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg bg-[#C53958]"
              >
                -
              </button>
              <span className="px-4 bg-[#F5F5F5] py-1 ">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg bg-[#C53958]"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium mb-1">Deliver to</label>
            <select className="border border-gray-300 bg-[#F5F5F5] rounded px-3 py-2 w-full">
              <option>Bangalore - 560070</option>
              <option>Mumbai - 400001</option>
              <option>Delhi - 110001</option>
            </select>
          </div>
          <div className="mt-8 space-y-2">
            {[
              "Feature",
              "Description",
              "Key Specifications",
              "Packaging",
              "Direction to Use",
              "Warranty",
            ].map((section) => (
              <div
                key={section}
                className="border border-gray-300 rounded cursor-pointer"
              >
                <div
                  className="flex justify-between items-center border border-gray-300 py-2 px-3 rounded bg-gray-100"
                  onClick={() => toggleSection(section)}
                >
                  <span className="font-medium">{section}</span>
                  <Icon
                    icon={
                      activeSection === section
                        ? "material-symbols:keyboard-arrow-up-rounded"
                        : "material-symbols:keyboard-arrow-down-rounded"
                    }
                    className="text-xl"
                  />
                </div>
                {activeSection === section && (
                  <p className="text-sm text-gray-600 mt-2 p-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean efficitur arcu sit amet nunc egestas, a convallis
                    nibh sagittis.
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 space-y-6">
            <h2 className="text-lg font-semibold">Ratings & Reviews</h2>

            <div className="flex flex-col lg:flex-row gap-4 space-x-4">
              <div className="flex items-center space-x-4 bg-gray-50 border border-gray-200 p-4 rounded-md w-fit h-fit">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex items-center space-x-2">
                    <div>
                      <Icon
                        icon="mdi:star"
                        className="text-2xl text-yellow-500"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-gray-800">
                        4.5
                        <span className="text-sm text-gray-400 ">/5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">5.0 Ratings</div>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-none"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-400">
                        {review.date}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      By <span className="font-medium">{review.name}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      {review.comment}
                    </p>
                  </div>
                ))}
                <button className="text-blue-600 text-sm flex items-center gap-1 hover:underline cursor-pointer">
                  See all reviews
                </button>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
      <h4 className="flex items-center justify-between my-7">
        <span className="text-2xl font-bold">Most Search Products</span>
        <span>
          <Icon icon="lucide:arrow-right" />
        </span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

export default SingleProductPage;
