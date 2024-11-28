import "./App.css";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/Signup";
import Navbar from "./components/Navbar";
import AuthDetails from "./components/auth/AuthDetails";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/auth/UserContext";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <BrowserRouter basename="/mymovie">
        <div>
          <Navbar />
          <Routes>
            {/* Redirect root (/) to /home */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/authDetails" element={<AuthDetails />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
