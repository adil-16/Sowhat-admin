import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const token = localStorage.getItem("token");
  return token ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
