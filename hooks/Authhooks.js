
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { registerUser, loginUser, getProfile, getAllUsers ,deleteUser, resetPassword, updateProfile } from "../api/Auth";

export const useRegister = () =>
  useMutation({
    mutationFn: registerUser,
  });
  export const useLogin = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: loginUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
    });
  };
  

  export const  useProfile = (token, options = {}) =>
    useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfile(token),
      enabled: !!token, // default
      ...options,       // override if provided
    });
  

  export const useAllUsers = (token, enabled = true) => {
    return useQuery({
      queryKey: ["admin-users"],
      queryFn: () => getAllUsers(token),
      enabled: !!token && enabled,
    });
  };

  export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ userId, token }) => deleteUser({ userId, token }),
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]); // Refresh list
      },
    });
  };


export const useUpdateUserRole = () => {
  return useMutation(({ userId, role }) =>
    axiosInstance.put(`/users/${userId}/role`, { role })
  );
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ formData, token }) => resetPassword(formData, token),
  });
};
