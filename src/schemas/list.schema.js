import * as Yup from "yup";

const listSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

export default listSchema;
