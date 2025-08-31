import { Icon } from "@iconify-icon/react";
import images from "../../lib/exportImages";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const vendors = [
  { name: "Vendor A", discount: "Up To 15% Off", color: "bg-yellow-200" },
  { name: "Vendor B", discount: "Up To 15% Off", color: "bg-pink-100" },
  { name: "Vendor C", discount: "Up To 15% Off", color: "bg-yellow-200" },
  { name: "Vendor D", discount: "Up To 15% Off", color: "bg-pink-100" },
  { name: "Vendor E", discount: "Up To 15% Off", color: "bg-yellow-200" },
];

const brands = [
  { name: "ORTHOMETRIC", discount: "Up To 15% Off",id:1 },
  { name: "WALDENT", discount: "Up To 10% Off",id:2 },
  { name: "SUPER ENDO", discount: "Up To 20% Off",id:3 },
  { name: "ET DENTAL", discount: "Up To 25% Off",id:4 },
];

const categories = [
  {
    name: "WHEEL CHAIR",
    discount: "Up To 15% Off",
  },
  { name: "AIROTOR", discount: "Up To 15% Off" },
  {
    name: "COMPOSITE",
    discount: "Up To 15% Off",
  },
  {
    name: "ENDOMOTOR",
    discount: "Up To 15% Off",
  },
  {
    name: "CEMENTS",
    discount: "Up To 15% Off",
  },
  {
    name: "BRACKETS",
    discount: "Up To 15% Off",
  },
  {
    name: "SPARE PARTS",
    discount: "Up To 15% Off",
  },
  {
    name: "AUTOCLAVE",
    discount: "Up To 15% Off",
  },
];
const flashDeals = [
  {
    name: "Waldent RTA Intelli–Sensor RVG By Woodpecker Size - 1.5",
    image: images.pages.homePage.flashDeals?.[0].image,
    originalPrice: 450,
    discountedPrice: 399,
    discountPercent: "20%",
  },
  {
    name: "Suraksha Latex Medical Examination Gloves",
    image: images.pages.homePage.flashDeals?.[1].image,
    originalPrice: 450,
    discountedPrice: 399,
    discountPercent: "25%",
  },
  {
    name: "Bestodent Classic Dental Chair (FREE Installation in Delhi NCR)",
    image: images.pages.homePage.flashDeals?.[2].image,
    originalPrice: 599,
    discountedPrice: 450,
    discountPercent: "30%",
  },
];
const logos = [
  { src: images.pages.homePage.logos?.[0].image, alt: "Amazon" },
  { src: images.pages.homePage.logos?.[1].image, alt: "Dribbble" },
  { src: images.pages.homePage.logos?.[2].image, alt: "Google" },
  { src: images.pages.homePage.logos?.[3].image, alt: "LinkedIn" },
  { src: images.pages.homePage.logos?.[4].image, alt: "Medium" },
  { src: images.pages.homePage.logos?.[5].image, alt: "Microsoft" },
];
const reviews = [
  {
    text: "The platform is incredibly easy to use, and the support team is outstanding. We launched our new store in days. Highly recommend for serious e-commerce teams!",
    name: "Sarah Liam",
    role: "CEO & Managing Director",
    rating: "5.0 Ratings",
    stars: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    borderColor: "border-pink-500",
  },
  {
    text: "We tried a few other platforms before, but nothing matched the flexibility, performance we got with ZenZest. It's truly built for scaling your brands effectively.",
    name: "Kevin Piterson",
    role: "Entrepreneur",
    rating: "5.0 Ratings",
    stars: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    borderColor: "border-green-500",
  },
];

const blogs = [
  {
    image: images.pages.homePage.blogs?.[0]?.image,
    category: "Healthcare",
    title: "The Future of AI in Healthcare: Transforming Patient Care",
    description:
      "Explore how AI-driven technologies are enhancing diagnoses, personalized medicine, and patient outcomes.",
    link: "#",
  },
  {
    image: images.pages.homePage.blogs?.[0]?.image,
    category: "Healthcare",
    title: "AI Revolutionizing Medical Diagnostics",
    description:
      "From image recognition to predictive analytics, AI is improving accuracy in diagnosing conditions.",
    link: "#",
  },
  {
    image: images.pages.homePage.blogs?.[0]?.image,
    category: "Healthcare",
    title: "Using AI to Personalize Treatment Plans",
    description:
      "Discover how machine learning helps tailor treatments based on patient genetics and history.",
    link: "#",
  },
];
const faqs = [
  {
    question: "How Can It Help My E-Commerce Business?",
    answer:
      "ZenZest is an all-in-one CRM designed specifically for e-commerce brands. It helps you track sales, manage orders, analyze product performance, and optimize your entire store operation all from one simple, powerful dashboard.",
  },
  {
    question: "Do I Need Technical Skills To Use Clinic Kart?",
    answer: "",
  },
  {
    question: "Can ZenZest Scale With My Growing Business?",
    answer: "",
  },
  {
    question: "Is My Data Safe With ZenZest?",
    answer: "",
  },
];

const VendorCard = ({ vendor, navigate }) => (
  <div
    className="text-center flex flex-col items-center cursor-pointer"
    onClick={() => navigate(`/vendor/1`)}
  >
    <div
      className={`w-[180px] h-[180px] flex items-center justify-center rounded-full ${
        vendor.color || "bg-gray-200"
      }`}
    >
      <img
        src={images.pages.homePage.images?.[0].image}
        alt={`Logo of ${vendor.name}`}
        className="w-1/2"
        loading="lazy"
      />
    </div>
    <p className="font-semibold mt-2">{vendor.name}</p>
    <p className="text-xs text-black mt-1">{vendor.discount}</p>
  </div>
);

const BrandCard = ({ brand, index }) => {

  const navigate = useNavigate();
  const brandImage =
    images?.pages?.homePage?.brands?.[index]?.image || images?.fallbackImage;

  return (
    <div className="w-full p-4 text-center rounded-lg cursor-pointer" onClick={() => navigate(`/brand/${brand?.id}`)}>
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
        <p className="mt-4 text-md font-bold text-black">{category.discount}</p>
      )}
    </div>
  );
};
const FlashDealCard = ({ product }) => {
  return (
    <div className="w-full max-w-xs bg-white text-center rounded-xl mt-3 flex flex-col">
      <div className="bg-[#F7D4D8] pt-6 pb-0 px-4 rounded-t-[200px] flex-grow">
        <div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF3E3E] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.discountPercent} OFF
          </div>
          <p className="mt-4 text-sm font-semibold text-gray-800 text-wrap">
            {product.name}
          </p>
          <img
            src={product.image}
            alt={product.name}
            className="h-40 object-contain mx-auto"
          />
          <div className="text-md font-bold text-black space-x-2">
            <span className="line-through text-gray-500 text-sm">
              ₹{product.originalPrice}
            </span>
            <span>₹{product.discountedPrice}</span>
          </div>
        </div>
        <div className="p-4 mt-4 pb-1">
          <button className="w-full bg-[#FFD400] text-black font-semibold py-2 rounded-full hover:bg-yellow-400 transition">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};
const BlogsCard = ({ image, category, title, description, link }) => {
  return (
    <div className="max-w-sm w-full rounded-xl border border-gray-200 shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-3">
        <span className="inline-block bg-yellow-300 text-xs font-semibold text-black px-2 py-1 rounded-full">
          {category}
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <button className="w-full flex sm:justify-center justify-end ">
          <a
            href={link}
            className="text-gray-600 text-sm font-medium hover:underline"
          >
            Read more
          </a>
        </button>
      </div>
    </div>
  );
};
const HomePage = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="mb-4 p-1">
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

      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-between gap-2">
          <span>Explore Approved Vendors</span>
          <span>
            <span className="rounded-2xl p-[2px] bg-gradient-to-br from-yellow-400 to-rose-400 inline-block">
              <button
                aria-label="Previous vendors"
                className="rounded-xl bg-white p-4"
                onClick={() => navigate(`/vendor/1`)}
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="mynaui:arrow-left"
                    className="text-white text-lg"
                  />
                </div>
              </button>
            </span>
            <span className="rounded-2xl p-[2px] bg-[#d8485f] inline-block ml-4">
              <button
                aria-label="Next vendors"
                className="rounded-xl bg-[#d8485f] p-4 cursor-pointer"
                onClick={() => navigate(`/vendor/1`)}
              >
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Icon
                    icon="mynaui:arrow-right"
                    className="text-black text-lg"
                  />
                </div>
              </button>
            </span>
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {vendors?.map((vendor, index) => (
            <VendorCard key={index} vendor={vendor} navigate={navigate} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-between gap-2">
          <span>Top Listed Brands</span>
          <span>
            <span className="rounded-2xl p-[2px] bg-gradient-to-br from-yellow-400 to-rose-400 inline-block">
              <button
                aria-label="Previous vendors"
                className="rounded-xl bg-white p-4"
                onClick={() => navigate(`/brand/${brand?.id}`)}
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="mynaui:arrow-left"
                    className="text-white text-lg"
                  />
                </div>
              </button>
            </span>
            <span className="rounded-2xl p-[2px] bg-[#d8485f] inline-block ml-4">
              <button
                aria-label="Next vendors"
                className="rounded-xl bg-[#d8485f] p-4 cursor-pointer"
                onClick={() => navigate(`/brand/${brand?.id}`)}
              >
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Icon
                    icon="mynaui:arrow-right"
                    className="text-black text-lg"
                  />
                </div>
              </button>
            </span>
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand, index) => (
            <BrandCard key={index} brand={brand} index={index} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-between gap-2">
          <span>Shop By Category</span>
          <span>
            <span className="rounded-2xl p-[2px] bg-gradient-to-br from-yellow-400 to-rose-400 inline-block">
              <button
                aria-label="Previous vendors"
                className="rounded-xl bg-white p-4"
                onClick={() => navigate(`/categories`)} 
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="mynaui:arrow-left"
                    className="text-white text-lg"
                  />
                </div>
              </button>
            </span>
            <span className="rounded-2xl p-[2px] bg-[#d8485f] inline-block ml-4">
              <button
                aria-label="Next vendors"
                className="rounded-xl bg-[#d8485f] p-4 cursor-pointer"
                onClick={() => navigate(`/categories`)}
              >
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Icon
                    icon="mynaui:arrow-right"
                    className="text-black text-lg"
                  />
                </div>
              </button>
            </span>
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-between gap-2">
          <span>Flash Deals</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flashDeals.map((deal, index) => (
            <FlashDealCard key={index} product={deal} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 px-4">
        <p className="text-gray-700 text-2xl">
          I helped{" "}
          <span className="text-pink-600 font-semibold">280+ people</span> to
          win <br /> their fair and they are happy{" "}
          <span role="img" aria-label="smile">
            😊
          </span>
          .
        </p>

        <div className="flex justify-between items-center flex-wrap gap-6 mt-[3rem] mb-[6rem]">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-6 opacity-70 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-between gap-2">
          <span className="text-black">User Reviews And Feedback</span>{" "}
          <span>
            <span className="rounded-2xl p-[2px] bg-gradient-to-br from-yellow-400 to-rose-400 inline-block">
              <button
                aria-label="Previous vendors"
                className="rounded-xl bg-white p-4"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="mynaui:arrow-left"
                    className="text-white text-lg"
                  />
                </div>
              </button>
            </span>
            <span className="rounded-2xl p-[2px] bg-[#d8485f] inline-block ml-4">
              <button
                aria-label="Next vendors"
                className="rounded-xl bg-[#d8485f] p-4 cursor-pointer"
              >
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Icon
                    icon="mynaui:arrow-right"
                    className="text-black text-lg"
                  />
                </div>
              </button>
            </span>
          </span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 overflow-hidden relative"
              style={{
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                borderBottom: "8px solid #f4e6b3",
              }}
            >
              <div className="text-black text-4xl mb-3">“</div>

              <p className="text-black text-sm leading-relaxed mb-6">
                {review.text}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-yellow-500 text-lg">
                    {"★".repeat(review.stars)}
                  </div>
                  <p className="text-xs text-gray-500">{review.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-between gap-2">
          <span className="text-black">Blogs</span>{" "}
          <span>
            <span className="rounded-2xl p-[2px] bg-gradient-to-br from-yellow-400 to-rose-400 inline-block">
              <button
                aria-label="Previous vendors"
                className="rounded-xl bg-white p-4"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="mynaui:arrow-left"
                    className="text-white text-lg"
                  />
                </div>
              </button>
            </span>
            <span className="rounded-2xl p-[2px] bg-[#d8485f] inline-block ml-4">
              <button
                aria-label="Next vendors"
                className="rounded-xl bg-[#d8485f] p-4 cursor-pointer"
              >
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Icon
                    icon="mynaui:arrow-right"
                    className="text-black text-lg"
                  />
                </div>
              </button>
            </span>
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs?.map((blog, index) => (
            <BlogsCard key={index} {...blog} />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 px-4">
        {" "}
        <h2 className="text-2xl text-center md:text-4xl font-semibold mb-6 flex flex-col items-center justify-between gap-2 max-w-lg mx-auto">
          <span className="text-black ">Have Any Questions ?</span>
          <span className="text-sm text-gray-500 font-light">
            Find everything you need to know about our platform, pricing, and
            how we can help your business grow.{" "}
          </span>
        </h2>
        <div className="max-w-xl mx-auto space-y-4 p-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border ${
                  isOpen ? "border-red-500 bg-red-50" : "border-0"
                } transition-all`}
              >
                <button className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-medium text-sm md:text-base text-gray-800">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Icon
                      onClick={() => toggle(index)}
                      icon="lsicon:minus-filled"
                      className="text-xl text-red-500 cursor-pointer"
                    />
                  ) : (
                    <Icon
                      icon="subway:add"
                      className="text-xl text-black cursor-pointer"
                      onClick={() => toggle(index)}
                    />
                  )}
                </button>
                {isOpen && faq.answer && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
