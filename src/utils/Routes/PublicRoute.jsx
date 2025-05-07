import { Navigate } from "react-router-dom";

const PublicRoutes = ({ Component }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" replace /> : <Component />;
};

export default PublicRoutes;
