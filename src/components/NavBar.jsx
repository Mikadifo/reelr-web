import Logo from "./../assets/logo.svg?react";
import Button from "./Button";

function NavBar() {
  return (
    <div className="sticky top-0 flex justify-between px-16 py-4">
      <div className="flex gap-2 items-center">
        <Logo className="size-8" />
        <span className="font-heading text-white font-bold text-3xl">
          Reelr
        </span>
      </div>

      <Button link to="/login">
        Login
      </Button>
    </div>
  );
}

export default NavBar;
