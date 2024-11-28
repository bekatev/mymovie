import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Reset errors

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (userPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      console.log("Registration Successful:", userCredentials);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Registration Failed:", error);
      // Provide user-friendly error messages
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email is already in use. Please log in.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email format.");
      } else {
        setErrorMessage("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleRegistration}
        className="bg-white p-6 shadow-md rounded-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Register New Account
        </h1>
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            aria-label="Email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-lg text-gray-900"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            aria-label="Password"
            placeholder="••••••••"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-lg text-gray-900"
            required
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
