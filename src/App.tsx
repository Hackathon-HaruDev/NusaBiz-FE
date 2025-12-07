import "aos/dist/aos.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./constant/router";
import Aos from "aos";
import { ToastProvider } from "./context/ToastContext";

Aos.init({});

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={Router} />
    </ToastProvider>
  );
}

export default App;
