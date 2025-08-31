/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import TableLayout from "../../Component/TableLayout";
// import { CreateBrand } from "../../Component/Modals/Modals";

const DeliveryCharges = () => {
  const [show, setShow] = useState(false);

  const thead = ["Sno.", "Image", "Title", ""];
  const tbody = [
    [
      "#1",
      <img
        src={"http://localhost:3000/Images/4.png"}
        alt=""
        style={{ maxWidth: "80px" }}
      />,
      "H&M",
      <span className="flexCont">
        <i className="fa-solid fa-trash" />
        <i
          className="fa-solid fa-pen-to-square"
          onClick={() => {
            setShow(true);
          }}
        ></i>
      </span>,
    ],
  ];
  return (
    <>
      {/* <CreateBrand show={show} handleClose={() => setShow(false)} /> */}
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Brands (1)
          </span>
          <button
            className="submitBtn"
            type="button"
            onClick={() => setShow(true)}
          >
            Create New
          </button>
        </div>

        <TableLayout thead={thead} tbody={tbody} />
      </section>
    </>
  );
};

export default HOC(DeliveryCharges);
