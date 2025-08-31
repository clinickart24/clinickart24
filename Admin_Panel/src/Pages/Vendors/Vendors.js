/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Link, useNavigate } from "react-router-dom";
import { getApi, removeApi, createApi, updateApi } from "../../Repository/Repository";
import TableLayout from "../../Component/TableLayout";
import { EditVendorStatus } from "../../Component/Modals/Modals";
import axios from "axios";
import { debouncedSetQuery } from "../../utils/utils";
import Pagination from "../../Component/Pagination";


const Vendors = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  // const [status1, setStatus1] = useState(false); // Commented out unused variable



  const navigate = useNavigate();



  const fetchHandler = useCallback(() => {
    getApi({
      url: `api/v1/admin/getAllVendor?page=${page}&limit=${limit}&search=${search}`,
      setResponse,
      setLoading,
    });
  }, [limit, search, page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  useEffect(() => {
    if (response?.data?.length > 0) {
      setStatus1(response?.data?.[0]?.bankDetailsDisableEnable); // Set initial toggle state from response
    }
  }, [response]);



  const thead = [
    "Sno.",
    "Profile",
    "Name",
    "Number",
    "Location",
    "Category",
    "Products/ Services",
    "Plan",
    "Vendor Acceptance",
    "Status",
    "Action",
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



  const tbody = response?.data?.map((i, index) => [
    `#${index + 1}`,
    <img className="Vendor Profile" src={i?.stores?.[0]?.storeLogo} alt="" />,
    i?.stores?.[0]?.StoreName,
    i?.phone,
    i.allIndiaCity ? "All India" :
      <ul>
        {i?.cities?.map((city) => (
          <li key={city._id}>{city?.name}</li>
        ))}
      </ul>,
    <ul>
      {i?.categoryId?.map((category) => (
        <li key={category._id}>{category.name}</li>
      ))}
    </ul>,
    <Link to={`/vendor-products/${i._id}`}>View</Link>,

    // Combine plan details into a single cell
    <ul>
      <li>{i?.planBuyId?.planName}</li>
      <li>{i?.planBuyId?.planType}</li>
      <li>{i?.planBuyId?.amount}</li>
      <li>{i?.planStatus}</li>
      <li>{i?.planExpiration?.slice(0, 10)}</li>
    </ul>,
    i?.kycStatus,
    i?.status,
    <span className="flexCont">
      <Link to={`/view-vendor/${i?._id}`}>
        <i className="fa-solid fa-eye"></i>
      </Link>
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => {
          setId(i?._id);
          setOpen(true);
        }}
      />
      <i
        className="fa-sharp fa-solid fa-trash"
        onClick={() => deleteHandler(i._id)}
      ></i>
      <i
        className={
          i?.status === 'Block'
            ? 'fas fa-ban text-danger'
            : 'fas fa-ban text-success'
        }
        onClick={() => blockHandler(i._id, i.status)}
        style={{ cursor: 'pointer', fontSize: '18px' }}
      ></i>
    </span>
  ]);


  const handleExport = () => {
    const exportUrl = `https://suruchi-backend.vercel.app/api/v1/admin/download-vendor-excel`;

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


  const updateHandler = (newStatus) => {
    const data = {
      bankDetailsDisableEnable: newStatus, // Send the current toggle status in the payload
    };

    updateApi({
      url: `api/v1/admin/accessDetailsDisableEnable`,
      payload: data,
      setLoading,
      successMsg: "Updated",
    });
  };

  // const handleToggle = (e) => {
  //   const newStatus = e.target.checked; // Get the new toggle status (true/false)
  //   setStatus1(newStatus); // Update local state with new toggle status
  //   updateHandler(newStatus); // Send the new status in the payload
  // }; // Commented out unused function



  return (
    <>
      <EditVendorStatus
        show={open}
        handleClose={() => setOpen(false)}
        id={id}
        fetchApi={fetchHandler}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Vendors ({response?.pagination?.total})
          </span>
          <button className="submitBtn" onClick={() => navigate('/blockedvendors')}>
            Blocked Vendors
          </button>
          {/* <div className="toggle-container">
            <label htmlFor="bankToggle" className="toggle-label">
              Bank Details
            </label>
            <label className="toggle-switch">
              <input type="checkbox" id="bankToggle" checked={status1} onChange={handleToggle} />
              <span className="slider"></span>
            </label>
          </div> */}

        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder=""
            onChange={(e) =>
              debouncedSetQuery({ term: e.target.value, setSearch })
            }
          />
        </div>

        <button
          className="submitBtn"
          onClick={handleExport}
        >
          Export
        </button>
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

export default HOC(Vendors);
