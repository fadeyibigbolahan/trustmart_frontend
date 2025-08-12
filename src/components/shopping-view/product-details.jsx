import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useNavigate } from "react-router-dom";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();
  const navigate = useNavigate();

  const hasReviews = reviews?.length > 0;
  const averageReview = hasReviews
    ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
    : 0;

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(getReviews(productDetails._id));
    }
  }, [productDetails, dispatch]);

  const handleRatingChange = (value) => setRating(value);

  const handleAddToCart = (productId, totalStock) => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    const items = cartItems?.items || [];
    const existingItem = items.find((item) => item.productId === productId);

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existingItem.quantity} quantity can be added for this item`,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (res) => {
        if (res?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Product added to cart" });
        }
      }
    );
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({ title: "Review added successfully!" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="flex flex-wrap gap-2 md:gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-auto">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg w-full md:w-[45%]">
          <img
            src={productDetails?.images?.[0]}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-[50%]">
          <h1 className="text-xl font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-lg my-2">
            {productDetails?.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <p
              className={`text-xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₦{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-xl font-bold text-muted-foreground">
                ₦{productDetails.salePrice}
              </p>
            )}
          </div>

          {/* Average Rating */}
          <div className="flex items-center gap-2 mt-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* Add to Cart */}
          <div className="my-3">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator />

          {/* Reviews */}
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {hasReviews ? (
                reviews.map((review) => (
                  <div className="flex gap-4" key={review._id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {review?.userName?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="font-bold">{review?.userName}</h3>
                      <StarRatingComponent rating={review?.reviewValue} />
                      <p className="text-muted-foreground">
                        {review?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Reviews</p>
              )}
            </div>

            {/* Write Review (Only if logged in) */}
            {user && (
              <div className="mt-10 flex flex-col gap-2">
                <Label>Write a review</Label>
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
                <Input
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Write a review..."
                />
                <Button onClick={handleAddReview} disabled={!reviewMsg.trim()}>
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
