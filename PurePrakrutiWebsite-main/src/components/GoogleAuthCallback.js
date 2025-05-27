import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { jwtDecode } from "jwt-decode";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(AuthContext); 

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          localStorage.setItem("token", token);
          const decodedUser = jwtDecode(token);
          setUser(decodedUser);
          setIsLoggedIn(true); // ✅ Update isLoggedIn

          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 500);
        } catch (error) {
          console.error("Invalid Google token:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    handleGoogleLogin();
  }, [navigate, setUser, setIsLoggedIn]);

  return ;
};

export default GoogleAuthCallback;



// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import { jwtDecode } from "jwt-decode";

// const GoogleAuthCallback = () => {
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   useEffect(() => {
//     const handleGoogleLogin = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const token = urlParams.get("token");
  
//       if (token) {
//         try {
//           localStorage.setItem("token", token);
//           const decodedUser = jwtDecode(token);
//           setUser(decodedUser);
  
//           // Thoda delay deke navigate karein
//           setTimeout(() => {
//             navigate("/");
//           }, 500);
//         } catch (error) {
//           console.error("Invalid Google token:", error);
//           navigate("/login");
//         }
//       } else {
//         navigate("/login");
//       }
//     };
  
//     handleGoogleLogin();
//   }, [navigate, setUser]);
  

//   return <h2>Authenticating...</h2>;
// };

// export default GoogleAuthCallback;


// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import { jwtDecode } from "jwt-decode";

// const GoogleAuthCallback = () => {
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   useEffect(() => {
//     const handleGoogleLogin = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const token = urlParams.get("token");

//       if (token) {
//         try {
//           // Check if token is valid and store it in localStorage
//           localStorage.setItem("token", token);
          
//           // Decode the token and log it for debugging
//           const decodedUser = jwtDecode(token);
//           console.log("jagdish bhai ye rha tera data", decodedUser);  // Debugging

//           // Ensure setUser updates the state
//           setUser(decodedUser);
          
//           // Navigate to dashboard
//           navigate("/dashboard");
//         } catch (error) {
//           console.error("Invalid Google token:", error);
//           navigate("/login");
//         }
//       } else {
//         navigate("/login");
//       }
//     };

//     handleGoogleLogin();
//   }, [navigate, setUser]);

//   return <h2>Authenticating...</h2>;
// };

// export default GoogleAuthCallback;


// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import { jwtDecode } from "jwt-decode";

// const GoogleAuthCallback = () => {
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   useEffect(() => {
//     const handleGoogleLogin = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const token = urlParams.get("token");

//       if (token) {
//         try {
//           localStorage.setItem("token", token);
//           const decodedUser = jwtDecode(token);
          
//           // Ensure setUser updates correctly
//           setUser(decodedUser);
          
//           navigate("/dashboard"); 
//         } catch (error) {
//           console.error("Invalid Google token:", error);
//           navigate("/login");
//         }
//       } else {
//         navigate("/login");
//       }
//     };

//     handleGoogleLogin();
//   }, [navigate, setUser]);

//   return <h2>Authenticating...</h2>;
// };

// export default GoogleAuthCallback;


// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import { jwtDecode } from "jwt-decode";

// const GoogleAuthCallback = () => {
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   useEffect(() => {
//     const handleGoogleLogin = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const token = urlParams.get("token");

//       if (token) {
//         try {
//           localStorage.setItem("token", token);
//           const user = jwtDecode(token);
//           setUser(user);
//           navigate("/dashboard"); // Redirect to dashboard
//         } catch (error) {
//           console.error("Invalid Google token:", error);
//           alert("Google login failed. Please try again.");
//           navigate("/login");
//         }
//       } else {
//         alert("Google login failed");
//         navigate("/login");
//       }
//     };

//     handleGoogleLogin();
//   }, [navigate, setUser]);

//   return <h2>Authenticating...</h2>;
// };

// export default GoogleAuthCallback;


// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import { jwtDecode } from "jwt-decode";

// const GoogleAuthCallback = () => {
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   useEffect(() => {
//     const handleGoogleLogin = () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const token = urlParams.get("token");

//       if (token) {
//         localStorage.setItem("token", token);
//         const user = jwtDecode(token);
//         setUser(user);
//         navigate("/dashboard"); // Redirect to dashboard
//       } else {
//         alert("Google login failed");
//         navigate("/login");
//       }
//     };

//     handleGoogleLogin();
//   }, [navigate, setUser]);

//   return <h2>Authenticating...</h2>;
// };

// export default GoogleAuthCallback;



// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const GoogleAuthCallback = () => {
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const urlParams = new URLSearchParams(window.location.search);
//         const token = urlParams.get("token");

//         if (token) {
//           localStorage.setItem("token", token);
//           const user = jwtDecode(token); // Decode token
//           setUser(user);
//           navigate("/dashboard"); // Redirect to dashboard
//         } else {
//           alert("Google login failed");
//           navigate("/login"); // Redirect to login page if authentication fails
//         }
//       } catch (error) {
//         console.error("Google login error:", error);
//         navigate("/login");
//       }
//     };

//     fetchUserData();
//   }, [navigate, setUser]);

//   return <h2>Authenticating...</h2>;
// };

// export default GoogleAuthCallback;
