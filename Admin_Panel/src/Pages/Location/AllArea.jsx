/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import Pagination from "../../Component/Pagination";
import { createApi, getApi, removeApi } from "../../Repository/Repository";
import { debouncedSetQuery } from "../../utils/utils";
import TableLayout from "../../Component/TableLayout";

import { CreateArea } from '../../Component/Modals/Modals'

const AllArea = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [id, setId] = useState("");
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(null);


    const fetchHandler = useCallback(() => {
        getApi({
            url: `api/v1/admin/area/getAreasAll?page=${page}&limit=${limit}&name=${search}`,
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
            url: `api/v1/admin/area/get/deleteArea/${id}`,
            successMsg: "Removed !",
            additionalFunctions,
        });
    };





    const thead = ["Sno.","Area Name","City Name","State Code", "Action"];
    const tbody = response?.data?.map((i, index) => [
        `#${index + 1}`,
        i?.name,
        i?.cityId?.name,
        i?.cityId?.stateCode,
        <span className="flexCont">
            <i
                className="fa-solid fa-pen-to-square"
                onClick={() => {
                    setId(i._id);
                    setEdit(true);
                    handleEditClick(i)
                }}
            />
            <i className="fa-sharp fa-solid fa-trash" onClick={() => deleteHandler(i._id)}></i>
        </span>,
    ]);


    const handleEditClick = (data) => {
        setSelected(data);
        setShow(true);
    };


    return (
        <>
            <CreateArea
                show={show}
                handleClose={() => setShow(false)}
                id={id}
                edit={edit}
                fetchApi={fetchHandler}
                data={selected}
            />
            <section className="sectionCont">
                <div className="pb-4   w-full flex justify-between items-center">
                    <span
                        className="tracking-widest text-slate-900 font-semibold"
                        style={{ fontSize: "1.5rem" }}
                    >
                        All Areas ({response?.totalCount} )
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

                <div className="filterBox">
                    <img
                        src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                        alt=""
                    />
                    <input
                        type="search"
                        placeholder="Search..."
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
                        totalPages={response?.totalPages} // Pass total pages here
                    />
                )}
            </section>
        </>
    );
};

export default HOC(AllArea);
