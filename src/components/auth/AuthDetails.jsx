import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useUser } from "./UserContext";

const AuthDetails = () => {
  const [user, createUser] = useState(null);
  const { setUser } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return unsubscribe;
  }, [setUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      createUser(currentUser || null);
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Successfully signed out");
    } catch (error) {
      console.error("Sign out failed: ", error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="w-screen mt-16">
          <p className="text-red-500 text-lg md:text-xl lg:text-2xl py-4">{`Welcome, ${user.email}`}</p>
          <button
            onClick={handleSignOut}
            className="rounded-xl bg-primary p-4 hover:bg-buttonHover"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-red-500 text-lg md:text-xl lg:text-2xl py-4 mt-16 w-screen text-white">
          You are not logged in.
        </p>
      )}
    </div>
  );
};

export default AuthDetails;
