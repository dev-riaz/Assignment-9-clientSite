import Banner from "@/components/Banner";
import HealthcareNumber from "@/components/HealthcareNumber";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import WhyDocpoyent from "@/components/WhyDocpoyent";

export const metadata = {
  title: "Home | DocAppoint",
  description: "Book appointments with experienced doctors online.",
};

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <WhyDocpoyent></WhyDocpoyent>
      <TopRatedDoctors></TopRatedDoctors>
      <HealthcareNumber></HealthcareNumber>
    </div>
  );
}
