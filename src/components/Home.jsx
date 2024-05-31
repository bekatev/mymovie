import MovieList from "./Movies";
import mainImage from "../assets/fh.png";

const Home = () => {
  return (
    <div className="w-screen min-h-screen txt">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row items-start lg:items-start">
        <div className="w-full lg:w-1/2 flex flex-col items-left lg:items-start order-2 lg:order-1 text-left">
          <div className="md:pt-24 pt-4 md:pl-0 pl-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to MovieList</h1>
            <p className="mb-2">
              Discover and keep track of your favorite movies with ease.
            </p>
            <p className="mb-2">
              Search for movies and add them to your personalized list.
            </p>
            <p className="mb-2">Stay up to date with the latest releases.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2 p-4">
          <img
            src={mainImage}
            alt="Description of your image"
            className="w-full lg:w-auto lg:max-w-3xl"
          />
        </div>
      </div>
      <MovieList />
    </div>
  );
};

export default Home;
