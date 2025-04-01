"use client"
import { useState, useEffect } from 'react';
// import { auth } from '../firebase/firebase';

const API_BASE_URL = 'http://localhost:8000/users'; // Assuming a users endpoint

export default function UserManagement() {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const toggleUserStatus = (id, currentStatus) => {
    fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: currentStatus === 'Active' ? 'Disabled' : 'Active' }),
    }).then(() => {
      setUsers(users.map((u) => (u.id === id ? { ...u, status: currentStatus === 'Active' ? 'Disabled' : 'Active' } : u)));
    });
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-6">User Management</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-purple-50 dark:bg-gray-700">
            <tr>
              <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-purple-600 dark:text-purple-400 uppercase">Email</th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-purple-600 dark:text-purple-400 uppercase">Status</th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-purple-600 dark:text-purple-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">{user.status}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => toggleUserStatus(user.id, user.status)}
                    className={`text-${user.status === 'Active' ? 'red' : 'green'}-600 hover:text-${user.status === 'Active' ? 'red' : 'green'}-700`}
                  >
                    {user.status === 'Active' ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>  
        </table>
      </div>
    </div>
  );
}