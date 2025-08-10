import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "@/store/api";

const initialState = {
  isLoading: false,
  productList: [],
};

// Add new product
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const token = localStorage.getItem("token");
    const result = await axios.post(`${url}admin/products/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
    return result?.data;
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(`${url}admin/products/get`);
    return result?.data.data; // returns just the array
  }
);

// Fetch vendor products
export const fetchVendorProducts = createAsyncThunk(
  "products/fetchVendorProducts",
  async (vendorId, { rejectWithValue }) => {
    try {
      console.log("Fetching vendor products for ID:", vendorId);
      const response = await axios.get(
        `${url}shop/products/vendor/${vendorId}`
      );
      // console.log("Vendor products fetched:", response.data);
      // Ensure we only return an array
      return response.data.products || response.data.data || [];
    } catch (error) {
      console.error("Failed to fetch vendor products:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const token = localStorage.getItem("token");
    const result = await axios.put(
      `${url}admin/products/edit/${id}`,
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const token = localStorage.getItem("token");
    const result = await axios.delete(`${url}admin/products/delete/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return result?.data;
  }
);

// Slice
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload || [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })

      // Fetch vendor products
      .addCase(fetchVendorProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload || [];
      })
      .addCase(fetchVendorProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
