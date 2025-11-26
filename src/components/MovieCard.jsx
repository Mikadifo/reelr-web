import StarFill from "@assets/icons/starFill.svg?react";
import StarOutline from "@assets/icons/starOutline.svg?react";

function MovieCard({ id, name, rating, img }) {
  return (
    <div className="flex flex-col gap-2">
      <a
        href={`movies/${id}`}
        className="transition-transform duration-300 ease-out transform hover:scale-105"
      >
        <img
          src={img}
          alt={`${name} poster`}
          loading="lazy"
          className="w-[120px] h-[170px] object-cover rounded-2xl"
        />
      </a>
      <p className="text-white font-heading text-lg font-bold truncate w-[120px]">
        {name}
      </p>
      <div className="flex flex-nowrap">
        {new Array(rating ? 5 : 0)
          .fill(null)
          .map((_, index) =>
            index < rating ? (
              <StarFill key={index} className="size-4" />
            ) : (
              <StarOutline key={index} className="size-4" />
            ),
          )}

        {rating === null && (
          <div className="text-white-accent font-body text-sm">
            <span>Not Watched</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
