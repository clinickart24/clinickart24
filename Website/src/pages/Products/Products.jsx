import React from "react";
import images from "../../lib/exportImages";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { ProductCard } from "../../components/common/Cards/Card";
import FilterSidebar from "../../components/common/OtherComponent/FilterSidebar";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate=useNavigate()
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

  return (
    <div className="max-w-7xl mx-auto">
      <div
        className="rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto mt-6 bg-cover bg-no-repeat bg-center min-h-[200px] lg:min-h-[400px]"
        style={{
          backgroundImage: `url(${images.pages.homePage.banners[0].image})`,
        }}
      >
        <article className="text-black max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Built for Precision. Trusted in Every Procedure.
          </h1>
          <p className="text-sm md:text-base mb-6 text-black">
            Dental Instruments & Training Kits Designed for Tomorrow’s Experts
            and Today’s Professionals
          </p>
          <div className="flex gap-3 mt-[2rem]">
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-4 rounded-md text-md font-medium">
              Shop Now
            </button>
            <button className="bg-white text-red-600 px-4 py-4 rounded-md text-md font-medium">
              Explore Student Kits
            </button>
          </div>
        </article>
      </div>
      <div className="my-3">
        <div className="bg-white px-6 py-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-400 mb-2 flex flex-wrap items-center gap-1">
            <span className="font-bold text-black text-base mr-2">
              Dental Handpieces
            </span>

            <span className="flex items-center gap-1">
              <Icon icon="ic:round-home" className="text-gray-500 w-4 h-4" />
              <span className="text-gray-600">Home</span>
            </span>

            <Icon
              icon="material-symbols:chevron-right-rounded"
              className="text-gray-400 w-4 h-4"
            />

            <span className="text-gray-600">Dental Equipment</span>

            <Icon
              icon="material-symbols:chevron-right-rounded"
              className="text-gray-400 w-4 h-4"
            />

            <span className="text-pink-600 font-medium">Handpieces</span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            Welcome to the dedicated category of Dental Handpieces on
            dentalkart.com, where dental professionals can find a wide range of
            high-quality handpieces from various reputable brands like Apple,
            Being, Dentsply, Waldent, NSK, W&H, JIN, ProDent, Marathon, ATOM and
            Woodpecker. Dental handpieces are essential tools used during
            various dental procedures, providing high-speed precision for tasks
            like decay removal, tooth shaping, and oral cavity cleaning. Dental
            handpieces are usually based on their speed, which determines their
            specific applications.
            <br />
            <br />
            <span className="font-medium text-gray-800">
              Low-Speed: Below 6000 rpm
            </span>
            <br />- Used: Cleaning teeth, occasional caries excavation,
            finishing, and polishing procedures...
          </p>

          <div className="flex justify-end">
            <button className="mt-4 text-sm text-blue-600 hover:underline font-medium flex items-center cursor-pointer">
              Read More{" "}
              <Icon icon="iconamoon:arrow-right-2" className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="my-4">
        {" "}
        <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen">
          <FilterSidebar />

          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-gray-600">
                12,911 items in{" "}
                <span className="font-medium text-black">Mobile accessory</span>
              </p>

              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-pink-600" />
                  Verified only
                </label>

                <select className="border-0 rounded px-2 py-1 text-sm">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>

                <div className="flex gap-1">
                  <Icon
                    icon="material-symbols:grid-view-rounded"
                    className="text-xl text-white p-1 bg-red-500 rounded"
                  />
                  <Icon
                    icon="material-symbols:list-rounded"
                    className="text-xl"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, i) => (
                <ProductCard key={i} product={product} navigate={navigate} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
