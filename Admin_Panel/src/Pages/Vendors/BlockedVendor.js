/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Link, useNavigate } from "react-router-dom";
import { getApi, removeApi, createApi } from "../../Repository/Repository";
import TableLayout from "../../Component/TableLayout";
import { EditVendorStatus } from "../../Component/Modals/Modals";

const BlockedVendor = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const fetchHandler = () => {
    getApi({
      url: "api/v1/admin/getBlockedVendors",
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = [
    "Sno.",
    "Name",
    "Mobile Number",
    "Product",
    "KYC Status",
    "Status",
    "",
  ];

  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/admin/deleteProfile/${id}`,
      successMsg: "Removed !",
      additionalFunctions,
    });
  };


  const blockHandler = (id, currentStatus) => {
    const isBlocked = currentStatus === "Block"; // Check the current status
    const additionalFunctions = [fetchHandler];
    createApi({
      url: `api/v1/admin/${isBlocked ? 'unblockVendor' : 'blockVendor'}`, // Conditional API endpoint
      payload: { vendorId: id },
      successMsg: isBlocked ? "Unblocked!" : "Blocked!", // Dynamic success message
      additionalFunctions,
    });
  };



  const tbody = response.data.map((i, index) => [
    `#${index + 1}`,
    i?.fullName,
    i?.phone,
    <Link to={`/vendor-products/${i.fullName}`}>View</Link>,
    i?.kycStatus,
    i?.status,
    <span className="flexCont">
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => {
          setId(i._id);
          setOpen(true);
        }}
      />
      <Link to={`/view-vendor/${i._id}`}>
        <i className="fa-solid fa-eye"></i>
      </Link>
      <i className="fa-sharp fa-solid fa-trash" onClick={() => deleteHandler(i._id)}></i>
      <button className="submitBtn" type="submit" onClick={() => blockHandler(i._id, i.status)}>
        {i?.status === 'Block' ? "Unblock" : "Block"}
      </button>
    </span>,
  ]);

  return (
    <>
      <EditVendorStatus show={open} handleClose={() => setOpen(false)} id={id} />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Blocked Vendors ({response?.data?.length})
          </span>
          <button className="submitBtn" onClick={()=>navigate(-1)}>
            Back
          </button>
        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="seach by first name , last name , email address , phone number..."
          />
        </div>

        <TableLayout thead={thead} tbody={tbody} loading={loading} />
      </section>
    </>
  );
};

export default HOC(BlockedVendor);
