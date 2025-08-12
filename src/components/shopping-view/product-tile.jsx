import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercentage =
    product?.salePrice > 0
      ? Math.round(
          ((product?.price - product?.salePrice) / product?.price) * 100
        )
      : 0;

  const stockStatus = () => {
    if (product?.totalStock === 0)
      return { text: "Out of Stock", color: "bg-red-500" };
    if (product?.totalStock < 10)
      return {
        text: `Only ${product?.totalStock} left`,
        color: "bg-orange-500",
      };
    if (product?.salePrice > 0)
      return { text: `${discountPercentage}% OFF`, color: "bg-blue-500" };
    return null;
  };

  const status = stockStatus();

  return (
    <Card className="w-full max-w-sm mx-auto group hover:shadow-2xl transition-all duration-300 ease-out transform sm:hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
      {/* Image Container */}
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => handleGetProductDetails(product?._id)}
      >
        {/* Product Image */}
        <div className="relative bg-gray-100">
          <img
            src={
              product?.images[0] ||
              "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg?ga=GA1.1.1967602143.1746956400&semt=ais_hybrid&w=740"
            }
            alt={product?.title}
            className={`w-full h-32 sm:h-32 md:h-56 object-cover transition-all duration-500 sm:group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Status Badge */}
        {status && (
          <Badge
            className={`absolute top-2 left-2 sm:top-3 sm:left-3 ${status.color} text-white border-0 shadow-lg font-semibold px-2 py-1 sm:px-3 text-xs sm:text-sm`}
          >
            {status.text}
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-x-2 sm:group-hover:translate-x-0">
          {/* <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 sm:w-9 sm:h-9 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg border-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart
              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </Button> */}
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 sm:w-9 sm:h-9 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg border-0"
            onClick={(e) => {
              e.stopPropagation();
              handleGetProductDetails(product?._id);
            }}
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </Button>
        </div>

        {/* Quick Add Button */}
        {product?.totalStock > 0 && (
          <Button
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-4 sm:px-6 py-2 text-xs sm:text-sm hidden sm:block"
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoCart(product?._id, product?.totalStock);
            }}
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Quick Add
          </Button>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-3 sm:p-4 md:p-5 space-y-2">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wide truncate max-w-[120px] sm:max-w-none">
            {categoryOptionsMap[product?.category]}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-gray-900 text-xs md:text-sm cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => handleGetProductDetails(product?._id)}
        >
          {product?.title
            ?.toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs md:text-xl font-bold text-gray-900">
            ₦
            {product?.salePrice > 0
              ? product?.salePrice.toLocaleString()
              : product?.price.toLocaleString()}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ₦{product?.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {product?.totalStock > 0 && product?.totalStock < 20 && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    i < Math.min(product?.totalStock / 4, 5)
                      ? "bg-green-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product?.totalStock} in stock
            </span>
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-3 sm:p-4 md:p-5 pt-0">
        {product?.totalStock === 0 ? (
          <Button
            className="w-full bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
            disabled
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base py-2 sm:py-3 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
