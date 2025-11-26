import MovieDetailHeader from "./MovieDetailHeader";

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

      <div className="w-full max-w-2xl my-auto">
        <MovieDetailHeader {...movie} />
      </div>
    </section>
  );
}

export default PrivateMovieDetail;
