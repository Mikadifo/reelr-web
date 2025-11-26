import { useRef } from "react";
import FormMovieDialog from "./FormMovieDialog";
import Add from "@assets/icons/add.svg?react";

function AddMovieButton() {
  const dialogRef = useRef(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 text-center">
        <div
          className="flex border-dashed border-2 border-white-accent w-[120px] h-[170px] rounded-2xl items-center justify-center cursor-pointer
          transition-transform duration-300 ease-out
          hover:scale-105 hover:border-white hover:bg-dark-06"
          onClick={openDialog}
        >
          <Add className="size-12" />
        </div>
        <p className="text-white font-heading text-lg font-bold">Add Movie</p>
      </div>

      <FormMovieDialog dialogRef={dialogRef} />
    </>
  );
}

export default AddMovieButton;
