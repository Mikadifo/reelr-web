import { Field } from "formik";

function VisibilitySwitch({ error = false, helperText = "", ...props }) {
  const handleToggle = (field) => {
    field.onChange({
      target: { name: field.name, value: !field.value },
    });
  };

  return (
    <div className="flex flex-col gap-4 text-white font-body">
      <label className="font-bold text-base">Visibility:</label>

      <Field
        className="rounded-2xl px-4 py-2 border border-white text-base placeholder:text-white-accent"
        {...props}
      >
        {({ field }) => (
          <button
            type="button"
            onClick={() => handleToggle(field)}
            className="cursor-pointer text-base"
          >
            <span
              className={`${field.value ? "bg-cyan font-bold" : "bg-dark-accent"} rounded-s-full px-6 py-2`}
            >
              Public
            </span>
            <span
              className={`${field.value ? "bg-dark-accent" : "bg-cyan font-bold"} rounded-e-full px-6 py-2`}
            >
              Private
            </span>
          </button>
        )}
      </Field>

      <span className="text-red text-sm" hidden={!error}>
        {helperText}
      </span>
    </div>
  );
}

export default VisibilitySwitch;
