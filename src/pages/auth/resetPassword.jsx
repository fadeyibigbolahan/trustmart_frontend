import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";

// Example reset password action (you need to implement this in your auth-slice)
import { resetPassword } from "@/store/auth-slice";

const initialState = {
  password: "",
  confirmPassword: "",
};

const resetPasswordControls = [
  {
    name: "password",
    label: "New Password",
    type: "password",
    placeholder: "Enter your new password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter your new password",
  },
];

function ResetPassword() {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { token } = useParams(); // token from URL
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    dispatch(resetPassword({ token, password: formData.password }))
      .then((res) => {
        if (res?.payload?.success) {
          toast({
            title: res.payload.message || "Password reset successful!",
          });
          navigate("/auth/login");
        } else {
          toast({
            title: res.payload?.message || "Failed to reset password",
            variant: "destructive",
          });
        }
      })
      .catch(() => {
        toast({
          title: "An error occurred. Please try again.",
          variant: "destructive",
        });
      });
  }

  // Add password toggle icons
  const modifiedControls = resetPasswordControls.map((control) => {
    if (control.name === "password") {
      return {
        ...control,
        type: showPassword ? "text" : "password",
        endIcon: (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        ),
      };
    }
    if (control.name === "confirmPassword") {
      return {
        ...control,
        type: showConfirmPassword ? "text" : "password",
        endIcon: (
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        ),
      };
    }
    return control;
  });

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reset Your Password
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please enter your new password below.
        </p>
      </div>

      <CommonForm
        formControls={modifiedControls}
        buttonText="Reset Password"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default ResetPassword;
