import Footer from "@/components/shopping-view/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <>
      <Card className="p-10">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
        </CardHeader>
        <Button className="mt-5" onClick={() => navigate("/account")}>
          View Orders
        </Button>
      </Card>
      <Footer />
    </>
  );
}

export default PaymentSuccessPage;
