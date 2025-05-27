import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import forest from "../resource/forest.png";
import { AuthContext } from "./../AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ mobileNumber: "", pin: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const { login, googleLogin } = useContext(AuthContext);
  
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");
  
  //   try {
  //     const response = await axios.post("https://pureprakruti.com/api/auth/login", formData);
  
  //     if (response.data.status === "success") {
  //       const { userId, userName, mobileNumber } = response.data.data; // Extract data correctly
  
  //       // Store data in cookies (expires in 1 day)
  //       document.cookie = `userId=${userId}; path=/; max-age=86400`;
  //       document.cookie = `userName=${userName}; path=/; max-age=86400`;
  //       document.cookie = `mobileNumber=${mobileNumber}; path=/; max-age=86400`;
  
  //       // alert("Login Successful!");
  //       navigate("/"); // Navigate to the home page
  //       window.location.reload();
  //     } else {
  //       setError("Invalid credentials, please try again.");
  //     }
  //   } catch (err) {
  //     setError("Invalid credentials, please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

    const handleSubmit = (e) => {
      e.preventDefault();
      login(formData);
    };
  

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white rounded-lg shadow-lg flex w-[700px] overflow-hidden">
        
        {/* Left Side: Image */}
        <div className="w-1/2 m-4">
          <img src={forest} alt="Eco-Friendly Login" className="w-full h-full object-cover" />
        </div>

        {/* Right Side: Form */}
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Login</h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <label className="text-gray-600 text-sm">Phone Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-3 py-2 border rounded-md mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <label className="text-gray-600 text-sm">PIN</label>
          <input
            type="password"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            placeholder="PIN"
            className="w-full px-3 py-2 border rounded-md mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={handleSubmit}
            className={`w-full text-white py-2 rounded-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
            } transition`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* <button onClick={googleLogin} className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md mt-3 hover:bg-blue-700 transition">
            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
            Sign Up with Google
          </button> */}
        </div>
      </div>
    </div>
  );
}
