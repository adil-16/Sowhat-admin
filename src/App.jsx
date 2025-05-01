import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import PublicRoutes from "./utils/Routes/PublicRoute";
import Dashboard from "./Pages/Dashboard";
import UsersBreakdown from "./Pages/UsersBreakdown";
import Login from "./Pages/Login";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <PublicRoutes Component={Dashboard} />,
      },
      {
        path: "/users",
        element: <PublicRoutes Component={UsersBreakdown} />,
      },
    ],
  },
  {
    path: "/login",
    element: <PublicRoutes Component={Login} />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
