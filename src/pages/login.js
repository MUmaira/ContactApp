import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const { email, password } = state;

  const navigate = useNavigate();

  // Reset form state when component unmounts
  useEffect(() => {
    return () => {
      setState({ ...initialState });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide values for all fields.");
    } else {
      // Check if the email exists in Firebase using child()
      fireDb
        .child("users")
        .orderByChild("email")
        .equalTo(email)
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            // Email exists, now check the password
            const userData = snapshot.val();
            const userKey = Object.keys(userData)[0]; // Get the user key from snapshot
            const userPassword = userData[userKey].password;

            if (userPassword === password) {
              toast.success("Logged in successfully!");
              setState({ ...initialState }); // Reset form after success
              setTimeout(() => navigate("/"), 500); // Navigate to home
            } else {
              toast.error("Incorrect password. Please try again.");
            }
          } else {
            toast.error("Email does not exist. Please sign up.");
          }
        })
        .catch((err) => {
          toast.error("Error checking email: " + err.message);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your Password"
          value={password}
          onChange={handleInputChange}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
