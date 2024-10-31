import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import LoginPage from './pages/Login';
import AboutUs from './pages/AboutUsPage';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import Withdraw from './pages/dashboardPages/Withdraw';
import Balance from './pages/dashboardPages/Balance';
import Home from './pages/dashboardPages/Home';
import Users from './pages/dashboardPages/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'withdraw',
        element: <Withdraw />,
      },
      {
        path: 'balance',
        element: <Balance />,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
]);

export default router;
