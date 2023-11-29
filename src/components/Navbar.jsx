import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useUser } from "../components/auth/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-primary flex justify-between items-center p-4 w-screen">
      <Link to="/home">
        <img src={Logo} className="w-12" />
      </Link>

      <nav>
        <div className="md:hidden" onClick={toggleMenu}>
          <button className="flex flex-col space-y-2" onClick={toggleMenu}>
            <div
              className={`h-1 w-6 bg-black transform transition duration-500 ease-in-out ${
                isOpen ? "rotate-45 translate-y-3 translate-x-8" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-black transition duration-500 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-black transform transition duration-500 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-3 translate-x-8" : ""
              }`}
            ></div>
          </button>
        </div>
        <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
          {user ? (
            <div className="flex">
              <Link
                to="/home"
                className="block px-4 py-2 text-sm font-bold text-black"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm font-bold text-black"
              >
                Profile
              </Link>
              <button
                className="block px-4 py-2 text-sm font-bold text-black"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex">
              <Link
                to="/home"
                className="block px-4 py-2 text-sm font-bold text-black"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm font-bold text-black"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm font-bold text-black"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
