import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useUser } from "./UserContext";

const AuthDetails = () => {
  const { user, setUser } = useUser(); // Access user and setUser from context

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null); // Sync with Firebase Auth
    });

    return unsubscribe; // Clean up the listener on component unmount
  }, [setUser]);

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
