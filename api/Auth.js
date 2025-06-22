// api/userApi.js
import axios from "../utils/axiosInstance";

const BASE_URL = "/users"; // or "/users" if that’s how your backend is organized

export const registerUser = async (data) => {
  // console.log(data)
  const response = await axios.post(`${BASE_URL}/register`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/login`, data);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllUsers= async (token)=>{
  const res=await axios.get(`${BASE_URL}/all`,{
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.users

}

export const deleteUser = async ({userId, token}) => {
  const res = await axios.delete(`${BASE_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProfile = async ({ name, phone, token }) => {
  const res = await axios.put(
    `${BASE_URL}/me`,
    { name, phone },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const resetPassword = async (formData, token) => {
  const res = await axios.put(`${BASE_URL}/reset-password`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
