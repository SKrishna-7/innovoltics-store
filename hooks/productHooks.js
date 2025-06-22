// hooks/productHooks.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://innovoltics-3dprinters.onrender.com/api';

export const useProducts = (options={}) => {
  if (typeof window === 'undefined') {
    return { data: [], isLoading: false }; // SSR-safe fallback
  }

    return useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await axios.get(`${BASE_URL}/products`);
        return res.data;
      },
      staleTime: 5 * 60 * 1000, // optional caching
      ...options,
    });
  };
// Fetch product by ID
import { getProductById, uploadModel } from "../api/product";

export const useProductById = (productId, enabled = true) =>
  useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId && enabled,
  });

  import { deleteProduct } from "../api/product";

  export const useDeleteProduct = (token) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ product_id }) => deleteProduct({ product_id, token }),
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
      onError: (error) => {
        // console.error("Delete product failed:", error);
      },
    });
  };


import { updateProduct } from "../api/product";

export const useUpdateProduct = (token) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product_id, formData }) => updateProduct({ product_id, formData, token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]); // Optional: Refetch product list
          },
    onError: (error) => {
      return error
    },
  });
};

import { createProduct } from "../api/product";

export const useCreateProduct = (token) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }) => createProduct({ formData, token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]); 
      return data;
    },
    onError: (error) => {
      // console.error("Create product error:", error);
      throw error;
    },
  });
};



export const useUploadModel = () => {
  return useMutation({
    mutationFn: ({ formData, token }) => uploadModel({ formData, token }),
  });
};