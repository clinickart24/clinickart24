import React, { useState } from "react";
import images from "../../lib/exportImages";
import { useNavigate } from "react-router-dom";

const BlogsCard = ({ image, category, title, description, link , onClick }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden" onClick={onClick} >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <span className="bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full text-black w-fit mb-3">
        {category}
      </span>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description?.slice(0, 150)}</p>
     <p className="flex justify-end">
        <a href={link} className="text-sm text-gray-600 font-medium underline">
          Read more
        </a>
     </p>
    </div>
  </div>
);

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
    category: "Dental",
    title: "Using AI to Personalize Treatment Plans",
    description:
      "Discover how machine learning helps tailor treatments based on patient genetics and history.",
    link: "#",
  },
];

const categories = ["All", "Healthcare", "Dental", "Colleges"];

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate=useNavigate();

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <div className="px-4 md:px-16 py-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">
          Discover Insights and Inspiration
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our captivating blog filled with thought-provoking articles
          and inspiring content that will ignite your creativity and expand your
          knowledge.
        </p>
      </div>

      {filteredBlogs.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row mb-10">
          <img
            src={filteredBlogs[0].image}
            alt={filteredBlogs[0].title}
            className="md:w-1/2 object-cover"
          />
          <div className="p-4 md:w-1/2 flex flex-col justify-center">
            <span className="bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full text-black w-fit mb-3">
              {filteredBlogs[0].category}
            </span>
            <h2 className="text-xl font-semibold mb-2">
              {filteredBlogs[0].title}
            </h2>
            <p className="text-gray-600 mb-4">{filteredBlogs[0].description}</p>
            <p className="flex justify-end">
              <a
                href={filteredBlogs[0].link}
                className="text-sm text-gray-600 font-medium underline"
              >
                Read more
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 flex-wrap my-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer ${
              activeCategory === cat
                ? "bg-yellow-400 text-black"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredBlogs.map((blog, index) => (
          <BlogsCard key={index} {...blog} onClick={()=>navigate("/blog/1")} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
