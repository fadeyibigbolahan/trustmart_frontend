import React, { useState, useEffect } from "react";
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  Calendar,
  DollarSign,
  Filter,
  Search,
  AlertCircle,
  Eye,
} from "lucide-react";
import axios from "axios";
import { url } from "@/store/api";

const AdminWithdrawalManagement = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data for demonstration
  const mockData = [
    {
      _id: "1",
      vendor: {
        _id: "v1",
        businessName: "Tech Solutions Ltd",
        email: "tech@solutions.com",
        phone: "+234 801 234 5678",
      },
      amount: 150000,
      paymentMethod: "bank_transfer",
      bankAccount: "1234567890",
      accountHolder: "John Doe",
      bankName: "First Bank of Nigeria",
      note: "Monthly withdrawal for services rendered",
      status: "pending",
      requestedAt: "2024-08-10T10:30:00Z",
      processedAt: null,
      createdAt: "2024-08-10T10:30:00Z",
    },
    {
      _id: "2",
      vendor: {
        _id: "v2",
        businessName: "Creative Designs",
        email: "info@creative.com",
        phone: "+234 802 345 6789",
      },
      amount: 75000,
      paymentMethod: "bank_transfer",
      bankAccount: "0987654321",
      accountHolder: "Jane Smith",
      bankName: "GTBank",
      note: "",
      status: "approved",
      requestedAt: "2024-08-08T14:20:00Z",
      processedAt: "2024-08-09T09:15:00Z",
      createdAt: "2024-08-08T14:20:00Z",
    },
    {
      _id: "3",
      vendor: {
        _id: "v3",
        businessName: "Digital Marketing Pro",
        email: "contact@digitalmarketing.com",
        phone: "+234 803 456 7890",
      },
      amount: 200000,
      paymentMethod: "bank_transfer",
      bankAccount: "1122334455",
      accountHolder: "Digital Marketing Pro Ltd",
      bankName: "Access Bank",
      note: "Urgent withdrawal needed for operations",
      status: "rejected",
      requestedAt: "2024-08-05T16:45:00Z",
      processedAt: "2024-08-06T11:30:00Z",
      createdAt: "2024-08-05T16:45:00Z",
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchWithdrawalRequests = async () => {
      try {
        setLoading(true);
        // In real implementation:
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}admin/withdrawals`, {
          headers: { Authorization: token },
        });
        console.log("requests", response.data);
        setWithdrawalRequests(response.data.withdrawals);
        setWithdrawalRequests(response.data.withdrawals || mockData);
        setFilteredRequests(response.data.withdrawals || mockData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch withdrawal requests:", error);
        setLoading(false);
      }
    };

    fetchWithdrawalRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [searchTerm, statusFilter, dateFilter, withdrawalRequests]);

  const filterRequests = () => {
    let filtered = [...withdrawalRequests];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.vendor.businessName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.vendor.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.accountHolder.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const days = dateFilter === "today" ? 1 : dateFilter === "week" ? 7 : 30;
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(
        (request) => new Date(request.requestedAt) >= cutoffDate
      );
    }

    setFilteredRequests(filtered);
  };

  const handleAction = async (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setShowModal(true);
  };

  const confirmAction = async () => {
    try {
      const updateData = {
        status: actionType,
        processedAt: new Date().toISOString(),
        ...(actionType === "rejected" &&
          rejectionReason && { rejectionReason }),
      };

      // In real implementation:
      const token = localStorage.getItem("token");
      await axios.put(
        `${url}admin/withdrawals/${selectedRequest._id}`,
        updateData,
        {
          headers: { Authorization: token },
        }
      );

      // Update local state
      setWithdrawalRequests((prev) =>
        prev.map((req) =>
          req._id === selectedRequest._id ? { ...req, ...updateData } : req
        )
      );

      console.log(`${actionType} withdrawal request:`, selectedRequest._id);

      setShowModal(false);
      setSelectedRequest(null);
      setActionType("");
      setRejectionReason("");
    } catch (error) {
      console.error("Failed to update withdrawal request:", error);
      alert("Failed to update withdrawal request");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading withdrawal requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Withdrawal Requests
          </h1>
          <p className="text-gray-600">Manage vendor withdrawal requests</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Requests",
              value: withdrawalRequests.length,
              icon: CreditCard,
              color: "blue",
            },
            {
              label: "Pending",
              value: withdrawalRequests.filter((r) => r.status === "pending")
                .length,
              icon: Clock,
              color: "yellow",
            },
            {
              label: "Approved",
              value: withdrawalRequests.filter((r) => r.status === "approved")
                .length,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "Rejected",
              value: withdrawalRequests.filter((r) => r.status === "rejected")
                .length,
              icon: XCircle,
              color: "red",
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vendors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <div className="flex items-center text-sm text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              {filteredRequests.length} of {withdrawalRequests.length} requests
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bank Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.vendor.businessName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.vendor.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatAmount(request.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.paymentMethod.replace("_", " ").toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1 text-gray-400" />
                          {request.bankName}
                        </div>
                        <div className="text-gray-500">
                          {request.accountHolder}
                        </div>
                        <div className="text-gray-500">
                          {request.bankAccount}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">
                          {request.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(request.requestedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {request.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleAction(request, "approved")}
                            className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-lg transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(request, "rejected")}
                            className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-lg transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400">
                          {request.status === "approved"
                            ? "Approved"
                            : "Rejected"}
                          {request.processedAt && (
                            <div className="text-xs">
                              {formatDate(request.processedAt)}
                            </div>
                          )}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No withdrawal requests found</p>
            </div>
          )}
        </div>

        {/* Action Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {actionType === "approved" ? "Approve" : "Reject"} Withdrawal
                Request
              </h3>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Vendor: {selectedRequest?.vendor.businessName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Amount: {formatAmount(selectedRequest?.amount)}
                </p>
                <p className="text-sm text-gray-600">
                  Bank: {selectedRequest?.bankName} -{" "}
                  {selectedRequest?.bankAccount}
                </p>
              </div>

              {actionType === "rejected" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                    actionType === "approved"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {actionType === "approved" ? "Approve" : "Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWithdrawalManagement;
