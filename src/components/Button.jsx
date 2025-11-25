import { Link } from "react-router-dom";

function Button({ children, className, link = false, to = "" }) {
  if (link) {
    return (
      <Link
        to={to}
        className={`rounded-full bg-white text-dark font-bold px-6 py-2 text-base font-inter cursor-pointer ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`rounded-full bg-white text-dark font-bold px-6 py-2 text-base font-inter cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
