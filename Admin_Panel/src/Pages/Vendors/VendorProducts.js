/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HOC from "../../Layout/HOC";
import { getApi, removeApi } from "../../Repository/Repository";
import TableLayout from "../../Component/TableLayout";

const VendorProducts = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchHandler = () => {
    getApi({
      url: `api/v1/admin/getVendorAllProduct/${id}`,
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = [
    "Sno.",
    "ID",
    "Image",
    "Product Name",
    "Category Name",
    "Subcategory Name",
    "Created at",
    "Action",
  ];  

  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/admin/Product/delete/${id}`,
      successMsg: "Removed !",
      additionalFunctions,
    });
  };

  const tbody = response?.data?.map((i, index) => [
    `#${index + 1}`,
    i?.ID,
    <img src={i?.productImage[0]?.img} alt="" style={{ maxWidth: "80px" }} />,
    i.productName,
    i.categoryId.name,
    i.subcategoryId.name,
    i.createdAt?.slice(0, 10),
    <span className="flexCont">
      <Link to={`/product/${i._id}`}>
        <i className="fa-solid fa-eye" />
      </Link>
      <i className="fa-sharp fa-solid fa-trash"></i>
    </span>,
  ]);
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Products/Services ({response?.data?.length || 0})
          </span>
          <button className="submitBtn" onClick={() => navigate('/vendors')}>
            back
          </button>
        </div>
        <TableLayout thead={thead} tbody={tbody}  loading={loading}/>
      </section>
    </>
  );
};

export default HOC(VendorProducts);
