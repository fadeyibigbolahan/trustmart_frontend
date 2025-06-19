import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, loading, children }) {
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  const roles = user?.roles || [];

  const isAdmin = roles.includes("admin");
  const isVendor = roles.includes("vendor");
  const isUser = roles.includes("user");

  // Handle root route
  if (location.pathname === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;

    if (isAdmin) return <Navigate to="/admin/dashboard" />;
    // if (isVendor) return <Navigate to="/vendor/dashboard" />;
    return <Navigate to="/" />;
  }

  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && isAuthPage) {
    if (isAdmin) return <Navigate to="/admin/dashboard" />;
    // if (isVendor) return <Navigate to="/vendor/dashboard" />;
    return <Navigate to="/" />;
  }

  // Block user from accessing admin/vendor routes
  if (isAuthenticated && isUser) {
    if (
      location.pathname.includes("/admin") ||
      location.pathname.includes("/vendor")
    ) {
      return <Navigate to="/unauth-page" />;
    }
  }

  // Block vendor from admin routes
  if (isAuthenticated && isVendor && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Block admin from vendor or shop routes (if needed)
  if (isAuthenticated && isAdmin && location.pathname.includes("/vendor")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
