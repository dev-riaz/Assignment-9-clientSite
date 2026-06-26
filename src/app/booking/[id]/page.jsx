"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { FaUser, FaEnvelope, FaClinicMedical, FaAward } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AppointmentBooking() {
  const { id } = useParams();
  const router = useRouter();

  const [doctor, setDoctor] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const getDoctor = async () => {
      try {
        setLoadError("");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOCTORS_URI}/allData/${id}`,
          { cache: "no-store" },
        );
        if (!res.ok)
          throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        if (!cancelled) setDoctor(data);
      } catch (err) {
        if (!cancelled) {
          const message = err.message || "Failed to load doctor.";
          setLoadError(message);
          toast.error(message);
        }
      }
    };

    getDoctor();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const bookingData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOCTORS_URI}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        },
      );

      if (!res.ok) throw new Error("Failed to book appointment");

      const result = await res.json();

      console.log("Saved to DB:", result);

      setSubmitted(true);
      toast.success("Appointment booked successfully!");
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <>
        <Toaster position="top-center" />
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-4">
          <p className="text-lg font-semibold text-[#112B5F]">
            Couldn&apos;t load this doctor
          </p>
          <p className="text-gray-500 text-sm max-w-sm">{loadError}</p>
        </div>
      </>
    );
  }

  if (!doctor) {
    return (
      <>
        <Toaster position="top-center" />
        <div className="min-h-screen flex justify-center items-center">
          Loading...
        </div>
      </>
    );
  }

  // Guard against any of these being missing from the API response, so a
  // partial doctor record doesn't crash the page.
  const {
    image,
    name = "Doctor",
    hospital = "—",
    experience = "—",
    specialty = "—",
    availability = [],
  } = doctor;

  return (
    <div className="min-h-screen bg-[#EEF7F6] py-10 px-4">
      <Toaster position="top-center" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto rounded-3xl border bg-white p-8 shadow-xl"
      >
        {/* Header */}
        <div className="text-center pb-8">
          <h1 className="text-4xl font-bold text-[#112B5F]">
            Book Appointment
          </h1>
          <p className="text-gray-400 mt-2">
            Fill in the details below to schedule your appointment
          </p>
        </div>

        {/* Doctor Card */}
        <div className="grid md:grid-cols-3 gap-3 mt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-5 rounded-2xl p-6 bg-teal-500/30"
          >
            {image ? (
              <Image
                src={image}
                width={150}
                height={200}
                alt={name}
                className="rounded-full h-28 w-28 object-cover"
              />
            ) : (
              <div className="rounded-full h-28 w-28 bg-teal-500/40 flex items-center justify-center text-[#112B5F] font-semibold text-2xl">
                {name.charAt(0)}
              </div>
            )}

            <div>
              <p className="text-gray-500 text-sm">Doctor</p>
              <h2 className="text-2xl font-bold text-[#112B5F]">{name}</h2>
              <p className="text-[#112B5F] text-sm">{specialty}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col justify-center items-center bg-teal-500/30 rounded-2xl p-6"
          >
            <FaAward size={30} className="text-[#112B5F]" />
            <p className="text-gray-500 mt-2">Experience</p>
            <h3 className="font-bold text-xl text-[#112B5F]">{experience}</h3>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col justify-center items-center bg-teal-500/30 rounded-2xl p-6"
          >
            <FaClinicMedical size={30} className="text-[#112B5F]" />
            <p className="text-gray-500 mt-2">Chamber</p>
            <h3 className="font-bold text-xl text-[#112B5F]">{hospital}</h3>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Patient Information */}
          <h2 className="text-3xl font-bold text-[#112B5F] mt-10 mb-5">
            Patient Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label>Patient Name</label>
              <div className="flex items-center border border-gray-300 rounded-xl mt-2 h-10 px-4">
                <FaUser className="text-gray-400" />
                <input
                  name="patientName"
                  required
                  placeholder="Enter Your Name"
                  className="ml-3 w-full outline-none"
                />
              </div>
            </div>

            <div>
              <label>Email</label>
              <div className="flex items-center border border-gray-300 rounded-xl mt-2 h-10 px-4">
                <FaEnvelope className="text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="user@gmail.com"
                  className="ml-3 w-full outline-none"
                />
              </div>
            </div>

            <div>
              <label>Gender</label>
              <select
                name="gender"
                defaultValue="Male"
                className="w-full border border-gray-300 rounded-xl mt-2 h-10 px-4"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Phone Number</label>
              <div className="flex items-center border border-gray-300 rounded-xl mt-2 h-10 px-4">
                <MdAddCall className="text-gray-400" />
                <input
                  name="phone"
                  required
                  placeholder="01712345678"
                  className="ml-3 w-full outline-none"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <h2 className="text-2xl font-bold text-[#112B5F] mt-10 mb-5">
            Appointment Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label>Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                required
                className="w-full h-10 border border-gray-300 rounded-xl px-4 mt-2 outline-none focus:border-teal-500 focus:ring-1"
              />
            </div>

            <div>
              <label>Appointment Time</label>
              <select
                name="appointmentTime"
                required
                defaultValue=""
                className="w-full h-10 border border-gray-300 rounded-xl px-4 mt-2 outline-none focus:border-teal-500 focus:ring-1"
              >
                <option value="" disabled>
                  Select Time
                </option>
                {availability.length > 0 ? (
                  availability.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))
                ) : (
                  <option disabled>No slots available</option>
                )}
              </select>
            </div>
          </div>

          {/* Symptoms */}
          <div className="mt-8">
            <label>Symptoms / Problem</label>
            <textarea
              rows={2}
              name="symptoms"
              placeholder="Describe your symptoms..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none focus:border-teal-500 focus:ring-1"
            />
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label>Additional Notes</label>
            <textarea
              rows={2}
              name="notes"
              placeholder="Write anything..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none focus:border-teal-500 focus:ring-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-4 mt-10">
            {submitted && (
              <span className="text-teal-700 text-sm font-medium">
                Logged to console ✓
              </span>
            )}
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-error px-8"
            >
              Cancel
            </button>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-teal-700 hover:bg-teal-800 text-white border-none px-8 disabled:opacity-60"
            >
              {submitting ? "Booking..." : "Book Appointment"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
