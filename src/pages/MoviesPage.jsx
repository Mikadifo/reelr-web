import { useEffect, useState } from "react";
import Alert from "@components/Alert";
import { moviesSlice } from "@redux/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "@components/MovieList";
import api from "./../axiosConfig";

function MoviesPage() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const movieList = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const { setMovies } = moviesSlice.actions;

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    try {
      const response = await api.get("/movies");

      const { data } = response;

      dispatch(setMovies(data));
    } catch (error) {
      console.error("Something went wrong", error);
      setAlert({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
      dispatch(setMovies([]));
    }
  }

  return (
    <div>
      <MovieList movies={movieList} />
      <Alert alert={alert} setAlert={setAlert} />
    </div>
  );
}

export default MoviesPage;
