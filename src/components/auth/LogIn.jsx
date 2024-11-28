import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../auth/UserContext"; // Import useUser

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUser(); // Get setUser from UserContext
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Reset any previous errors

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const loggedInUser = userCredentials.user;
      console.log("Login Successful:", loggedInUser);

      setUser(loggedInUser); // Update the user context
      navigate("/home"); // Navigate to home after successful login
    } catch (error) {
      console.error("Login Failed:", error);
      // Provide user-friendly error messages
      if (error.code === "auth/user-not-found") {
        setErrorMessage("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password.");
      } else {
        setErrorMessage("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow-md rounded-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">Log In</h1>
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
            placeholder="••••••••"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-lg text-gray-900"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
        >
          Log In
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
