/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import data from "../../Constant/constant.json";
import TableLayout from "../../Component/TableLayout";
import { CreateFeatures } from "../../Component/Modals/Modals";

const Features = () => {
  const [open, setOpen] = useState(false);

  const thead = ["Sno", "Feature", ""];
  const tbody = data.features.map((i, index) => [
    `#${index + 1}`,
    i,
    <span className="flexCont">
      <i className="fa-solid fa-trash" />
    </span>,
  ]);
  return (
    <section className="sectionCont">
      <CreateFeatures show={open} handleClose={() => setOpen(false)} />
      <div className="pb-4 w-full flex justify-between items-center">
        <span
          className="tracking-widest text-slate-900 font-semibold"
          style={{ fontSize: "1.5rem" }}
        >
          All Subscription Features (3)
        </span>
        <button className="submitBtn" onClick={() => setOpen(true)}>
          Create New
        </button>
      </div>
      <TableLayout thead={thead} tbody={tbody} />
    </section>
  );
};

export default HOC(Features);
