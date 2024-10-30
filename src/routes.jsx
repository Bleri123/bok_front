import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import LoginPage from "./pages/Login";
import AboutUs from "./pages/AboutUsPage";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
