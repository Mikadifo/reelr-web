import Button from "@components/Button";
import Arrow from "@assets/icons/arrow.svg?react";

function HomePage() {
  return (
    <section className="text-center max-w-[519px] mx-auto mt-52 relative z-10">
      <div className="bg-cyan absolute size-[400px] rounded-full -z-10 blur-2xl opacity-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <h1 className="text-cyan font-bold font-heading text-4xl mb-4">
        Track, Rate & Share Your Movie Journey
      </h1>
      <p className="font-body text-2xl text-white-accent mb-11">
        Keep all your favorite films in one place. Create watchlists, rate
        movies, and share your cinematic taste with friends.
      </p>

      <Button
        className="bg-linear-to-r from-cyan to-red text-white flex w-fit mx-auto gap-2.5 items-center"
        link
        to="/movies"
      >
        Get Started
        <Arrow className="h-full" />
      </Button>
    </section>
  );
}

export default HomePage;
