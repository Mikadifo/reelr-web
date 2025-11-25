import LoginForm from "@components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/movies");
    }
  }, [user]);

  return (
    <section className="h-screen flex items-center justify-center">
      <LoginForm />
    </section>
  );
}

export default LoginPage;
