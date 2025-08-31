import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import Sidebar from "./Sidebar";

const HOC = (WrappedComponent) => {
  const Layout = (props) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    return (
      <div className="flex h-screen w-full overflow-hidden max-w-7xl mx-auto relative">
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:z-auto`}
        >
          <Sidebar
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
          />
        </div>

        {isSidebarVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        <main className="flex-1 overflow-auto bg-gray-50 ff_manrope min-h-screen">
          <div className="p-4">
            <button
              className="fixed top-4 left-4 z-40 md:hidden bg-white p-2 rounded shadow"
              onClick={toggleSidebar}
            >
              <Icon icon="mdi:menu" width="24" />
            </button>

            <WrappedComponent
              {...props}
              toggleSidebar={toggleSidebar}
              elements={props.elements}
            />
          </div>
        </main>
      </div>
    );
  };

  return Layout;
};

export default HOC;
