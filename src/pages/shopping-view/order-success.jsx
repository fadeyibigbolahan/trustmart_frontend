import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/store/api";

const OrderSuccessPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Manually extract reference from URL (since it's before the hash)
  const extractReference = () => {
    const match = window.location.href.match(/[?&]reference=([^&]+)/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const reference = extractReference();
    if (!reference) return setLoading(false);

    const verifyTransaction = async () => {
      try {
        const response = await axios.get(
          `${url}shop/order/verify?reference=${reference}`
        );
        setOrder(response.data.order);
      } catch (error) {
        console.error("Verification failed:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyTransaction();
  }, []);

  if (loading) return <p>Verifying payment...</p>;
  if (!order) return <p>Could not verify your payment.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto mt-16">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Order Successful!
      </h1>
      <p className="mb-2">Order ID: {order._id}</p>
      <p className="mb-2">Status: {order.orderStatus}</p>
      <p className="mb-2">Total Amount: ₦{order.totalAmount}</p>

      <h2 className="mt-4 font-semibold">Items:</h2>
      <ul className="list-disc ml-6">
        {order.cartItems.map((item, i) => (
          <li key={i}>
            {item.title} — ₦{item.price} × {item.quantity}
          </li>
        ))}
      </ul>

      <h2 className="mt-4 font-semibold">Delivery Address:</h2>
      <p>
        {order.addressInfo?.address}, {order.addressInfo?.city}
      </p>
      <p>Phone: {order.addressInfo?.phone}</p>
    </div>
  );
};

export default OrderSuccessPage;
