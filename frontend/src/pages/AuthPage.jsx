import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/hac-assets/Mobile-login.jpg'

const AuthPage = ({ isSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? "/api/signup" : "/api/login";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600">
        <div className="p-10 bg-white shadow-2xl rounded-2xl w-96 border border-gray-300">
          <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-8">
            {isSignup ? "Create an Account" : "Welcome Back"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-500"
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-500"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-500"
              onChange={handleChange}
              required
            />
            <button className="w-full p-4 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-700 transition duration-300 shadow-md">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
          <p className="text-center mt-6 text-gray-800 text-lg">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-orange-700 cursor-pointer font-semibold hover:underline"
              onClick={() => navigate(isSignup ? "/login" : "/signup")}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
