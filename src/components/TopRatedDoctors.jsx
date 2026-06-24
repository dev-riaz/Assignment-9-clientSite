import DoctorsCard from "./DoctorsCard";
import { FaHeartbeat } from "react-icons/fa";

const TopRatedDoctors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOCTORS_URI}/allData`, {
    cache: "no-store",
  });

  const data = await res.json();
  const doctors = data.slice(0, 3);

  return (
    <div className="bg-[#EAF3F3]">
      <div className="w-11/12 mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#534ab7] bg-[#eeedfe] rounded-full px-3.5 py-1 mb-3 tracking-widest uppercase">
            Highest rated this month
          </div>

          {/* Title */}
          <h2 className="text-3xl font-semibold text-[#0D2137] mt-1">
            Meet our top-rated doctors
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-[#6b7280] mt-2 max-w-md mx-auto leading-relaxed">
            Verified specialists with the highest patient satisfaction scores
            this month.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {doctors.map((doctor) => (
            <DoctorsCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedDoctors;
