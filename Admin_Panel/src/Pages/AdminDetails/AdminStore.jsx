/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Link, useNavigate } from "react-router-dom";
import TableLayout from "../../Component/TableLayout";
import { getApi, removeApi } from "../../Repository/Repository";
import { CreateAdminStore } from '../../Component/Modals/Modals'


const AdminStore = () => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchHandler = () => {
        getApi({
            url: `api/v1/admin/store/getAllAdminStores`,
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
            url: `api/v1/admin/stores/deleteStore/${id}`,
            successMsg: "Removed!",
            additionalFunctions,
        });
    };


    const thead = [
        "Sno.",
        "Store Name",
        "Mobile",
        "Email",
        "Action",
    ];

    const tbody = response?.data?.map((i, index) => [
        `#${index + 1}`,
        i?.StoreName,
        i?.adminMobile,
        i?.email,
        <span className="flexCont">
            {/* <Link to={`/view-vendor-store/${i._id}`}>
                <i className="fa-solid fa-eye" />
            </Link> */}
            <Link to={`/edit-admin-stores/${i._id}`}>
                <i className="fa-solid fa-pen-to-square" />
            </Link>
            <i className="fa-sharp fa-solid fa-trash" onClick={() => deleteHandler(i._id)}></i>
        </span>,
    ]);

    return (
        <>
            <CreateAdminStore
                show={modalShow}
                handleClose={() => setModalShow(false)}
                fetchApi={fetchHandler}
            />
            <section className="sectionCont">
                <div className="pb-4  w-full flex justify-between items-center">
                    <span
                        className="tracking-widest text-slate-900 font-semibold"
                        style={{ fontSize: "1.5rem" }}
                    >
                         All Admin Stores  ({response?.data?.length})
                    </span>

                    <button
                        className="submitBtn"
                        onClick={() => {
                            setModalShow(true);
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

export default HOC(AdminStore);
