export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "school",
    label: "School",
    placeholder: "Enter your school name",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    name: "imageFiles",
    label: "Product Image(s)",
    componentType: "image",
    multiple: true, // or true if you support multiple
  },
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "mens-clothing", label: "Men's Clothing" },
      { id: "womens-clothing", label: "Women's Clothing" },
      { id: "footwear", label: "Footwear (Sneakers, Slides, etc.)" },
      { id: "bags-backpacks", label: "Bags & Backpacks" },
      { id: "jewelry-accessories", label: "Jewelry & Accessories" },
      { id: "caps-hats", label: "Caps & Hats" },
      { id: "native-wear", label: "Native Wear & Tailoring" },
      { id: "phones", label: "Phones" },
      { id: "earphones-headsets", label: "Earphones & Headsets" },
      { id: "chargers-powerbanks", label: "Chargers & Power Banks" },
      { id: "watches", label: "Watches" },
      { id: "smartwatches", label: "Smartwatches" },
      { id: "phone-accessories", label: "Phone Accessories" },
      { id: "game-consoles", label: "Game Consoles" },
      { id: "smart-home", label: "Smart Home Devices" },
      { id: "wearable-tech", label: "Wearable Tech" },
      { id: "skincare", label: "Skincare Products" },
      { id: "hair-products", label: "Hair Products" },
      { id: "wigs-extensions", label: "Wigs & Extensions" },
      { id: "makeup-kits", label: "Makeup Kits" },
      { id: "fragrances", label: "Fragrances & Body Sprays" },
      { id: "barbering-services", label: "Barbering & Hair Styling" },
      { id: "textbooks", label: "Handouts & Textbooks" },
      { id: "course-materials", label: "Course Materials" },
      { id: "school-stationery", label: "School Bags & Stationery" },
      { id: "bedsheets-duvets", label: "Bedsheets & Duvets" },
      { id: "curtains", label: "Curtains" },
      { id: "room-decor", label: "Room Décor" },
      { id: "rechargeable-lamps", label: "Rechargeable Lamps" },
      { id: "mini-fans", label: "Mini Fans" },
      { id: "cleaning-supplies", label: "Cleaning Supplies" },
      { id: "campus-sneakers", label: "Campus Trend Sneakers" },
      { id: "sandals-slides", label: "Sandals & Slides" },
      { id: "custom-footwear", label: "Custom Footwear" },
      { id: "surprise-packages", label: "Surprise Packages" },
      { id: "gift-boxes", label: "Gift Boxes" },
      { id: "customizable-items", label: "Customizable Items" },
      { id: "balloons-decor", label: "Balloons & Decor Items" },
      { id: "fitness-equipment", label: "Fitness Equipment" },
      { id: "sanitary-hygiene", label: "Sanitary & Hygiene Products" },
      { id: "bluetooth-speakers", label: "Bluetooth Speakers" },
      { id: "rechargeable-fans", label: "Rechargeable Fans" },
      { id: "desk-lamps", label: "Desk Lamps" },
      { id: "mini-appliances", label: "Mini Appliances" },
      { id: "religious-books", label: "Anointing Oils & Books" },
      { id: "bible-covers", label: "Customized Bible Covers" },
      { id: "christian-wear", label: "Christian Tees & Wristbands" },
      { id: "car-accessories", label: "Car Accessories" },
      { id: "car-care", label: "Car Care" },
      { id: "tools", label: "Tools" },
      { id: "garage-organization", label: "Garage Organization" },
      { id: "painting-supplies", label: "Painting Supplies" },
      { id: "drawing-tools", label: "Drawing Tools" },
      { id: "crafting-materials", label: "Crafting Materials" },
      { id: "sewing-supplies", label: "Sewing Supplies" },
      { id: "pet-food", label: "Pet Food" },
      { id: "pet-toys", label: "Pet Toys" },
      { id: "pet-treats", label: "Pet Treats" },
      { id: "pet-grooming", label: "Pet Grooming" },
      { id: "pet-accessories", label: "Pet Accessories" },
      { id: "kids-toys", label: "Kids Toys" },
      { id: "kids-clothing", label: "Kids Clothing" },
      { id: "strollers", label: "Strollers" },
      { id: "car-seats", label: "Car Seats" },
      { id: "nursery-furniture", label: "Nursery Furniture" },
      { id: "sports-fitness", label: "Sports Fitness Equipment" },
      { id: "outdoor-gear", label: "Outdoor Gear" },
      { id: "team-sports", label: "Team Sports" },
      { id: "individual-sports", label: "Individual Sports" },
      { id: "athletic-wear", label: "Athletic Wear" },
      { id: "kitchen-appliances", label: "Kitchen Appliances" },
      { id: "home-decor", label: "Home Decor" },
      { id: "bed-bath", label: "Bed and Bath" },
      { id: "furniture", label: "Furniture" },
      { id: "outdoor-living", label: "Outdoor Living" },
    ],
  },
  // {
  //   label: "Brand",
  //   name: "brand",
  //   componentType: "select",
  //   options: [
  //     { id: "nike", label: "Nike" },
  //     { id: "adidas", label: "Adidas" },
  //     { id: "puma", label: "Puma" },
  //     { id: "levi", label: "Levi's" },
  //     { id: "zara", label: "Zara" },
  //     { id: "h&m", label: "H&M" },
  //   ],
  // },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  // Fashion & Accessories
  {
    id: "mens-clothing",
    label: "Men's Clothing",
    path: "/listing",
  },
  {
    id: "womens-clothing",
    label: "Women's Clothing",
    path: "/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/listing",
  },
  {
    id: "bags-backpacks",
    label: "Bags & Backpacks",
    path: "/listing",
  },
  {
    id: "jewelry-accessories",
    label: "Jewelry & Accessories",
    path: "/listing",
  },
  {
    id: "caps-hats",
    label: "Caps & Hats",
    path: "/listing",
  },
  {
    id: "native-wear",
    label: "Native Wear & Tailoring",
    path: "/listing",
  },
  // Phones & Gadgets
  {
    id: "phones",
    label: "Phones",
    path: "/listing",
  },
  {
    id: "earphones-headsets",
    label: "Earphones & Headsets",
    path: "/listing",
  },
  {
    id: "chargers-powerbanks",
    label: "Chargers & Power Banks",
    path: "/listing",
  },
  {
    id: "watches",
    label: "Watches",
    path: "/listing",
  },
  {
    id: "smartwatches",
    label: "Smartwatches",
    path: "/listing",
  },
  {
    id: "phone-accessories",
    label: "Phone Accessories",
    path: "/listing",
  },
  {
    id: "game-consoles",
    label: "Game Consoles",
    path: "/listing",
  },
  {
    id: "smart-home",
    label: "Smart Home Devices",
    path: "/listing",
  },
  {
    id: "wearable-tech",
    label: "Wearable Tech",
    path: "/listing",
  },
  // Beauty & Personal Care
  {
    id: "skincare",
    label: "Skincare Products",
    path: "/listing",
  },
  {
    id: "hair-products",
    label: "Hair Products",
    path: "/listing",
  },
  {
    id: "wigs-extensions",
    label: "Wigs & Extensions",
    path: "/listing",
  },
  {
    id: "makeup-kits",
    label: "Makeup Kits",
    path: "/listing",
  },
  {
    id: "fragrances",
    label: "Fragrances & Body Sprays",
    path: "/listing",
  },
  {
    id: "barbering-services",
    label: "Barbering & Hair Styling",
    path: "/listing",
  },
  // Academic & Stationery
  {
    id: "textbooks",
    label: "Handouts & Textbooks",
    path: "/listing",
  },
  {
    id: "course-materials",
    label: "Course Materials",
    path: "/listing",
  },
  {
    id: "school-stationery",
    label: "School Bags & Stationery",
    path: "/listing",
  },
  // Home & Room Essentials
  {
    id: "bedsheets-duvets",
    label: "Bedsheets & Duvets",
    path: "/listing",
  },
  {
    id: "curtains",
    label: "Curtains",
    path: "/listing",
  },
  {
    id: "room-decor",
    label: "Room Décor",
    path: "/listing",
  },
  {
    id: "rechargeable-lamps",
    label: "Rechargeable Lamps",
    path: "/listing",
  },
  {
    id: "mini-fans",
    label: "Mini Fans",
    path: "/listing",
  },
  {
    id: "cleaning-supplies",
    label: "Cleaning Supplies",
    path: "/listing",
  },
  // Footwear & Sneakers
  {
    id: "campus-sneakers",
    label: "Campus Trend Sneakers",
    path: "/listing",
  },
  {
    id: "sandals-slides",
    label: "Sandals & Slides",
    path: "/listing",
  },
  {
    id: "custom-footwear",
    label: "Custom Footwear",
    path: "/listing",
  },
  // Giftings
  {
    id: "surprise-packages",
    label: "Surprise Packages",
    path: "/listing",
  },
  {
    id: "gift-boxes",
    label: "Gift Boxes",
    path: "/listing",
  },
  {
    id: "customizable-items",
    label: "Customizable Items",
    path: "/listing",
  },
  {
    id: "balloons-decor",
    label: "Balloons & Decor Items",
    path: "/listing",
  },
  // Health & Wellness
  {
    id: "fitness-equipment",
    label: "Fitness Equipment",
    path: "/listing",
  },
  {
    id: "sanitary-hygiene",
    label: "Sanitary & Hygiene Products",
    path: "/listing",
  },
  // Electronics
  {
    id: "bluetooth-speakers",
    label: "Bluetooth Speakers",
    path: "/listing",
  },
  {
    id: "rechargeable-fans",
    label: "Rechargeable Fans",
    path: "/listing",
  },
  {
    id: "desk-lamps",
    label: "Desk Lamps",
    path: "/listing",
  },
  {
    id: "mini-appliances",
    label: "Mini Appliances",
    path: "/listing",
  },
  // Religious & Spiritual
  {
    id: "religious-books",
    label: "Anointing Oils & Books",
    path: "/listing",
  },
  {
    id: "bible-covers",
    label: "Customized Bible Covers",
    path: "/listing",
  },
  {
    id: "christian-wear",
    label: "Christian Tees & Wristbands",
    path: "/listing",
  },
  // Automotive
  {
    id: "car-accessories",
    label: "Car Accessories",
    path: "/listing",
  },
  {
    id: "car-care",
    label: "Car Care",
    path: "/listing",
  },
  {
    id: "tools",
    label: "Tools",
    path: "/listing",
  },
  {
    id: "garage-organization",
    label: "Garage Organization",
    path: "/listing",
  },
  // Arts and Crafts
  {
    id: "painting-supplies",
    label: "Painting Supplies",
    path: "/listing",
  },
  {
    id: "drawing-tools",
    label: "Drawing Tools",
    path: "/listing",
  },
  {
    id: "crafting-materials",
    label: "Crafting Materials",
    path: "/listing",
  },
  {
    id: "sewing-supplies",
    label: "Sewing Supplies",
    path: "/listing",
  },
  // Pet Products
  {
    id: "pet-food",
    label: "Pet Food",
    path: "/listing",
  },
  {
    id: "pet-toys",
    label: "Pet Toys",
    path: "/listing",
  },
  {
    id: "pet-treats",
    label: "Pet Treats",
    path: "/listing",
  },
  {
    id: "pet-grooming",
    label: "Pet Grooming",
    path: "/listing",
  },
  {
    id: "pet-accessories",
    label: "Pet Accessories",
    path: "/listing",
  },
  // Baby and Kids
  {
    id: "kids-toys",
    label: "Kids Toys",
    path: "/listing",
  },
  {
    id: "kids-clothing",
    label: "Kids Clothing",
    path: "/listing",
  },
  {
    id: "strollers",
    label: "Strollers",
    path: "/listing",
  },
  {
    id: "car-seats",
    label: "Car Seats",
    path: "/listing",
  },
  {
    id: "nursery-furniture",
    label: "Nursery Furniture",
    path: "/listing",
  },
  // Sports and Outdoors
  {
    id: "sports-fitness",
    label: "Sports Fitness Equipment",
    path: "/listing",
  },
  {
    id: "outdoor-gear",
    label: "Outdoor Gear",
    path: "/listing",
  },
  {
    id: "team-sports",
    label: "Team Sports",
    path: "/listing",
  },
  {
    id: "individual-sports",
    label: "Individual Sports",
    path: "/listing",
  },
  {
    id: "athletic-wear",
    label: "Athletic Wear",
    path: "/listing",
  },
  // Home and Kitchen
  {
    id: "kitchen-appliances",
    label: "Kitchen Appliances",
    path: "/listing",
  },
  {
    id: "home-decor",
    label: "Home Decor",
    path: "/listing",
  },
  {
    id: "bed-bath",
    label: "Bed and Bath",
    path: "/listing",
  },
  {
    id: "furniture",
    label: "Furniture",
    path: "/listing",
  },
  {
    id: "outdoor-living",
    label: "Outdoor Living",
    path: "/listing",
  },
];

export const categoryOptionsMap = {
  // Fashion & Accessories
  "mens-clothing": "Men's Clothing",
  "womens-clothing": "Women's Clothing",
  footwear: "Footwear (Sneakers, Slides, etc.)",
  "bags-backpacks": "Bags & Backpacks",
  "jewelry-accessories": "Jewelry & Accessories",
  "caps-hats": "Caps & Hats",
  "native-wear": "Native Wear & Tailoring",

  // Phones & Gadgets
  phones: "Phones",
  "earphones-headsets": "Earphones, AirPods, Headsets",
  "chargers-powerbanks": "Chargers, Power Banks",
  watches: "Watches",
  smartwatches: "Smartwatches",
  "phone-accessories": "Phone Accessories",
  "game-consoles": "Game Consoles",
  "smart-home": "Smart Home Devices",
  "wearable-tech": "Wearable Tech",

  // Beauty & Personal Care
  skincare: "Skincare Products",
  "hair-products": "Hair Products",
  "wigs-extensions": "Wigs & Extensions",
  "makeup-kits": "Makeup Kits",
  fragrances: "Fragrances & Body Sprays",
  "barbering-services": "Barbering & Hair Styling Services",

  // Academic & Stationery
  textbooks: "Handouts & Textbooks",
  "course-materials": "Course Materials",
  "school-stationery": "School Bags & Stationery",

  // Home & Room Essentials
  "bedsheets-duvets": "Bedsheets & Duvets",
  curtains: "Curtains",
  "room-decor": "Room Décor",
  "rechargeable-lamps": "Rechargeable Lamps",
  "mini-fans": "Mini Fans",
  "cleaning-supplies": "Cleaning Supplies",

  // Footwear & Sneakers (if separate from fashion)
  "campus-sneakers": "Campus Trend Sneakers",
  "sandals-slides": "Sandals & Slides",
  "custom-footwear": "Custom Footwear",

  // Giftings
  "surprise-packages": "Surprise Packages",
  "gift-boxes": "Gift Boxes",
  "customizable-items": "Customizable Items",
  "balloons-decor": "Balloons & Decor Items",

  // Health & Wellness
  "fitness-equipment": "Fitness Equipment",
  "sanitary-hygiene": "Sanitary & Hygiene Products",

  // Electronics
  "bluetooth-speakers": "Bluetooth Speakers",
  "rechargeable-fans": "Rechargeable Fans",
  "desk-lamps": "Desk Lamps",
  "mini-appliances": "Mini Appliances",

  // Religious & Spiritual
  "religious-books": "Anointing Oils, Books, Journals",
  "bible-covers": "Customized Bible Covers",
  "christian-wear": "Christian Tees & Wristbands",

  // Automotive
  "car-accessories": "Car Accessories",
  "car-care": "Car Care",
  tools: "Tools",
  "garage-organization": "Garage Organization",

  // Arts and Crafts
  "painting-supplies": "Painting Supplies",
  "drawing-tools": "Drawing Tools",
  "crafting-materials": "Crafting Materials",
  "sewing-supplies": "Sewing Supplies",

  // Pet Products
  "pet-food": "Pet Food",
  "pet-toys": "Pet Toys",
  "pet-treats": "Pet Treats",
  "pet-grooming": "Pet Grooming",
  "pet-accessories": "Pet Accessories",

  // Baby and Kids
  "kids-toys": "Kids Toys",
  "kids-clothing": "Kids Clothing",
  strollers: "Strollers",
  "car-seats": "Car Seats",
  "nursery-furniture": "Nursery Furniture",

  // Sports and Outdoors
  "sports-fitness": "Sports Fitness Equipment",
  "outdoor-gear": "Outdoor Gear (Tents, Sleeping Bags, etc.)",
  "team-sports": "Team Sports",
  "individual-sports": "Individual Sports",
  "athletic-wear": "Athletic Wear",

  // Home and Kitchen
  "kitchen-appliances": "Kitchen Appliances",
  "home-decor": "Home Decor",
  "bed-bath": "Bed and Bath",
  furniture: "Furniture",
  "outdoor-living": "Outdoor Living",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "mens-clothing", label: "Men's Clothing" },
    { id: "womens-clothing", label: "Women's Clothing" },
    { id: "footwear", label: "Footwear (Sneakers, Slides, etc.)" },
    { id: "bags-backpacks", label: "Bags & Backpacks" },
    { id: "jewelry-accessories", label: "Jewelry & Accessories" },
    { id: "caps-hats", label: "Caps & Hats" },
    { id: "native-wear", label: "Native Wear & Tailoring" },
    { id: "phones", label: "Phones" },
    { id: "earphones-headsets", label: "Earphones & Headsets" },
    { id: "chargers-powerbanks", label: "Chargers & Power Banks" },
    { id: "watches", label: "Watches" },
    { id: "smartwatches", label: "Smartwatches" },
    { id: "phone-accessories", label: "Phone Accessories" },
    { id: "game-consoles", label: "Game Consoles" },
    { id: "smart-home", label: "Smart Home Devices" },
    { id: "wearable-tech", label: "Wearable Tech" },
    { id: "skincare", label: "Skincare Products" },
    { id: "hair-products", label: "Hair Products" },
    { id: "wigs-extensions", label: "Wigs & Extensions" },
    { id: "makeup-kits", label: "Makeup Kits" },
    { id: "fragrances", label: "Fragrances & Body Sprays" },
    { id: "barbering-services", label: "Barbering & Hair Styling" },
    { id: "textbooks", label: "Handouts & Textbooks" },
    { id: "course-materials", label: "Course Materials" },
    { id: "school-stationery", label: "School Bags & Stationery" },
    { id: "bedsheets-duvets", label: "Bedsheets & Duvets" },
    { id: "curtains", label: "Curtains" },
    { id: "room-decor", label: "Room Décor" },
    { id: "rechargeable-lamps", label: "Rechargeable Lamps" },
    { id: "mini-fans", label: "Mini Fans" },
    { id: "cleaning-supplies", label: "Cleaning Supplies" },
    { id: "campus-sneakers", label: "Campus Trend Sneakers" },
    { id: "sandals-slides", label: "Sandals & Slides" },
    { id: "custom-footwear", label: "Custom Footwear" },
    { id: "surprise-packages", label: "Surprise Packages" },
    { id: "gift-boxes", label: "Gift Boxes" },
    { id: "customizable-items", label: "Customizable Items" },
    { id: "balloons-decor", label: "Balloons & Decor Items" },
    { id: "fitness-equipment", label: "Fitness Equipment" },
    { id: "sanitary-hygiene", label: "Sanitary & Hygiene Products" },
    { id: "bluetooth-speakers", label: "Bluetooth Speakers" },
    { id: "rechargeable-fans", label: "Rechargeable Fans" },
    { id: "desk-lamps", label: "Desk Lamps" },
    { id: "mini-appliances", label: "Mini Appliances" },
    { id: "religious-books", label: "Anointing Oils & Books" },
    { id: "bible-covers", label: "Customized Bible Covers" },
    { id: "christian-wear", label: "Christian Tees & Wristbands" },
    { id: "car-accessories", label: "Car Accessories" },
    { id: "car-care", label: "Car Care" },
    { id: "tools", label: "Tools" },
    { id: "garage-organization", label: "Garage Organization" },
    { id: "painting-supplies", label: "Painting Supplies" },
    { id: "drawing-tools", label: "Drawing Tools" },
    { id: "crafting-materials", label: "Crafting Materials" },
    { id: "sewing-supplies", label: "Sewing Supplies" },
    { id: "pet-food", label: "Pet Food" },
    { id: "pet-toys", label: "Pet Toys" },
    { id: "pet-treats", label: "Pet Treats" },
    { id: "pet-grooming", label: "Pet Grooming" },
    { id: "pet-accessories", label: "Pet Accessories" },
    { id: "kids-toys", label: "Kids Toys" },
    { id: "kids-clothing", label: "Kids Clothing" },
    { id: "strollers", label: "Strollers" },
    { id: "car-seats", label: "Car Seats" },
    { id: "nursery-furniture", label: "Nursery Furniture" },
    { id: "sports-fitness", label: "Sports Fitness Equipment" },
    { id: "outdoor-gear", label: "Outdoor Gear" },
    { id: "team-sports", label: "Team Sports" },
    { id: "individual-sports", label: "Individual Sports" },
    { id: "athletic-wear", label: "Athletic Wear" },
    { id: "kitchen-appliances", label: "Kitchen Appliances" },
    { id: "home-decor", label: "Home Decor" },
    { id: "bed-bath", label: "Bed and Bath" },
    { id: "furniture", label: "Furniture" },
    { id: "outdoor-living", label: "Outdoor Living" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
