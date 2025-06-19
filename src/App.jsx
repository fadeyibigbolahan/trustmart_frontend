import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

// Layouts
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/layout";
import ShoppingLayout from "./components/shopping-view/layout";
// import VendorLayout from "./components/vendor-view/layout";

// Pages: Auth
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

// Pages: Admin
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";

// Pages: Vendor
// import VendorDashboard from "./pages/vendor-view/dashboard";

// Pages: Shopping
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

// Misc
import NotFound from "./pages/not-found";
import UnauthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/check-auth";
import VendorLayout from "./components/vendor-view/layout";
import VendorDashboard from "./pages/vendor-view/dashboard";
import VendorProducts from "./pages/vendor-view/products";
import VendorOrders from "./pages/vendor-view/orders";
import VendorFeatures from "./pages/vendor-view/features";
import VendorForm from "./pages/vendor-view/vendorform";
import OrderSuccess from "./pages/shopping-view/order-success";

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
        {/* 🛍 Public Shopping Routes (No Auth Needed) */}
        <Route path="/" element={<ShoppingLayout />}>
          <Route index element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="/order/success" element={<OrderSuccess />} />

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
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="form" element={<VendorForm />} />
        </Route>

        {/* 🛠 Admin Routes */}
        <Route
          path="/vendor"
          element={
            // <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <VendorLayout />
            // </CheckAuth>
          }
        >
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="features" element={<VendorFeatures />} />
        </Route>

        {/* 🛒 Vendor Routes (Commented Out for Now) */}
        {/* <Route
          path="/vendor"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <VendorLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<VendorDashboard />} />
        </Route> */}

        {/* 🚫 Unauthorized / Fallback */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
