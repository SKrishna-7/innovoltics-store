'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { FiEdit3 } from 'react-icons/fi';
import { useUser } from '@/store/UserContext';
import { useProfile,useResetPassword,useUpdateProfile } from '@/hooks/Authhooks';
import { FaTimesCircle,FaCheckCircle } from 'react-icons/fa';
export default function ProfilePage() {
  const router = useRouter();
    
  const {token}=useUser()
  const { data: user, isLoading, isError } = useProfile(token);
 
const [crtuser, setCrtuser] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  
  const [editForm, setEditForm] = useState({ ...crtuser });
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
    emailOTP: '',
  });
  // console.log(user)

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [editError, setEditError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const updateProfileMutation = useUpdateProfile();

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    if (!editForm.name) {
      setEditError('Data is required to update');
      return;
    }
    if (editForm.name==user?.name){
      setEditError('Enter new data for update.. ');
      return;
      
    }
  
    try {
      await updateProfileMutation.mutateAsync({
        name: editForm.name,
        phone: editForm.phone,
        token,
      });
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Profile Updated!',
        message: 'Your profile has been successfully updated.'
      });
      setCrtuser({ ...editForm }); // Update user context/state
      setIsEditOpen(false);
      setEditError('');

    } catch (err) {
      // console.error(err);
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update your profile. Please try again.'
      });
      setEditError('Failed to update profile.');
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    if (!passwordForm.emailOTP) {
      setPasswordError('Enter the OTP sent to your email.');
      return;
    }
    try {
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '', emailOTP: '' });
      setIsResetOpen(false);
      setPasswordError('');
    } catch {
      setPasswordError('Password reset failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const sendDummyOTP = () => {
    // simulate sending OTP
    alert('OTP sent to your email!');
    setPasswordForm((prev) => ({
      ...prev,
      emailOTP: '', // make OTP box appear
    }));
  };
  
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'success', // or 'error'
    title: '',
    message: ''
  });
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 mt-10">
        <span className="text-gray-500">Loading user data...</span>
        {/* Or use a spinner component */}
      </div>
    );
  }
  
  if (isError || !user) {
    return (
      <div className="text-red-500 text-sm mt-10">
        Failed to load user profile. Please try again later.
      </div>
    );
  }

  
  const closeModal = () => {
    setModalState(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 mt-10 font-poppins">
      <div className="sm:max-w-4xl w-full sm:mx-auto bg-white rounded-lg shadow-md sm:flex overflow-hidden">
        {/* Left */}
        <div className="sm:w-1/3 bg-gradient-to-b from-purple-600 to-purple-400 text-white flex flex-col items-center justify-center p-6">
          {/* <Image
            src={''}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full border-4 border-white"
          /> */}
          <h2 className="mt-4 text-xl font-bold ">{user?.name || ''}</h2>
          {/* <p className="text-sm">{user.email}</p>
          <p className="text-sm">{user.phone}</p> */}
          <button onClick={handleLogout} className="mt-4 sm:ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Logout</button>

        </div>

        {/* Right */}
        <div className="w-2/3 p-8">
          <h3 className="sm:text-2xl text-lg font-semibold text-gray-800 mb-6">Account Settings</h3>
          <div className="space-y-2">
            <div className="">
            <p>
                Name
            </p>
            <p> {user?.name || editForm.name}</p>
              </div>     
           
           <div className="">
            <p>
                Email :
            </p>
            <p> {user?.email || editForm.email}</p>
           </div>
           <div className="">

            <p>
                Phone :
            </p>
            <p>
            {user?.phone || 'not added!'}
            </p>
           
           </div>
        

          </div>
          <div className="space-y-4 mt-10">
            <div className="sm:flex  items-center">
            
            <button onClick={() => setIsEditOpen(true)} className="mt-2 sm:mr-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">Edit Profile</button>
            <button onClick={() => setIsResetOpen(true)} className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-sm">Reset Password</button>
            {/* <button onClick={handleLogout} className="hidden mt-2 sm:ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 sm:block">Logout</button> */}

            </div>
            
            <button onClick={() => router.push('/order-history')} className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 text-sm">Track Your Orders</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Transition show={isEditOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsEditOpen(false)}>
          <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
                  <Dialog.Title className="text-lg font-medium text-gray-900">Edit Profile</Dialog.Title>
                  <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
                    <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" className="w-full border rounded px-3 py-2" required />
                    {/* <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" className="w-full border rounded px-3 py-2" required /> */}
                    <input type="tel" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="Phone" className="w-full border rounded px-3 py-2" />
                    {editError && <p className="text-sm text-red-500">{editError}</p>}
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setIsEditOpen(false)} disabled={isLoading} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Reset Password Modal */}
     {/* Reset Password Modal */}
<Transition show={isResetOpen} as={React.Fragment}>
  <Dialog as="div" className="relative z-10" onClose={() => setIsResetOpen(false)}>
    <Transition.Child
      as={React.Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-full p-4">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
            <Dialog.Title className="text-lg font-medium text-gray-900">Reset Password</Dialog.Title>
            <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">

              {/* New Password */}
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="New Password"
                className="w-full border rounded px-3 py-2"
                required
              />

              {/* Confirm Password */}
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="Confirm Password"
                className="w-full border rounded px-3 py-2"
                required
              />

              {/* OTP Section */}
              {!passwordForm.emailOTP ? (
                <button
                  type="button"
                  onClick={sendDummyOTP}
                  className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"                >
                  Send OTP to Email
                </button>
              ) : (
                <input
                  type="text"
                  value={passwordForm.emailOTP}
                  onChange={(e) => setPasswordForm({ ...passwordForm, emailOTP: e.target.value })}
                  placeholder="Enter OTP"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              )}

              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsResetOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
                  Reset
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>


{modalState.isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
      <div className="flex items-center gap-3">
        {modalState.type === "success" ? (
          <FaCheckCircle className="text-green-500 text-2xl" />
        ) : (
          <FaTimesCircle className="text-red-500 text-2xl" />
        )}
        <h3 className="text-lg font-semibold text-gray-900">
          {modalState.title || (modalState.type === "success" ? "Success!" : "Something went wrong")}
        </h3>
      </div>
      <p className="mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {modalState.message}
      </p>
      <div className="mt-6 flex justify-end">
        <button
          onClick={closeModal}
          className={`px-5 py-2 rounded-md ${
            modalState.type === "success" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          } text-white font-medium transition duration-200`}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
