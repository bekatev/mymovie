import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../components/auth/UserContext";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInUserList, setIsInUserList] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=aa773180&i=${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovieDetails(data);

        if (user) {
          const docRef = doc(db, `users/${user.uid}/movieList`, id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setIsInUserList(true);
          }
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchMovieDetails();
  }, [id, user]);

  const addMovieToUserList = async () => {
    if (!user) {
      alert("You must be logged in to add movies to your list.");
      return;
    }
    try {
      const movieRef = doc(
        db,
        `users/${user.uid}/movieList/${movieDetails.imdbID}`
      );
      await setDoc(movieRef, movieDetails);
      setIsInUserList(true);
      alert("Movie added to your list!");
    } catch (error) {
      console.error("Error adding movie to list: ", error);
      alert("Failed to add movie to list.");
    }
  };

  const removeMovieFromUserList = async () => {
    if (!user) {
      alert("You must be logged in to remove movies from your list.");
      return;
    }
    try {
      await deleteDoc(doc(db, `users/${user.uid}/movieList`, id));
      setIsInUserList(false);
      alert("Movie removed from your list!");
    } catch (err) {
      console.error("Error removing movie: ", err);
      alert("Failed to remove movie from list.");
    }
  };

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
    return <div className="txt">Error: {error}</div>;
  }

  return (
    <div className="w-screen grid grid-cols-1 md:grid-cols-2">
      <div className="p-6">
        <img
          src={movieDetails.Poster}
          alt={`Poster of ${movieDetails.Title}`}
          className="w-3/4 mx-auto"
        />
      </div>
      <div className="text-left md:p-16 p-5 mx-auto">
        <h2 className="font-bold text-lg md:text-xl lg:text-3xl py-6">
          {movieDetails.Title}
        </h2>
        <p className="txt">
          <strong>Year:</strong> {movieDetails.Year}
        </p>
        <p className="txt">
          <strong>Genre:</strong> {movieDetails.Genre}
        </p>
        <p className="txt">
          <strong>Director:</strong> {movieDetails.Director}
        </p>
        <p className="txt">
          <strong>Actors:</strong> {movieDetails.Actors}
        </p>
        <p className="txt">
          <strong>Plot:</strong> {movieDetails.Plot}
        </p>
        {isInUserList ? (
          <button
            onClick={removeMovieFromUserList}
            className="mt-4 rounded-xl bg-red-500 p-4 text-white hover:bg-red-700"
          >
            Remove from My List
          </button>
        ) : (
          <button
            onClick={addMovieToUserList}
            className="mt-4 rounded-xl bg-green-500 p-4 text-white hover:bg-green-600"
          >
            Add to My List
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
