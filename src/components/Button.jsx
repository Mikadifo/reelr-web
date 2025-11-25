import { Link } from "react-router-dom";

/*
 * Renders a react router Link or a button component with the same styles
 */
function Button({
  children,
  className,
  link = false,
  to = "",
  onClick = () => {},
}) {
  const styles = `rounded-full bg-white text-dark font-bold px-6 py-2 text-base font-body cursor-pointer ${className}`;

  if (link) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

export default Button;
