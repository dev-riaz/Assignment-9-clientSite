import Banner from "@/components/Banner";
import HealthcareNumber from "@/components/HealthcareNumber";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import WhyDocpoyent from "@/components/WhyDocpoyent";
import Image from "next/image";

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
