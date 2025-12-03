import AOS from "aos"
import "aos/dist/aos.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./constant/router";


function App() {
  return <RouterProvider router={Router} />;
}

export default App
