import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { createApi } from "../Repository/Repository";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const [otpDisplay, setOtpDisplay] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message

  const navigate = useNavigate(); // Initialize navigate

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = { email };

    createApi({
      url: "api/v1/admin/requestPasswordReset",
      setLoading,
      payload,
      successMsg: `OTP sent successfully to ${email}`,
      additionalFunctions: [
        (response) => {
          setOtpDisplay(response.otp);
          setSuccessMessage(`Your OTP is: ${response.otp}`); // Display OTP in the success message
        },
      ],
    });
  };

  const submitHandler1 = (e) => {
    e.preventDefault();
    const payload1 = {
      email,
      otp,
      newPassword: password,
      confirmPassword: confpassword,
    };

    createApi({
      url: "api/v1/admin/verifyOtpAndResetPassword",
      setLoading:setLoading1,
      payload: payload1,
      successMsg: "Password reset successfully",
      additionalFunctions: [() => navigate("/")], // Redirect after successful password reset
    });
  };

  return (
    <>
      <section className="LoginSection">
        <form>
          <h2 className="mb-3">Reset Password</h2>

          <div className="input_container">
            <input
              type="email"
              placeholder="admin@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <AiOutlineMail className="text-xl " />
          </div>

          <div className="otp-container">
            <div className="input_container">
              <input
                type="tel"
                pattern="[0-9]{4}"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="EcommerceAdminLogin"
              onClick={submitHandler}
            >
              {loading ? <ClipLoader color="#fff" /> : "Send OTP"}
            </button>
          </div>
          {/* Show success message */}
          {successMessage && (
            <div className="success-message">
              <p>{successMessage}</p>
            </div>
          )}

          <div className="input_container">
            <input
              type={inputpass ? "text" : "password"}
              placeholder="New password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setInputpass(!inputpass)}
              className="text-xl cursor-pointer hover:scale-90 "
            >
              {inputpass ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>

          <div className="input_container">
            <input
              type={inputpass ? "text" : "password"}
              placeholder="Confirm password"
              required
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <span
              onClick={() => setInputpass(!inputpass)}
              className="text-xl cursor-pointer hover:scale-90 "
            >
              {inputpass ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>

          <button type="submit" className="EcommerceAdminLogin" onClick={submitHandler1}>
            {loading1 ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </form>
      </section>
    </>
  );
};

export default ForgetPassword;
