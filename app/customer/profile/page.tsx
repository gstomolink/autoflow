'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: 'johndoe', // cannot change
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    address: '21, Sunset Street, New York',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileSave = () => {
    alert('Profile updated successfully!');
  };

  const handlePasswordSave = () => {
    if (passwords.newPass !== passwords.confirm) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully!');
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (confirmDelete) {
      alert('Account deleted.');
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile Management</h1>
        <p className="text-gray-500 mt-1">
          Manage your personal information and account security settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Profile Details */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username (readonly) */}
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                value={profile.username}
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Address</label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
                rows={3}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleProfileSave}
            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Save Changes
          </button>
        </div>

        {/* RIGHT: Password + Danger Zone */}
        <div className="space-y-6">
          {/* Change Password */}
          <div className="bg-white border rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Change Password</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Current Password</label>
                <input
                  type="password"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">New Password</label>
                <input
                  type="password"
                  name="newPass"
                  value={passwords.newPass}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Confirm New Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handlePasswordSave}
              className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Update Password
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border border-red-200 rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
            <p className="text-sm text-gray-500 mb-4">
              Deleting your account will permanently remove all your data.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}