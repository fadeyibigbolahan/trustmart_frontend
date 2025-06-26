import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Remove confirmPassword from the data sent to the server
    const { confirmPassword, ...submitData } = formData;

    dispatch(registerUser(submitData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  // Add confirm password field and modify password fields with toggle
  const modifiedFormControls = [
    ...registerFormControls.map((control) => {
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
      return control;
    }),
    // Add confirm password field
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      componentType: "input",
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
    },
  ];

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Password match validation message */}
      {formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            Passwords do not match
          </div>
        )}

      <CommonForm
        formControls={modifiedFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
