import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import VendorSideBar from "./sidebar";
import VendorHeader from "./header";
import { useState } from "react";
import axios from "axios";
import { url } from "@/store/api";

function VendorLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}vendors/me`, {
          headers: {
            Authorization: token,
          },
        });
        setVendor(response.data.vendor);
      } catch (error) {
        console.error(
          "Failed to fetch vendor profile:",
          error.response?.data || error.message
        );
      }
    };

    fetchVendor();
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <VendorSideBar
        open={openSidebar}
        setOpen={setOpenSidebar}
        vendor={vendor}
      />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <VendorHeader setOpen={setOpenSidebar} vendor={vendor} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet context={{ vendor }} />
        </main>
      </div>
    </div>
  );
}

export default VendorLayout;
