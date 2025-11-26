import StarFill from "@assets/icons/starFill.svg?react";
import StarOutline from "@assets/icons/starOutline.svg?react";

function MovieCard({ name, rating, img }) {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={img}
        alt={`${name} poster`}
        className="w-[120px] h-[170px] object-cover rounded-2xl cursor-pointer transition-transform duration-300 ease-out
    transform hover:scale-105"
      />
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
          <div className="flex gap-1 text-white-accent font-body items-center text-sm">
            <span>Not Watched</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
