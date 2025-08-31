/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { CreateFaq } from "../../Component/Modals/Modals";
import { getApi, removeApi } from "../../Repository/Repository";
import TableLayout from "../../Component/TableLayout";

const Faq = () => {
  const [modalShow, setModalShow] = useState(false);
  const [response, setResponse] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState(false);


  const fetchHandler = () => {
    getApi({
      url: "api/v1/static/faq/All",
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/static/faq/${id}`,
      successMsg: "Removed !",
      additionalFunctions,
    });
  };
  const thead = ["Sno.", "Question", "Answer", ""];
  const tbody = response?.data?.map((i, index) => [
    `#${index + 1}`,
    i?.question,
    i?.answer,
    <span className="flexCont">
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => {
          setId(i._id);
          setEdit(true);
          handleEditClick(i)
        }}
      ></i>
      <i className="fa-solid fa-trash" onClick={() => deleteHandler(i._id)} />
    </span>,
  ]);

  const handleEditClick = (data) => {
    setSelected(data);
    setModalShow(true);
  };

  return (
    <>
      <CreateFaq
        show={modalShow}
        handleClose={() => setModalShow(false)}
        edit={edit}
        id={id}
        fetchApi={fetchHandler}
        data={selected}
      />

      <section className="sectionCont">
        <div className="pb-4   w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All FAQs ({response?.data?.length})
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="submitBtn"
          >
            Create New
          </button>
        </div>

        <TableLayout thead={thead} tbody={tbody} loading={loading} />
      </section>
    </>
  );
};

export default HOC(Faq);
