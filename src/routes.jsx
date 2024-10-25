import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import LoginPage from "./pages/Login";
import AboutUs from "./pages/AboutUsPage";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
]);

export default router;
