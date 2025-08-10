import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "@/store/auth-slice"; // Adjust to your actual action

// Initial state for form
const initialState = {
  email: "",
};

// Form controls for forgot password
const forgotPasswordControls = [
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "Enter your registered email",
    required: true,
  },
];

function AuthForgotPassword() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(sendPasswordResetEmail(formData)).then((data) => {
      console.log("Password reset response", data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Password reset email sent.",
        });
        // navigate("/auth/reset-password");
      } else {
        toast({
          title: data?.payload?.message || "Failed to send reset email.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Forgot your password?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we’ll send you a link to reset your password.
        </p>
      </div>

      <CommonForm
        formControls={forgotPasswordControls}
        buttonText={"Send Reset Link"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <div className="text-center">
        <Link
          to="/auth/login"
          className="text-sm font-medium text-primary hover:underline"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

export default AuthForgotPassword;
