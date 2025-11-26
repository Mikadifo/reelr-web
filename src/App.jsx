import { Route, Routes } from "react-router-dom";

import HomePage from "@pages/HomePage";
import RegisterPage from "@pages/RegisterPage";
import LoginPage from "@pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import MoviesPage from "@pages/MoviesPage";
import PrivateMovieDetailPage from "@pages/PrivateMovieDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/movies/:id" element={<PrivateMovieDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
