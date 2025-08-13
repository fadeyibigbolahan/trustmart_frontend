import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchVendorProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { url } from "@/store/api";

const initialFormData = {
  imageFiles: [],
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function VendorProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  // const { vendor } = useOutletContext();
  const [vendor, setVendor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true); // start loading

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "imageFiles") {
        if (Array.isArray(value)) {
          value.forEach((file) => formPayload.append("images", file));
        } else if (value) {
          formPayload.append("image", value);
        }
      } else {
        formPayload.append(key, value);
      }
    });

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData: formPayload }))
        .then((data) => {
          setIsSubmitting(false); // stop loading
          if (data?.payload?.success) {
            dispatch(fetchVendorProducts(vendor._id));
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            toast({
              title: "✅ Product updated successfully",
              variant: "default",
            });
          } else {
            toast({
              title: "❌ Failed to update product",
              description: data?.payload?.message || "Please try again.",
              variant: "destructive",
            });
          }
        })
        .catch(() => {
          setIsSubmitting(false);
          toast({
            title: "❌ Error updating product",
            description: "Something went wrong.",
            variant: "destructive",
          });
        });
    } else {
      dispatch(addNewProduct(formPayload))
        .then((data) => {
          setIsSubmitting(false); // stop loading
          if (data?.payload?.success) {
            dispatch(fetchVendorProducts(vendor._id));
            setOpenCreateProductsDialog(false);
            setFormData(initialFormData);
            toast({ title: "Product added successfully", variant: "default" });
          } else {
            console.log("Failed to add product:", data);
            toast({
              title: "Failed to add product",
              description: data.payload?.message || "An unknown error occurred",
              variant: "destructive",
            });
          }
        })
        .catch(() => {
          setIsSubmitting(false);
          toast({
            title: "Error adding product",
            description: "Something went wrong.",
            variant: "destructive",
          });
        });
    }
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchVendorProducts(vendor._id));
      }
    });
  }

  function isFormValid() {
    const requiredFields = [
      "imageFiles",
      "title",
      "description",
      "category",
      "price",
      "totalStock",
    ];

    return requiredFields.every((field) => {
      const value = formData[field];
      if (Array.isArray(value)) return value.length > 0;
      return value !== "" && value !== null && value !== undefined;
    });
  }

  useEffect(() => {
    console.log("useEffect called for vendor products");
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}vendors/me`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("Vendor data fetched:", response.data.vendor);
        setVendor(response.data.vendor);
      } catch (error) {
        console.error(
          "Failed to fetch vendor profile:",
          error.response?.data || error.message
        );
      }
    };

    fetchVendor();
  }, []);

  useEffect(() => {
    if (vendor && vendor._id) {
      // console.log("Fetching vendor products for ID:", vendor._id);
      dispatch(fetchVendorProducts(vendor._id));
    }
  }, [dispatch, vendor]);

  console.log(formData, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                isSubmitting
                  ? "Saving..."
                  : currentEditedId !== null
                  ? "Edit"
                  : "Add"
              }
              formControls={addProductFormElements}
              isBtnDisabled={isSubmitting || !isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default VendorProducts;
