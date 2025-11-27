import { Link } from "react-router-dom";

/*
 * Renders a react router Link or a button component with the same styles
 */
function Button({
  type = "button",
  children,
  className,
  link = false,
  to = "",
  ...props
}) {
  const styles = `rounded-full bg-white text-dark font-bold px-6 py-2 text-base font-body cursor-pointer ${className} hover:opacity-90`;

  if (link) {
    return (
      <Link to={to} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} {...props}>
      {children}
    </button>
  );
}

export default Button;
