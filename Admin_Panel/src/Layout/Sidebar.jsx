/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdDashboardCustomize, MdLocationOn } from "react-icons/md";
// import { FaLocationDot } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

import img from '../assests/Images/Untitled design.png'

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  let nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/dashboard ",
      name: "Dashboard",
    },
    {
      icon: <i className="fa-solid fa-image  text-xl mr-3 rounded-full"></i>,
      link: "/all-banners",
      name: "Banner",
    },
    // {
    //   icon: <i className="fa-solid fa-list  text-xl mr-3 rounded-full"></i>,
    //   link: "/categorytype",
    //   name: "Category Types",
    // },
    {
      icon: <i className="fa-solid fa-list  text-xl mr-3 rounded-full"></i>,
      link: "/Category",
      name: "Category",
    },
    {
      icon: <i className="fa-solid fa-list  text-xl mr-3 rounded-full"></i>,
      link: "/topbrands",
      name: "Top Brands",
    },
    // {
    //   icon: <i className="fa-solid fa-list  text-xl mr-3 rounded-full"></i>,
    //   link: "/sub-category-types",
    //   name: "Sub Category Types",
    // },
    {
      icon: (
        <i className="fa-solid fa-table-list  text-xl mr-3 rounded-full"></i>
      ),
      link: "/sub-category",
      name: "Sub Category",
    },
    {
      icon: (
        <i className="fa-solid fa-bag-shopping text-xl mr-3 rounded-full"></i>
      ),
      link: "/Product",
      name: "Products/Services",
    },
    {
      icon: (
        <i className="fa-solid fa-bag-shopping text-xl mr-3 rounded-full"></i>
      ),
      link: "/admin-products",
      name: "Admin Products",
    },
    {
      icon: <i className="fa-solid fa-store  text-xl mr-3 rounded-full"></i>,
      link: "/admin-stores",
      name: "Admin Store",
    },
    {
      icon: <i className="fa-solid fa-store  text-xl mr-3 rounded-full"></i>,
      link: "/vendors",
      name: "Vendors",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/users",
      name: "Customers",
    },

    {
      icon: (
        <i className="fa-solid fa-table-list  text-xl mr-3 rounded-full"></i>
      ),
      link: "/subscription",
      name: "Subscription",
    },
    {
      icon: <i className="fa-solid fa-bell  text-xl mr-3 rounded-full"></i>,
      link: "/notification",
      name: "Notifications",
    },
    {
      icon: <MdLocationOn className="text-xl mr-3 rounded-full " />,
      link: "/allstate",
      name: "All State",
    },
    {
      icon: <MdLocationOn className="text-xl mr-3 rounded-full " />,
      link: "/allcity",
      name: "All City",
    },
    {
      icon: <MdLocationOn className="text-xl mr-3 rounded-full " />,
      link: "/allarea",
      name: "All Area",
    },
    {
      icon: <i className="fa-solid fa-blog text-xl mr-3 rounded-full"></i>,
      link: "/blogs",
      name: "Blogs",
    },
    // {
    //   icon: <i className="fa-solid fa-calendar-check text-xl mr-3 rounded-full"></i>,
    //   link: "/event",
    //   name: "Events",
    // },
    // {
    //   icon: <i className="fa-solid fa-trophy text-xl mr-3 rounded-full"></i>,
    //   link: "/contests",
    //   name: "Contests",
    // },
    {
      icon: <FaInfoCircle className="text-xl mr-3 rounded-full " />,
      link: "/about",
      name: "About App",
    },
    {
      icon: <FaInfoCircle className="text-xl mr-3 rounded-full " />,
      link: "/termsconditions",
      name: "Terms & Conditions",
    },
    {
      icon: <FaInfoCircle className="text-xl mr-3 rounded-full " />,
      link: "/privacy-policy",
      name: "Privacy Policy",
    },
    {
      icon: <i className="fa-solid fa-question text-xl mr-3 rounded-full" />,
      link: "/faq",
      name: "FAQs",
    },

    {
      icon: (
        <i className="fa-solid fa-credit-card text-xl mr-3 rounded-full"></i>
      ),
      link: "/payment",
      name: "Transactions",
    },
  ];

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <aside
        className="p-4 h-auto"
        style={{ backgroundColor: "#FCE03F", minHeight: "100vh" }}
      >
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-2">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>{" "}
        <figure className="flex  flex-col items-center">
          <img src={img} alt="" width={150} height={100} />
          <span
            className="font-bold text-[#000] mt-2"
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {" "}
            ClinicKart - Admin Panel
          </span>
        </figure>
        <nav className="py-1">
          {nav?.map((nav, index) => {
            return (
              <Link
                to={nav.link}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <span
                  className="flex my-3 items-center cursor-pointer tracking-wider p-2 rounded-sm font-bold"
                  style={{ color: "#000" }}
                >
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer tracking-wider p-2 rounded-sm font-bold"
            onClick={() => logOut()}
            style={{ color: "#000", textTransform: "uppercase" }}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
