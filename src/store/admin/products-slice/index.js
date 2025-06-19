import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "@/store/api";

const initialState = {
  isLoading: false,
  productList: [],
};

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

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(`${url}admin/products/get`);

    return result?.data;
  }
);

export const fetchVendorProducts = createAsyncThunk(
  "products/fetchVendorProducts",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}admin/products/get/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch vendor products:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

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

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
