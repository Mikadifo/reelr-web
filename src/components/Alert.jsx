import CloseIcon from "@assets/icons/cross.svg?react";

function Alert({ alert, setAlert }) {
  return (
    <div
      className={`${alert.severity === "error" ? "bg-red" : "bg-green"} text-white font-body px-6 py-3 rounded-2xl whitespace-nowrap absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4`}
      hidden={!alert.open}
    >
      <span>{alert.message}</span>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setAlert((prev) => ({ ...prev, open: false }))}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export default Alert;
