import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import listSchema from "@schemas/list.schema";
import Input from "@components/Input";
import Button from "@components/Button";
import Alert from "@components/Alert";
import Close from "@assets/icons/cross.svg?react";
import api from "./../axiosConfig";
import { listsSlice } from "@redux/listsSlice";
import { useDispatch } from "react-redux";

function FormListDialog({ dialogRef, open = false, id = null, name = "" }) {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();
  const { addList: newList, updateList } = listsSlice.actions;

  const handleSubmit = async (values, { resetForm }) => {
    await addList(values, resetForm);
  };

  async function addList(listName, resetForm) {
    try {
      let res;

      if (id) {
        res = await api.put(`/lists/${id}`, listName);
      } else {
        res = await api.post("/lists", listName);
      }

      setAlert({
        open: true,
        message: `Successfully ${id ? "updated" : "created"} list`,
        severity: "success",
      });

      if (id) {
        dispatch(updateList(res.data));
      } else {
        dispatch(newList(res.data));
      }

      handleClose(resetForm);
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message: response.data.error || "Something went wrong",
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
    <dialog
      ref={dialogRef}
      open={open}
      className="bg-dark-06 rounded-2xl fixed top-1/2 left-1/2 -translate-1/2 z-20 backdrop:backdrop-brightness-50 backdrop:backdrop-blur-md"
    >
      <Formik
        initialValues={{
          name,
        }}
        validationSchema={listSchema}
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
            <Form className="text-white rounded-2xl bg-dark-06 w-fit p-16 relative overflow-hidden">
              <button
                type="button"
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => handleClose(resetForm)}
              >
                <Close className="size-8" />
              </button>

              <h1 className="font-heading font-bold text-center text-2xl mb-10">
                Create List
              </h1>

              <div className="flex flex-col gap-6">
                <Input
                  label="Name:"
                  type="text"
                  name="name"
                  placeholder="Best of all time"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green! mt-12">
                {id ? "Upate List" : "Add List"}
              </Button>
            </Form>
          );
        }}
      </Formik>

      <Alert alert={alert} setAlert={setAlert} />
    </dialog>
  );
}

export default FormListDialog;
