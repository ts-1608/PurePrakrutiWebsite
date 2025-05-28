import React, { useState ,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import forest from "../resource/forest.png";
import google from "../resource/google.png";
import { AuthContext } from "./../AuthContext";


export default function Signup() {
  const { signup, googleLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber: "",
    pin: "",
    confirmPin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirection

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate phone number (Indian format - 10 digits)
  const isValidPhoneNumber = (number) => {
    return /^[6-9]\d{9}$/.test(number);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Submitting signup form:", formData); 
    await signup(formData);
  };

  // Handle signup
  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   // Validate inputs
  //   if (!formData.userName || !formData.mobileNumber || !formData.pin || !formData.confirmPin) {
  //     setError("All fields are required.");
  //     return;
  //   }
  //   if (!isValidPhoneNumber(formData.mobileNumber)) {
  //     setError("Enter a valid 10-digit phone number.");
  //     return;
  //   }
  //   if (formData.pin.length < 4) {
  //     setError("PIN must be at least 4 digits.");
  //     return;
  //   }
  //   if (formData.pin !== formData.confirmPin) {
  //     setError("PIN and Confirm PIN must match.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await axios.post("https://pureprakruti.com/api/auth/signup", {
  //       userName: formData.userName,
  //       mobileNumber: formData.mobileNumber,
  //       pin: formData.pin,
  //     });
  //     // alert("Signup Successful! Redirecting to login...");
  //     navigate("/login"); 
  //   } catch (err) {
  //     setError("Signup failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white rounded-lg shadow-lg flex w-[700px] overflow-hidden">
        
        {/* Left Side: Image */}
        <div className="w-1/2 m-4">
          <img src={forest} alt="Eco-Friendly Signup" className="w-full h-full object-cover" />
        </div>

        {/* Right Side: Form */}
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Sign Up</h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <label className="text-gray-600 text-sm">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <label className="text-gray-600 text-sm">Phone Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className="w-full px-3 py-2 border rounded-md mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <label className="text-gray-600 text-sm">PIN</label>
          <input
            type="password"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            placeholder="Create a secure PIN"
            className="w-full px-3 py-2 border rounded-md mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <label className="text-gray-600 text-sm">Confirm PIN</label>
          <input
            type="password"
            name="confirmPin"
            value={formData.confirmPin}
            onChange={handleChange}
            placeholder="Re-enter your PIN"
            className="w-full px-3 py-2 border rounded-md mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={handleSignup}
            className={`w-full text-white py-2 rounded-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
            } transition`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
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