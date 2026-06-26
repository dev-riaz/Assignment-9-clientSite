"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function DashboardContent() {
  const { data: session, isPending } = authClient.useSession();
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [bookings, setBookings] = useState([]);
  //   const [loading, setLoading] = useState(true);

  const [editProblem, setEditProblem] = useState("");
  const [editDate, setEditDate] = useState("");

  // FETCH BOOKINGS

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOCTORS_URI}/bookings?email=${session.user.email}`,
        );

        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, [session]);

  // OPEN MODAL

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
    setEditProblem(booking.symptoms || "");
    setEditDate(booking.appointmentDate || "");
    setOpenModal(true);
  };

  // SAVE (UPDATE MONGODB)

  const handleSave = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOCTORS_URI}/bookings/${selectedBooking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: editProblem,
            appointmentDate: editDate,
          }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      // UI update (no design change)
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id
            ? {
                ...b,
                symptoms: editProblem,
                appointmentDate: editDate,
              }
            : b,
        ),
      );

      toast.success("Appointment updated successfully 🎉");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // DELETE (FRONTEND ONLY)

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOCTORS_URI}/bookings/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // UI থেকেও remove
      setBookings((prev) => prev.filter((b) => b._id !== id));

      toast.success("Appointment deleted successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // LOADING

  if (isPending) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#EAF3F3]">
      {/* TOASTER */}
      <Toaster position="top-center" />

      {/* SIDEBAR (UNCHANGED DESIGN) */}
      <div className="w-16 md:w-64 bg-slate-900 text-white p-4 md:p-6 flex-shrink-0">
        <h1 className="hidden md:block text-2xl font-bold mb-10">Dashboard</h1>

        <ul className="space-y-4 text-gray-300">
          <li className="flex items-center gap-3 text-white font-semibold">
            <span>📅</span>
            <span className="hidden md:inline">My Bookings</span>
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8">
        <motion.h2
          className="text-xl md:text-2xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          My Bookings
        </motion.h2>

        {/* BOOKINGS */}
        <div className="space-y-4">
          <AnimatePresence>
            {bookings && bookings.length > 0 ? (
              <AnimatePresence>
                {bookings.map((b, i) => (
                  <motion.div
                    key={b._id || i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="bg-white p-4 md:p-5 rounded-xl shadow flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{b.patientName}</h3>
                      <p className="text-gray-500 text-sm">
                        {b.appointmentDate} | {b.appointmentTime}
                      </p>
                      <p className="text-gray-500 text-sm">{b.symptoms}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(b)}
                        className="px-3 py-2 bg-blue-500 text-white rounded"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(b._id)}
                        className="px-3 py-2 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl">📭</div>
                <h2 className="text-xl font-bold text-slate-700 mt-3">
                  No Appointments Yet
                </h2>
                <p className="text-gray-500 mt-1">
                  You don’t have any bookings right now.
                </p>

                <button
                  onClick={() => (window.location.href = "/allAppointments")}
                  className="mt-5 px-5 py-2 bg-slate-900 text-white rounded-lg"
                >
                  Book Appointment
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL (UNCHANGED DESIGN) */}
      <AnimatePresence>
        {openModal && selectedBooking && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setOpenModal(false)}
          >
            <motion.div className="bg-white w-full max-w-md p-5 rounded-xl">
              <h2 className="text-lg font-bold mb-4">Update Appointment</h2>

              <input
                className="w-full p-2 border rounded mb-3 bg-gray-100"
                value={selectedBooking.patientName}
                disabled
              />

              <input
                className="w-full p-2 border rounded mb-3 bg-gray-100"
                value={selectedBooking.email || ""}
                disabled
              />

              <input
                className="w-full p-2 border rounded mb-3"
                value={editProblem}
                onChange={(e) => setEditProblem(e.target.value)}
              />

              <input
                type="date"
                className="w-full p-2 border rounded mb-5"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
