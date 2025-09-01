import React, { useState } from "react";
import HeaderNav from "../../../components/layout/NavBar/HeaderNav";
import images from "../../../lib/exportImages";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/supabase";
const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    phone: "",
    categoryType: "",
    city: "",
    zipcode: "",
    aadharNumber: "",
    gstNumber: "",
    bankName: "",
    ifscCode: "",
    accountNumber: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Sign up with Supabase
      await authService.signUp(formData.email, formData.password, {
        first_name: formData.name.split(' ')[0] || formData.name,
        last_name: formData.name.split(' ').slice(1).join(' ') || '',
        phone: formData.phone,
        role: 'vendor',
        // Additional vendor fields
        categoryType: formData.categoryType,
        city: formData.city,
        zipcode: formData.zipcode,
        aadharNumber: formData.aadharNumber,
        gstNumber: formData.gstNumber,
        bankDetails: {
          bankName: formData.bankName,
          ifscCode: formData.ifscCode,
          accountNumber: formData.accountNumber
        }
      });

      setSuccess("Account created successfully! Please check your email to verify your account.");
      setStep(2); // Move to verification step
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextProfileStep = () => {
    setStep((prev) => prev + 1);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const StepIndicator = ({ steps, currentStep }) => {
    return (
      <div className="flex items-center justify-center mb-6 w-full">
        {steps?.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center text-center min-w-[80px]">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center

                  ${
                    isCurrent
                      ? "border-2 border-text-gray-200 text-gray-300"
                      : ""
                  }
                  ${
                    !isCompleted && !isCurrent
                      ? "border-2 border-gray-300 text-gray-400 bg-gray-300"
                      : ""
                  }
                `}
                >
                  {isCompleted ? (
                    <Icon
                      icon="teenyicons:tick-circle-solid"
                      className="text-xl text-[#C53958]"
                    />
                  ) : isCurrent ? (
                    <span className="text-xs">●</span>
                  ) : null}
                </div>
                <span
                  className={`mt-1 text-sm font-medium ${
                    isCompleted
                      ? "text-[#C53958]"
                      : isCurrent
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-gray-300 mx-2"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  const Store_Stepper = ({
    steps = [
      "Information",
      "Address Details",
      "Bank Details",
      "Store Documents",
      "Setting Password",
    ],
    currentStep = 0,
  }) => {
    return (
      <div className="flex items-center justify-between w-full">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-medium
                  ${
                    isActive
                      ? "border-[#C53958] text-[#C53958]"
                      : isCompleted
                      ? "border-[#C53958] bg-[#C53958] text-white"
                      : "border-gray-300 text-gray-500"
                  }
                `}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span
                  className={`mt-2 text-xs text-center w-20 leading-tight
                  ${isActive ? "text-[#C53958] font-medium" : "text-gray-500"}
                `}
                >
                  {label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2
                  ${isCompleted ? "bg-[#C53958]" : "bg-gray-300"}
                `}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <HeaderNav />

      <div className="max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-80px)] flex justify-center items-start">
        {step === 1 && (
          <div className="border border-gray-100 rounded-lg max-w-lg p-6">
            <div className="flex flex-col justify-center w-full mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-left">
                Enter your full name and choose your business password
              </h2>
              <form className="w-full" onSubmit={handleSignUp}>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                  </div>
                )}
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password (min 6 characters)"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                {/* New Fields */}
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Type of Category
                  </label>
                  <select
                    name="categoryType"
                    value={formData.categoryType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-100 cursor-not-allowed"
                    disabled
                    required
                  >
                    <option value="">Select Category (Will be updated later)</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="medical_equipment">Medical Equipment</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">This field will be updated later by admin</p>
                </div>

                <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Zipcode
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      placeholder="Enter zipcode"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    placeholder="Enter 12-digit Aadhar number"
                    pattern="[0-9]{12}"
                    maxLength="12"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    placeholder="Enter GST number (optional)"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                {/* Bank Details Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3 border-b pb-2">Bank Details</h3>

                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Enter bank name"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                      placeholder="Enter IFSC code"
                      pattern="[A-Z]{4}[0-9]{7}"
                      maxLength="11"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter bank account number"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#C53958] text-white rounded-md hover:bg-[#c42b4d] mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  By creating an account, you agree to Clinic Kart{" "}
                  <a href="#" className="text-blue-500 underline">
                    Conditions of Use
                  </a>
                  ,{" "}
                  <a href="#" className="text-blue-500 underline">
                    Privacy Notice
                  </a>
                  , and the{" "}
                  <a href="#" className="text-blue-500 underline">
                    Clinic Kart Vendors Terms and Conditions
                  </a>
                  . You agree that you are creating this business account on
                  behalf of your organization and have authority to bind your
                  organization.
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const { error } = await authService.signUp(formData.email, formData.password, {
                        first_name: formData.name.split(' ')[0] || formData.name,
                        last_name: formData.name.split(' ').slice(1).join(' ') || '',
                        phone: formData.phone,
                        role: 'vendor'
                      });
                      if (error) throw error;
                      setSuccess("Verification email resent! Please check your inbox.");
                    } catch (error) {
                      setError(error.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="text-[#C53958] text-sm font-medium underline disabled:opacity-50"
                >
                  {loading ? "Sending..." : "RESEND VERIFICATION EMAIL"}
                </button>
              </form>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-lg">
            <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-4 text-sm">
              We've sent a verification link to:{" "}
              <strong>{formData.email}</strong>
              <br />
              Please check your email and click the verification link to activate your account.
            </p>

            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-medium text-blue-800 mb-2">Next Steps:</h3>
              <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the verification link in the email</li>
                <li>Return here to complete your vendor registration</li>
              </ol>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-[#C53958] text-white rounded-md hover:bg-[#c42b4d] mb-4"
            >
              Go to Login
            </button>
            <p className="text-sm text-gray-600 mb-4 text-left">
              By creating an account, you agree to Clinic Kart{" "}
              <a href="#" className="text-blue-500 underline">
                Conditions of Use
              </a>
              ,{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Notice
              </a>
              , and the{" "}
              <a href="#" className="text-blue-500 underline">
                Clinic Kart Vendors Terms and Conditions
              </a>
              . You agree that you are creating this business account on behalf
              of your organization and have authority to bind your organization.
            </p>
            <button
              onClick={() => {
                setStep(1);
                setError("");
                setSuccess("");
              }}
              className="text-[#C53958] text-sm font-medium underline w-full text-left mb-2"
            >
              ← Back to Registration
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-7xl lg:flex gap-5">
            <div className="flex-1 flex flex-col justify-center gap-3">
              <p className="text-pink-600 font-semibold mb-2">PROFILE SETUP</p>
              <h3 className="text-2xl font-bold mb-4">
                FOR AN EASY FORM FILLING PROCESS
              </h3>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, enim rerum dolor accusamus blanditiis eius nemo tempora
                voluptate optio aliquam totam fuga iusto placeat ratione libero,
                temporibus tenetur soluta praesentium!
              </p>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#C53958]/80 w-fit"
              >
                Let Begin's
              </button>
            </div>
            <div className="flex-1 flex justify-center items-center md:mt-5">
              <img
                src={images.homePage.signUp.profileSectionImage}
                alt="Easy Product Uploads"
                className="max-w-full"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="p-6">
              <StepIndicator
                steps={["Category", "Location", "Company Name"]}
                currentStep={0}
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#C53958] mb-2">
                PROFILE SETUP
              </h2>
              <h1 className="text-3xl font-bold text-black mb-4">
                ADD THE CATEGORY
              </h1>

              <p className="text-black mb-6">
                Rhoncus morbi et augue nec, in id ullamcorper at sit.
                Condimentum sit nunc in eros scelerisque sed. Commodo in viverra
                nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam
                sagittis, pulvinar. Fermentum scelerisque sit consectetur hac
                mi. Mollis leo eleifend utricies purus laculis.
              </p>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Type of Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <button
                onClick={handleNextProfileStep}
                className="w-full px-6 py-3 bg-[#C53958] text-white rounded-md hover:bg-[#b8334d] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="p-6">
              <StepIndicator
                steps={["Category", "Location", "Company Name"]}
                currentStep={1}
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#C53958] mb-2">
                PROFILE SETUP
              </h2>
              <h1 className="text-3xl font-bold text-black mb-4">
                ADD THE LOCATION
              </h1>

              <p className="text-black mb-6">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
                quod qui provident vero consequatur nesciunt? Tenetur in minus,
                ullam vero at dolorum, autem molestiae obcaecati possimus
                debitis ex praesentium quos.
              </p>

              <form action="">
                <div className="mb-4 flex flex-col">
                  <label htmlFor="" className="text-sm font-medium text-black">
                    Select City
                  </label>
                  <select
                    name="category"
                    id=""
                    className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-3"
                  >
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                  </select>
                </div>
                <div className="mb-4 flex flex-col">
                  <label htmlFor="" className="text-sm font-medium text-black">
                    Select Area
                  </label>
                  <select
                    name="location"
                    id=""
                    className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-3"
                  >
                    <option value="location1">Location 1</option>
                    <option value="location2">Location 2</option>
                    <option value="location3">Location 3</option>
                  </select>
                </div>
              </form>

              <div className="flex gap-3">
                <button
                  onClick={handleNextProfileStep}
                  className="px-6 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#c42b4d] transition-colors w-fit"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="p-6">
              <StepIndicator
                steps={["Category", "Location", "Company Name"]}
                currentStep={2}
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#C53958] mb-2">
                PROFILE SETUP
              </h2>
              <h1 className="text-3xl font-bold text-black mb-4">
                ADD THE COMPANY NAME
              </h1>

              <p className="text-black mb-6">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
                quod qui provident vero consequatur nesciunt? Tenetur in minus,
                ullam vero at dolorum, autem molestiae obcaecati possimus
                debitis ex praesentium quos.
              </p>

              <form action="">
                <div className="mb-4 flex flex-col">
                  <label htmlFor="" className="text-sm font-medium text-black">
                    Company Name
                  </label>
                  <select
                    name="category"
                    id=""
                    className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-3"
                  >
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                  </select>
                </div>
              </form>

              <div className="flex gap-3">
                <button
                  onClick={handleNextProfileStep}
                  className="px-6 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#c42b4d] transition-colors w-fit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 7 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-4xl mx-auto my-8">
            {/* Fixed Header */}
            <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg sticky top-0 z-10">
              <Store_Stepper />
              <h2 className="text-xl font-bold text-[#C53958] mb-2 mt-4 uppercase">
                Store Information
              </h2>
              <h1 className="text-2xl font-bold text-black mb-2">
                Owner details, Open & Close hrs.
              </h1>
              <p className="text-gray-600 text-sm">
                Provide accurate details to ensure smooth onboarding and verification
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[60vh] overflow-y-auto p-6">

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Owner Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter owner's full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Store Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter store name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                      required
                    />
                  </div>
                </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                  <label className="block text-lg font-semibold text-gray-500 mb-2">
                    UPLOAD LOGO OF STORE
                  </label>
                  <p className="text-gray-500 text-sm mb-3">
                    To further avoid delays and cancellations help delivery
                    partners reach you easily with this info
                  </p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center text-center lg:w-1/2">
                  <p className="text-gray-500 mb-2">Drag & drop photos here</p>
                  <p className="text-gray-400 text-sm">
                    Or select files from your mobile
                  </p>
                  <button
                    type="button"
                    className="mt-3 px-4 py-2 bg-gray-100 rounded-md text-sm font-medium"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Owner Contact Details
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    To get updates on payments, customer complaints, order acceptance, etc.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password (min 6 characters)"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Type of Category *
                  </label>
                  <select
                    value={formData.categoryType}
                    onChange={(e) => setFormData({...formData, categoryType: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                    required
                  >
                    <option value="">Select Category (Will be updated later)</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="grocery">Grocery</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="other">Other</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">This field will be updated later by admin</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Zipcode *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter zipcode"
                      value={formData.zipcode}
                      onChange={(e) => setFormData({...formData, zipcode: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Aadhar Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 12-digit Aadhar number"
                    value={formData.aadharNumber}
                    onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                    required
                    maxLength={12}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    GST Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter GST number (optional)"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Bank Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Bank Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter bank name"
                        value={formData.bankName}
                        onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        IFSC Code *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter IFSC code"
                        value={formData.ifscCode}
                        onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter account number"
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C53958] transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Fixed Footer with Submit Button */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  All fields marked with * are required
                </p>
                <button
                  type="button"
                  onClick={handleSignUp}
                  disabled={loading}
                  className="px-8 py-3 bg-[#C53958] text-white rounded-md hover:bg-[#b8334d] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 8 && (
          <div className="bg-white p-6 rounded-lg border border-gray-100 max-w-7xl mx-auto max-h-[80vh] overflow-y-auto lg:min-w-5xl">
            <div className="p-6">
              <Store_Stepper currentStep={1} />
            </div>

            <h2 className="text-lg font-bold text-[#C53958] mb-2 uppercase">
              Address Details
            </h2>
            <h1 className="text-sm text-black mb-4">
              Provide accurate details to ensure timely delivery of food to your
              customers
            </h1>

            {/* Form */}
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Shop/Plot Number
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Floor
                </label>
                <input
                  type="text"
                  placeholder="Enter floor"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Building/Mall/Complex Name
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  State
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Add Store Location
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="button"
                  onClick={handleNextProfileStep}
                  className="px-6 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#b8334d] transition-colors"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 9 && (
          <div className="bg-white p-6 rounded-lg border border-gray-100 max-w-7xl mx-auto max-h-[80vh] overflow-y-auto lg:min-w-5xl">
            <div className="p-6">
              <Store_Stepper currentStep={2} />
            </div>

            <h2 className="text-2xl font-bold text-black mb-2 uppercase">
              Bank Account Details
            </h2>
            <h1 className="text-sm text-black mb-4">
              Provide accurate details to ensure timely delivery of parcel to
              your customers
            </h1>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Branch Name
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="button"
                  onClick={handleNextProfileStep}
                  className="px-6 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#b8334d] transition-colors"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 10 && (
          <div className="bg-white p-6 rounded-lg border border-gray-100 max-w-7xl mx-auto max-h-[80vh] overflow-y-auto">
            {/* Stepper */}
            <div className="p-6">
              <Store_Stepper currentStep={3} />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-black mb-2 uppercase">
              Personal Documents
            </h2>
            <h1 className="text-sm text-black mb-4">
              Upload focused photos of below documents for faster verification
            </h1>

            {/* Aadhar Card */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="w-full lg:w-1/2">
                <label className="block text-lg font-semibold text-gray-500 mb-2">
                  UPLOAD AADHAR CARD
                </label>
                <p className="text-gray-500 text-sm">
                  To further avoid delays and cancellations help delivery
                  partners reach you easily with this info
                </p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center text-center lg:w-1/2">
                <p className="text-gray-500 mb-2">Drag & drop photos here</p>
                <p className="text-gray-400 text-sm">
                  Or select files from your mobiles
                </p>
                <button
                  type="button"
                  className="mt-3 px-4 py-2 bg-gray-100 rounded-md text-sm font-medium"
                >
                  Browse Files
                </button>
              </div>
            </div>

            {/* PAN Card */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="w-full lg:w-1/2">
                <label className="block text-lg font-semibold text-gray-500 mb-2">
                  UPLOAD PAN CARD
                </label>
                <p className="text-gray-500 text-sm">
                  To further avoid delays and cancellations help delivery
                  partners reach you easily with this info
                </p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center text-center lg:w-1/2">
                <p className="text-gray-500 mb-2">Drag & drop photos here</p>
                <p className="text-gray-400 text-sm">
                  Or select files from your mobiles
                </p>
                <button
                  type="button"
                  className="mt-3 px-4 py-2 bg-gray-100 rounded-md text-sm font-medium"
                >
                  Browse Files
                </button>
              </div>
            </div>

            {/* Driving License */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="w-full lg:w-1/2">
                <label className="block text-lg font-semibold text-gray-500 mb-2">
                  UPLOAD DRIVING LICENSE
                </label>
                <p className="text-gray-500 text-sm">
                  To further avoid delays and cancellations help delivery
                  partners reach you easily with this info
                </p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center text-center lg:w-1/2">
                <p className="text-gray-500 mb-2">Drag & drop photos here</p>
                <p className="text-gray-400 text-sm">
                  Or select files from your mobiles
                </p>
                <button
                  type="button"
                  className="mt-3 px-4 py-2 bg-gray-100 rounded-md text-sm font-medium"
                >
                  Browse Files
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleNextProfileStep}
                className="px-6 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#b8334d] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 11 && (
          <div className="bg-white p-6 rounded-lg border border-gray-100 max-w-7xl mx-auto max-h-[80vh] overflow-y-auto lg:min-w-5xl">
            <div className="p-6">
              <Store_Stepper currentStep={4} />
            </div>

            <h2 className="text-3xl font-bold text-black mb-2">
              Password Setting
            </h2>
            <p className="text-gray-600 mb-6">
              Set up a password which is stronger and you don’t forget it
            </p>

            {/* Form */}
            <form className="space-y-6">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter details"
                  className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Enter again"
                  className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleNextProfileStep}
                  className="px-6 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#b8334d] transition-colors"
                >
                  Pay &amp; Login
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 12 && (
          <div className="bg-white p-6 rounded-lg border border-gray-100 max-w-7xl mx-auto max-h-[80vh] overflow-y-auto lg:min-w-5xl">
            <h2 className="text-2xl font-bold text-black mb-2">
              Choose the Right Plan for Your Business
            </h2>

            <div className="flex flex-wrap gap-4 mb-8">
              {["1 Month", "3 Months", "6 Months", "12 Months"].map(
                (label, i) => (
                  <button
                    key={i}
                    className={`px-6 py-1 rounded-full ${
                      selectedDuration === label
                        ? "bg-gray-100 border border-gray-300"
                        : "bg-transparent border border-gray-200"
                    }`}
                    onClick={() => setSelectedDuration(label)}
                  >
                    {label}
                  </button>
                )
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold">Basic</h3>
                <p className="text-3xl font-bold mt-2">
                  ₹19<span className="text-base font-normal">/month</span>
                </p>
                <button onClick={handleNextProfileStep} className="mt-4 px-6 py-2 bg-gray-100 rounded-md">
                  Choose Plan
                </button>
                <ul className="mt-6 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>20 Images</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>5 Videos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="entypo:cross"
                      className="text-xl text-red-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="entypo:cross"
                      className="text-xl text-red-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="entypo:cross"
                      className="text-xl text-red-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="entypo:cross"
                      className="text-xl text-red-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="entypo:cross"
                      className="text-xl text-red-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="entypo:cross"
                      className="text-xl text-red-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center relative">
                <span className="absolute top-2 right-2 bg-yellow-300 text-xs font-semibold px-2 py-1 rounded-full">
                  Most Popular
                </span>
                <h3 className="text-lg font-semibold">Advanced</h3>
                <p className="text-3xl font-bold mt-2">
                  ₹49<span className="text-base font-normal">/month</span>
                </p>
                <button onClick={handleNextProfileStep} className="mt-4 px-6 py-2 bg-gray-100 rounded-md">
                  Choose Plan
                </button>
                <ul className="mt-6 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>50 Images</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>10 Videos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold">Premium</h3>
                <p className="text-3xl font-bold mt-2">
                  ₹99<span className="text-base font-normal">/month</span>
                </p>
                <button onClick={handleNextProfileStep} className="mt-4 px-6 py-2 bg-gray-100 rounded-md">
                  Choose Plan
                </button>
                <ul className="mt-6 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>100 Images</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>20 Videos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Customer Contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Feature X</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Feature Y</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Feature Z</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Feature A</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Feature B</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="qlementine-icons:check-tick-12"
                      className="text-xl text-gray-700"
                    />{" "}
                    <span>Feature C</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6 text-center">
              By subscribing, you agree to VendorCo’s Terms &amp; Conditions
            </p>
          </div>
        )}
        {step === 13 && (
          <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-lg mx-auto text-center shadow-sm">
            <img
              src={images.homePage.signUp.paymentSuccessImage}
              alt="Payment Successful"
              className="w-50 mx-auto mb-4"
            />

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900">
              Payment Successful!
            </h2>

            {/* Description */}
            <p className="text-gray-600 mt-2 text-sm">
              Your Subscription plan has been activated.
              <br />
              Please login again to continue.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg"
                onClick={() => navigate("/login")}
              >
                Login Again
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-gray-500 mt-6">
              You can manage your billing preferences in the settings.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignUpPage;
