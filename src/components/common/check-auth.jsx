import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, loading, children }) {
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  const roles = user?.roles || [];

  const isAdmin = roles.includes("admin");
  const isVendor = roles.includes("vendor");
  const isUser = roles.includes("user");

  // Public auth pages (regex allows /auth/reset-password/:token)
  const publicAuthRegex =
    /^\/auth\/(login|register|forgot-password|reset-password(\/.*)?)$/;

  const isAuthPage = publicAuthRegex.test(location.pathname);

  // Root redirect rules
  if (location.pathname === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

    if (isAdmin) return <Navigate to="/admin/dashboard" replace />;
    // if (isVendor) return <Navigate to="/vendor/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  // Not authenticated + not a public auth page → go to login
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" replace />;
  }

  // Authenticated but trying to access auth pages → redirect away
  if (isAuthenticated && isAuthPage) {
    if (isAdmin) return <Navigate to="/admin/dashboard" replace />;
    // if (isVendor) return <Navigate to="/vendor/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  // User role restrictions
  if (isAuthenticated && isUser) {
    if (
      location.pathname.includes("/admin") ||
      location.pathname.includes("/vendor")
    ) {
      return <Navigate to="/unauth-page" replace />;
    }
  }

  if (isAuthenticated && isVendor && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" replace />;
  }

  if (isAuthenticated && isAdmin && location.pathname.includes("/vendor")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;
