import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../components/auth/UserContext";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

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
    return <div className="txt p-6">Loading...</div>;
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
            className="mt-4 rounded-xl bg-red-500 p-2 text-white hover:bg-red-700"
          >
            Remove from My List
          </button>
        ) : (
          <button
            onClick={addMovieToUserList}
            className="mt-4 rounded-xl bg-primary p-2 text-white hover:bg-buttonHover"
          >
            Add to My List
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
