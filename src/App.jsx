import { Route, Routes } from "react-router-dom";

import HomePage from "@pages/HomePage";
import RegisterPage from "@pages/RegisterPage";
import LoginPage from "@pages/LoginPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
