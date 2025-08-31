/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { createApi, getApi, updateApi } from "../../Repository/Repository";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ClipLoader } from "react-spinners";

const Privacypolicy = () => {
    const [response, setResponse] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userType, setUserType] = useState("USER");

    // Fetch Data
    const fetchHandler = () => {
        setLoading(true);
        getApi({
            url: "api/v1/static/getPrivacy",
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

        setSaveLoading(true);
        const payload = { title, content: description, userType };

        try {
            if (id) {
                await updateApi({
                    url: `api/v1/static/privacy/${id}`,
                    payload,
                    successMsg: "Updated Successfully",
                    additionalFunctions,
                });
            } else {
                await createApi({
                    url: "api/v1/static/createPrivacy",
                    payload,
                    successMsg: "Created Successfully",
                    additionalFunctions,
                });
            }
        } finally {
            setSaveLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <section className="sectionCont">
            <div className="pb-4 w-full flex justify-between items-center">
                <span className="tracking-widest text-slate-900 font-semibold text-2xl">
                    {userType === "USER" ? "Privacy Policy For User" : "Privacy Policy For Vendor"}
                </span>
                <select
                    className="border p-2 rounded-md"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <option value="USER">User</option>
                    <option value="VENDOR">Vendor</option>
                </select>
                {!isEditing && (
                    <button
                        className="submitBtn flex items-center justify-center gap-2"
                        onClick={() => {
                            const existingData = response?.data?.find(item => item.userType === userType);
                            if (existingData) {
                                setTitle(existingData.title);
                                setDescription(existingData.content);
                                setId(existingData._id);
                            } else {
                                setTitle("");
                                setDescription("");
                                setId(null);
                            }
                            setIsEditing(true);
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <ClipLoader color="#fff" size={20} />
                                Loading...
                            </>
                        ) : (
                            response?.data?.some(item => item.userType === userType) ? "Edit" : "Add New"
                        )}
                    </button>
                )}
            </div>

            {loading && !isEditing && (
                <div className="flex justify-center mt-8">
                    <ClipLoader color="#3B82F6" size={40} />
                </div>
            )}

            {!loading && !isEditing &&
                (response?.data?.length === 0 ||
                    !response.data.some(item => item.userType === userType)) && (
                    <p className="text-gray-600 text-lg mt-4">
                        No About Us data found for {userType}. Click "Add New" to create one.
                    </p>
                )}

            {!loading && !isEditing &&
                response?.data?.some(item => item.userType === userType) && (
                    <div className="aboutus">
                        <h1 className="text-xl font-semibold">
                            Title: {response.data.find(item => item.userType === userType)?.title}
                        </h1>
                        <div
                            className="prose mt-2 text-gray-700"
                            dangerouslySetInnerHTML={{
                                __html: response.data.find(item => item.userType === userType)?.content
                            }}
                        />
                    </div>
                )}

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
                    <ReactQuill value={description} onChange={setDescription} className="bg-white" />
                    <div className="flex gap-4 mt-4">
                        <button
                            className="submitBtn flex items-center justify-center gap-2"
                            onClick={handleSave}
                            disabled={saveLoading}
                        >
                            {saveLoading ? (
                                <>
                                    <ClipLoader color="#fff" size={20} />
                                    {id ? "Updating..." : "Saving..."}
                                </>
                            ) : (
                                id ? "Update" : "Save"
                            )}
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={() => setIsEditing(false)}
                            disabled={saveLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HOC(Privacypolicy);