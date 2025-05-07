import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import PublicRoutes from "./utils/Routes/PublicRoute";
import Dashboard from "./Pages/Dashboard";
import UsersBreakdown from "./Pages/UsersBreakdown";
import Login from "./Pages/Login";
import CustomToaster from "./utils/CustomToaster";
import ProtectedRoute from "./utils/Routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute Component={Dashboard} />,
      },
      {
        path: "/users",
        element: <ProtectedRoute Component={UsersBreakdown} />,
      },
    ],
  },
  {
    path: "/login",
    element: <PublicRoutes Component={Login} />,
  },
]);

const App = () => {
  return (
    <>
      <CustomToaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
