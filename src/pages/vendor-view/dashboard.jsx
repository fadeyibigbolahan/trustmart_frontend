import React from "react";
import {
  Store,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Package,
  Mail,
  FileText,
} from "lucide-react";

export default function VendorDashboard() {
  const storeData = {
    _id: "6841fcac94bbd8a5e05e27c0",
    user: {
      _id: "683723d651450f62a0c9c91b",
      email: "kingwaretech@gmail.com",
    },
    storeName: "Kingware Store",
    storeDescription: "Kingware Store Description",
    isApproved: false,
    balance: 0,
    subaccountCode: "ACCT_7zenfk2kr6tnj8e",
    logo: "https://res.cloudinary.com/dafrqt0g9/image/upload/v1749154981/trustmart/mieeq3d1ypiicddy5ws3.png",
    businessCertificate:
      "https://res.cloudinary.com/dafrqt0g9/image/upload/v1749154985/trustmart/leida7cinyfhoo3lnq6c.png",
    products: [],
    createdAt: "2025-06-05T20:23:08.302Z",
    updatedAt: "2025-06-05T20:23:08.302Z",
    __v: 0,
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {storeData.storeName}
                </h1>
                <p className="text-gray-600">{storeData.storeDescription}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {storeData.isApproved ? (
                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Approved</span>
                </div>
              ) : (
                <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  <XCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Pending Approval</span>
                </div>
              )}
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
                  src={storeData.logo}
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
                  src={storeData.businessCertificate}
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
                  {storeData._id}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">User Email</span>
                <span className="text-blue-600">{storeData.user.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">User ID</span>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {storeData.user._id}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Subaccount Code</span>
                <span className="text-sm font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                  {storeData.subaccountCode}
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
                      ₦{storeData.balance.toFixed(2)}
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
                      {storeData.products.length}
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
                  {formatDate(storeData.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">Last Updated</p>
                <p className="text-gray-600 text-sm">
                  {formatDate(storeData.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
