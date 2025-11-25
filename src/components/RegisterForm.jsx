import { Form, Formik } from "formik";
import * as Yup from "yup";
import Logo from "@assets/logo.svg?react";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";

function RegisterForm() {
  const schema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers and underscores allowed",
      )
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("submitting...");
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => {
        return (
          <Form className="text-white p-16 rounded-2xl bg-dark-06 w-fit">
            <div className="flex gap-2 items-center mb-4 justify-center">
              <Logo className="size-8" />
              <span className="font-heading text-white font-bold text-3xl">
                Reelr
              </span>
            </div>

            <h1 className="font-heading font-bold text-center text-2xl mb-10">
              Welcome Back!
            </h1>

            <div className="flex flex-col gap-6 w-80">
              <Input
                label="Email:"
                type="email"
                name="email"
                placeholder="nikita.84@example.com"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                required
              />
              <Input
                label="Username:"
                type="username"
                name="username"
                placeholder="Nikita_84"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                required
              />
              <Input
                label="Password:"
                type="password"
                name="password"
                placeholder="**********"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                required
              />
            </div>

            <div className="flex flex-col gap-2 mt-12">
              <Button type="submit" className="w-full bg-cyan! text-white">
                Register
              </Button>

              <div className="flex gap-2 text-sm font-body text-white-accent mx-auto">
                <span>Already have an account?</span>
                <Link to="/login" className="font-bold hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegisterForm;
