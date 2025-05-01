import { Navigate } from "react-router-dom";

const PublicRoutes = ({ Component }) => {
  const isLoggedIn = false;

  return isLoggedIn ? <Navigate to="/homepage" replace /> : <Component />;
};

export default PublicRoutes;
