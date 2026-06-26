import { Suspense } from "react";
import AllAppointmentClient from "@/components/AllAppointmentClient";
import { doctorsData } from "@/lib/data";

export const metadata = {
  title: "All-Appointment | DocAppoint",
  description: "Book appointments with experienced doctors online.",
};

// ── Loading Spinner ──
const DoctorsLoading = () => (
  <div className="bg-[#EAF3F3] min-h-screen flex flex-col items-center justify-center gap-4">
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 rounded-full border-4 border-teal-600/10" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0f6e56] animate-spin" />
    </div>
    <p className="text-sm text-[#6b7280]">Loading doctors...</p>
  </div>
);

// ── Async Data Component ──
const DoctorsList = async () => {
  const doctors = await doctorsData();
  return <AllAppointmentClient doctors={doctors} />;
};

// ── Page ──
const AllAppointmentPage = () => {
  return (
    <Suspense fallback={<DoctorsLoading />}>
      <DoctorsList />
    </Suspense>
  );
};

export default AllAppointmentPage;
