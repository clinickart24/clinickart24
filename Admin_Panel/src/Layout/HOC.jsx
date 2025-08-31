/** @format */

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const HOC = (Wcomponenet) => {
  return function Component() {
    const [hamb, setHamb] = useState(false);
    return (
      <>
        <section
          className="flex overflow-x-hidden relative"
          style={{ backgroundColor: "#f2f3f8" }}
        >
          {/* Sidebar */}
          <div
            className={
              hamb
                ? " absolute top-0 z-30 md:w-auto shadow-md bg-slate-200  w-60 transition-all md:-left-full left duration-150  h-auto overflow-y-auto  left-0 "
                : " md:w-72 z-30 bg-slate-200  shadow-md  md:static absolute top-0 -left-full   transition-all duration-150  overflow-y-auto h-auto"
            }
            style={{ minWidth: "250px" }}
          >
            <Sidebar hamb={hamb} setHamb={setHamb} />
          </div>
          {/* Components & Navbar */}
          <div
            className={
              hamb
                ? " transition-all px-4 py-2  duration-150 flex-1  h-screen "
                : "main_hoc flex-1"
            }
            style={{ backgroundColor: "#f2f3f8",width:"80%" }}
          >
            <Navbar hamb={hamb} setHamb={setHamb} />
            <div
              className="my-6 text-#000 h-[87%] wcomp"
              style={{ overflowY: "auto" }}
            >
              {" "}
              <Wcomponenet />
            </div>
          </div>
        </section>
      </>
    );
  };
};

export default HOC;
