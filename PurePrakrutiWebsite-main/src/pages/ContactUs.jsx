import React,{useState} from "react";
import Map from "../resource/Map.png";
import mail from "../resource/mail.png";
import mapPin from "../resource/map-pin.png";
import phoneImg from "../resource/phone.png";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const { firstName, lastName, email,phone, message } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://pureprakruti.com/api/query", 
      {
        fullName:`${firstName} ${lastName}`,
        email,
        phone,
        message,
      });

      if (response.status === 200) {
        console.log("Query submitted successfully!");
        tostershow();
      } else {
        console.error("Failed to submit query.");
      }

      console.log('formdata values',formData);
    } catch (error) {
      console.error("Error submitting query:", error);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const tostershow = () => {
    toast.success('Query Raised successfully!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="min-h-screen">
       <ToastContainer />

    <div className="bg-green-100 pb-3" >
        {/* Contact Us Section */}
      <div className="max-w-4xl mx-auto text-center p-5">
        <h2 className="text-2xl font-bold text-green-800">Contact Us</h2>
        <p className="text-gray-700 mt-2">
          Join the revolution in road logistics by reducing carbon emissions and ensuring compliance with global environmental standards.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md flex flex-wrap md:flex-nowrap mb-6 overflow-hidden">
        {/* ✅ Form Section */}
        <div className="w-full md:w-2/3 pr-2">
          <form className="grid grid-cols-2 gap-4">
          <div>
              <label className="block text-gray-700 font-semibold">First Name*</label>
              <input 
                type="text"
                name="firstName"       
                value={firstName} 
                onChange={handleOnChange} 
                className="w-full border rounded p-2"
                placeholder="First Name" 
                required={true}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Last Name</label>
              <input 
                type="text"
                name="lastName"       
                value={lastName} 
                onChange={handleOnChange} 
                className="w-full border rounded p-2"
                placeholder="Last Name" 
              />           
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email*</label>
              <input 
                type="email"
                name="email"       
                value={email} 
                onChange={handleOnChange} 
                className="w-full border rounded p-2"
                placeholder="example@gmail.com" 
                required={true}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Phone Number</label>
              <input 
                type="text" 
                name="phone"       
                value={phone}
                onChange={handleOnChange} 
                className="w-full border rounded p-2" 
                placeholder="+91" />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold">Query*</label>
              <textarea  
                name="message"       
                value={message}
                onChange={handleOnChange}  
                className="w-full border rounded p-2" 
                placeholder="Enter Query"
                rows="4"
                required={true}
                />  
            </div>

            {/* ✅ Fixed Submit Button */}
            <button 
              className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg mt-2 hover:bg-green-900 w-16"
              onClick={handleOnSubmit}
            >
              Send
            </button>
          </form>
        </div>

        {/* ✅ Fixed Image Section (Size remains fixed) */}
        <div className="w-full md:w-1/3 mt-10 md:mt-0 bg-black bg-opacity-10 h-[240px] flex-shrink-0 flex-grow-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28911.023034541106!2d77.22371!3d28.6333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd7fc38a8187%3A0x7abb73aa8c418882!2sParivahan%20Vings%20(KAL)%20Private%20Limited!5e0!3m2!1sen!2sin!4v1690137192828!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            title="Transport Wings (Cal) Pvt. Ltd. Set"
            className="h-full"
          ></iframe>
        </div>
      </div>
      
    </div>
     
    <div className="pb-5"> 
    {/* Contact Info Section */}
        <div className="text-center mt-10 ">
          <h3 className="text-xl font-bold text-green-800">Reach out to us at</h3>
        </div>
        <div className="max-w-lg mx-auto bg-green-200 p-6 mt-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2 text-gray-800">
            <img src={mail} alt="mail" className="h-full max-h-4 w-auto" />
             <span>siddharth@tsil.net.in</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <img src={mail} alt="mail" className="h-full max-h-4 w-auto" />
            <span>team@tsil.net.in</span>
          </div>
          <div className="flex items-start gap-2 text-gray-800">
          <img src={mapPin} alt="mapPin" className="h-full max-h-4 w-auto" />
             <span>Corporate Office: 609, Tower II, Pearls Omaxe, Netaji Subhash Place, Pitampura, New Delhi - 110034. Delhi, INDIA.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <img src={phoneImg} alt="phone" className="h-full max-h-4 w-auto" />
            <span>+91-96618 29944</span>
          </div>
        </div>
    </div>
     
    </div>
  );
};