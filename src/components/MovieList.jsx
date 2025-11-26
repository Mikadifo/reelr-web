import AddMovieButton from "./AddMovieButton";
import MovieCard from "./MovieCard";
import Arrow from "@assets/icons/arrow.svg?react";

function MovieList({ movies }) {
  return (
    <div className="flex flex-col gap-16 mt-6">
      <div className="flex justify-between items-center text-white font-heading font-bold text-2xl">
        <button
          className="cursor-pointer flex gap-4 items-center"
          type="button"
        >
          <Arrow className="size-5 rotate-90" />
          <h1>Your Movies</h1>
        </button>
      </div>

      <div className="flex flex-wrap gap-9">
        <AddMovieButton />

        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}
export default MovieList;
