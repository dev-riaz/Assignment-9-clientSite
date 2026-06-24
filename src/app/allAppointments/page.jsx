
import AllAppointmentClient from "@/components/AllAppointmentClient";
import { doctorsData } from "@/lib/data";


const AllAppointmentPage = async () => {
  const doctors = await doctorsData();
  return <AllAppointmentClient doctors={doctors} />;
};

export default AllAppointmentPage;
