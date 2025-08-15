import React, { useState, useEffect } from "react";
import { CreditCard, AlertCircle, CheckCircle, Info } from "lucide-react";
import axios from "axios";
import { url } from "@/store/api";

const VendorWithdrawal = () => {
  const [formData, setFormData] = useState({
    amount: "",
    bankAccount: "",
    accountHolder: "",
    bankName: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [vendorData, setVendorData] = useState({ balance: 0 }); // Mock data for demo

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
          console.log("Withdrawal Profile Data:", data);
          setVendorData(data.vendor);
        };
        fetchVendorData();
      } catch (error) {
        console.error("Failed to fetch vendor profile:", error.message);
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  const processingTime = "3-5 business days";
  const lastWithdrawal = "2024-07-28";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    } else if (parseFloat(formData.amount) > vendorData.balance) {
      newErrors.amount = "Amount exceeds available balance";
    }

    if (!formData.bankAccount)
      newErrors.bankAccount = "Bank account number is required";
    if (!formData.accountHolder)
      newErrors.accountHolder = "Account holder name is required";
    if (!formData.bankName) newErrors.bankName = "Bank name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${url}vendors/me/withdrawals`, // <-- Adjust to your actual backend endpoint
          {
            amount: parseFloat(formData.amount),
            bankAccount: formData.bankAccount,
            accountHolder: formData.accountHolder,
            bankName: formData.bankName,
            note: formData.notes,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Withdrawal request successful:", response.data);

        // Optionally, update vendor data locally after successful request
        setVendorData((prev) => ({
          ...prev,
          balance: prev.balance - parseFloat(formData.amount),
        }));

        setIsSubmitted(true);
      } catch (error) {
        console.error(
          "Withdrawal request failed:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.message ||
            "An error occurred while submitting your withdrawal request."
        );
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="w-full mx-auto px-2">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Withdrawal Request Submitted
            </h2>
            <p className="text-gray-600 mb-6">
              Your withdrawal request for ₦
              {parseFloat(formData.amount).toFixed(2)} has been submitted
              successfully.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center text-blue-800">
                <Info className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  Processing Time: {processingTime}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 text-xs">
      <div className="w-full mx-auto px-2">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Withdrawal Request
          </h1>
          <p className="text-gray-600">
            Request to withdraw your available earnings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Balance Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                Account Balance
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Balance</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₦{vendorData?.balance?.toLocaleString() || "0.00"}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Last Withdrawal</span>
                    <span className="text-gray-700">{lastWithdrawal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Withdrawal Information</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Processing time: {processingTime}</li>
                    <li>• No withdrawal fees</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-2">
              <div className="space-y-6">
                {/* Amount */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      ₦
                    </div>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      max={vendorData?.balance || 0}
                      className={`block w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.amount ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.amount}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: vendorData.balance.toString(),
                      }))
                    }
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Withdraw full amount (₦
                    {vendorData?.balance?.toLocaleString() || 0})
                  </button>
                </div>

                {/* Bank Transfer Fields */}
                <div className="space-y-4 bg-gray-50 p-2 rounded-lg">
                  <div>
                    <label
                      htmlFor="accountHolder"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      id="accountHolder"
                      name="accountHolder"
                      value={formData.accountHolder}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.accountHolder
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter account holder name"
                    />
                    {errors.accountHolder && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.accountHolder}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="bankName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.bankName ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter bank name"
                    />
                    {errors.bankName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.bankName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="bankAccount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      id="bankAccount"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.bankAccount
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Account number"
                    />
                    {errors.bankAccount && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.bankAccount}
                      </p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional information or special instructions..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Submit Withdrawal Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorWithdrawal;
