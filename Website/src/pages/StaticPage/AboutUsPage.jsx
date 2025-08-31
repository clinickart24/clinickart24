import React from "react";
import images from "../../lib/exportImages";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      image: images.pages.staticPages.aboutUs.team?.[0]?.image,
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image: images.pages.staticPages.aboutUs.team?.[1]?.image,
    },
    {
      name: "Emily Johnson",
      role: "Marketing Director",
      image: images.pages.staticPages.aboutUs.team?.[2]?.image,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-gray-800">
      <section className="mb-16 text-left">
        <h1 className="text-3xl font-bold mb-4">The Journey of Clinic Kart</h1>
        <p className="text-gray-600 max-w-2xl">
          Welcome to DataVault! We’re a team of passionate data enthusiasts and
          tech innovators committed to transforming how businesses interact with
          data.
        </p>
        <div className="mt-8 relative max-w-6xl">
          <img
            src={images.pages.staticPages.aboutUs.images?.[0]?.image}
            alt="Journey Video"
            className="rounded-xl w-full h-auto object-cover"
          />
          <button className="absolute inset-0 flex items-center justify-center">
            <Icon
              icon="ph:play-circle-bold"
              className="text-white text-6xl drop-shadow-lg"
            />
          </button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-10">Our Story</h2>
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <p className="text-gray-700">
                In 2010, our founder, Vasily, faced a daunting challenge -
                preparing for the Law School Admission Test (LSAT) while
                juggling an internship and evening classes in different cities.
                The lack of time and a conducive study environment made it
                incredibly difficult for him to achieve his dream of becoming a
                lawyer.
                <br />
                During a train ride, a moment of inspiration struck Vasily. He
                wished for a convenient study tool on his phone to help him
                prepare for the LSAT. However, such an app didn't exist at the
                time. Determined to overcome this hurdle, Vasily took matters
                into his own hands and developed one of the earliest and most
                comprehensive LSAT apps on the market. The app quickly gained
                popularity, becoming the #1 paid LSAT app for over a year.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src={images.pages.staticPages.aboutUs.team?.[0]?.image}
                alt="Founding team"
                className="rounded-xl w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img
                src={images.pages.staticPages.aboutUs.team?.[1]?.image}
                alt="Founding team"
                className="rounded-xl w-full"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700">
                In 2010, our founder, Vasily, faced a daunting challenge -
                preparing for the Law School Admission Test (LSAT) while
                juggling an internship and evening classes in different cities.
                The lack of time and a conducive study environment made it
                incredibly difficult for him to achieve his dream of becoming a
                lawyer.
                <br />
                During a train ride, a moment of inspiration struck Vasily. He
                wished for a convenient study tool on his phone to help him
                prepare for the LSAT. However, such an app didn't exist at the
                time. Determined to overcome this hurdle, Vasily took matters
                into his own hands and developed one of the earliest and most
                comprehensive LSAT apps on the market. The app quickly gained
                popularity, becoming the #1 paid LSAT app for over a year.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-center mb-10">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow"
              />
              <p className="mt-2 font-medium">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
