import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: function (_, action) {
      return action.payload;
    },
    addMovie: function (state, action) {
      return [...state, action.payload];
    },
    updateMovie: function (state, action) {
      return state.map((movie) =>
        movie.id == action.payload.id ? action.payload : movie,
      );
    },
  },
});
