import React, { useEffect, useState } from "react";
import {
  Store,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Package,
  Mail,
  FileText,
  Clock,
  AlertTriangle,
  Loader2,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import { url } from "@/store/api";

export default function VendorDashboard() {
  const [storeData, setStoreData] = useState(null);
  const [stats, setStats] = useState({
    totalMoneyMade: 0,
    totalSalesCount: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Get user info from localStorage
  const getUserInfo = () => {
    try {
      const userData = localStorage.getItem("user");
      console.log("📦 User data from localStorage:", userData);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("🚀 VendorDashboard mounted");
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔐 Token:", token ? "Exists" : "Missing");

        const response = await axios.get(`${url}vendors/me`, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        console.log("🏪 Vendor Profile Data:", data);
        setStoreData(data.vendor);
        setStats(data.stats);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch vendor profile:", error.message);
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  const handleEntryPayment = async () => {
    console.log("🎯 Payment button clicked!");
    try {
      setPaymentLoading(true);
      setPaymentStatus(null);

      const token = localStorage.getItem("token");
      const userInfo = getUserInfo();

      console.log("👤 User Info:", userInfo);
      console.log("🌐 Target API:", `${url}payments/vendor/initialize`);

      if (!userInfo || !userInfo.id) {
        console.error("❌ Missing user ID");
        setPaymentStatus({
          type: "error",
          message: "User information not found. Please log in again.",
        });
        return;
      }

      console.log("📤 Making API call to initialize payment...");
      const response = await axios.post(
        `${url}payments/vendor/initialize`,
        { userId: userInfo.id },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ API Response:", response.data);

      if (response.data.success) {
        console.log(
          "🔗 Redirecting to Paystack:",
          response.data.authorization_url
        );
        // Redirect to Paystack payment page
        window.location.href = response.data.authorization_url;
      } else {
        console.error("❌ API returned error:", response.data.error);
        setPaymentStatus({
          type: "error",
          message: response.data.error || "Failed to initialize payment",
        });
      }
    } catch (error) {
      console.error("💥 Payment initialization error:", error);
      console.error("Error response:", error.response?.data);
      setPaymentStatus({
        type: "error",
        message:
          error.response?.data?.error ||
          "An error occurred while initializing payment",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    console.log("🔍 checkPaymentStatus function called");
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get("reference");

      console.log("📋 Current URL:", window.location.href);
      console.log("🔖 Reference from URL:", reference);

      if (reference) {
        console.log("🎯 Reference found! Verifying payment...");
        setPaymentLoading(true);
        const token = localStorage.getItem("token");

        console.log("📤 Calling verification API...");
        const response = await axios.post(
          `${url}payments/vendor/verify`,
          { reference },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("✅ Verification API Response:", response.data);

        if (response.data.success) {
          console.log("🎉 Payment verified successfully!");
          setPaymentStatus({
            type: "success",
            message: response.data.message,
          });

          // Refresh vendor data
          console.log("🔄 Refreshing vendor data...");
          const vendorResponse = await axios.get(`${url}vendors/me`, {
            headers: { Authorization: token },
          });
          setStoreData(vendorResponse.data.vendor);

          // Remove reference from URL
          console.log("🗑️ Cleaning URL...");
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          console.log("✅ URL cleaned:", window.location.href);
        } else {
          console.error("❌ Verification failed:", response.data.error);
          setPaymentStatus({
            type: "error",
            message: response.data.error,
          });
        }
      } else {
        console.log("ℹ️ No reference found in URL");
      }
    } catch (error) {
      console.error("💥 Payment verification error:", error);
      console.error("Error details:", error.response?.data);
      setPaymentStatus({
        type: "error",
        message: error.response?.data?.error || "Payment verification failed",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  // Check for payment callback on component mount and URL changes
  useEffect(() => {
    console.log("🔍 useEffect - Checking for payment callback");
    console.log("📍 Current pathname:", window.location.pathname);
    console.log("🔍 Current search:", window.location.search);

    checkPaymentStatus();
  }, [window.location.search]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your store information...</p>
        </div>
      </div>
    );
  }

  // Show payment status message
  const PaymentStatusMessage = () => {
    if (!paymentStatus) return null;

    return (
      <div
        className={`mb-6 p-4 rounded-lg ${
          paymentStatus.type === "success"
            ? "bg-green-50 border border-green-200 text-green-800"
            : "bg-red-50 border border-red-200 text-red-800"
        }`}
      >
        <div className="flex items-center">
          {paymentStatus.type === "success" ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <XCircle className="w-5 h-5 mr-2" />
          )}
          <span className="font-medium">{paymentStatus.message}</span>
        </div>
      </div>
    );
  };

  // Get user info for display
  const userInfo = getUserInfo();

  // Show awaiting approval OR payment message
  if (storeData && (!storeData.isApproved || !storeData.isEntryFeePaid)) {
    const needsPayment = !storeData.isEntryFeePaid;
    const needsApproval = !storeData.isApproved && storeData.isEntryFeePaid;

    console.log("📊 Current vendor state:", {
      needsPayment,
      needsApproval,
      isEntryFeePaid: storeData.isEntryFeePaid,
      isApproved: storeData.isApproved,
    });

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Payment Status Message */}
            <PaymentStatusMessage />

            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {needsPayment ? (
                <CreditCard className="w-10 h-10 text-blue-600" />
              ) : (
                <Clock className="w-10 h-10 text-blue-600" />
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {needsPayment
                ? "Complete Vendor Registration"
                : "Store Under Review"}
            </h1>

            <div
              className={`flex items-center justify-center ${
                needsPayment
                  ? "bg-yellow-50 text-yellow-800"
                  : "bg-orange-50 text-orange-800"
              } px-4 py-2 rounded-full mb-6`}
            >
              {needsPayment ? (
                <DollarSign className="w-4 h-4 mr-2" />
              ) : (
                <AlertTriangle className="w-4 h-4 mr-2" />
              )}
              <span className="text-sm font-medium">
                {needsPayment ? "Payment Required" : "Pending Approval"}
              </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {needsPayment
                ? "To complete your vendor registration, you need to pay the one-time entry fee of ₦2,000. This fee helps us maintain platform quality and provide better services."
                : `Thank you for submitting your store application! Your store "${storeData.storeName}" is currently under review by our team.`}
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                {needsPayment ? "What you get:" : "What happens next?"}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                {needsPayment ? (
                  <>
                    <li>• Full vendor dashboard access</li>
                    <li>• Ability to list unlimited products</li>
                    <li>• Payment processing capabilities</li>
                    <li>• Customer management tools</li>
                    <li>• Sales analytics and reports</li>
                  </>
                ) : (
                  <>
                    <li>• Our team will review your store information</li>
                    <li>• We'll verify your business certificate</li>
                    <li>• This process usually takes 1-3 business days</li>
                  </>
                )}
              </ul>
            </div>

            <div className="text-sm text-gray-500 mb-6">
              {needsPayment && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Entry Fee:</span>
                    <span className="text-xl font-bold text-green-600">
                      ₦2,000
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 text-left">
                    One-time payment • Secure • Refundable if not approved
                  </p>
                </div>
              )}
              <div className="space-y-1">
                <p>
                  <strong>Submitted:</strong> {formatDate(storeData.createdAt)}
                </p>
                <p>
                  <strong>Contact:</strong>{" "}
                  {userInfo?.email || storeData.user?.email || "N/A"}
                </p>
                {needsPayment && (
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-yellow-600">Pending Payment</span>
                  </p>
                )}
                {needsApproval && (
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-orange-600">Pending Approval</span>
                  </p>
                )}
              </div>
            </div>

            {needsPayment && (
              <div className="space-y-3">
                <button
                  onClick={handleEntryPayment}
                  disabled={paymentLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
                >
                  {paymentLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Entry Fee - ₦2,000
                    </>
                  )}
                </button>

                {/* Debug button */}
                <button
                  onClick={() => {
                    console.log("🔄 Manual refresh triggered");
                    console.log("📋 Current URL:", window.location.href);
                    checkPaymentStatus();
                  }}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Payment Status (Debug)
                </button>

                <p className="text-xs text-gray-500">
                  🔒 Secure payment powered by Paystack • Cards & Bank Transfers
                  accepted
                </p>
              </div>
            )}

            {needsApproval && (
              <div className="space-y-3">
                <button
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
                  onClick={() => window.location.reload()}
                >
                  Check Approval Status
                </button>
                <p className="text-xs text-gray-500">
                  We'll notify you once your store is approved
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show full dashboard for approved vendors who have paid
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Payment Status Message */}
        <PaymentStatusMessage />

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-x-4">
              <div className="w-16 h-16 bg-[#0057b8] rounded-full flex items-center justify-center mb-4 md:mb-0">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {storeData?.storeName || "Store Name"}
                </h1>
                <p className="text-gray-600 mt-1">
                  {storeData?.storeDescription || "Store Description"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Approved & Active</span>
              </div>
            </div>
          </div>

          {/* Store Images */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Store Logo
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 min-h-[200px] flex items-center justify-center">
                {storeData?.logo ? (
                  <img
                    src={storeData.logo}
                    alt="Store Logo"
                    className="w-full h-48 object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`text-center text-gray-500 ${
                    storeData?.logo ? "hidden" : "flex flex-col items-center"
                  }`}
                >
                  <Store className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No Logo Uploaded</p>
                  <p className="text-sm mt-1">Upload your store logo</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Business Certificate
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 min-h-[200px] flex items-center justify-center">
                {storeData?.businessCertificate ? (
                  <img
                    src={storeData.businessCertificate}
                    alt="Business Certificate"
                    className="w-full h-48 object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`text-center text-gray-500 ${
                    storeData?.businessCertificate
                      ? "hidden"
                      : "flex flex-col items-center"
                  }`}
                >
                  <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No Certificate Uploaded</p>
                  <p className="text-sm mt-1">
                    Upload your business certificate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Money Made */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ₦{(stats?.totalMoneyMade || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">All-time earnings</p>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats?.totalProducts || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Active listings</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats?.totalOrders || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Completed orders</p>
          </div>

          {/* Current Balance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-indigo-600">
                  ₦{(storeData?.balance || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Withdrawable amount</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-indigo-600" />
              Account Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Store ID</span>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">
                  {storeData?._id ? storeData._id.slice(-8) : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">User Email</span>
                <span className="text-blue-600 font-medium">
                  {userInfo?.email || storeData?.user?.email || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Username</span>
                <span className="text-gray-800 font-medium">
                  {userInfo?.userName || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Entry Fee Paid</span>
                <span className="flex items-center text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Yes
                </span>
              </div>
            </div>
          </div>

          {/* Store Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Store Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">Store Created</p>
                  <p className="text-gray-600 text-sm">
                    {formatDate(storeData?.createdAt) || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">Last Updated</p>
                  <p className="text-gray-600 text-sm">
                    {formatDate(storeData?.updatedAt) || "N/A"}
                  </p>
                </div>
              </div>
              {storeData?.isEntryFeePaid && (
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-800">Entry Fee Paid</p>
                    <p className="text-gray-600 text-sm">
                      Registration completed successfully
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium">
              Add New Product
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium">
              View Orders
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium">
              Analytics Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
