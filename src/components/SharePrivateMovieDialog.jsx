import { useEffect, useState } from "react";
import Button from "@components/Button";
import Alert from "@components/Alert";
import Close from "@assets/icons/cross.svg?react";
import api from "./../axiosConfig";

function SharePrivateMovieDialog({
  dialogRef,
  open = false,
  movie,
  setMovie,
  handleShare,
}) {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleOutsideClick = (event) => {
      if (!dialogRef) {
        return;
      }

      if (event.target === dialogRef.current) {
        dialogRef?.current?.close();
      }
    };

    dialog.addEventListener("mousedown", handleOutsideClick);

    return () => dialog.removeEventListener("mousedown", handleOutsideClick);
  }, [dialogRef]);

  async function updateMovie() {
    try {
      const { id, lists, ...updateBody } = movie;
      const res = await api.put(`/movies/${movie.id}`, {
        ...updateBody,
        public: true,
      });

      setAlert({
        open: true,
        message: "Movie Visibility updated",
        severity: "success",
      });

      setMovie(res.data);
      handleClose();
      handleShare();
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message: response.data.error || "Something went wrong",
        severity: "error",
      });
    }
  }

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      open={open}
      className="bg-dark-06 rounded-2xl fixed top-1/2 left-1/2 -translate-1/2 z-20 backdrop:backdrop-brightness-50 backdrop:backdrop-blur-md text-center"
    >
      <div className="text-white rounded-2xl bg-dark-06 w-[556px] p-16 relative">
        <button
          type="button"
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handleClose}
        >
          <Close className="size-8" />
        </button>

        <h3 className="font-heading font-bold text-2xl mb-8">
          Share {movie.name}
        </h3>
        <p className="font-body text-lg mb-12">
          This will change the movie&apos;s visibility to <b>public</b>
        </p>
        <div className="flex gap-4">
          <Button className="bg-cyan! w-full text-white" onClick={updateMovie}>
            Update & Share
          </Button>
          <Button className="w-full" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>

      <Alert alert={alert} setAlert={setAlert} />
    </dialog>
  );
}

export default SharePrivateMovieDialog;
