import RegisterForm from "@components/RegisterForm";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/movies");
    }
  }, [user]);

  return (
    <section className="h-screen flex items-center justify-center">
      <RegisterForm />
    </section>
  );
}

export default RegisterPage;
