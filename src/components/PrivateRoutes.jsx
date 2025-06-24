import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const {user} = useAuth();
  const location = useLocation();
  return user?.email ? children : <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoutes;
