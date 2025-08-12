import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

// Layouts
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/layout";
import ShoppingLayout from "./components/shopping-view/layout";
import VendorLayout from "./components/vendor-view/layout";

// Pages: Auth
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AuthForgotPassword from "./pages/auth/forgetPassword";
import ResetPassword from "./pages/auth/resetPassword";

// Pages: Admin
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";

// Pages: Vendor
import VendorDashboard from "./pages/vendor-view/dashboard";
import VendorProducts from "./pages/vendor-view/products";
import VendorOrders from "./pages/vendor-view/orders";
import VendorFeatures from "./pages/vendor-view/features";
import VendorForm from "./pages/vendor-view/vendorform";

// Pages: Shopping
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import OrderSuccess from "./pages/shopping-view/order-success";

// Misc
import NotFound from "./pages/not-found";
import UnauthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/check-auth";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[800px] bg-black h-[600px]" />;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* 🛍 Public Shopping Routes */}
        <Route path="/" element={<ShoppingLayout />}>
          <Route index element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="order/success" element={<OrderSuccess />} />

          {/* 🔒 Protected Shopping Routes */}
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingCheckout />
              </CheckAuth>
            }
          />
          <Route
            path="account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingAccount />
              </CheckAuth>
            }
          />
        </Route>

        {/* 🔐 Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          {/* Public auth pages */}
          <Route path="forgot-password" element={<AuthForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />

          {/* Redirect authenticated users away from login/register */}
          <Route
            path="login"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLogin />
              </CheckAuth>
            }
          />
          <Route
            path="register"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthRegister />
              </CheckAuth>
            }
          />
          <Route path="form" element={<VendorForm />} />
        </Route>

        {/* 🛠 Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* 🛠 Vendor Routes */}
        <Route
          path="/vendor"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <VendorLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="features" element={<VendorFeatures />} />
        </Route>

        {/* 🚫 Unauthorized / Fallback */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
