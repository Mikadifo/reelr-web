import { useEffect, useState } from "react";
import api from "./../axiosConfig";
import Alert from "@components/Alert";
import PublicMovieDetail from "@components/PublicMovieDetail";
import { useParams } from "react-router-dom";

function PublicMovieDetailPage() {
  const { username } = useParams("username");
  const { id } = useParams("id");
  const [movie, setMovie] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const movieId = +id;

    if (!username || username.includes(" ")) {
      setAlert({
        open: true,
        message: "Username is invalid or not present",
        severity: "error",
      });
      return;
    }

    if (!id || Number.isNaN(movieId)) {
      setAlert({
        open: true,
        message: "Movie id is invalid or not present",
        severity: "error",
      });
      return;
    }

    getMovie(movieId);
  }, [id]);

  async function getMovie() {
    try {
      const res = await api.get(`/movies/${username}/${id}`);

      setMovie(res.data);
    } catch (error) {
      console.log(error);

      setAlert({
        open: true,
        message: "Something went wrong. Try again later.",
        severity: "error",
      });
    }
  }

  if (!movie) {
    return <Alert alert={alert} setAlert={setAlert} />;
  }

  return (
    <>
      <PublicMovieDetail movie={movie} />
      <Alert alert={alert} setAlert={setAlert} />
    </>
  );
}

export default PublicMovieDetailPage;
