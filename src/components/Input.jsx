import { Field } from "formik";

function Input({ label = "", error = false, helperText = "", ...props }) {
  return (
    <div className="flex flex-col gap-2 text-white font-body">
      <label className="font-bold text-base" hidden={!label}>
        {label}
      </label>

      <Field
        className="rounded-2xl px-4 py-2 border border-white text-base placeholder:text-white-accent"
        autoComplete="off"
        {...props}
      />

      <span className="text-red text-sm" hidden={!error}>
        {helperText}
      </span>
    </div>
  );
}

export default Input;
