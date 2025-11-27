import { createSlice } from "@reduxjs/toolkit";

export const listsSlice = createSlice({
  name: "lists",
  initialState: [],
  reducers: {
    setLists: function (_, action) {
      return action.payload;
    },
    addList: function (state, action) {
      const exists = state.some((list) => list.id === action.payload.id);

      if (exists) {
        return state;
      }

      return [...state, action.payload];
    },
    updateMovie: function (state, action) {
      return state.map((movie) =>
        movie.id == action.payload.id ? action.payload : movie,
      );
    },
    updateList: function (state, action) {
      return state.map((list) =>
        list.id === action.payload.id ? action.payload : list,
      );
    },
    addMovieToList: function (state, action) {
      const { listId, movie } = action.payload;

      return state.map((list) =>
        list.id === listId
          ? { ...list, movies: [...list.movies, movie] }
          : list,
      );
    },
    removeMovieFromList: function (state, action) {
      const { listId, movieId } = action.payload;

      return state.map((list) =>
        list.id === listId
          ? {
              ...list,
              movies: list.movies.filter((movie) => movie.id !== movieId),
            }
          : list,
      );
    },
  },
});
