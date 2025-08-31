/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Link, useNavigate } from "react-router-dom";
import data from "../../Constant/constant.json";
import TableLayout from "../../Component/TableLayout";
import { getApi, removeApi } from "../../Repository/Repository";
import Pagination from "../../Component/Pagination";
import { debouncedSetQuery } from "../../utils/utils";
import { CreateProduct } from "../../Component/Modals/Modals";


const AdminProduct = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [selected, setSelected] = useState(null);


  const fetchHandler = () => {
    getApi({
      url: `api/v1/admin/Product/getProductsByAdminId`,
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, [id]);





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
      <Link to={`/product/${i?._id}`}>
        <i className="fa-solid fa-eye" />
      </Link>
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => {
          setId(i._id);
          setEdit(true);
          handleEditClick(i)
        }}
      />
      <i className="fa-sharp fa-solid fa-trash" onClick={() => deleteHandler(i?._id)}></i>
    </span>,
  ]);


  const handleEditClick = (data) => {
    setSelected(data);
    setShow(true);
  };
  return (
    <>
      <CreateProduct
        show={show}
        handleClose={() => setShow(false)}
        id={id}
        edit={edit}
        fetchApi={fetchHandler}
        data={selected}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Admin Products ({response?.data?.length})
          </span>

          <button
            className="submitBtn"
            onClick={() => {
              setEdit(false);
              setShow(true);
            }}
          >
            Create New
          </button>
        </div>
        <TableLayout thead={thead} tbody={tbody} loading={loading} />
      </section>
    </>
  );
};

export default HOC(AdminProduct);
