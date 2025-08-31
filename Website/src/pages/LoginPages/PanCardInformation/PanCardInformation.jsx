import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import HOC from "../../../components/layout/LoginLayout/HOC";

const PanCardInformation = () => {
  const [panNumber, setPanNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [agree, setAgree] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "image/jpeg") {
      setFile(selected);
    } else {
      alert("Only JPEG files are allowed.");
    }
  };

  const handleSubmit = () => {
    if (!panNumber || !fullName || !file || !agree) {
      alert("Please fill all fields and agree to the declaration.");
      return;
    }
    console.log("Submitted:", { panNumber, fullName, file });
  };

  return (
    <div className="w-full mx-auto p-1">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Pan Card Information
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Pan Card Number
        </label>
        <input
          type="text"
          value={panNumber}
          onChange={(e) => setPanNumber(e.target.value)}
          placeholder="Enter number here"
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter name here"
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Upload PAN Card
        </label>
        <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Upload PAN Card
          </p>
          <p className="text-xs text-gray-500 mb-4">
            only JPEG file is allowed
          </p>
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            className="hidden"
            id="panUpload"
          />
          <label
            htmlFor="panUpload"
            className="inline-block px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
          >
            Browse Files
          </label>
          {file && <p className="mt-2 text-xs text-gray-500">{file.name}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="mt-1 accent-pink-600"
          />
          <span className="max-w-xl text-justify">
            i do hereby declare that pan furnished/stated above is correct and
            belongs to me, registered as an account holder with
            www.clinickart.com. i further declare that i shall solely be held
            responsible for the consequences, in case of any false pan
            declaration.
          </span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded text-sm font-medium"
      >
        UPLOAD
      </button>

      <p className="text-sm text-pink-600 mt-4 cursor-pointer">
        Read Terms & Conditions of PAN Card Information
      </p>
    </div>
  );
};

export default HOC(PanCardInformation);
