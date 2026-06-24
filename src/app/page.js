import Banner from "@/components/Banner";
import HealthcareNumber from "@/components/HealthcareNumber";
import WhyDocpoyent from "@/components/WhyDocpoyent";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <WhyDocpoyent></WhyDocpoyent>
     <HealthcareNumber></HealthcareNumber>
    </div>
  );
}
