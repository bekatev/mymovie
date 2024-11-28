import { createContext, useState, useContext, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"; // Make sure the correct firebase config is imported
import PropTypes from "prop-types";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for auth state changes to track if the user is logged in after a page reload
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // If a user is logged in, it will update the state
    });

    // Cleanup the subscription when component unmounts
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      setUser(null); // Set user state to null after logout
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}{" "}
      {/* All children components will have access to this context */}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure that children are passed as prop
};
