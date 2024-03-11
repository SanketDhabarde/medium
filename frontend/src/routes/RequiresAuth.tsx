import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { ReactNode } from "react";

const RequiresAuth = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};

export default RequiresAuth;
