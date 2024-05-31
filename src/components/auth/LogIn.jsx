import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("Login Successful:", credentials);
      navigate("/authDetails");
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("User does not exist or incorrect password.");
    }
  };

  return (
    <div className="w-screen">
      <form onSubmit={handleLogin}>
        <h1 className="text-xl md:text-3xl lg:text-5xl pb-4 mt-16 txt">
          Login
        </h1>

        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
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
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block ps-10 p-2.5 w-64 sm:w-96"
            />
          </div>
        </div>

        <div className="flex justify-center items-center mb-6">
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-64 sm:w-96"
            placeholder="•••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-primary p-4 hover:bg-buttonHover"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
