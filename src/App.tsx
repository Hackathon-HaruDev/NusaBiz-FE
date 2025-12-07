import AOS from "aos"
import "aos/dist/aos.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./constant/router";
import Aos from "aos";
import { DashboardProvider } from "./context/DashboardProvider";

Aos.init({
  
})

function App() {
  return (
    <DashboardProvider>
      <RouterProvider router={Router} />
    </DashboardProvider>
  )
}

export default App
