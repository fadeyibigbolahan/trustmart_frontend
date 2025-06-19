import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import shopPlaceholder from "../../assets/shopplaceholder.jpg";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/vendor/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/vendor/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/vendor/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function VendorSideBar({ open, setOpen, vendor }) {
  const navigate = useNavigate();

  console.log("Vendor Sidebar Rendered", vendor);

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-3 mt-5 mb-5">
                <div className="w-[50px] h-[50px] bg-muted rounded-full overflow-hidden">
                  <img
                    src={vendor?.logo || shopPlaceholder}
                    alt={vendor?.storeName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <h1 className="text-lg font-extrabold">
                    {vendor?.storeName}
                  </h1>
                  {vendor && (
                    <p className="text-sm text-muted-foreground">
                      {vendor.isApproved ? "Approved" : "Pending"}
                    </p>
                  )}
                </div>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/vendor/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="w-[50px] h-[50px] bg-muted rounded-full overflow-hidden">
            <img
              src={vendor?.logo || shopPlaceholder}
              alt={vendor?.storeName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-lg font-extrabold">{vendor?.storeName}</h1>
              {vendor && (
                <p className="text-sm text-muted-foreground">
                  {vendor.isApproved ? "Approved" : "Pending"}
                </p>
              )}
            </div>
          </div>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default VendorSideBar;
