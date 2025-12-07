import AOS from "aos";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./constant/router";
import Aos from "aos";
import { DashboardProvider } from "./context/DashboardProvider";
import { ToastProvider } from "./context/ToastContext";

Aos.init({});

function App() {
  return (
    <ToastProvider>
      <DashboardProvider>
        <RouterProvider router={Router} />
      </DashboardProvider>
    </ToastProvider>
  );
}

export default App;
