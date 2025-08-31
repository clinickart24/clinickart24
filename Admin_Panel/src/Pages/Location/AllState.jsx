/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import Pagination from "../../Component/Pagination";
import { createApi, getApi, removeApi } from "../../Repository/Repository";
import { debouncedSetQuery } from "../../utils/utils";
import TableLayout from "../../Component/TableLayout";

const AllState = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");

    const fetchHandler = useCallback(() => {
        getApi({
            url: `api/v1/admin/states/getAllStates?page=${page}&limit=${limit}&name=${search}`,
            setLoading,
            setResponse,
        });
    }, [limit, search, page]);

    useEffect(() => {
        fetchHandler();
    }, [fetchHandler]);




    const createHandler = (e, isoCode) => {
        e.preventDefault();

        const fd = {
            countryCode: "IN",
            stateCode: isoCode,
        };

        createApi({
            url: "api/v1/admin/city/addCities",
            payload: fd,
            setLoading,
            successMsg: "City Added successfully",
        });
    };

    const createHandler1 = (e, isoCode) => {
        e.preventDefault();

        const fd = {
            countryCode: "IN",
            stateCode: isoCode,
        };

        createApi({
            url: "api/v1/admin/city/deleteAllCities",
            payload: fd,
            setLoading,
            successMsg: "City Removed successfully",
        });
    };

    const thead = ["Sno.", "Name", "State Code", "Country Code", "Action"];
    const tbody = response?.data?.map((i, index) => [
        `#${index + 1}`,
        i?.name,
        i?.isoCode,
        i?.countryCode,
        <span className="flexCont">
            <i
                className="fas fa-plus"
                style={{ color: 'green', fontSize: '18px', cursor: 'pointer' }}
                onClick={(e) => createHandler(e, i?.isoCode)}
            ></i>

            {/* Remove City Button */}
            <i
                className="fas fa-minus"
                style={{ color: 'red', fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}
                onClick={(e) => createHandler1(e, i?.isoCode)}
            ></i>
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
                        All States ({response?.totalStates} )
                    </span>
                </div>

                <div className="filterBox">
                    <img
                        src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                        alt=""
                    />
                    <input
                        type="search"
                        placeholder="Search States..."
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
                        totalPages={response?.totalPages}
                    />
                )}
            </section>
        </>
    );
};

export default HOC(AllState);
