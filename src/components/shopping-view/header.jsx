import {
  HousePlug,
  LogOut,
  Menu,
  ShoppingCart,
  Store,
  User,
  UserCog,
  Search,
  ChevronDown,
  ChevronRight,
  Grid3X3,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { use } from "react";
import trustmartlogo from "../../assets/trustmartlogo.png";

// Organized Trustmart categories
const trustmartCategoryGroups = {
  "Fashion & Accessories": [
    { id: "mens-clothing", label: "Men's Clothing" },
    { id: "womens-clothing", label: "Women's Clothing" },
    { id: "footwear", label: "Footwear" },
    { id: "bags-backpacks", label: "Bags & Backpacks" },
    { id: "jewelry-accessories", label: "Jewelry & Accessories" },
    { id: "caps-hats", label: "Caps & Hats" },
    { id: "native-wear", label: "Native Wear & Tailoring" },
  ],
  "Phones & Gadgets": [
    { id: "phones", label: "Phones" },
    { id: "earphones-headsets", label: "Earphones & Headsets" },
    { id: "chargers-powerbanks", label: "Chargers & Power Banks" },
    { id: "watches", label: "Watches" },
    { id: "smartwatches", label: "Smartwatches" },
    { id: "phone-accessories", label: "Phone Accessories" },
    { id: "game-consoles", label: "Game Consoles" },
    { id: "smart-home", label: "Smart Home Devices" },
    { id: "wearable-tech", label: "Wearable Tech" },
  ],
  "Beauty & Personal Care": [
    { id: "skincare", label: "Skincare Products" },
    { id: "hair-products", label: "Hair Products" },
    { id: "wigs-extensions", label: "Wigs & Extensions" },
    { id: "makeup-kits", label: "Makeup Kits" },
    { id: "fragrances", label: "Fragrances & Body Sprays" },
    { id: "barbering-services", label: "Barbering & Hair Styling" },
  ],
  "Academic & Stationery": [
    { id: "textbooks", label: "Handouts & Textbooks" },
    { id: "course-materials", label: "Course Materials" },
    { id: "school-stationery", label: "School Bags & Stationery" },
  ],
  "Home & Room Essentials": [
    { id: "bedsheets-duvets", label: "Bedsheets & Duvets" },
    { id: "curtains", label: "Curtains" },
    { id: "room-decor", label: "Room Décor" },
    { id: "rechargeable-lamps", label: "Rechargeable Lamps" },
    { id: "mini-fans", label: "Mini Fans" },
    { id: "cleaning-supplies", label: "Cleaning Supplies" },
  ],
  "Footwear & Sneakers": [
    { id: "campus-sneakers", label: "Campus Trend Sneakers" },
    { id: "sandals-slides", label: "Sandals & Slides" },
    { id: "custom-footwear", label: "Custom Footwear" },
  ],
  Giftings: [
    { id: "surprise-packages", label: "Surprise Packages" },
    { id: "gift-boxes", label: "Gift Boxes" },
    { id: "customizable-items", label: "Customizable Items" },
    { id: "balloons-decor", label: "Balloons & Decor Items" },
  ],
  "Health & Wellness": [
    { id: "fitness-equipment", label: "Fitness Equipment" },
    { id: "sanitary-hygiene", label: "Sanitary & Hygiene Products" },
  ],
  Electronics: [
    { id: "bluetooth-speakers", label: "Bluetooth Speakers" },
    { id: "rechargeable-fans", label: "Rechargeable Fans" },
    { id: "desk-lamps", label: "Desk Lamps" },
    { id: "mini-appliances", label: "Mini Appliances" },
  ],
  "Religious & Spiritual": [
    { id: "religious-books", label: "Anointing Oils & Books" },
    { id: "bible-covers", label: "Customized Bible Covers" },
    { id: "christian-wear", label: "Christian Tees & Wristbands" },
  ],
  Automotive: [
    { id: "car-accessories", label: "Car Accessories" },
    { id: "car-care", label: "Car Care" },
    { id: "tools", label: "Tools" },
    { id: "garage-organization", label: "Garage Organization" },
  ],
  "Arts & Crafts": [
    { id: "painting-supplies", label: "Painting Supplies" },
    { id: "drawing-tools", label: "Drawing Tools" },
    { id: "crafting-materials", label: "Crafting Materials" },
    { id: "sewing-supplies", label: "Sewing Supplies" },
  ],
  "Pet Products": [
    { id: "pet-food", label: "Pet Food" },
    { id: "pet-toys", label: "Pet Toys" },
    { id: "pet-treats", label: "Pet Treats" },
    { id: "pet-grooming", label: "Pet Grooming" },
    { id: "pet-accessories", label: "Pet Accessories" },
  ],
  "Baby & Kids": [
    { id: "kids-toys", label: "Kids Toys" },
    { id: "kids-clothing", label: "Kids Clothing" },
    { id: "strollers", label: "Strollers" },
    { id: "car-seats", label: "Car Seats" },
    { id: "nursery-furniture", label: "Nursery Furniture" },
  ],
  "Sports & Outdoors": [
    { id: "sports-fitness", label: "Sports Fitness Equipment" },
    { id: "outdoor-gear", label: "Outdoor Gear" },
    { id: "team-sports", label: "Team Sports" },
    { id: "individual-sports", label: "Individual Sports" },
    { id: "athletic-wear", label: "Athletic Wear" },
  ],
  "Home & Kitchen": [
    { id: "kitchen-appliances", label: "Kitchen Appliances" },
    { id: "home-decor", label: "Home Decor" },
    { id: "bed-bath", label: "Bed and Bath" },
    { id: "furniture", label: "Furniture" },
    { id: "outdoor-living", label: "Outdoor Living" },
  ],
};

function CategoriesDropdown() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(categoryId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [categoryId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing")) {
      setSearchParams(new URLSearchParams(`?category=${categoryId}`));
    } else {
      navigate("/listing");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:text-white hover:bg-blue-600"
        >
          <Grid3X3 className="w-4 h-4 mr-2" />
          All Categories
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
        {Object.entries(trustmartCategoryGroups).map(
          ([groupName, categories]) => (
            <div key={groupName}>
              <DropdownMenuLabel className="text-blue-600 font-semibold text-sm">
                {groupName}
              </DropdownMenuLabel>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => handleNavigate(category.id)}
                  className="cursor-pointer text-sm pl-4"
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </div>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MenuItems({ onItemClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const mainMenuItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "products", label: "Products", path: "/listing" },
  ];

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      );
    } else {
      navigate(getCurrentMenuItem.path);
    }

    // Close mobile sheet when menu item is clicked
    if (onItemClick) {
      onItemClick();
    }
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {mainMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer hover:text-blue-200 transition-colors"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
      <div className="hidden lg:block">
        <CategoriesDropdown />
      </div>
    </nav>
  );
}

function MobileCategoriesMenu({ onCategoryClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedGroups, setExpandedGroups] = useState({});

  function handleNavigate(categoryId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [categoryId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing")) {
      setSearchParams(new URLSearchParams(`?category=${categoryId}`));
    } else {
      navigate("/listing");
    }

    // Close the mobile menu after navigation
    if (onCategoryClick) {
      onCategoryClick();
    }
  }

  function toggleGroup(groupName) {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-blue-600">Shop by Category</h3>
      {Object.entries(trustmartCategoryGroups).map(
        ([groupName, categories]) => (
          <div key={groupName} className="space-y-2">
            <div
              className="flex items-center justify-between cursor-pointer py-2 border-b border-blue-100"
              onClick={() => toggleGroup(groupName)}
            >
              <h4 className="font-medium text-blue-600 text-sm">{groupName}</h4>
              {expandedGroups[groupName] ? (
                <ChevronDown className="w-4 h-4 text-blue-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-blue-600" />
              )}
            </div>

            {expandedGroups[groupName] && (
              <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                {categories.map((category) => (
                  <Label
                    key={category.id}
                    onClick={() => handleNavigate(category.id)}
                    className="block text-sm cursor-pointer hover:text-blue-600 transition-colors py-2 border-l-2 border-transparent hover:border-blue-300 pl-3"
                  >
                    {category.label}
                  </Label>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

function HeaderRightContent({ onItemClick }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);

  function handleLogout() {
    dispatch(logoutUser());
    // Close mobile sheet when logging out
    if (onItemClick) {
      onItemClick();
    }
  }

  function handleNavigation(path) {
    navigate(path);
    // Close mobile sheet when navigating
    if (onItemClick) {
      onItemClick();
    }
  }

  function handleCartClick() {
    setOpenCartSheet(true);
    // Don't close mobile sheet when opening cart - let both modals coexist
    // The cart modal will be on top and user can close it independently
  }

  function handleSignInClick() {
    // Close mobile sheet when clicking sign in
    if (onItemClick) {
      onItemClick();
    }
  }

  // Handle cart sheet close independently
  function handleCartSheetClose() {
    setOpenCartSheet(false);
  }

  useEffect(() => {
    console.log("user", user);
    if (user) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch]);

  console.log(cartItems, "sangam");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Desktop version - modal cart */}
      <div className="hidden lg:block">
        <Sheet open={openCartSheet} onOpenChange={handleCartSheetClose}>
          <Button
            onClick={handleCartClick}
            size="icon"
            className="relative bg-white text-[#0057B8] hover:bg-blue-50 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartItems?.items?.length || 0}
            </span>
            <span className="sr-only">User cart</span>
          </Button>
          <UserCartWrapper
            setOpenCartSheet={handleCartSheetClose}
            onCheckout={() => {
              // Close both cart modal and mobile menu when checkout is clicked
              handleCartSheetClose();
              if (onItemClick) {
                onItemClick();
              }
            }}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
      </div>

      {/* Mobile version - direct cart display */}
      <div className="lg:hidden">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-blue-600">Your Cart</h3>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                {cartItems?.items?.length || 0} items
              </span>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-3">
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
              cartItems.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₦{item.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Your cart is empty
              </p>
            )}
          </div>

          {cartItems && cartItems.items && cartItems.items.length > 0 && (
            <div className="pt-3 border-t border-blue-100">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-900">Total:</span>
                <span className="font-bold text-lg text-blue-600">
                  ₦
                  {cartItems.items
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  navigate("/checkout");
                  if (onItemClick) {
                    onItemClick();
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>

      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        {user === null ? (
          <Link to="/auth/login" onClick={handleSignInClick}>
            <div className="flex items-center gap-2 text-sm font-bold hover:text-blue-200 transition-colors">
              <User className="w-4 h-4" />
              Sign In
            </div>
          </Link>
        ) : (
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-white text-[#0057B8] cursor-pointer hover:bg-blue-50 transition-colors">
              <AvatarFallback className="bg-white text-[#0057B8] font-extrabold border-2 border-white">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as <span className="font-semibold">{user?.userName}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleNavigation("/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            My Account
          </DropdownMenuItem>
          {user?.roles?.includes("vendor") ? (
            <DropdownMenuItem
              onClick={() => handleNavigation("/vendor/dashboard")}
            >
              <Store className="mr-2 h-4 w-4" />
              Vendor Dashboard
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleNavigation("/auth/form")}>
              <Store className="mr-2 h-4 w-4" />
              Become a Vendor
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleItemClick = () => {
    setIsSheetOpen(false);
  };

  const handleSearchClick = () => {
    navigate("/search");
    setIsSheetOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[#0057B8] text-white shadow-lg">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            src={trustmartlogo}
            className="w-8 lg:w-[50px]"
            alt="Trustmart Logo"
          />
          <span className="font-bold text-lg lg:text-xl">Trustmart</span>
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="text-[#0057B8] bg-white hover:bg-blue-50 transition-colors h-8 w-8"
            onClick={handleSearchClick}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="text-[#0057B8] bg-white hover:bg-blue-50 transition-colors h-8 w-8"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full max-w-sm overflow-y-auto"
            >
              <div className="space-y-6">
                <MenuItems onItemClick={handleItemClick} />
                <MobileCategoriesMenu onCategoryClick={handleItemClick} />
                <HeaderRightContent onItemClick={handleItemClick} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
