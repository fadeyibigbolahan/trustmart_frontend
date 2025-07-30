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
  // const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { vendor } = useOutletContext();

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

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
      // Optionally send FormData here too if edit requires image update
      dispatch(
        editProduct({ id: currentEditedId, formData: formPayload })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchVendorProducts(vendor._id));
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      });
    } else {
      dispatch(addNewProduct(formPayload)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchVendorProducts(vendor._id));
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          toast({ title: "Product added successfully" });
        }
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
    dispatch(fetchVendorProducts(vendor._id));
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
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default VendorProducts;
