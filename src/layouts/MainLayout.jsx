import NavBar from "@components/NavBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <NavBar />

      <main className="px-16">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
