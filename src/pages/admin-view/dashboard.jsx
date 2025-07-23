import React, { useState } from "react";
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
  AlertCircle,
} from "lucide-react";

const AdminDashboard = () => {
  // Sample data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2024-01-15",
      status: "active",
      type: "user",
      vendorRequest: false,
      location: "New York, NY",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 234-5678",
      joinDate: "2024-02-20",
      status: "active",
      type: "user",
      vendorRequest: true,
      location: "Los Angeles, CA",
      businessName: "Sarah's Boutique",
      businessType: "Fashion & Clothing",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "+1 (555) 345-6789",
      joinDate: "2024-01-30",
      status: "pending",
      type: "user",
      vendorRequest: true,
      location: "Chicago, IL",
      businessName: "Tech Solutions Inc",
      businessType: "Electronics",
    },
  ]);

  // Sample data for vendors
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma@artcrafts.com",
      phone: "+1 (555) 456-7890",
      businessName: "Art & Crafts Studio",
      businessType: "Handmade & Crafts",
      joinDate: "2023-12-10",
      status: "active",
      rating: 4.8,
      totalSales: 45600,
      products: 28,
      location: "Seattle, WA",
    },
    {
      id: 2,
      name: "Robert Chen",
      email: "robert@techstore.com",
      phone: "+1 (555) 567-8901",
      businessName: "Premium Tech Store",
      businessType: "Electronics",
      joinDate: "2024-01-05",
      status: "active",
      rating: 4.6,
      totalSales: 89200,
      products: 15,
      location: "San Francisco, CA",
    },
    {
      id: 3,
      name: "Lisa Martinez",
      email: "lisa@homegarden.com",
      phone: "+1 (555) 678-9012",
      businessName: "Home & Garden Plus",
      businessType: "Home & Garden",
      joinDate: "2024-02-28",
      status: "suspended",
      rating: 3.9,
      totalSales: 12300,
      products: 42,
      location: "Austin, TX",
    },
  ]);

  const [activeTab, setActiveTab] = useState("users");

  // Handle vendor approval
  const approveVendor = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user && user.vendorRequest) {
      // Remove from users list
      setUsers(users.filter((u) => u.id !== userId));

      // Add to vendors list
      const newVendor = {
        id: vendors.length + 1,
        name: user.name,
        email: user.email,
        phone: user.phone,
        businessName: user.businessName,
        businessType: user.businessType,
        joinDate: new Date().toISOString().split("T")[0],
        status: "active",
        rating: 0,
        totalSales: 0,
        products: 0,
        location: user.location,
      };

      setVendors([...vendors, newVendor]);
    }
  };

  // Handle vendor request rejection
  const rejectVendorRequest = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, vendorRequest: false } : user
      )
    );
  };

  // Handle vendor status change
  const changeVendorStatus = (vendorId, newStatus) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
      )
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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

  // Stats calculation
  const totalUsers = users.length;
  const totalVendors = vendors.length;
  const pendingRequests = users.filter((u) => u.vendorRequest).length;
  const activeVendors = vendors.filter((v) => v.status === "active").length;

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
                  {pendingRequests > 0 && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {pendingRequests} vendor request
                      {pendingRequests !== 1 ? "s" : ""} pending
                    </span>
                  )}
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
                          Vendor Request
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
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
                            {user.vendorRequest ? (
                              <div>
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium mb-2 inline-block">
                                  Pending Approval
                                </span>
                                <div className="text-xs text-gray-600">
                                  <div>
                                    <strong>Business:</strong>{" "}
                                    {user.businessName}
                                  </div>
                                  <div>
                                    <strong>Type:</strong> {user.businessType}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">
                                No request
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-800 p-1">
                                <Eye className="w-4 h-4" />
                              </button>
                              {user.vendorRequest && (
                                <>
                                  <button
                                    onClick={() => approveVendor(user.id)}
                                    className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1"
                                  >
                                    <CheckSquare className="w-3 h-3" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => rejectVendorRequest(user.id)}
                                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1"
                                  >
                                    <X className="w-3 h-3" />
                                    Reject
                                  </button>
                                </>
                              )}
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
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {vendor.businessName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {vendor.businessType}
                              </div>
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
                              <button className="text-blue-600 hover:text-blue-800 p-1">
                                <Eye className="w-4 h-4" />
                              </button>
                              {vendor.status === "active" ? (
                                <button
                                  onClick={() =>
                                    changeVendorStatus(vendor.id, "suspended")
                                  }
                                  className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium"
                                >
                                  Suspend
                                </button>
                              ) : vendor.status === "suspended" ? (
                                <button
                                  onClick={() =>
                                    changeVendorStatus(vendor.id, "active")
                                  }
                                  className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-xs font-medium"
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
      </div>
    </div>
  );
};

export default AdminDashboard;
