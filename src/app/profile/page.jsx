"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FiEdit2, FiUser, FiMail, FiX } from "react-icons/fi";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [photoUrl, setPhotoUrl] = useState(user?.image ?? "");

  const handleSave = async () => {
    await authClient.updateUser({ name, image: photoUrl });
    setIsModalOpen(false);
  };

  const initials = user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="md:w-11/12 mx-auto px-4 max-w-lg">
        <h1 className="text-2xl font-bold text-[#112B5F] mb-6">My Profile</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-3 pb-6 border-b border-gray-100">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0F7A73]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] flex items-center justify-center text-white text-3xl font-bold">
                {initials}
              </div>
            )}
          </div>

          {/* Info Rows */}
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <FiUser className="text-[#0F7A73]" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Full Name
                </p>
                <p className="font-medium text-gray-800">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <FiMail className="text-[#0F7A73]" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Email Address
                </p>
                <p className="font-medium text-gray-800">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={() => {
              setName(user?.name ?? "");
              setPhotoUrl(user?.image ?? "");
              setIsModalOpen(true);
            }}
            className="btn w-full mt-6 bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] text-white border-none rounded-full shadow-none hover:opacity-90"
          >
            <FiEdit2 /> Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#112B5F]">
                Update Profile
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full rounded-xl focus:border-[#0F7A73] focus:outline-none"
                placeholder="Your full name"
              />
            </div>

            {/* Photo URL Field */}
            <div className="mb-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                Photo URL
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full rounded-xl focus:border-[#0F7A73] focus:outline-none"
                placeholder="https://..."
              />
            </div>

            {/* Photo Preview */}
            {photoUrl && (
              <div className="flex items-center gap-2 mt-3 mb-2">
                <img
                  src={photoUrl}
                  alt="Preview"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#0F7A73]"
                />
                <span className="text-xs text-gray-400">Preview</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn flex-1 border-2 border-[#0F7A73] rounded-full bg-white text-[#0F7A73] hover:bg-[#0F7A73] hover:text-white shadow-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn flex-1 bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] text-white border-none rounded-full shadow-none hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
