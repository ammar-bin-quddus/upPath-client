import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  return token ? children : <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoutes;
