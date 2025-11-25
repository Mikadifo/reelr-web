import NavBar from "@components/NavBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="px-16">
      <NavBar />

      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
