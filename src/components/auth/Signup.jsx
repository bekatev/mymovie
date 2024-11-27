import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    if (userPassword.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      console.log("Registration Successful:", userCredentials);
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Registration Failed:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-screen">
      <form onSubmit={handleRegistration} className="pt-16">
        <h1 className="text-xl md:text-3xl lg:text-5xl pb-4 txt">
          Register New Account
        </h1>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <div className="flex justify-center mb-6 w-full">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Enter email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block ps-10 p-2.5 w-64 sm:w-96"
            />
          </div>
        </div>

        <div className="flex justify-center items-center mb-6">
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-64 sm:w-96"
            placeholder="•••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-primary p-4 hover:bg-buttonHover"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
