import { configureStore } from "@reduxjs/toolkit";
import { listsSlice } from "./listsSlice";

export const store = configureStore({
  reducer: { lists: listsSlice.reducer },
});
