const React = require("react");
const { Navigate, Outlet } = require("react-router-dom");

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;