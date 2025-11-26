import { Field } from "formik";
import Button from "@components/Button";
import StarOutline from "@assets/icons/starOutline.svg?react";
import StarFill from "@assets/icons/starFill.svg?react";
import { useEffect, useState } from "react";

function RatingInput({ error = false, helperText = "", ...props }) {
  return (
    <div className="flex flex-col gap-4 text-white font-body">
      <label className="font-bold text-base">Rating:</label>

      <Field
        className="rounded-2xl px-4 py-2 border border-white text-base placeholder:text-white-accent"
        {...props}
      >
        {({ field }) => {
          const [rating, setRating] = useState(field.value ?? null);

          useEffect(() => {
            setRating(field.value ?? null);
          }, [field.value]);

          const updateRating = (field) => {
            field.onChange({
              target: { name: field.name, value: rating },
            });
          };

          const clearRating = (field) => {
            field.onChange({
              target: { name: field.name, value: null },
            });
            setRating(null);
          };

          return (
            <div className="flex gap-4 items-center">
              <div className="flex items-center">
                {new Array(5).fill(null).map((_, index) => (
                  <button
                    type="button"
                    className="cursor-pointer"
                    key={index}
                    onMouseEnter={() => setRating(index + 1)}
                    onMouseLeave={() => setRating(field.value)}
                    onClick={() => updateRating(field)}
                  >
                    {index < rating ? (
                      <StarFill className="size-8" />
                    ) : (
                      <StarOutline className="size-8" />
                    )}
                  </button>
                ))}
              </div>

              {field.value && (
                <Button
                  className="bg-dark-accent! text-white px-4 py-2 text-sm font-normal"
                  onClick={() => clearRating(field)}
                >
                  Clear
                </Button>
              )}
            </div>
          );
        }}
      </Field>

      <span className="text-red text-sm" hidden={!error}>
        {helperText}
      </span>
    </div>
  );
}

export default RatingInput;
