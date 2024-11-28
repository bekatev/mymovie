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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div role="status" className="flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
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
              className="border p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center justify-between bg-white hover:bg-gray-50"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-72 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {movie.Title}
              </h3>
              <p className="text-gray-600 mb-4">{movie.Year}</p>

              <div className="w-full flex flex-col gap-4">
                <button className="w-full py-2 bg-primary text-white rounded-xl hover:bg-primary-dark focus:ring focus:ring-primary transition-all duration-200">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="block w-full text-center"
                  >
                    View Details
                  </Link>
                </button>

                <button
                  onClick={() => deleteMovie(movie.id)}
                  className="w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 focus:ring focus:ring-red-300 transition-all duration-200"
                >
                  Remove Movie
                </button>
              </div>
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
