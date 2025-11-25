import { Route, Routes } from "react-router-dom";

import HomePage from "@pages/HomePage";
import RegisterPage from "@pages/RegisterPage";
import LoginPage from "@pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import MoviesPage from "@pages/MoviesPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
