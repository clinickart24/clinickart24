/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Link, useNavigate } from "react-router-dom";
import TableLayout from "../../Component/TableLayout";
import { getApi, removeApi } from "../../Repository/Repository";
import Pagination from "../../Component/Pagination";
import { debouncedSetQuery } from "../../utils/utils";
import axios from "axios";

import { ProductStatus } from "../../Component/Modals/Modals";



const Product = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);



  const fetchHandler = useCallback(() => {
    getApi({
      url: `api/v1/admin/Product/list?page=${page}&limit=${limit}&search=${search}`,
      setLoading,
      setResponse,
    });
  }, [limit, search, page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);


  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/admin/Product/delete/${id}`,
      successMsg: "Removed !",
      additionalFunctions,
    });
  };

  const thead = [
    "Sno.",
    "ID",
    "Image",
    "Product Name",
    "Category Name",
    "Subcategory Name",
    "Stock",
    "Stock Status",
    "Product Views",
    "In Demand",
    "New Arrival",
    "Created at",
    "Action",
  ];

  const tbody = response?.data?.map((i, index) => [
    `#${index + 1}`,
    i?.ID,
    <img src={i?.productImage[0]?.img} alt="" style={{ maxWidth: "80px" }} />,
    i?.productName,
    i?.categoryId?.name,
    i?.subcategoryId?.name,
    i?.stock,
    i?.stockStatus,
    i?.productView,
    i?.productShowInIndemand ? "Yes" : "",
    i?.productShowInNewArrival ? "Yes" : "",
    i?.createdAt?.slice(0, 10),
    <span className="flexCont">
      <Link to={`/product/${i._id}`}>
        <i className="fa-solid fa-eye" />
      </Link>
      <i className="fa-solid fa-pen-to-square"
        onClick={() => {
          setId(i._id);
          setOpen(true);
        }} />
      <i className="fa-sharp fa-solid fa-trash" onClick={() => deleteHandler(i?._id)}></i>
    </span>,
  ]);


  const handleExport = () => {
    const exportUrl = `https://suruchi-backend.vercel.app/api/v1/admin/downloadProductsExcel`;

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
      <ProductStatus
        show={open}
        handleClose={() => setOpen(false)}
        fetchApi={fetchHandler}
        id={id}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Products/Services ({response?.pagination?.totalProducts})
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
            placeholder="Start typing to search for products or services"
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

export default HOC(Product);
