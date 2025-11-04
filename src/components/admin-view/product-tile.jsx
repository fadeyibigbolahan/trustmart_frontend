import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Edit, Trash2, Store, User, Package } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const hasSale = product?.salePrice > 0;
  const discountPercentage = hasSale
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Image Section with Overlay Badges */}
      <div className="relative group">
        <img
          src={product?.images[0]}
          alt={product?.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top Right Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasSale && (
            <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-bold">
              -{discountPercentage}%
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="bg-black/80 text-white px-2 py-1 text-xs"
          >
            {product?.category}
          </Badge>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <Badge
            className={`px-2 py-1 text-xs ${
              product.totalStock > 10
                ? "bg-green-500 text-white"
                : product.totalStock > 0
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <Package className="w-3 h-3 mr-1" />
            {product.totalStock} in stock
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Title */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
          {product?.title}
        </h2>

        {/* Product Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {product?.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-4">
          {hasSale ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                ₦{product.salePrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₦{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ₦{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Vendor Information */}
        {product?.vendor && (
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center gap-3 mb-2">
              {product.vendor.logo ? (
                <img
                  src={product.vendor.logo}
                  alt={product.vendor.storeName}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Store className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {product.vendor.storeName}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span className="truncate">
                    {product.vendor.user?.userName}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge
                variant={product.vendor.isApproved ? "default" : "secondary"}
                className={`text-xs ${
                  product.vendor.isApproved
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                }`}
              >
                {product.vendor.isApproved ? "✓ Approved" : "Pending Approval"}
              </Badge>

              {product.vendor.balance > 0 && (
                <span className="text-xs text-blue-600 font-medium">
                  Balance: ₦{product.vendor.balance.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData({
              imageFiles: product.images || [],
              title: product.title || "",
              description: product.description || "",
              category: product.category || "",
              brand: product.brand || "",
              price: product.price || "",
              salePrice: product.salePrice || "",
              totalStock: product.totalStock || "",
              averageReview: product.averageReview || 0,
            });
          }}
          className="flex-1 gap-2"
          variant="outline"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(product?._id)}
          className="gap-2"
          variant="destructive"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
