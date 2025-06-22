import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, removeFromCart, updateCart } from "../api/Cart";

export const useCart = (token) =>
  useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(token),
    enabled: !!token,
  });

export const useAddToCart = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item) => addToCart({ item, token }),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });
};

export const useRemoveFromCart = (token) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product_id) => removeFromCart({ product_id, token }),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });
};


export const useUpdateCart = (token) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product_id, quantity }) =>
      updateCart({ product_id, quantity, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};