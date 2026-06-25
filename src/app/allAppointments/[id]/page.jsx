
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FaCalendarPlus,
  FaShareAlt,
  FaSun,
  FaMoon,
  FaArrowLeft,
} from "react-icons/fa";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

const useCountUp = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const isFloat = String(target).includes(".");
    const numericTarget = parseFloat(target);
    const startTime = performance.now();
    let frameId;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;
      setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target, duration]);

  return { count, ref };
};

const AnimatedStat = ({ value, suffix = "", label }) => {
  const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, ""));
  const { count, ref } = useCountUp(numericValue);

  return (
    <div ref={ref} className="bg-white border rounded-xl p-4 text-center">
      <h2 className="text-xl font-bold">
        {count}{suffix}
      </h2>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

const DetailsPage = ({ params }) => {
  const [doctors, setDoctors] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setId(resolved.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOCTORS_URI}/allData/${id}`,
        { cache: "no-store" },
      );
      const data = await res.json();
      setDoctors(data);
    };
    fetchData();
  }, [id]);

  if (!doctors)
    return (
      <div className="min-h-screen bg-[#f5f7f7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#e0ede9] border-t-[#0F6E56] rounded-full animate-spin"></div>
          <p className="text-[#085041] font-medium text-sm">Loading...</p>
        </div>
      </div>
    );

  const {
    name,
    _id,
    specialty,
    image,
    experience,
    description,
    hospital,
    location,
    fee,
    availability,
  } = doctors;

  return (
    <div className="bg-[#f5f7f7] py-8">
      <div className="w-10/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={"/allAppointments"}
            className="flex items-center gap-2 mb-4 text-[#085041] font-medium hover:text-[#0F6E56]"
          >
            <FaArrowLeft />
            Back to Doctors
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="bg-white border rounded-2xl p-8 flex flex-wrap items-center gap-6 mb-4"
        >
          <div className="">
            <Image
              className="rounded-full h-48"
              src={image}
              width={200}
              height={300}
              alt="image"
            ></Image>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-gray-500">
              <span>{specialty}</span> · <span>{location}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-outline">
              <FaShareAlt />
              Share
            </button>

            <button className="btn bg-[#0F6E56] text-white border-none">
              <FaCalendarPlus />
              Book Appointment
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.08)}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"
        >
          <AnimatedStat value={experience} label="years exp." />
          <AnimatedStat value={4.8} label="rating" />
          <AnimatedStat value={5400} suffix="+" label="patients" />
          <AnimatedStat value={fee} suffix=" Tk" label="fee" />
        </motion.div>

        {/* About */}
        <motion.div
          {...fadeUp(0.16)}
          className="bg-white border rounded-2xl p-8 mb-4"
        >
          <h2 className="text-2xl font-semibold mb-3">About</h2>
          <p className="text-gray-600 leading-7">{description}</p>
        </motion.div>

        {/* Availability */}
        <motion.div
          {...fadeUp(0.24)}
          className="bg-white border rounded-2xl p-8 mb-4"
        >
          <h2 className="text-2xl font-semibold mb-4">Availability</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">morning</p>
                <p className="font-semibold">{availability[0]}</p>
              </div>
              <FaSun />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">evening</p>
                <p className="font-semibold">{availability[1]}</p>
              </div>
              <FaMoon />
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.32)}
          className="bg-[#085041] rounded-2xl p-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <h2 className="text-white text-xl font-semibold">
              Ready to see {name}?
            </h2>
            <p className="text-green-200">
              Consultation fee {fee} Tk · no payment required
            </p>
          </div>

          <button className="btn bg-white text-[#085041] border-none">
            <FaCalendarPlus />
            Book Appointment
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailsPage;