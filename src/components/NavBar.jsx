import Logo from "./../assets/logo.svg?react";
import Button from "./Button";

function NavBar() {
  return (
    <div className="sticky top-0 flex justify-between px-16">
      <div className="flex gap-2 items-center">
        <Logo className="" />
        <span className="font-heading text-white font-bold">Reelr</span>
      </div>

      <Button className="" link to="/login">
        Login
      </Button>
    </div>
  );
}

export default NavBar;
