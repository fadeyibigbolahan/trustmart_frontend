import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { url } from "@/store/api";

const VendorForm = () => {
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [businessCertificate, setBusinessCertificate] = useState(null);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bank list from your backend (which fetches from Paystack)
    const fetchBanks = async () => {
      try {
        const res = await axios.get(`${url}paystack/banks`);
        setBanks(res.data || []);
      } catch (err) {
        console.error("Failed to load banks", err);
      }
    };
    fetchBanks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("storeName", storeName);
      formData.append("storeDescription", storeDescription);
      formData.append("bankCode", bankCode);
      formData.append("accountNumber", accountNumber);
      if (logo) formData.append("logo", logo);
      if (businessCertificate)
        formData.append("businessCertificate", businessCertificate);

      const response = await axios.post(`${url}vendors/register`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({ title: response.data.message || "Vendor registered!" });
      setStoreName("");
      setStoreDescription("");
      setBankCode("");
      setAccountNumber("");
      setLogo(null);
      setBusinessCertificate(null);
      navigate("/vendor/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save vendor.");
      toast({
        title: err.response?.data?.message || "Failed to save vendor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded"
      encType="multipart/form-data"
    >
      <h2 className="text-xl mb-4">Vendor Form</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <label className="block mb-2">
        Store Name:
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        Store Description:
        <textarea
          value={storeDescription}
          onChange={(e) => setStoreDescription(e.target.value)}
          rows={4}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        Bank:
        <select
          value={bankCode}
          onChange={(e) => setBankCode(e.target.value)}
          required
          className="w-full border p-2 rounded mt-1"
        >
          <option value="">Select Bank</option>
          {banks.map((bank) => (
            <option key={bank.code} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Account Number:
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
          maxLength={10}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        Business Logo:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          className="w-full mt-1"
        />
      </label>

      <label className="block mb-4">
        Business Registration Certificate:
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setBusinessCertificate(e.target.files[0])}
          className="w-full mt-1"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Vendor"}
      </button>
    </form>
  );
};

export default VendorForm;
