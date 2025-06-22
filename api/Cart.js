import axiosInstance from "../utils/axiosInstance";

export const getCart = async (token) => {
  const res = await axiosInstance.get("/cart/get", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addToCart = async ({ item, token }) => {
  const res = await axiosInstance.post("/cart/add", item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const removeFromCart = async ({ product_id, token }) => {
  const res = await axiosInstance.delete(`/cart/remove/${product_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const updateCart = async ({ product_id, quantity, token }) => {
  const res = await axiosInstance.put(
    "/cart/update",
    { product_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};