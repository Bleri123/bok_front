import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import LoginPage from "./pages/Login";
import Error from './pages/Error'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    }
])

export default router;
