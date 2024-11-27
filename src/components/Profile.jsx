import { useState, useEffect } from "react";
import { useUser } from "../components/auth/UserContext";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";

const Profile = () => {
  const [userMovies, setUserMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const deleteMovie = async (movieId) => {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/movieList`, movieId));
      setUserMovies(userMovies.filter((movie) => movie.id !== movieId));
    } catch (err) {
      console.error("Error removing movie: ", err);
      setError("Error removing movie: " + err.message);
    }
  };

  useEffect(() => {
    const fetchUserMovies = async () => {
      if (!user) {
        setError("You must be logged in to view this page.");
        return;
      }

      setIsLoading(true);
      try {
        const q = query(collection(db, `users/${user.uid}/movieList`));
        const querySnapshot = await getDocs(q);
        const movies = [];
        querySnapshot.forEach((doc) => {
          movies.push({ id: doc.id, ...doc.data() });
        });
        setUserMovies(movies);
      } catch (err) {
        setError("Error fetching movies: " + err.message);
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchUserMovies();
  }, [user]);

  if (!user) {
    return (
      <div className="w-screen p-4 text-xl md:text-3xl lg:text-5xl py-4">
        You need to be logged in to view this page.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="w-screen"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen p-4 text-xl md:text-3xl lg:text-5xl py-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-screen p-4">
      <h2 className="text-xl md:text-3xl lg:text-5xl py-4">Your Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 px-16">
        {userMovies.length > 0 ? (
          userMovies.map((movie) => (
            <div
              key={movie.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center h-full justify-between"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-poster"
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button className="rounded-xl bg-primary p-4 hover:bg-buttonHover">
                <Link to={`/movie/${movie.id}`}>View Details</Link>
              </button>
              <button
                onClick={() => deleteMovie(movie.id)}
                className="mt-2 rounded-xl bg-red-500 p-2 txt hover:bg-red-700"
              >
                Remove Movie
              </button>
            </div>
          ))
        ) : (
          <p className="py-4">No movies added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
