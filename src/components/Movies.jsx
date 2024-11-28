import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../components/auth/UserContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useUser();

  const addMovieToUserList = async (movie) => {
    if (!user) {
      alert("You must be logged in to add movies to your list.");
      return;
    }
    try {
      const movieRef = doc(db, `users/${user.uid}/movieList/${movie.imdbID}`);
      await setDoc(movieRef, movie);
      alert("Movie added to your list!");
    } catch (error) {
      console.error("Error adding movie to list: ", error);
      alert("Failed to add movie to list.");
    }
  };

  const fetchMovies = async (query, page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=aa773180&s=${encodeURIComponent(
          query
        )}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
      setHasMore(data.Search.length > 0);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    setMovies([]);
    setCurrentPage(1);
    fetchMovies(searchQuery, 1);
  };
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(searchQuery, nextPage);
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
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <form className="py-4 mt-4 w-full max-w-lg md:px-0 px-4">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:txt">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
              inputMode="search"
              style={{ fontSize: "16px" }}
              required
            />
            <button
              type="button"
              onClick={handleSearch}
              className="text-txt absolute end-2.5 bottom-2.5 bg-primary hover:bg-buttonHover font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 px-16">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            className="no-underline"
          >
            <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center h-full">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="rounded w-1/2 mb-4"
              />
              <h3 className="text-lg md:text-xs lg:text-xs xl:text-base font-bold text-center truncate">
                {movie.Title}
              </h3>
              <p className="text-sm text-gray-600 text-center">{movie.Year}</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addMovieToUserList(movie);
              }}
              className="rounded-b-xl bg-primary p-2 hover:bg-buttonHover w-full text-txt"
            >
              Add to My List
            </button>
          </Link>
        ))}
      </div>

      {hasMore && movies.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="bg-primary mt-20 mb-12 px-4 py-2 rounded-xl mx-auto block"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default MovieList;
