/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import Pagination from "../../Component/Pagination";
import { createApi, getApi, removeApi } from "../../Repository/Repository";
import { debouncedSetQuery } from "../../utils/utils";
import TableLayout from "../../Component/TableLayout";

const AllCity = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");

    const fetchHandler = useCallback(() => {
        getApi({
            url: `api/v1/admin/city/getAllCitiess?page=${page}&limit=${limit}&name=${search}`,
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
            url: `api/v1/admin/city/deleteCity/${id}`,
            successMsg: "Removed !",
            additionalFunctions,
        });
    };





    const thead = ["Sno.", "City Name", "State Code", "Country Code", "Action"];
    const tbody = response?.data?.map((i, index) => [
        `#${index + 1}`,
        i?.name,
        i?.stateCode,
        i?.countryCode,
        <span className="flexCont">
            <i className="fa-sharp fa-solid fa-trash" onClick={() => deleteHandler(i._id)}></i>
        </span>,
    ]);



    return (
        <>
            <section className="sectionCont">
                <div className="pb-4   w-full flex justify-between items-center">
                    <span
                        className="tracking-widest text-slate-900 font-semibold"
                        style={{ fontSize: "1.5rem" }}
                    >
                        All Cities ({response?.totalCities} )
                    </span>
                </div>

                <div className="filterBox">
                    <img
                        src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                        alt=""
                    />
                    <input
                        type="search"
                        placeholder="Search Cities..."
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

export default HOC(AllCity);
