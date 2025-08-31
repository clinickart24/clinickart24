import React from "react";
import images from "../../lib/exportImages";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

const SingleBlogPage = () => {
  const category = "Marketing";
  const date = "Feb 26, 2023";
  const title = "The Benefits of Email Marketing for Small Businesses";
  const bottomImage = true;
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
  const BlogsCard = ({ image, category, title, description, link }) => {
    return (
      <div className="max-w-sm w-full rounded-xl border border-gray-200 shadow-md overflow-hidden pt-3">
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
  const sections = [
    {
      heading:
        "Maximizing Product Success: Key Strategies for Product Managers",
      text: `In this blog post, we’ll explore essential strategies and best practices that product managers can implement to drive product success. Whether you’re new to the field or a seasoned professional, these strategies can help maximize your product’s chances of success.`,
      list: [
        "Develop a Strategic Product Roadmap: Guiding Your Product’s Journey",
        "Identify Core Competencies: Understand the foundational skills needed.",
        "Hire Candidates with Desired Qualities: Look for traits and attributes that align with success.",
      ],
    },
    {
      heading:
        "Develop a Strategic Product Roadmap: Guiding Your Product’s Journey",
      text: `A well-defined product roadmap sets the direction for your product’s development and success. Consider these strategies to create an effective product roadmap:`,
      list: [
        "Align roadmap strategy with business goals and market trends.",
        "Prioritize features based on customer value and business impact.",
        "Clearly communicate the roadmap to stakeholders to ensure alignment and buy-in.",
      ],
    },
    {
      heading: "Core Competencies",
      text: `The successful candidate should demonstrate the following core competencies:`,
      list: [
        "Strategic Thinking: Ability to analyze market trends, customer needs, and business goals.",
        "Leadership: Strong leadership skills to guide cross-functional teams.",
        "Communication: Excellent written and verbal communication.",
        "Analytical Skills: Ability to analyze complex problems and make data-driven decisions.",
        "Collaboration: Demonstrated ability to work with engineering, marketing, and sales.",
      ],
    },
    {
      heading: "Desired Qualities",
      text: `The ideal candidate will possess the following qualities:`,
      list: [
        "Passion for Technology.",
        "Adaptability: Flexibility to work in a fast-paced, dynamic environment.",
        "Attention to Detail.",
        "Results-Driven: A track record of achieving measurable results.",
      ],
    },
  ];

  const extraSections = [
    {
      heading: "Why Email Marketing Works for Small Businesses",
      text: `Email marketing allows businesses to directly reach their customers in a cost-effective and measurable way. With personalized campaigns, companies can foster long-term relationships with their audience.`,
      list: [
        "Direct communication with a targeted audience.",
        "High ROI compared to traditional marketing.",
        "Easy to track performance via open/click-through rates.",
      ],
    },
    {
      heading: "How to Get Started with Email Marketing",
      text: `Starting with email marketing doesn’t require a large budget or technical expertise. Here are a few steps to help you begin:`,
      list: [
        "Choose an email marketing platform (e.g., Mailchimp, ConvertKit, or Sendinblue).",
        "Build an email list by collecting customer emails ethically.",
        "Design a campaign with engaging subject lines and valuable content.",
        "Monitor results and adjust strategies for better performance.",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-12 text-gray-800">
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
          <div className="flex-1 max-w-full lg:max-w-[40%]">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full text-black uppercase">
                {category}
              </span>
              <span className="text-sm text-gray-500">{date}</span>
            </div>
            <h1 className="text-2xl font-semibold mt-4">{title}</h1>
          </div>
          <img
            src={images.pages.blogsPage.images?.[0]?.image}
            alt={title}
            className="w-full md:w-52 h-40 object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-10 max-w-6xl mx-auto">
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
            <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
            {section.list && (
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {bottomImage && (
        <div className="mt-10 max-w-6xl mx-auto">
          <img
            src={images.pages.blogsPage.images?.[1]?.image}
            alt="Related visual"
            className="w-full object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      <div className="space-y-10 max-w-6xl mx-auto mt-10">
        {extraSections.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
            <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
            {section.list && (
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-between gap-2">
          <span className="text-black">Related Blogs</span>{" "}
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
    </div>
  );
};

export default SingleBlogPage;
