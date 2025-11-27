import { useState } from "react";
import AddMovieButton from "./AddMovieButton";
import MovieCard from "./MovieCard";
import Arrow from "@assets/icons/arrow.svg?react";
import Menu from "@assets/icons/menu.svg?react";

function MovieList({ movies, name, unlisted = false }) {
  const [sectionHidden, hideSection] = useState(false);

  return (
    <div className="flex flex-col gap-10 mt-6 mb-12">
      <div className="flex justify-between items-center text-white font-heading font-bold text-2xl">
        <button
          className="cursor-pointer flex gap-4 items-center"
          type="button"
          onClick={() => hideSection(!sectionHidden)}
        >
          <Arrow
            className={`size-5 ${sectionHidden ? "-rotate-90" : "rotate-90"}`}
          />
          <h1>{name}</h1>
        </button>

        {!unlisted && (
          <button type="button" className="cursor-pointer">
            <Menu className={"size-7"} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-9" hidden={sectionHidden}>
        <AddMovieButton />

        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}
export default MovieList;
