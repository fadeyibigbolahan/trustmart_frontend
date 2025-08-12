import { Button } from "@/components/ui/button";
import heroOne from "../../assets/hero1.webp";
import heroTwo from "../../assets/hero2.webp";
import heroThree from "../../assets/hero3.webp";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import Footer from "@/components/shopping-view/footer";

const fImageList = [
  {
    image: heroOne,
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
  },
  {
    image: heroTwo,
    title: "Winter Collection",
    description: "New arrivals for the winter season",
  },
  {
    image: heroThree,
    title: "Spring Clearance",
    description: "Clearance sale on spring collection",
  },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % fImageList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full lg:h-[600px] md:h-[300px] h-[180px] overflow-hidden">
        {fImageList.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.title}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {fImageList.length > 0 && (
          <>
            <Button
              variant="outline"
              size="small"
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + fImageList.length) % fImageList.length
                )
              }
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % fImageList.length)
              }
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productList?.length > 0 &&
              productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem.id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      <Footer />
    </div>
  );
}

export default ShoppingHome;
