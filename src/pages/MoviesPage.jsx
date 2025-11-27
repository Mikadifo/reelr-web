import { useEffect, useState } from "react";
import Alert from "@components/Alert";
import { listsSlice } from "@redux/listsSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "@components/MovieList";
import api from "./../axiosConfig";

function MoviesPage() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const { setLists, addList } = listsSlice.actions;

  useEffect(() => {
    const fetch = async () => {
      await getLists();
      await getUnlistedMovies();
    };

    fetch();
  }, []);

  async function getLists() {
    try {
      const response = await api.get("/lists");

      const { data } = response;

      dispatch(setLists(data));
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message: response.data.error || "Something went wrong fetching lists",
        severity: "error",
      });

      dispatch(setLists([]));
    }
  }

  async function getUnlistedMovies() {
    try {
      const response = await api.get("/movies/unlisted");

      const { data } = response;

      dispatch(
        addList({ id: 0, name: "Not in a list", movies: data, default: true }),
      );
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message:
          response.data.error ||
          "Something went wrong fetching unlisted movies",
        severity: "error",
      });
    }
  }

  return (
    <div>
      {lists.map((list) => (
        <MovieList {...list} isMain={list.default} key={list.id} />
      ))}

      <Alert alert={alert} setAlert={setAlert} />
    </div>
  );
}

export default MoviesPage;
