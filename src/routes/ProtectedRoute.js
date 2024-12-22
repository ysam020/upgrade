import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ children, allowedModules }) => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  // Check if user exists and has access to at least one allowed module
  const hasAccess =
    user && allowedModules.some((module) => user.modules.includes(module));

  useEffect(() => {
    // Navigate to "not authorized" if access is denied
    if (!hasAccess) {
      navigate("/not-authorized", { replace: true });
    }
  }, [hasAccess, navigate]);

  if (hasAccess) {
    return <>{children}</>; // Render children if access is granted
  }

  return null;
};

export default ProtectedRoute;
