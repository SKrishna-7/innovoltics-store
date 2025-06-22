"use client";

import { useAllUsers, useDeleteUser } from "@/hooks/Authhooks";
import { useUser } from "@/store/UserContext";
import { FaTrash } from "react-icons/fa";

export default function AdminUsers() {
  const {token}=useUser()
  // console.log("USER",token)
  const { data: users, isLoading, error } = useAllUsers();

  // console.log(users)
  if (isLoading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-600">Failed to load users.</div>;
  const { mutateAsync: deleteUser } = useDeleteUser();

  const handledeleteUser = async (userId) => {
    try {
      await deleteUser({userId,token}); // token can be passed via context or inside hook if needed
      alert("User deleted and list refreshed!");
    } catch (err) {
      alert("Failed to delete user");
      // console.error(err);
    }
  };
  
  return (
    <div className="p-6 min-h-screen bg-gray-50 mt-20">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="bg-purple-50 text-purple-800 text-sm uppercase font-semibold">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role || "User"}</td>
              <td className="p-4">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handledeleteUser(user?.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
