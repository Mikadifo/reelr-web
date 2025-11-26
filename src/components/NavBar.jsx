import Logo from "@assets/logo.svg?react";
import Home from "@assets/icons/home.svg?react";
import Logout from "@assets/icons/logout.svg?react";
import Button from "@components/Button";

function NavBar() {
  const user = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <header className="sticky top-0 z-40 bg-dark/85 backdrop-blur-3xl">
      <nav className="flex justify-between px-16 py-4">
        <div className="flex gap-2 items-center">
          <Logo className="size-8" />
          <span className="font-heading text-white font-bold text-3xl">
            Reelr
          </span>
        </div>
        {user ? (
          <div className="flex gap-4">
            <Button link to="/movies" className="p-2! mx-auto my-auto">
              <Home className="size-[22px]" />
            </Button>
            <Button
              link
              to="/login"
              className="p-2! mx-auto my-auto"
              onClick={logout}
            >
              <Logout className="size-[22px]" />
            </Button>
          </div>
        ) : (
          <Button link to="/login">
            Login
          </Button>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
