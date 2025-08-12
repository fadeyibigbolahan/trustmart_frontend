import React, { useEffect, useState } from "react";
import {
  Users,
  Store,
  CheckSquare,
  X,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  FileText,
  ShoppingBag,
  AlertCircle,
  Building,
  CreditCard,
} from "lucide-react";
import { url } from "@/store/api";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("users");

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform API user data to match component structure
  const transformUserData = (apiUsers) => {
    return apiUsers.map((user, index) => ({
      id: user._id,
      name: user.userName,
      email: user.email,
      phone: user.phone || "N/A", // Phone might not be in API
      joinDate: user.createdAt
        ? new Date(user.createdAt).toISOString().split("T")[0]
        : "N/A",
      status: "active", // You might want to add status logic based on your API
      type: "user",
      vendorRequest:
        user.roles.includes("vendor") && user.roles.includes("user"), // Has both roles means approved vendor
      location: user.location || "N/A", // Location might not be in API
      businessName: user.businessName || "N/A",
      businessType: user.businessType || "N/A",
      wallet: user.wallet || 0,
      school: user.school || null,
    }));
  };

  // Transform API vendor data to match component structure
  const transformVendorData = (apiVendors) => {
    return apiVendors.map((vendor, index) => {
      const vendorAccount = vendor.vendorAccount || {};

      return {
        id: vendorAccount._id,
        name: vendor.userName,
        email: vendor.email,
        phone: vendor.phone || "N/A",
        businessName: vendorAccount.storeName || vendor.userName, // Use storeName from vendorAccount
        businessType: vendor.businessType || "General",
        joinDate: vendorAccount.createdAt
          ? new Date(vendorAccount.createdAt).toISOString().split("T")[0]
          : vendor.createdAt
          ? new Date(vendor.createdAt).toISOString().split("T")[0]
          : "N/A",
        status: vendorAccount.isApproved === false ? "pending" : "active", // Use isApproved to determine status
        rating: vendor.rating || 0,
        totalSales: vendor.totalSales || 0,
        products: vendorAccount.products ? vendorAccount.products.length : 0, // Count products from vendorAccount
        location: vendor.location || "N/A",
        wallet: vendor.wallet || 0,
        vendorBalance: vendorAccount.balance || 0, // Vendor-specific balance
        storeDescription: vendorAccount.storeDescription || "",
        logo: vendorAccount.logo || null,
        businessCertificate: vendorAccount.businessCertificate || null,
        subaccountCode: vendorAccount.subaccountCode || null,
        isApproved: vendorAccount.isApproved || false,
      };
    });
  };

  // Handle vendor approval (approve pending vendor account)
  const approveVendor = async (vendorId) => {
    try {
      // API call to approve vendor account
      // await axios.put(`${url}admin/vendors/${vendorId}/approve`);

      // Update local state
      setVendors(
        vendors.map((vendor) =>
          vendor.id === vendorId
            ? { ...vendor, status: "active", isApproved: true }
            : vendor
        )
      );
    } catch (error) {
      console.error("Error approving vendor:", error);
      setError("Failed to approve vendor");
    }
  };

  // Handle vendor request rejection
  const rejectVendorRequest = async (userId) => {
    try {
      // You'll need to implement the API call to reject vendor request
      // Example API call:
      // await axios.put(`${url}admin/users/${userId}/reject-vendor-request`);

      // For now, update local state
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, vendorRequest: false } : user
        )
      );
    } catch (error) {
      console.error("Error rejecting vendor request:", error);
      setError("Failed to reject vendor request");
    }
  };

  // Handle vendor status change
  // const changeVendorStatus = async (vendorId, newStatus) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const response = await axios.patch(
  //       `${url}admin/users/vendors/${vendorId}/status`,
  //       { status: newStatus },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     setVendors(
  //       vendors.map((vendor) => {
  //         console.log("vendor state:", vendor);
  //         return vendor.id === vendorId
  //           ? { ...vendor, status: "active", isApproved: !vendor.isApproved }
  //           : vendor;
  //       })
  //     );

  //     console.log("Vendor status changed:", response.data.message);
  //   } catch (error) {
  //     console.error(
  //       "Error changing vendor status:",
  //       error.response?.data || error.message
  //     );
  //     setError(
  //       error.response?.data?.message || "Failed to change vendor status"
  //     );
  //   }
  // };

  const changeVendorStatus = async (vendorId, newApprovalStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${url}admin/users/vendors/${vendorId}/status`,
        { status: newApprovalStatus },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Update local state immediately for better UX
      setVendors((prevVendors) =>
        prevVendors.map((vendor) => {
          if (vendor.id === vendorId) {
            const newStatus = newApprovalStatus
              ? "active"
              : vendor.status === "active"
              ? "suspended"
              : "pending";
            return {
              ...vendor,
              status: newStatus,
              isApproved: newApprovalStatus,
            };
          }
          return vendor;
        })
      );

      // If modal is open and showing this vendor, update the selected item too
      if (selectedItem && selectedItem.id === vendorId) {
        setSelectedItem((prev) => ({
          ...prev,
          status: newApprovalStatus
            ? "active"
            : prev.status === "active"
            ? "suspended"
            : "pending",
          isApproved: newApprovalStatus,
        }));
      }

      console.log("Vendor status changed:", response.data.message);
    } catch (error) {
      console.error(
        "Error changing vendor status:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Failed to change vendor status"
      );
    }
  };

  // Handle view details
  const handleViewDetails = (item, type) => {
    setSelectedItem({ ...item, type });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      suspended: "bg-red-100 text-red-800 border-red-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusClasses[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [allUsersResponse, allVendorsResponse] = await Promise.all([
          axios.get(`${url}admin/users/all`),
          axios.get(`${url}admin/users/vendors`),
        ]);

        console.log("Fetched users:", allUsersResponse.data);
        console.log("Fetched vendors:", allVendorsResponse.data);

        // Transform the API data to match component structure
        const transformedUsers = transformUserData(allUsersResponse.data);
        const transformedVendors = transformVendorData(allVendorsResponse.data);

        setUsers(transformedUsers);
        setVendors(transformedVendors);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data from server");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter out users who are already vendors from the users list
  // Now we check for users who have vendor role but don't have approved vendor accounts
  const regularUsers = users.filter((user) => !user.roles?.includes("vendor"));

  // Find users with pending vendor requests (users who have vendor accounts but aren't approved yet)
  const pendingVendors = vendors.filter(
    (vendor) => vendor.status === "pending"
  );

  // Stats calculation
  const totalUsers = regularUsers.length;
  const totalVendors = vendors.length;
  const pendingRequests = pendingVendors.length;
  const activeVendors = vendors.filter((v) => v.status === "active").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage users, vendors, and platform operations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Vendors
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {totalVendors}
                </p>
              </div>
              <Store className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Requests
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {pendingRequests}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Vendors
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {activeVendors}
                </p>
              </div>
              <CheckSquare className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Users Management
                </div>
              </button>
              <button
                onClick={() => setActiveTab("vendors")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "vendors"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Vendors Management
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "users" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Users Management
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wallet
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {regularUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {user.location}
                              </div>
                              {user.school && (
                                <div className="text-xs text-gray-400">
                                  {user.school}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 flex items-center gap-1 mb-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {user.phone}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {user.joinDate}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {getStatusBadge(user.status)}
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {formatCurrency(user.wallet)}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewDetails(user, "user")}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "vendors" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Vendors Management
                  </h2>
                  {pendingRequests > 0 && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {pendingRequests} vendor approval
                      {pendingRequests !== 1 ? "s" : ""} pending
                    </span>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vendor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Business
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vendors.map((vendor) => (
                        <tr key={vendor.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              {vendor.logo && (
                                <img
                                  src={vendor.logo}
                                  alt="Store logo"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {vendor.name}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                                  <Mail className="w-3 h-3" />
                                  {vendor.email}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {vendor.location}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {vendor.businessName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {vendor.businessType}
                              </div>
                              {vendor.storeDescription && (
                                <div className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                                  {vendor.storeDescription}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <div className="text-sm text-gray-900 flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                {vendor.rating > 0
                                  ? vendor.rating.toFixed(1)
                                  : "New"}
                              </div>
                              <div className="text-sm text-gray-600">
                                {formatCurrency(vendor.totalSales)} sales
                              </div>
                              <div className="text-xs text-gray-500">
                                {vendor.products} products
                              </div>
                              <div className="text-xs text-blue-600">
                                Balance: {formatCurrency(vendor.vendorBalance)}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {vendor.joinDate}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {getStatusBadge(vendor.status)}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleViewDetails(vendor, "vendor")
                                }
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {vendor.status === "pending" ? (
                                <>
                                  <button
                                    onClick={() =>
                                      changeVendorStatus(vendor.id, true)
                                    }
                                    className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1"
                                    title="Approve Vendor"
                                  >
                                    <CheckSquare className="w-3 h-3" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() =>
                                      changeVendorStatus(vendor.id, false)
                                    }
                                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1"
                                    title="Reject Vendor"
                                  >
                                    <X className="w-3 h-3" />
                                    Reject
                                  </button>
                                </>
                              ) : vendor.status === "active" ? (
                                <button
                                  onClick={() =>
                                    changeVendorStatus(vendor.id, false)
                                  }
                                  className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium"
                                  title="Suspend Vendor"
                                >
                                  Suspend
                                </button>
                              ) : vendor.status === "suspended" ? (
                                <button
                                  onClick={() =>
                                    changeVendorStatus(vendor.id, true)
                                  }
                                  className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-xs font-medium"
                                  title="Activate Vendor"
                                >
                                  Activate
                                </button>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details Modal */}
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedItem.type === "vendor" ? "Vendor" : "User"} Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Name
                      </label>
                      <p className="text-gray-900">{selectedItem.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Email
                      </label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedItem.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Phone
                      </label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedItem.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Location
                      </label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedItem.location}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Join Date
                      </label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {selectedItem.joinDate}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <div className="mt-1">
                        {getStatusBadge(selectedItem.status)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* User specific info */}
                {selectedItem.type === "user" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Account Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Wallet Balance
                        </label>
                        <p className="text-gray-900 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          {formatCurrency(selectedItem.wallet)}
                        </p>
                      </div>
                      {selectedItem.school && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            School
                          </label>
                          <p className="text-gray-900">{selectedItem.school}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Vendor specific info */}
                {selectedItem.type === "vendor" && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Business Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Business Name
                          </label>
                          <p className="text-gray-900 flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            {selectedItem.businessName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Business Type
                          </label>
                          <p className="text-gray-900">
                            {selectedItem.businessType}
                          </p>
                        </div>
                        {selectedItem.storeDescription && (
                          <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-500">
                              Store Description
                            </label>
                            <p className="text-gray-900">
                              {selectedItem.storeDescription}
                            </p>
                          </div>
                        )}
                        {selectedItem.businessCertificate && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Business Certificate
                            </label>
                            <div className="mt-1 flex items-center gap-2">
                              <img
                                src={selectedItem.businessCertificate}
                                alt="Business Certificate"
                                className="max-w-xs max-h-48 object-contain rounded border"
                              />
                            </div>
                          </div>
                        )}

                        {selectedItem.subaccountCode && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Subaccount Code
                            </label>
                            <p className="text-gray-900 font-mono text-sm">
                              {selectedItem.subaccountCode}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Performance Metrics
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Rating
                          </label>
                          <p className="text-gray-900 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {selectedItem.rating > 0
                              ? selectedItem.rating.toFixed(1)
                              : "New vendor"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Total Sales
                          </label>
                          <p className="text-gray-900 flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            {selectedItem.totalSales || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
