import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import m1 from "../assets/m1.jpeg";
import m2 from "../assets/m2.jpeg";
import m3 from "../assets/m3.jpeg";
import MovieList from "./Movies";

const Home = () => {
  return (
    <div className="w-screen relative">
      <div className="carousel-container">
        <Carousel
          autoPlay
          interval={2000}
          infiniteLoop
          useKeyboardArrows
          className="w-screen"
          showThumbs={false}
          showStatus={false}
        >
          <div className="carousel-item">
            <img src={m1} className="carousel-image" />
            <div className="overlay"></div>
          </div>
          <div className="carousel-item">
            <img src={m2} className="carousel-image" />
            <div className="overlay"></div>
          </div>
          <div className="carousel-item">
            <img src={m3} className="carousel-image" />
            <div className="overlay"></div>
          </div>
        </Carousel>
        <div className="carousel-text text-xl md:text-5xl lg:text-7xl">
          Find your Movies
        </div>
      </div>

      <div className="w-screen mt-2">
        <MovieList />
      </div>
    </div>
  );
};

export default Home;
