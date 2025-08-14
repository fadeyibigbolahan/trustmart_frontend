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

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        // For your actual implementation, replace the above with:
        const fetchVendorData = async () => {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${url}vendors/me`, {
            headers: {
              Authorization: token,
            },
          });
          const data = response.data;
          console.log("Vendor Profile Data:", data);
          setStoreData(data.vendor);
          setStats(data.stats);
          setLoading(false);
        };
        fetchVendorData();
      } catch (error) {
        console.error("Failed to fetch vendor profile:", error.message);
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

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

  // Show awaiting approval message for unapproved vendors
  if (storeData && !storeData.isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-blue-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Store Under Review
            </h1>

            <div className="flex items-center justify-center bg-orange-50 text-orange-800 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Pending Approval</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for submitting your store application! Your store "
              {storeData.storeName}" is currently under review by our team.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Our team will review your store information</li>
                <li>• We'll verify your business certificate</li>
                {/* <li>• You'll receive an email once approved</li> */}
                <li>• This process usually takes 1-3 business days</li>
              </ul>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                <strong>Submitted:</strong> {formatDate(storeData.createdAt)}
              </p>
              <p>
                <strong>Contact:</strong> {storeData.user.email}
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-black text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Check Status
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show full dashboard for approved vendors
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-6">
            <div className="flex flex-col md:flex-row items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 text-center md:text-start">
                  {storeData?.storeName || "Store Name"}
                </h1>
                <p className="text-gray-600 text-center md:text-start">
                  {storeData?.storeDescription || "Store Description"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Approved</span>
              </div>
            </div>
          </div>

          {/* Store Images */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Store Logo
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                <img
                  src={storeData?.logo}
                  alt="Store Logo"
                  className="w-full h-48 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <div className="hidden text-center text-gray-500 py-8">
                  <Store className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Logo Preview</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Business Certificate
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                <img
                  src={storeData?.businessCertificate}
                  alt="Business Certificate"
                  className="w-full h-48 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <div className="hidden text-center text-gray-500 py-8">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Certificate Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Details Grid */}
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
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {storeData?._id || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">User Email</span>
                <span className="text-blue-600">
                  {storeData?.user.email || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <p className="w-5 h-5 mr-2 text-green-600 mb-2">₦</p>
              Financial Overview
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Current Balance</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₦{storeData?.balance?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <p className="w-6 h-6 text-green-600 font-bold text-center">
                      ₦
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Amount Made</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₦{stats?.totalMoneyMade?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <p className="w-6 h-6 text-green-600 font-bold text-center">
                      ₦
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {stats?.totalProducts || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {stats?.totalOrders || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Information */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
