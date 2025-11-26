import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import movieSchema from "@schemas/movie.schema";
import Input from "@components/Input";
import Button from "@components/Button";
import Alert from "@components/Alert";
import Close from "@assets/icons/cross.svg?react";
import VisibilitySwitch from "./VisibilitySwitch";
import RatingInput from "./RatingInput";
import api from "./../axiosConfig";
import { moviesSlice } from "@redux/moviesSlice";
import { useDispatch } from "react-redux";

function ConfirmationDialog({ dialogRef, open = false }) {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();
  const { addMovie: newMovie } = moviesSlice.actions;

  const handleSubmit = async (values, { resetForm }) => {
    await addMovie(values, resetForm);
  };

  async function addMovie(movie, resetForm) {
    try {
      const res = await api.post("/movies", movie);

      setAlert({
        open: true,
        message: "Successfully created movie",
        severity: "success",
      });

      dispatch(newMovie(res.data));
      handleClose(resetForm);
    } catch (error) {
      console.log(error);
      setAlert({
        open: true,
        message: "Something went wrong trying to create movie",
        severity: "error",
      });
    }
  }

  const handleClose = (resetForm) => {
    if (dialogRef.current) {
      resetForm();
      dialogRef.current.close();
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        open={open}
        className="bg-dark-06 rounded-2xl absolute top-1/2 left-1/2 -translate-1/2 z-20 backdrop:backdrop-brightness-50 backdrop:backdrop-blur-md"
      >
        <Formik
          initialValues={{
            name: "",
            genre: "",
            img: "",
            year: 1800,
            public: false,
            rating: null,
          }}
          validationSchema={movieSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, resetForm }) => {
            useEffect(() => {
              const dialog = dialogRef.current;

              if (!dialog) return;

              const handleOutsideClick = (event) => {
                if (!dialogRef) {
                  return;
                }

                if (event.target === dialogRef.current) {
                  resetForm();
                  dialogRef?.current?.close();
                }
              };

              dialog.addEventListener("mousedown", handleOutsideClick);

              return () =>
                dialog.removeEventListener("mousedown", handleOutsideClick);
            }, [dialogRef]);

            return (
              <Form className="text-white rounded-2xl bg-dark-06 w-fit p-16 relative">
                <button
                  type="button"
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={() => handleClose(resetForm)}
                >
                  <Close className="size-8" />
                </button>

                <h1 className="font-heading font-bold text-center text-2xl mb-10">
                  Create Movie
                </h1>

                <div className="flex flex-col gap-6">
                  <Input
                    label="Title:"
                    type="text"
                    name="name"
                    placeholder="Inception"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    required
                  />
                  <Input
                    label="Genre:"
                    type="text"
                    name="genre"
                    placeholder="Science Fiction"
                    error={touched.genre && Boolean(errors.genre)}
                    helperText={touched.genre && errors.genre}
                    required
                  />
                  <Input
                    label="Image:"
                    type="text"
                    name="img"
                    placeholder="https://example.com/image.png"
                    error={touched.img && Boolean(errors.img)}
                    helperText={touched.img && errors.img}
                    required
                  />

                  <div className="flex gap-6">
                    <Input
                      label="Release Year:"
                      type="number"
                      name="year"
                      placeholder="2010"
                      error={touched.year && Boolean(errors.year)}
                      helperText={touched.year && errors.year}
                      min={1800}
                      max={new Date().getFullYear()}
                      required
                    />
                    <VisibilitySwitch
                      name="public"
                      type="checkbox"
                      error={touched.public && Boolean(errors.public)}
                      helperText={touched.public && errors.public}
                    />
                  </div>

                  <RatingInput
                    name="rating"
                    error={touched.rating && Boolean(errors.rating)}
                    helperText={touched.rating && errors.rating}
                  />
                </div>

                <Button type="submit" className="w-full bg-green! mt-12">
                  Add Movie
                </Button>
              </Form>
            );
          }}
        </Formik>
      </dialog>
      <Alert alert={alert} setAlert={setAlert} />
    </>
  );
}

export default ConfirmationDialog;
