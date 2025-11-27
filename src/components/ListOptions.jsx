import Menu from "@assets/icons/menu.svg?react";
import FormListDialog from "@components/FormListDialog";
import { useEffect, useRef, useState } from "react";

function ListOptions({ listId, name }) {
  const [optionsOpen, setOpenOptions] = useState(false);
  const optionsRef = useRef(null);
  const formDialogRef = useRef(null);

  useEffect(() => {
    const ref = optionsRef.current;

    if (!ref) return;

    const handleOutsideClick = (event) => {
      if (!optionsRef) {
        return;
      }

      if (!ref.contains(event.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [optionsRef]);

  const openFormDialog = () => {
    if (formDialogRef.current) {
      formDialogRef.current.showModal();
    }
  };

  return (
    <div className="flex flex-col relative text-white font-body font-normal">
      <button className="cursor-pointer" onClick={() => setOpenOptions(true)}>
        <Menu className="size-7" />
      </button>

      <div
        ref={optionsRef}
        className="flex flex-col text-white text-base rounded-xl bg-white-accent/6 mt-1 py-2 absolute right-0 top-8 w-fit"
        hidden={!optionsOpen}
      >
        <button
          type="button"
          className="cursor-pointer hover:opacity-85 hover:bg-dark-accent/30 px-4 py-2 border-b border-b-white/4 text-nowrap text-left"
          onClick={openFormDialog}
        >
          Update Name
        </button>
        <button
          type="button"
          className="cursor-pointer hover:opacity-85 hover:bg-dark-accent/30 px-4 py-2 border-b border-b-white/4 text-nowrap text-left"
          onClick={() => addToList(3)}
        >
          Delete List
        </button>
      </div>

      <FormListDialog dialogRef={formDialogRef} id={listId} name={name} />
    </div>
  );
}

export default ListOptions;
