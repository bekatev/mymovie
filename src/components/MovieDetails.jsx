import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">Error: {error}</div>;
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
        <p className="text-white">
          <strong>Year:</strong> {movieDetails.Year}
        </p>
        <p className="text-white">
          <strong>Genre:</strong> {movieDetails.Genre}
        </p>
        <p className="text-white">
          <strong>Director:</strong> {movieDetails.Director}
        </p>
        <p className="text-white">
          <strong>Actors:</strong> {movieDetails.Actors}
        </p>
        <p className="text-white">
          <strong>Plot:</strong> {movieDetails.Plot}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
