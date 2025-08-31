/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApi, removeApi, updateApi } from "../../Repository/Repository";
import TableLayout from "../../Component/TableLayout";
import axios from "axios";

import { debouncedSetQuery } from "../../utils/utils";
import Pagination from "../../Component/Pagination";


const Customers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ data: [] });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const fetchHandler = useCallback(() => {
    getApi({
      url: `api/v1/admin/getAllUser?page=${page}&limit=${limit}&search=${search}`,
      setResponse,
      setLoading,
      setResponse: setUsers,
    });
  }, [limit, search, page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const blockHandler = (id, currentStatus) => {
    const isBlocked = currentStatus === "Block";
    const additionalFunctions = [fetchHandler];
    updateApi({
      url: `api/v1/admin/blockUnblockUser/${id}`,
      successMsg: isBlocked ? "Unblocked!" : "Blocked!", // Dynamic success message
      additionalFunctions,
    });
  };

  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/admin/${id}`,
      successMsg: "Removed!",
      additionalFunctions,
    });
  };

  const thead = [
    "Sno.",
    "Profile",
    "Username",
    "Email",
    "Mobile Number",
    "Status",
    "Location",
    "Last Login",
    "Action",
  ];

  const tbody = users?.data?.map((i, index) => [
    `#${index + 1}`,
    <img className="profile-pic" src={i.image} alt="" />,
    i?.userName,
    i?.email,
    i?.phone,
    i?.status,
    i?.city,
    <span className="flexCont1">
      <i>
        {i?.lastLogin?.slice(0, 10)}
      </i><br />
      <i>
        {i?.lastLogin?.slice(11, 19)}
      </i>
    </span>,
    <span className="flexCont">
      <Link to={`/user-data/${i._id}`}>
        <i className="fa-solid fa-eye"></i>
      </Link>
      <i
        className="fa-sharp fa-solid fa-trash"
        onClick={() => deleteHandler(i._id)}
      ></i>
      <i
        className={i?.status === 'Block' ? "fas fa-ban text-danger" : "fas fa-ban text-success"}
        onClick={() => blockHandler(i._id, i.status)}
        style={{ cursor: 'pointer', fontSize: '18px' }}
      ></i>
    </span>
  ]);

  const handleExport = () => {
    const exportUrl = `https://suruchi-backend.vercel.app/api/v1/admin/downloadCustomersExcel`;

    axios.get(exportUrl)
      .then(response => {
        const downloadUrl = response.data.filePath;
        window.open(downloadUrl, '_blank');
      })
      .catch(error => {
        console.error('Error exporting data:', error);
        // toast.error('Failed to export data. Please try again later.');
      });

  };

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
           All Customers ({users?.pagination?.totalUsers})
          </span>
          <button
            className="submitBtn"
            onClick={handleExport}
          >
            Export
          </button>
        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Search customers..."
            onChange={(e) =>
              debouncedSetQuery({ term: e.target.value, setSearch })
            }
          />
        </div>

        <TableLayout thead={thead} tbody={tbody} loading={loading} />
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

export default HOC(Customers);
