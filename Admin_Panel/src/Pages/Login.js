/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { createApi } from "../Repository/Repository";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputpass, setInputpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const payload = {
    email,
    password,
  };

  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const additionalFunctions = [
      (res) => saveToken(res.accessToken),
      () => navigate("/dashboard"),
    ];
    createApi({
      url: "api/v1/admin/login",
      setLoading,
      payload,
      successMsg: "Welcome Back !",
      additionalFunctions,
    });
  };

  return (
    <>
      <section className="LoginSection">
          <form onSubmit={submitHandler}>
            <h2>Clinic Kart - Admin Panel</h2>
            <div className="input_container">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                required
              />
              <AiOutlineMail className="text-xl " />
            </div>
            <div className="input_container">
              <input
                type={inputpass ? "text" : "password"}
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => {
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {inputpass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>

            <button type="submit" className="EcommerceAdminLogin">
              {loading ? <ClipLoader color="#fff" /> : "Log In"}
            </button>
            <button
              type="button"
              className="EcommerceVendorLogin"
              onClick={() => navigate("/forget-password")}
            >
              Forget Password?
            </button>
          </form>
      </section>
    </>
  );
};

export default Login;
