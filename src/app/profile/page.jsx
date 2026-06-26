"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FiEdit2, FiUser, FiMail, FiX, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [photoUrl, setPhotoUrl] = useState(user?.image ?? "");

  const handleSave = async () => {
    await authClient.updateUser({ name, image: photoUrl });
    setIsModalOpen(false);
  };

  const handleBack = () => {
    router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const initials = user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="md:w-11/12 mx-auto px-4 max-w-lg">
        {/* Header Row — Title left, Back button right */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold text-[#112B5F]">My Profile</h1>

          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-medium text-[#0F7A73] border-2 border-[#0F7A73] rounded-full px-4 py-1.5 hover:bg-[#0F7A73] hover:text-white transition-all duration-200"
          >
            <FiArrowLeft size={15} />
            Back to Home
          </button>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-3 pb-6 border-b border-gray-100">
            {user?.image ? (
              <motion.img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0F7A73]"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                  delay: 0.2,
                }}
              />
            ) : (
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] flex items-center justify-center text-white text-3xl font-bold"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                  delay: 0.2,
                }}
              >
                {initials}
              </motion.div>
            )}
          </div>

          {/* Info Rows */}
          <div className="mt-5 space-y-4">
            {[
              {
                icon: <FiUser className="text-[#0F7A73]" size={18} />,
                label: "Full Name",
                value: user?.name,
                delay: 0.3,
              },
              {
                icon: <FiMail className="text-[#0F7A73]" size={18} />,
                label: "Email Address",
                value: user?.email,
                delay: 0.38,
              },
            ].map(({ icon, label, value, delay }) => (
              <motion.div
                key={label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay }}
              >
                <div className="bg-gray-50 p-2 rounded-lg">{icon}</div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="font-medium text-gray-800">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Update Button */}
          <motion.button
            onClick={() => {
              setName(user?.name ?? "");
              setPhotoUrl(user?.image ?? "");
              setIsModalOpen(true);
            }}
            className="btn w-full mt-6 bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] text-white border-none rounded-full shadow-none hover:opacity-90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.46 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiEdit2 /> Update Profile
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
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
              <AnimatePresence>
                {photoUrl && (
                  <motion.div
                    className="flex items-center gap-2 mt-3 mb-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <img
                      src={photoUrl}
                      alt="Preview"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#0F7A73]"
                    />
                    <span className="text-xs text-gray-400">Preview</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-5">
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  className="btn flex-1 border-2 border-[#0F7A73] rounded-full bg-white text-[#0F7A73] hover:bg-[#0F7A73] hover:text-white shadow-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  className="btn flex-1 bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] text-white border-none rounded-full shadow-none hover:opacity-90"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
