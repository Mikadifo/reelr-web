import Add from "@assets/icons/add.svg?react";
import api from "./../axiosConfig";
import { useEffect, useRef, useState } from "react";

function AddToListInput({ movie, setAlert = () => {}, setMovie }) {
  const [optionsOpen, setOpenOptions] = useState(false);
  const [lists, setLists] = useState([]);
  const optionsRef = useRef(null);

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    const ref = optionsRef.current;

    if (!ref) return;

    const handleOutsideClick = (event) => {
      if (!optionsRef) {
        return;
      }

      if (!ref.contains(event.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [optionsRef]);

  const fetchLists = async () => {
    try {
      const response = await api.get(`/lists/${movie.id}`);

      const { data } = response;

      setLists(data);
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message:
          response.data.error ||
          "Something went wrong fetching available lists",
        severity: "error",
      });

      setLists([]);
    }
  };

  const addToList = async (listId) => {
    const movieBeforeUpdate = movie;
    setMovie({
      ...movie,
      lists: [...movie.lists, lists.filter((list) => list.id === listId)[0]],
    });

    try {
      const response = await api.post(`/lists/${listId}/${movie.id}`);

      const { data } = response;

      setMovie({ ...movie, lists: [...movie.lists, data] });
      setOpenOptions(false);
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message: response.data.error || "Something went wrong. Try again later",
        severity: "error",
      });

      setMovie(movieBeforeUpdate);
    }
  };

  return (
    <div className="flex flex-col relative">
      <button
        className="cursor-pointer text-base px-6 py-2 border-2 border-dark-06 rounded-full flex gap-2 w-fit items-center"
        onClick={() => setOpenOptions(true)}
      >
        <Add className="size-5" />
        Add to list
      </button>

      <div
        ref={optionsRef}
        className="flex flex-col text-white text-base rounded-xl bg-white-accent/6 mt-1 py-2 absolute left-0 top-[44px] w-fit"
        hidden={!optionsOpen}
      >
        {lists.map((list) => (
          <button
            type="button"
            key={list.id}
            className="cursor-pointer hover:opacity-85 hover:bg-dark-accent/30 px-4 py-2 border-b border-b-white/4 text-nowrap text-left"
            onClick={() => addToList(list.id)}
          >
            {list.name}
          </button>
        ))}

        {lists.length === 0 && <span>No lists created yet</span>}
      </div>
    </div>
  );
}

export default AddToListInput;
