/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { getApi } from "../../Repository/Repository";
import { CreateAbout, CreateTermsConditions } from "../../Component/Modals/Modals";


const ContactUs = () => {
    const [show, setShow] = useState(false);
    const [response, setResponse] = useState({ data: [] });
    const [response1, setResponse1] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [selected, setSelected] = useState(null);


    const fetchHandler = () => {
        getApi({
            url: "getAllContactContent?userType=USER",
            setResponse,
            setLoading,
            
        });
    };

    const fetchHandler1 = () => {
        getApi({
            url: "getAllContactContent?userType=VENDOR",
            setResponse1,
            setLoading,
        });
    };

    useEffect(() => {
        fetchHandler();
        fetchHandler1();
    }, []);

    const handleEditClick = (data) => {
        setSelected(data);
        setShow(true);
    };

    console.log(response1?.data, "jadgsj")

    return (
        <>
            <CreateTermsConditions
                show={show}
                handleClose={() => setShow(false)}
                id={id}
                fetchApi={fetchHandler}
                data={selected}
            />
            <section className="sectionCont">
                <div className="pb-4 w-full flex justify-between items-center">
                    <span
                        className="tracking-widest text-slate-900 font-semibold"
                        style={{ fontSize: "1.5rem" }}
                    >
                        Contact Us User Type
                    </span>

                    {response?.data?.length > 0 && (
                        <button
                            className="submitBtn"
                            onClick={() => {
                                setId(response?.data[0]._id);
                                handleEditClick(response?.data[0]);
                            }}
                        >
                            Update
                        </button>
                    )}
                </div>

                {response?.data?.length > 0 ? (
                    <div className="aboutus">
                        <h1>Title: {response?.data[0]?.title}</h1>
                        <h1>Description:</h1>
                        <p>{response?.data[0]?.desc}</p>
                    </div>
                ) : (
                    <div className="no-data">
                        <h2>No Data Available</h2>
                    </div>
                )}
            </section>

            <section className="sectionCont">
                <div className="pb-4  w-full flex justify-between items-center">
                    <span
                        className="tracking-widest text-slate-900 font-semibold "
                        style={{ fontSize: "1.5rem" }}
                    >
                        Contact Us Vendor Type
                    </span>

                    <button
                        className="submitBtn"
                        onClick={() => {
                            setId(response1?.data[0]?._id);
                            handleEditClick(response1?.data[0])
                        }}
                    >
                        Update
                    </button>
                </div>
                {response1?.data[0] ?
                    <div className="aboutus">
                        <h1>Title:{response1?.data[0]?.title}</h1>
                        <p><h1>Description:</h1>{response1?.data[0]?.desc}</p>
                    </div>
                    : (
                        <div className="no-data">
                            <h2>No Data Available</h2>
                        </div>
                    )
                }

            </section>
        </>
    );
};

export default HOC(ContactUs);
