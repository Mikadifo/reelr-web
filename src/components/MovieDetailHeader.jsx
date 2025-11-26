import StarFill from "@assets/icons/starFill.svg?react";
import StarOutline from "@assets/icons/starOutline.svg?react";

function MovieDetailHeader({ name, genre, year, rating }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1 text-white">
        <h1 className="font-bold font-heading text-5xl">{name}</h1>
        <h2 className="text-white-accent font-bold text-3xl">
          <span>{genre}</span> - <span>{year}</span>
        </h2>
      </div>

      <div className="flex">
        {new Array(rating ? 5 : 0)
          .fill(null)
          .map((_, index) =>
            index < rating ? (
              <StarFill key={index} className="size-8" />
            ) : (
              <StarOutline key={index} className="size-8" />
            ),
          )}

        {rating === null && (
          <div className="text-white-accent text-base font-bold">
            <span>Not Watched</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailHeader;
