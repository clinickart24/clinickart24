import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../../../components/layout/NavBar/HeaderNav";
import images from "../../../lib/exportImages";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";



const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      // Login with Supabase
      await login(formData);

      // Navigation is handled in AuthContext after successful login
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address first");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-4 h-screen">
      <HeaderNav />
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center h-[calc(100vh-60px)]">
        <div className="w-full bg-white p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-100 p-4">
            <div className="flex flex-col justify-center w-full md:w-[80%] mx-auto">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-black mb-4">
                Sign in to your vendor account
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-2 bg-[#C53958] text-white rounded-md hover:bg-[#C53958]/80 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full text-sm text-[#C53958] hover:underline mb-3"
              >
                Forgot Password?
              </button>

              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <button
                  onClick={() => navigate("/sign-up")}
                  className="text-[#C53958] hover:underline font-medium"
                >
                  Sign Up
                </button>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="w-full px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mt-4"
              >
                Back
              </button>
            </div>
            <div className="hidden md:block rounded-lg">
              <img
                src={images.homePage.about}
                alt="Business features illustration"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
