import Button from "@components/Button";
import Edit from "@assets/icons/edit.svg?react";
import Share from "@assets/icons/share.svg?react";
import Delete from "@assets/icons/delete.svg?react";
import Add from "@assets/icons/add.svg?react";
import Remove from "@assets/icons/cross.svg?react";
import StarFill from "@assets/icons/starFill.svg?react";
import StarOutline from "@assets/icons/starOutline.svg?react";

function PrivateMovieDetail({ movie }) {
  return (
    <section className="flex gap-16 font-body justify-center mt-24">
      <img
        src={movie.img}
        alt={`${movie.name} poster`}
        className="rounded-2xl object-cover"
        loading="lazy"
        width={400}
      />

      <div className="flex flex-col justify-between w-full max-w-2xl">
        <div className="flex gap-16 flex-col">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1 text-white">
              <h1 className="font-bold font-heading text-5xl">{movie.name}</h1>
              <h2 className="text-white-accent font-bold text-3xl">
                <span>{movie.genre}</span> - <span>{movie.year}</span>
              </h2>
            </div>

            <div className="flex">
              {new Array(movie.rating ? 5 : 0)
                .fill(null)
                .map((_, index) =>
                  index < movie.rating ? (
                    <StarFill key={index} className="size-8" />
                  ) : (
                    <StarOutline key={index} className="size-8" />
                  ),
                )}

              {movie.rating === null && (
                <div className="text-white-accent text-base font-bold">
                  <span>Not Watched</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between text-white">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold font-heading text-lg">
                This movie is in
              </h3>
              {movie.lists.map((list) => (
                <span className="text-base px-6 py-2 bg-dark-06 rounded-full flex gap-2.5 w-fit items-center">
                  {list.name}
                  <button>
                    <Remove className="size-[19px]" />
                  </button>
                </span>
              ))}

              {movie.lists.length <= 0 && (
                <span className="text-white-accent text-base">
                  Not in any list yet
                </span>
              )}

              <button className="cursor-pointer text-base px-6 py-2 border-2 border-dark-06 rounded-full flex gap-2 w-fit items-center">
                <Add className="size-5" />
                Add to list
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold font-heading text-lg">Visibility</h3>
              <span className="text-base px-6 py-2 bg-dark-06 rounded-full w-fit">
                {movie.public ? "Public" : "Private"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="bg-cyan! flex gap-2 size-fit text-white">
            Edit
            <Edit className="size-[22px]" />
          </Button>
          <Button className="flex gap-2 size-fit">
            Share
            <Share className="size-[22px]" />
          </Button>
          <Button className="bg-red! flex gap-2 size-fit text-white">
            Delete
            <Delete className="size-[22px]" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PrivateMovieDetail;
