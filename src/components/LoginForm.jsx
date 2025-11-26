import { Form, Formik } from "formik";
import { BASE_URL } from "../constants";
import Logo from "@assets/logo.svg?react";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "@schemas/login.schema";
import { useState } from "react";
import axios from "axios";
import Alert from "./Alert";

function LoginForm() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, values);
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      navigate("/movies");
    } catch (error) {
      const response = error.response;

      setAlert({
        open: true,
        message: response.data.error || "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => {
        return (
          <Form className="text-white p-16 rounded-2xl bg-dark-06 w-fit">
            <Link
              to="/"
              className="flex gap-2 items-center mb-4 justify-center"
            >
              <Logo className="size-8" />
              <span className="font-heading text-white font-bold text-3xl">
                Reelr
              </span>
            </Link>

            <h1 className="font-heading font-bold text-center text-2xl mb-10">
              Welcome Back!
            </h1>

            <div className="flex flex-col gap-6 w-80">
              <Input
                label="Username:"
                type="text"
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
                Login
              </Button>

              <div className="flex gap-2 text-sm font-body text-white-accent mx-auto">
                <span>Don’t have an account yet?</span>
                <Link to="/register" className="font-bold hover:underline">
                  Register
                </Link>
              </div>
            </div>

            <Alert alert={alert} setAlert={setAlert} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
