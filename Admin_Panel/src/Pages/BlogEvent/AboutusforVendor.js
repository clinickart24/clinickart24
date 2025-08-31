/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { createApi, getApi, updateApi } from "../../Repository/Repository";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutusforVendor = () => {
    const [response, setResponse] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch Data
    const fetchHandler = () => {
        getApi({
            url: "api/v1/static/getAboutUs",
            setResponse,
            setLoading,
        });
    };

    useEffect(() => {
        fetchHandler();
    }, []);

    const additionalFunctions = [fetchHandler];

    // Handle Save (Add or Update)
    const handleSave = async () => {
        if (!title || !description) {
            alert("Title and Description are required!");
            return;
        }

        const payload = { title, desc: description, userType: "USER" };

        if (id) {
            await updateApi({
                url: `api/v1/static/aboutUs/${id}`,
                payload: payload,
                successMsg: "Added",
                additionalFunctions,
            });
        } else {
            // Add new
            await createApi({
                url: "api/v1/static/createAboutus",
                payload: payload,
                successMsg: "Updated",
                additionalFunctions,
            });
        }
        setIsEditing(false);
    };

    return (
        <section className="sectionCont">
            <div className="pb-4 w-full flex justify-between items-center">
                <span className="tracking-widest text-slate-900 font-semibold text-2xl">
                    About Us
                </span>
                {!isEditing && (
                    <button
                        className="submitBtn"
                        onClick={() => {
                            if (response?.data?.length > 0) {
                                setTitle(response?.data[0]?.title);
                                setDescription(response?.data[0]?.desc);
                                setId(response?.data[0]?._id);
                            } else {
                                setTitle("");
                                setDescription("");
                                setId(null);
                            }
                            setIsEditing(true);
                        }}
                    >
                        {response?.data?.length > 0 ? "Edit" : "Add New"}
                    </button>
                )}
            </div>
            {/* Show Message if No Data */}
            {!isEditing && response?.data?.length === 0 && (
                <p className="text-gray-600 text-lg mt-4">No About Us data found. Click "Add New" to create one.</p>
            )}
            {/* Show Existing Data */}
            {!isEditing && response?.data?.length > 0 && (
                <div className="aboutus">
                    <h1 className="text-xl font-semibold">Title: {response?.data[0]?.title}</h1>
                    <p className="mt-2 text-gray-700">
                        <span className="font-semibold">Description:</span>{" "}
                        <div dangerouslySetInnerHTML={{ __html: response?.data[0]?.desc }} />
                    </p>
                </div>
            )}

            {/* Add / Edit Form */}
            {isEditing && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                    <label className="block text-lg font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="block text-lg font-semibold mt-4 mb-2">Description</label>
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        className="bg-white"
                    />

                    <div className="flex gap-4 mt-4">
                        <button className="submitBtn" onClick={handleSave}>
                            {id ? "Update" : "Save"}
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HOC(AboutusforVendor);
