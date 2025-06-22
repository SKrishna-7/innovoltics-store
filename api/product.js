import axiosInstance from "../utils/axiosInstance";

export const getProductById = async (productId) => {
  const res = await axiosInstance.get(`/products/${productId}`);
  return res.data.product || res.data;
};

export const deleteProduct = async ({ product_id, token }) => {
  const response = await axiosInstance.delete(`/products/${product_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const createProduct = async ({ formData, token }) => {
  const response = await axiosInstance.post(`/products`, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // { message, product }
};

export const updateProduct = async ({ product_id, formData, token }) => {
  const res = await axiosInstance.put(`/products/${product_id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // ✅ only return the actual response data
};


export const useProductById = (product_id) => {
  return useQuery(
    ["product", product_id],
    () => getProductById(product_id),
    {
      enabled: !!product_id && product_id !== "new",
      retry: false,
    }
  );
};


export const uploadModel = async ({ formData, token }) => {
  const response = await axiosInstance.post("/upload-model/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};