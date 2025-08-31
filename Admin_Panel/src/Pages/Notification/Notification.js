/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import TableLayout from "../../Component/TableLayout";
import { CreateNotification } from "../../Component/Modals/Modals";
import { getApi } from "../../Repository/Repository";
import Pagination from "../../Component/Pagination";

const Notification = () => {
  const [modalShow, setModalShow] = useState(false);
  const [response, setResponse] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchHandler = useCallback(() => {
    getApi({
      url: `api/v1/notification/allNotification?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`,
      setResponse,
      setLoading,
    });
  }, [limit, page, startDate, endDate]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const thead = ["Sno.", "Title", "Description", "Date"];
  const tbody = response?.data?.map((i, index) => [
    `#${index + 1}`,
    i?.title,
    i?.body,
    i?.date.slice(0, 10),
  ]);

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    fetchHandler();
  };

  return (
    <>
      <CreateNotification
        show={modalShow}
        handleClose={() => setModalShow(false)}
        fetchApi={fetchHandler}
      />

      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Notification ({response?.data?.length})
          </span>
          <div className="d-flex gap-1">
            <button
              className="submitBtn"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Send
            </button>
          </div>
        </div>

        <div className="filterBox">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="submitBtn" onClick={clearFilters}>
            Clear
          </button>
        </div>

        <TableLayout thead={thead} tbody={tbody} />
        {(!response || response !== null) && (
          <Pagination
            hasNextPage={response?.data?.hasNextPage}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            totalPages={response?.pagination?.totalPages}
          />
        )}
      </section>
    </>
  );
};

export default HOC(Notification);
