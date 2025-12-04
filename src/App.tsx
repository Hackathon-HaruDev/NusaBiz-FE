import AOS from "aos"
import "aos/dist/aos.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./constant/router";
import Aos from "aos";

Aos.init({
  
})

function App() {
  return <RouterProvider router={Router} />;
}

export default App
