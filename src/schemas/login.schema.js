import * as Yup from "yup";

const loginSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores allowed")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default loginSchema;
