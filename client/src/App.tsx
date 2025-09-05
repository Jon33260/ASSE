import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <div className="fixed-navbar">
        <NavBar />
      </div>

      {/* Container global pour les toasts */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <main>
        <Outlet />
      </main>
    </>
  );
}
