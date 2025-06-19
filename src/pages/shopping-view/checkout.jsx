import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Footer from "@/components/shopping-view/footer";
import { url } from "@/store/api";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // function handleInitiatePaypalPayment() {
  //   if (cartItems.length === 0) {
  //     toast({
  //       title: "Your cart is empty. Please add items to proceed",
  //       variant: "destructive",
  //     });

  //     return;
  //   }
  //   if (currentSelectedAddress === null) {
  //     toast({
  //       title: "Please select one address to proceed.",
  //       variant: "destructive",
  //     });

  //     return;
  //   }

  //   const orderData = {
  //     userId: user?.id,
  //     cartId: cartItems?._id,
  //     cartItems: cartItems.items.map((singleCartItem) => ({
  //       productId: singleCartItem?.productId,
  //       title: singleCartItem?.title,
  //       image: singleCartItem?.image,
  //       price:
  //         singleCartItem?.salePrice > 0
  //           ? singleCartItem?.salePrice
  //           : singleCartItem?.price,
  //       quantity: singleCartItem?.quantity,
  //     })),
  //     addressInfo: {
  //       addressId: currentSelectedAddress?._id,
  //       address: currentSelectedAddress?.address,
  //       city: currentSelectedAddress?.city,
  //       pincode: currentSelectedAddress?.pincode,
  //       phone: currentSelectedAddress?.phone,
  //       notes: currentSelectedAddress?.notes,
  //     },
  //     orderStatus: "pending",
  //     paymentMethod: "paypal",
  //     paymentStatus: "pending",
  //     totalAmount: totalCartAmount,
  //     orderDate: new Date(),
  //     orderUpdateDate: new Date(),
  //     paymentId: "",
  //     payerId: "",
  //   };

  //   dispatch(createNewOrder(orderData)).then((data) => {
  //     console.log(data, "sangam");
  //     if (data?.payload?.success) {
  //       setIsPaymemntStart(true);
  //     } else {
  //       setIsPaymemntStart(false);
  //     }
  //   });
  // }

  async function handleInitiatePayStackPayment() {
    if (!cartItems || !cartItems.items.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    console.log("cartItems", cartItems);

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "Paystack",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    console.log(user, "user");
    console.log(orderData, "orderData");

    try {
      setIsPaymemntStart(true);
      const response = await axios.post(
        `${url}shop/order/initiate-paystack`,
        orderData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      const { authorization_url } = response.data;
      if (authorization_url) {
        window.location.href = authorization_url;
      } else {
        toast({
          title: "Unable to initiate payment",
          variant: "destructive",
        });
        setIsPaymemntStart(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Payment initiation failed.",
        variant: "destructive",
      });
      setIsPaymemntStart(false);
    }
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₦{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePayStackPayment} className="w-full">
              {isPaymentStart ? "Processing Payment..." : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShoppingCheckout;
