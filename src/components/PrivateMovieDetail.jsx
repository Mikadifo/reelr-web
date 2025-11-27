import Button from "@components/Button";
import api from "./../axiosConfig";
import Alert from "@components/Alert";
import FormMovieDialog from "./FormMovieDialog";
import Edit from "@assets/icons/edit.svg?react";
import Share from "@assets/icons/share.svg?react";
import Delete from "@assets/icons/delete.svg?react";
import Remove from "@assets/icons/cross.svg?react";
import MovieDetailHeader from "./MovieDetailHeader";
import { useRef, useState } from "react";
import DeleteMovieDialog from "./DeleteMovieDialog";
import SharePrivateMovieDialog from "./SharePrivateMovieDialog";
import AddToListInput from "./AddToListInput";

function PrivateMovieDetail({ movie, setMovie }) {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const formDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);
  const shareDialogRef = useRef(null);

  const handleShare = () => {
    if (movie.public) {
      share();
    } else {
      openShareDialog();
    }
  };

  const share = async () => {
    try {
      const res = await api.get(`/share/${movie.id}`);

      setAlert({
        open: true,
        message: "Share URL copied to clipboard",
        severity: "success",
      });

      navigator.clipboard.writeText(window.location.origin + res.data);
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message: response.data.error || "Something went wrong",
        severity: "error",
      });
    }
  };

  const openShareDialog = () => {
    if (shareDialogRef.current) {
      shareDialogRef.current.showModal();
    }
  };

  const openFormDialog = () => {
    if (formDialogRef.current) {
      formDialogRef.current.showModal();
    }
  };

  const openDeleteDialog = () => {
    if (deleteDialogRef.current) {
      deleteDialogRef.current.showModal();
    }
  };

  const removeFromList = async (listId) => {
    const movieBeforeDeletion = movie;

    setMovie({
      ...movie,
      lists: movie.lists.filter((list) => list.id !== listId),
    });

    try {
      await api.delete(`/lists/${listId}/${movie.id}`);
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message: response.data.error || "Something went wrong",
        severity: "error",
      });

      setMovie(movieBeforeDeletion);
    }
  };

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
          <MovieDetailHeader {...movie} />

          <div className="flex justify-between text-white">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold font-heading text-lg">
                This movie is in
              </h3>
              {movie.lists.map((list) => (
                <span
                  key={list.id}
                  className="text-base px-6 py-2 bg-dark-06 rounded-full flex gap-2.5 w-fit items-center"
                >
                  {list.name}
                  <button
                    className="cursor-pointer"
                    onClick={() => removeFromList(list.id)}
                  >
                    <Remove className="size-[19px]" />
                  </button>
                </span>
              ))}

              {movie.lists.length <= 0 && (
                <span className="text-white-accent text-base">
                  Not in any list yet
                </span>
              )}

              <AddToListInput
                movie={movie}
                setAlert={setAlert}
                setMovie={setMovie}
              />
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
          <Button
            className="bg-cyan! flex gap-2 size-fit text-white"
            onClick={openFormDialog}
          >
            Edit
            <Edit className="size-[22px]" />
          </Button>
          <Button className="flex gap-2 size-fit" onClick={handleShare}>
            Share
            <Share className="size-[22px]" />
          </Button>
          <Button
            className="bg-red! flex gap-2 size-fit text-white"
            onClick={openDeleteDialog}
          >
            Delete
            <Delete className="size-[22px]" />
          </Button>
        </div>
      </div>

      <FormMovieDialog
        dialogRef={formDialogRef}
        {...movie}
        setMovie={setMovie}
        isPublic={movie.public}
      />
      <DeleteMovieDialog dialogRef={deleteDialogRef} {...movie} />
      <SharePrivateMovieDialog
        dialogRef={shareDialogRef}
        movie={movie}
        setMovie={setMovie}
        handleShare={share}
      />

      <Alert alert={alert} setAlert={setAlert} />
    </section>
  );
}

export default PrivateMovieDetail;
